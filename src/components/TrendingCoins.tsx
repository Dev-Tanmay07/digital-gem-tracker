import { useQuery } from '@tanstack/react-query';
import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { getTrendingCoins, TrendingCoin } from '@/lib/coingecko';
import { cn } from '@/lib/utils';

interface TrendingCoinsProps {
  onSelectCoin: (coinId: string) => void;
}

export function TrendingCoins({ onSelectCoin }: TrendingCoinsProps) {
  const { data: trending, isLoading } = useQuery<TrendingCoin[]>({
    queryKey: ['trending'],
    queryFn: getTrendingCoins,
    staleTime: 60000,
    refetchInterval: 120000,
  });

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Trending Now
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary" />
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-secondary rounded" />
                  <div className="h-3 w-10 bg-secondary rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!trending || trending.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Trending Now
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {trending.map(({ item }) => {
          const priceChange = item.data?.price_change_percentage_24h?.usd ?? 0;
          const isPositive = priceChange >= 0;

          return (
            <button
              key={item.id}
              onClick={() => onSelectCoin(item.id)}
              className="glass-card rounded-xl p-4 hover:bg-secondary/50 transition-all duration-300 hover:scale-105 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={item.large}
                  alt={item.name}
                  className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform"
                />
                <div className="min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground uppercase font-mono">
                    {item.symbol}
                  </p>
                </div>
              </div>
              {item.data && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">
                    ${item.data.price.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </span>
                  <span
                    className={cn(
                      "flex items-center text-xs font-medium",
                      isPositive ? "text-success" : "text-destructive"
                    )}
                  >
                    {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(priceChange).toFixed(1)}%
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
