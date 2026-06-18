import { Header }          from '@/components/layout/Header';
import { Footer }          from '@/components/layout/Footer';
import { Hero }            from '@/components/pages/home/Hero';
import { Positioning }     from '@/components/pages/home/Positioning';
import { CoreBelief }      from '@/components/pages/home/CoreBelief';
import { WhatWeDo }        from '@/components/pages/home/WhatWeDo';
import { ServicesOverview } from '@/components/pages/home/ServicesOverview';
import { WhyTravo }        from '@/components/pages/home/WhyTravo';
import { IndexTeaser }     from '@/components/pages/home/IndexTeaser';
import { VisionStatement } from '@/components/pages/home/VisionStatement';
import { ClosingCTA }      from '@/components/pages/home/ClosingCTA';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy text-snow">
      <Header />
      <main>
        <Hero />
        <Positioning />
        <CoreBelief />
        <WhatWeDo />
        <ServicesOverview />
        <WhyTravo />
        <IndexTeaser />
        <VisionStatement />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
