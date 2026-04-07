import { PageLayout } from '@/components/PageLayout';

export default function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

      <p>
        CryptoPulse ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
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
        <li>Device type and screen resolution</li>
        <li>Geographic location (country/region level only)</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground mt-6">How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Operate, maintain, and improve our website</li>
        <li>Analyze usage patterns to enhance user experience</li>
        <li>Monitor and prevent abuse of our services</li>
        <li>Display relevant advertisements through Google AdSense</li>
        <li>Understand aggregate trends and site performance</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground mt-6">Google AdSense and Advertising</h2>
      <p>
        We use Google AdSense to display advertisements on our website. Google AdSense is a third-party advertising service provided by Google LLC. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to our website or other websites on the Internet.
      </p>
      <p>
        Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{' '}
        <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
      </p>
      <p>
        For more information about how Google uses data when you use our site, please visit{' '}
        <a href="https://policies.google.com/technologies/partner-sites" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google's Privacy & Terms page</a>.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Cookies</h2>
      <p>
        Cookies are small text files stored on your device by your web browser. Our website uses the following types of cookies:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong className="text-foreground">Essential cookies:</strong> Required for basic site functionality such as remembering your cookie consent preference.</li>
        <li><strong className="text-foreground">Analytics cookies:</strong> Help us understand how visitors interact with our website by collecting information anonymously.</li>
        <li><strong className="text-foreground">Advertising cookies:</strong> Used by Google AdSense to display relevant advertisements and track ad performance.</li>
      </ul>
      <p>
        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our site may not function properly.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Third-Party Services</h2>
      <p>
        We use the following third-party services that may collect information:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong className="text-foreground">CoinGecko API</strong> — for cryptocurrency market data</li>
        <li><strong className="text-foreground">Google AdSense</strong> — for displaying advertisements</li>
      </ul>
      <p>
        These third parties have their own privacy policies governing the use of the information they collect.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Data Security</h2>
      <p>
        We use administrative, technical, and physical security measures to protect your information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Your Rights</h2>
      <p>
        Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete your information. If you are in the European Economic Area (EEA), you have additional rights under GDPR. Contact us if you wish to exercise any of these rights.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Children's Privacy</h2>
      <p>
        Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Changes to This Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated date. You are advised to review this Privacy Policy periodically for any changes.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at{' '}
        <a href="mailto:support@cryptopulse.com" className="text-primary hover:underline">support@cryptopulse.com</a>.
      </p>
    </PageLayout>
  );
}
