import { PageLayout } from '@/components/PageLayout';

export default function About() {
  return (
    <PageLayout title="About CryptoPulse">
      <p>
        CryptoPulse is a real-time cryptocurrency tracking platform designed to help users stay informed about the latest market data. We provide up-to-date prices, market capitalizations, trading volumes, and historical charts for thousands of cryptocurrencies.
      </p>
      <h2 className="text-xl font-semibold text-foreground mt-6">Our Mission</h2>
      <p>
        Our mission is to make cryptocurrency data accessible, easy to understand, and available to everyone — from beginners exploring digital assets for the first time to seasoned traders monitoring market movements.
      </p>
      <h2 className="text-xl font-semibold text-foreground mt-6">What We Offer</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Real-time price tracking for thousands of cryptocurrencies</li>
        <li>Interactive price charts with multiple timeframes</li>
        <li>Market statistics including market cap, volume, and supply data</li>
        <li>Trending coins to help you discover popular assets</li>
        <li>AI-powered Q&A to answer your questions about any cryptocurrency</li>
      </ul>
      <h2 className="text-xl font-semibold text-foreground mt-6">Data Sources</h2>
      <p>
        Our market data is sourced from the CoinGecko API, one of the most comprehensive and trusted cryptocurrency data providers in the industry. Data is refreshed regularly to ensure accuracy.
      </p>
    </PageLayout>
  );
}
