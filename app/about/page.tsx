import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AboutPage } from '@/components/pages/about/AboutPage';

export const metadata: Metadata = {
  title: 'About | Travo Risk Advisory',
  description:
    'An independent quantitative risk advisory practice built around a single discipline. Founded by Dr. Karim S. Karam — the emerging regional standard for construction risk analysis in the NJ/NY metropolitan market.',
};

export default function AboutRoute() {
  return (
    <div className="min-h-screen bg-navy text-snow">
      <Header />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </div>
  );
}
