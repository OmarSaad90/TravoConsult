import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FoundersLetterPage } from '@/components/pages/founders-letter/FoundersLetterPage';

export const metadata: Metadata = {
  title: "Founder's Letter | Travo Risk Advisory",
  description: 'A letter from Dr. Karim S. Karam, Principal of Travo Risk Advisory.',
};

export default function FoundersLetterRoute() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <main>
        <FoundersLetterPage />
      </main>
      <Footer />
    </div>
  );
}
