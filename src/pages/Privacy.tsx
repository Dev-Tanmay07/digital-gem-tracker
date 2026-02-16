import { PageLayout } from '@/components/PageLayout';

export default function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

      <p>
        CryptoPulse ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Information We Collect</h2>
      <p>
        We do not require users to create an account or provide personal information to use CryptoPulse. We may collect the following non-personal information automatically:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Pages visited and time spent on those pages</li>
        <li>Referring website addresses</li>
        <li>IP address (anonymized where possible)</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground mt-6">How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Operate, maintain, and improve our website</li>
        <li>Analyze usage patterns to enhance user experience</li>
        <li>Monitor and prevent abuse of our services</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground mt-6">Third-Party Services</h2>
      <p>
        We use third-party services that may collect information used to identify you:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong className="text-foreground">CoinGecko API</strong> — for cryptocurrency market data</li>
        <li><strong className="text-foreground">Google AdSense</strong> — for displaying advertisements (see Advertising section)</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground mt-6">Advertising</h2>
      <p>
        We may use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Cookies</h2>
      <p>
        Our website may use cookies to enhance your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Children's Privacy</h2>
      <p>
        Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Changes to This Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated date.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at support@cryptopulse.com.
      </p>
    </PageLayout>
  );
}
