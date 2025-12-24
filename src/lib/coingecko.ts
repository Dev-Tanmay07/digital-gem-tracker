const BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CoinSearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  large: string;
  market_cap_rank: number | null;
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    market_cap_rank: number;
    circulating_supply: number;
    total_supply: number | null;
    ath: { usd: number };
    ath_change_percentage: { usd: number };
  };
  description: { en: string };
}

export interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    thumb: string;
    small: string;
    large: string;
    price_btc: number;
    score: number;
    data: {
      price: number;
      price_change_percentage_24h: { usd: number };
      market_cap: string;
      sparkline: string;
    };
  };
}

export interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export async function searchCoins(query: string): Promise<CoinSearchResult[]> {
  if (!query.trim()) return [];
  
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search coins');
  
  const data = await response.json();
  return data.coins.slice(0, 10);
}

export async function getCoinData(coinId: string): Promise<CoinData> {
  const response = await fetch(
    `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
  );
  if (!response.ok) throw new Error('Failed to fetch coin data');
  
  return response.json();
}

export async function getTrendingCoins(): Promise<TrendingCoin[]> {
  const response = await fetch(`${BASE_URL}/search/trending`);
  if (!response.ok) throw new Error('Failed to fetch trending coins');
  
  const data = await response.json();
  return data.coins.slice(0, 6);
}

export async function getMarketChart(coinId: string, days: number = 7): Promise<MarketChartData> {
  const response = await fetch(
    `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );
  if (!response.ok) throw new Error('Failed to fetch market chart');
  
  return response.json();
}

export function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  } else if (price >= 1) {
    return price.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4 
    });
  } else {
    return price.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8 
    });
  }
}

export function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else {
    return `$${value.toLocaleString()}`;
  }
}

export function formatNumber(value: number): string {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else {
    return value.toLocaleString();
  }
}
