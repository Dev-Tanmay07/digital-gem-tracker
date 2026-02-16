import { PageLayout } from '@/components/PageLayout';

export default function Contact() {
  return (
    <PageLayout title="Contact Us">
      <p>
        We'd love to hear from you. Whether you have a question, feedback, or a suggestion, feel free to reach out using the information below.
      </p>
      <h2 className="text-xl font-semibold text-foreground mt-6">Get in Touch</h2>
      <p>
        <strong className="text-foreground">Email:</strong> support@cryptopulse.com
      </p>
      <p>
        We aim to respond to all inquiries within 48 hours.
      </p>
      <h2 className="text-xl font-semibold text-foreground mt-6">Feedback</h2>
      <p>
        Your feedback helps us improve. If you encounter any issues, have feature requests, or want to share your experience, please don't hesitate to reach out via email.
      </p>
    </PageLayout>
  );
}
