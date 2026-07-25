import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InsightsPage } from '@/components/pages/insights/InsightsPage';

export const metadata: Metadata = {
  title: 'Insights | Travo Risk Advisory',
  description:
    'Three streams of research and publishing from Travo Risk Advisory: peer-reviewed work in ASCE JCEM, bylined industry writing, and the inaugural NJ/NY Construction Risk Index.',
};

export default function InsightsRoute() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <main>
        <InsightsPage />
      </main>
      <Footer />
    </div>
  );
}
