import { Header }          from './components/layout/Header';
import { Footer }          from './components/layout/Footer';
import { Hero }            from './components/sections/Hero';
import { Positioning }     from './components/sections/Positioning';
import { CoreBelief }      from './components/sections/CoreBelief';
import { WhatWeDo }        from './components/sections/WhatWeDo';
import { ServicesOverview } from './components/sections/ServicesOverview';
import { WhyTravo }        from './components/sections/WhyTravo';
import { IndexTeaser }     from './components/sections/IndexTeaser';
import { VisionStatement } from './components/sections/VisionStatement';
import { ClosingCTA }      from './components/sections/ClosingCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-navy text-snow">
      <Header />

      <main>
        {/* Home */}
        <Hero />

        {/* About intro — positioning */}
        <Positioning />

        {/* Core belief — dark band */}
        <CoreBelief />

        {/* What we do — decision points */}
        <WhatWeDo />

        {/* Services overview — three categories */}
        <ServicesOverview />

        {/* Why Travo — three differentiators */}
        <WhyTravo />

        {/* The NJ/NY Risk Index teaser */}
        <IndexTeaser />

        {/* Vision statement */}
        <VisionStatement />

        {/* Closing CTA — dark band */}
        <ClosingCTA />
      </main>

      <Footer />
    </div>
  );
}
