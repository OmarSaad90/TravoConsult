'use client';

import { useInView } from '../../../hooks/useInView';

export function ClosingCTA() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden pt-[44px] md:pt-[52px] pb-[48px] md:pb-[64px]"
      style={{ borderTop: '1px solid #D5D9E8' }}
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center" style={{ zIndex: 1 }}>

        {/* Kicker */}
        <div style={fade(inView, 0)}>
          <span className="font-mono text-forest uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
            When to Engage TRAVO
          </span>
        </div>

        {/* Heading */}
        <div style={fade(inView, 40)} className="mt-3 max-w-[760px]">
          <h2
            id="cta-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)' }}
          >
            <span className="text-ink">Defined decision points.</span>
            <br />
            <span className="text-ink">A defined way in.</span>
          </h2>
        </div>

        {/* Lede */}
        <div style={fade(inView, 90)} className="mt-5 max-w-[68ch]">
          <p className="font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '17px' }}>
            TRAVO engagements attach to specific decisions: underwriting or
            monitoring a bonded or financed project, reassessing a project
            that has begun to drift, forecasting cost or schedule at
            completion, preparing for a potential claim, reviewing a
            contractor&rsquo;s risk submission, setting a project
            contingency, leveling bids, comparing strategic alternatives,
            commissioning an independent review of a major project proposal,
            capturing lessons learned, benchmarking a portfolio, or
            implementing a risk methodology.
          </p>
        </div>

        {/* CTAs */}
        <div style={fade(inView, 150)} className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="/contact"
            className="font-mono text-[11px] tracking-label uppercase bg-coral text-navy px-8 py-[15px] hover:bg-coral/90 transition-colors duration-200"
          >
            Discuss a Project
          </a>
          <a
            href="/engagements"
            className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200"
          >
            How Engagements Work
          </a>
        </div>

      </div>
    </section>
  );
}

function fade(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(24px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}
