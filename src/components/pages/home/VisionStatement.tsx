'use client';

import { useInView } from '../../../hooks/useInView';

export function VisionStatement() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="vision"
      ref={ref}
      className="relative bg-navy text-snow overflow-hidden py-[64px] md:py-[88px]"
      aria-labelledby="vision-heading"
    >
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16" style={{ zIndex: 1 }}>

        {/* Kicker */}
        <div style={fade(inView, 0)}>
          <span className="font-mono text-teal uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
            Vision &amp; Mission
          </span>
        </div>

        {/* Heading */}
        <div style={fade(inView, 40)} className="mt-4 max-w-[820px]">
          <h2
            id="vision-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
          >
            <span className="text-snow">A standards-setting position,</span>
            <br />
            <span className="text-snow">not a generalist practice.</span>
          </h2>
        </div>

        {/* Vision and Mission — side by side, equal-width columns divided by a rule (same device as Methodology's Strategic/Standards sections) */}
        <div className="mt-14 grid lg:grid-cols-[1fr_1px_1fr] gap-x-12 gap-y-10">

          <div style={fade(inView, 100)} className="flex gap-5 items-start">
            <NumeralMark>I</NumeralMark>
            <div className="flex flex-col pt-1 min-w-0">
              <span className="font-mono text-teal uppercase block mb-3" style={{ fontSize: '10px', letterSpacing: '0.16em' }}>
                Vision
              </span>
              <p
                className="font-display italic text-snow leading-[1.32] balance"
                style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)', fontWeight: 600 }}
              >
                To establish the regional standard for quantitative construction
                risk analysis in the New Jersey and New York metropolitan market,
                and to be the firm whose published benchmarks define how that
                standard is measured.
              </p>
              <p className="mt-4 font-sans text-slate leading-[1.6] pretty" style={{ fontSize: '13.5px' }}>
                The vision is deliberately not to be the largest advisory firm in
                the region, nor to serve the broadest range of clients. It is to
                earn a standards-setting position: the firm whose methodology,
                published research, and demonstrated outcomes become the
                reference point others are measured against. The position is
                earned through completed engagements, verifiable outcomes, and
                published work, in that order, and the firm does not describe
                itself as the standard until the market does.
              </p>
            </div>
          </div>

          <div className="hidden lg:block" style={{ background: '#28283E' }} aria-hidden />

          <div style={fade(inView, 180)} className="flex gap-5 items-start">
            <NumeralMark>II</NumeralMark>
            <div className="flex flex-col pt-1 min-w-0">
              <span className="font-mono text-teal uppercase block mb-3" style={{ fontSize: '10px', letterSpacing: '0.16em' }}>
                Mission
              </span>
              <p
                className="font-display italic text-snow leading-[1.32] balance"
                style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)', fontWeight: 600 }}
              >
                TRAVO helps sureties, construction lenders, litigation counsel,
                institutional owners, public agencies, and contractors in New
                Jersey and New York make better decisions, by applying rigorous
                quantitative risk methodology to the decisions where uncertainty
                most directly affects financial outcomes.
              </p>
              <p className="mt-4 font-sans text-slate leading-[1.6] pretty" style={{ fontSize: '13.5px' }}>
                The mission is operational, not aspirational: rigorous
                quantitative methodology, a deliberate NJ/NY regional focus, and
                the decision points, underwriting and monitoring, trend
                reassessment when projects drift, pre-claim positioning,
                contingency derivation, schedule baselines, and procurement,
                where the difference between rigorous analysis and intuition
                translates into millions of dollars.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function NumeralMark({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-display font-extrabold text-teal select-none shrink-0"
      style={{ fontSize: 'clamp(2.2rem, 3.4vw, 3rem)', lineHeight: 0.8 }}
      aria-hidden
    >
      {children}
    </span>
  );
}

function fade(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(24px)',
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}
