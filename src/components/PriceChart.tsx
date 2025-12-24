import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MarketChartData } from '@/lib/coingecko';

interface PriceChartProps {
  data: MarketChartData | null;
  isLoading: boolean;
  isPositive: boolean;
}

export function PriceChart({ data, isLoading, isPositive }: PriceChartProps) {
  const chartData = useMemo(() => {
    if (!data?.prices) return [];
    
    return data.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp),
      price,
    }));
  }, [data]);

  const color = isPositive ? 'hsl(142, 76%, 45%)' : 'hsl(0, 84%, 60%)';
  const gradientId = isPositive ? 'colorUp' : 'colorDown';

  if (isLoading) {
    return (
      <div className="h-64 glass-card rounded-xl flex items-center justify-center">
        <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data || chartData.length === 0) {
    return (
      <div className="h-64 glass-card rounded-xl flex items-center justify-center text-muted-foreground">
        No chart data available
      </div>
    );
  }

  return (
    <div className="h-64 glass-card rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={(date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            stroke="hsl(215, 20%, 55%)"
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            stroke="hsl(215, 20%, 55%)"
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222, 47%, 10%)',
              border: '1px solid hsl(222, 30%, 18%)',
              borderRadius: '8px',
              color: 'hsl(210, 40%, 98%)',
            }}
            formatter={(value: number) => [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`, 'Price']}
            labelFormatter={(date) => date.toLocaleString()}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
