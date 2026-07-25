import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EngagementsPage } from '@/components/pages/engagements/EngagementsPage';

export const metadata: Metadata = {
  title: 'Engagements | Travo Risk Advisory',
  description:
    'How a Travo engagement is shaped: a decision to inform, a documented methodology, a quantified result, and principal sign-off on every deliverable.',
};

export default function EngagementsRoute() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <main>
        <EngagementsPage />
      </main>
      <Footer />
    </div>
  );
}
