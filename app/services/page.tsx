import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServicesPage } from '@/components/pages/services/ServicesPage';

export const metadata: Metadata = {
  title: 'Services | Travo Risk Advisory',
  description:
    'A productized catalog of 11 defined quantitative construction risk advisory services, organized to the project lifecycle. NJ/NY metropolitan region.',
};

export default function ServicesRoute() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <main>
        <ServicesPage />
      </main>
      <Footer />
    </div>
  );
}
