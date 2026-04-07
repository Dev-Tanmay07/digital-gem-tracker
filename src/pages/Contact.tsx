import { PageLayout } from '@/components/PageLayout';

export default function Contact() {
  return (
    <PageLayout title="Contact Us">
      <p>
        We'd love to hear from you. Whether you have a question, feedback, a bug report, or a suggestion, feel free to reach out using the information below.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Get in Touch</h2>
      <p>
        <strong className="text-foreground">Email:</strong>{' '}
        <a href="mailto:support@cryptopulse.com" className="text-primary hover:underline">support@cryptopulse.com</a>
      </p>
      <p>
        We aim to respond to all inquiries within 48 hours during business days.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Feedback & Suggestions</h2>
      <p>
        Your feedback helps us improve CryptoPulse. If you encounter any issues, have feature requests, or want to share your experience, please don't hesitate to reach out via email. We value every piece of feedback we receive.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Advertising Inquiries</h2>
      <p>
        For questions related to advertisements displayed on our website, please contact us at the email address above or visit{' '}
        <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>{' '}
        to manage your ad preferences.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Report an Issue</h2>
      <p>
        If you notice incorrect data, broken functionality, or any other issue on our website, please let us know by emailing us with a description of the problem and the page where you encountered it.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-6">Legal Inquiries</h2>
      <p>
        For legal matters, DMCA notices, or privacy-related requests, please email us at{' '}
        <a href="mailto:support@cryptopulse.com" className="text-primary hover:underline">support@cryptopulse.com</a>{' '}
        with "Legal" in the subject line.
      </p>
    </PageLayout>
  );
}
