import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiting per IP (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // max requests per window
const RATE_WINDOW_MS = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function validateAndSanitize(body: unknown): {
  valid: boolean;
  error?: string;
  data?: { question: string; coinName: string; coinSymbol: string; coinData: Record<string, number> };
} {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { question, coinName, coinSymbol, coinData } = body as Record<string, unknown>;

  if (typeof question !== "string" || question.trim().length === 0) {
    return { valid: false, error: "Question is required" };
  }
  if (question.length > 1000) {
    return { valid: false, error: "Question too long (max 1000 characters)" };
  }
  if (typeof coinName !== "string" || coinName.trim().length === 0 || coinName.length > 100) {
    return { valid: false, error: "Invalid coin name" };
  }
  if (typeof coinSymbol !== "string" || coinSymbol.trim().length === 0 || coinSymbol.length > 20) {
    return { valid: false, error: "Invalid coin symbol" };
  }

  if (!coinData || typeof coinData !== "object") {
    return { valid: false, error: "Invalid coin data" };
  }

  const numericFields = ["currentPrice", "priceChange24h", "marketCap", "volume24h", "circulatingSupply", "rank", "ath", "high24h", "low24h"];
  const cd = coinData as Record<string, unknown>;
  for (const field of numericFields) {
    if (typeof cd[field] !== "number" || !Number.isFinite(cd[field] as number)) {
      return { valid: false, error: `Invalid coin data field: ${field}` };
    }
  }

  return {
    valid: true,
    data: {
      question: question.trim().slice(0, 1000),
      coinName: coinName.trim().slice(0, 100),
      coinSymbol: coinSymbol.trim().slice(0, 20).toUpperCase(),
      coinData: cd as Record<string, number>,
    },
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse and validate input
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const validation = validateAndSanitize(body);
    if (!validation.valid || !validation.data) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { question, coinName, coinSymbol, coinData } = validation.data;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a cryptocurrency expert assistant. You are currently providing information about ${coinName} (${coinSymbol}).

Current coin data:
- Current Price: $${coinData.currentPrice}
- 24h Change: ${coinData.priceChange24h}%
- Market Cap: $${coinData.marketCap}
- 24h Volume: $${coinData.volume24h}
- Circulating Supply: ${coinData.circulatingSupply}
- Market Cap Rank: #${coinData.rank}
- All-Time High: $${coinData.ath}
- 24h High: $${coinData.high24h}
- 24h Low: $${coinData.low24h}

Answer questions about this cryptocurrency. Be concise, helpful, and accurate. If asked about price predictions, clarify that you cannot predict future prices but can discuss trends and market factors. Focus on providing factual information and educational content about the coin.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI gateway error:", response.status);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("coin-chat error:", e);
    return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
