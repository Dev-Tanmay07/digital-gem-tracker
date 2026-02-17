import { useState } from 'react';
import { Coins, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { CoinDetails } from '@/components/CoinDetails';
import { TrendingCoins } from '@/components/TrendingCoins';
import { InFeedAd } from '@/components/AdUnit';

const Index = () => {
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl glow-primary animate-float">
              <Coins className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">Crypto</span>
              <span className="text-foreground">Pulse</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Real-time cryptocurrency data at your fingertips
          </p>
        </header>

        {/* Search */}
        <SearchBar onSelectCoin={setSelectedCoin} />

        {/* Selected Coin Details */}
        {selectedCoin && (
          <div className="mt-8">
            <CoinDetails coinId={selectedCoin} onClose={() => setSelectedCoin(null)} />
          </div>
        )}

        {/* In-Feed Ad */}
        {!selectedCoin && <InFeedAd />}

        {/* Trending Coins */}
        {!selectedCoin && <TrendingCoins onSelectCoin={setSelectedCoin} />}

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground space-y-3">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
          </div>
          <p>Powered by CoinGecko API • Data refreshes every 30 seconds</p>
          <p>© {new Date().getFullYear()} CryptoPulse. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
