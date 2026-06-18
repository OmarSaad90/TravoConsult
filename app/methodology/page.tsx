import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MethodologyPage } from '@/components/pages/methodology/MethodologyPage';

export const metadata: Metadata = {
  title: 'Methodology | Travo Risk Advisory',
  description:
    'AACE-grounded quantitative risk methodology: Monte Carlo simulation, probabilistic contingency derivation, and structured alternatives analysis for NJ/NY capital projects.',
};

export default function MethodologyRoute() {
  return (
    <div className="min-h-screen bg-navy text-snow">
      <Header />
      <main>
        <MethodologyPage />
      </main>
      <Footer />
    </div>
  );
}
