import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowUp, ArrowDown, TrendingUp, BarChart3, Coins, Activity, X, RefreshCw } from 'lucide-react';
import { getCoinData, getMarketChart, formatPrice, formatMarketCap, formatNumber, CoinData, MarketChartData } from '@/lib/coingecko';
import { PriceChart } from './PriceChart';
import { cn } from '@/lib/utils';

interface CoinDetailsProps {
  coinId: string;
  onClose: () => void;
}

export function CoinDetails({ coinId, onClose }: CoinDetailsProps) {
  const [chartDays, setChartDays] = useState(7);

  const { data: coinData, isLoading: coinLoading, refetch: refetchCoin } = useQuery<CoinData>({
    queryKey: ['coin', coinId],
    queryFn: () => getCoinData(coinId),
    staleTime: 30000,
    refetchInterval: 30000,
  });

  const { data: chartData, isLoading: chartLoading } = useQuery<MarketChartData>({
    queryKey: ['chart', coinId, chartDays],
    queryFn: () => getMarketChart(coinId, chartDays),
    staleTime: 60000,
  });

  if (coinLoading) {
    return (
      <div className="glass-card rounded-2xl p-8 animate-pulse">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-secondary" />
          <div className="space-y-2">
            <div className="h-8 w-48 bg-secondary rounded" />
            <div className="h-4 w-24 bg-secondary rounded" />
          </div>
        </div>
        <div className="h-64 bg-secondary rounded-xl" />
      </div>
    );
  }

  if (!coinData) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">Failed to load coin data</p>
      </div>
    );
  }

  const { market_data } = coinData;
  const priceChange24h = market_data.price_change_percentage_24h;
  const isPositive = priceChange24h >= 0;

  const stats = [
    {
      label: 'Market Cap',
      value: formatMarketCap(market_data.market_cap.usd),
      icon: BarChart3,
    },
    {
      label: '24h Volume',
      value: formatMarketCap(market_data.total_volume.usd),
      icon: Activity,
    },
    {
      label: 'Circulating Supply',
      value: formatNumber(market_data.circulating_supply),
      icon: Coins,
    },
    {
      label: 'Rank',
      value: `#${market_data.market_cap_rank}`,
      icon: TrendingUp,
    },
  ];

  const priceChanges = [
    { label: '24h', value: market_data.price_change_percentage_24h },
    { label: '7d', value: market_data.price_change_percentage_7d },
    { label: '30d', value: market_data.price_change_percentage_30d },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={coinData.image.large}
            alt={coinData.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              {coinData.name}
              <span className="text-muted-foreground text-lg font-mono uppercase">
                {coinData.symbol}
              </span>
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-3xl md:text-4xl font-bold font-mono">
                {formatPrice(market_data.current_price.usd)}
              </span>
              <div
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-lg font-medium",
                  isPositive ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                )}
              >
                {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(priceChange24h).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => refetchCoin()}
          className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          title="Refresh data"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Chart Time Range */}
      <div className="flex gap-2 mb-4">
        {[1, 7, 30, 90, 365].map((days) => (
          <button
            key={days}
            onClick={() => setChartDays(days)}
            className={cn(
              "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
              chartDays === days
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
            )}
          >
            {days === 1 ? '24h' : days === 365 ? '1y' : `${days}d`}
          </button>
        ))}
      </div>

      {/* Chart */}
      <PriceChart data={chartData ?? null} isLoading={chartLoading} isPositive={isPositive} />

      {/* Price Changes */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {priceChanges.map(({ label, value }) => {
          const positive = value >= 0;
          return (
            <div key={label} className="bg-secondary/50 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">{label} Change</p>
              <p
                className={cn(
                  "text-lg font-bold font-mono flex items-center justify-center gap-1",
                  positive ? "text-success" : "text-destructive"
                )}
              >
                {positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(value).toFixed(2)}%
              </p>
            </div>
          );
        })}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-secondary/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </div>
            <p className="text-lg font-bold font-mono">{value}</p>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-secondary/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">24h High</p>
          <p className="text-lg font-bold font-mono text-success">
            {formatPrice(market_data.high_24h.usd)}
          </p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">24h Low</p>
          <p className="text-lg font-bold font-mono text-destructive">
            {formatPrice(market_data.low_24h.usd)}
          </p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">All-Time High</p>
          <p className="text-lg font-bold font-mono">{formatPrice(market_data.ath.usd)}</p>
          <p className="text-xs text-destructive">
            {market_data.ath_change_percentage.usd.toFixed(2)}% from ATH
          </p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Supply</p>
          <p className="text-lg font-bold font-mono">
            {market_data.total_supply ? formatNumber(market_data.total_supply) : '∞'}
          </p>
        </div>
      </div>
    </div>
  );
}
