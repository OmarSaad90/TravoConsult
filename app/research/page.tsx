import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ResearchPage } from '@/components/pages/research/ResearchPage';

export const metadata: Metadata = {
  title: 'Research | Travo Risk Advisory',
  description:
    "Travo's applied research program: the compounding loop between engagements and research, four active lines of inquiry, and the academic platform at Stevens Institute of Technology.",
};

export default function ResearchRoute() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <main>
        <ResearchPage />
      </main>
      <Footer />
    </div>
  );
}
