import { PageLayout } from '@/components/PageLayout';

export default function Terms() {
  return (
    <PageLayout title="Terms of Service">
      <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

      <p>
        Please read these Terms of Service ("Terms") carefully before using CryptoPulse. By accessing or using our website, you agree to be bound by these Terms.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Use of Service</h2>
      <p>
        CryptoPulse provides cryptocurrency market data for informational purposes only. You agree to use the service only for lawful purposes and in accordance with these Terms.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">No Financial Advice</h2>
      <p>
        The information provided on CryptoPulse does not constitute financial advice, investment advice, trading advice, or any other sort of advice. You should not treat any of the website's content as such. We do not recommend that any cryptocurrency should be bought, sold, or held by you. Conduct your own due diligence and consult a financial advisor before making any investment decisions.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Accuracy of Information</h2>
      <p>
        While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, completeness, or reliability of any content on our website. Market data is sourced from third-party providers and may be delayed or inaccurate.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Limitation of Liability</h2>
      <p>
        CryptoPulse shall not be liable for any losses or damages arising from your use of our website or reliance on any information provided. This includes, but is not limited to, direct, indirect, incidental, or consequential damages.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Intellectual Property</h2>
      <p>
        All content on CryptoPulse, including text, graphics, logos, and software, is the property of CryptoPulse or its content suppliers and is protected by intellectual property laws.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Modifications</h2>
      <p>
        We reserve the right to modify these Terms at any time. Continued use of the website after changes constitutes acceptance of the new Terms.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Contact</h2>
      <p>
        If you have questions about these Terms, please contact us at support@cryptopulse.com.
      </p>
    </PageLayout>
  );
}
