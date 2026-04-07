import { PageLayout } from '@/components/PageLayout';

export default function About() {
  return (
    <PageLayout title="About CryptoPulse">
      <p>
        CryptoPulse is a real-time cryptocurrency tracking platform designed to help users stay informed about the latest market data. We provide up-to-date prices, market capitalizations, trading volumes, and historical charts for thousands of cryptocurrencies.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Our Mission</h2>
      <p>
        Our mission is to make cryptocurrency data accessible, easy to understand, and available to everyone — from beginners exploring digital assets for the first time to seasoned traders monitoring market movements. We believe that informed decisions start with reliable data.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">What We Offer</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Real-time price tracking for thousands of cryptocurrencies</li>
        <li>Interactive price charts with multiple timeframes (24h, 7d, 30d, 1y)</li>
        <li>Market statistics including market cap, volume, and circulating supply</li>
        <li>Trending coins to help you discover popular and emerging assets</li>
        <li>AI-powered Q&A to answer your questions about any cryptocurrency</li>
        <li>Clean, intuitive interface optimized for both desktop and mobile</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground mt-6">How It Works</h2>
      <p>
        Simply search for any cryptocurrency using our search bar. CryptoPulse instantly retrieves real-time data including current price, market cap, 24-hour volume, and price change percentages. You can also view interactive charts to analyze price movements over various time periods.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Data Sources</h2>
      <p>
        Our market data is sourced from the CoinGecko API, one of the most comprehensive and trusted cryptocurrency data providers in the industry. Data is refreshed regularly to ensure accuracy and timeliness.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Our Team</h2>
      <p>
        CryptoPulse is developed and maintained by a dedicated team of cryptocurrency enthusiasts and software developers who are passionate about making crypto data accessible to everyone.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Advertising</h2>
      <p>
        CryptoPulse is a free service supported by advertisements through Google AdSense. We carefully manage ad placements to ensure they do not disrupt your browsing experience. For more information about the ads displayed on our site, please see our{' '}
        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </PageLayout>
  );
}
