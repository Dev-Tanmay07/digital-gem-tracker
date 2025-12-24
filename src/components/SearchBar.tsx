import { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { searchCoins, CoinSearchResult } from '@/lib/coingecko';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSelectCoin: (coinId: string) => void;
}

export function SearchBar({ onSelectCoin }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CoinSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.trim().length >= 1) {
        setIsLoading(true);
        try {
          const coins = await searchCoins(query);
          setResults(coins);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (coinId: string) => {
    onSelectCoin(coinId);
    setQuery('');
    setResults([]);
    setIsFocused(false);
  };

  const showDropdown = isFocused && (results.length > 0 || isLoading);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div
        className={cn(
          "relative flex items-center glass-card transition-all duration-300",
          isFocused && "ring-2 ring-primary/50 glow-primary"
        )}
      >
        <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search any cryptocurrency..."
          className="w-full py-4 pl-12 pr-12 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-4 p-1 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              <div className="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="ml-2">Searching...</span>
            </div>
          ) : (
            <ul className="divide-y divide-border/50">
              {results.map((coin) => (
                <li key={coin.id}>
                  <button
                    onClick={() => handleSelect(coin.id)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors text-left"
                  >
                    <img
                      src={coin.large}
                      alt={coin.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{coin.name}</p>
                      <p className="text-sm text-muted-foreground uppercase font-mono">
                        {coin.symbol}
                      </p>
                    </div>
                    {coin.market_cap_rank && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        #{coin.market_cap_rank}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
