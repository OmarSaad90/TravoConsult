import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactPage } from '@/components/pages/contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact | Travo Risk Advisory',
  description:
    'Start a conversation with Travo Risk Advisory. Tell us about your project and the decision in front of you.',
};

export default function ContactRoute() {
  return (
    <div className="min-h-screen bg-navy text-snow">
      <Header />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </div>
  );
}
