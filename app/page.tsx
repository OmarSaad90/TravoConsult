import { Header }            from '@/components/layout/Header';
import { Footer }            from '@/components/layout/Footer';
import { Hero }               from '@/components/pages/home/Hero';
import { CoreBelief }         from '@/components/pages/home/CoreBelief';
import { VisionStatement }    from '@/components/pages/home/VisionStatement';
import { Positioning }        from '@/components/pages/home/Positioning';
import { ServicesOverview }   from '@/components/pages/home/ServicesOverview';
import { MethodologyIntro }   from '@/components/pages/home/MethodologyIntro';
import { RegionPrincipal }    from '@/components/pages/home/RegionPrincipal';
import { IndexTeaser }        from '@/components/pages/home/IndexTeaser';
import { ClosingCTA }         from '@/components/pages/home/ClosingCTA';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <main>
        <Hero />
        <CoreBelief />
        <VisionStatement />
        <Positioning />
        <ServicesOverview />
        <MethodologyIntro />
        <RegionPrincipal />
        <IndexTeaser />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
