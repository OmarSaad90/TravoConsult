import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RiskIndexPage } from '@/components/pages/risk-index/RiskIndexPage';

export const metadata: Metadata = {
  title: 'NJ/NY Construction Risk Index | Travo Risk Advisory',
  description:
    'The first probabilistic benchmark for capital project risk outcomes in the New Jersey and New York metropolitan region. Ten visualization templates. Annual edition.',
};

export default function RiskIndexRoute() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <main>
        <RiskIndexPage />
      </main>
      <Footer />
    </div>
  );
}
