'use client';

import { useInView } from '../../../hooks/useInView';

const COMPONENTS = [
  {
    name: 'Monte Carlo simulation',
    desc: 'Probabilistic cost and schedule distributions in place of single points.',
  },
  {
    name: 'Sensitivity analysis',
    desc: 'Ranked identification of the drivers that actually move the outcome.',
  },
  {
    name: 'Contingency derivation',
    desc: 'Defensible P50/P80-based recommendations with capital implications made explicit.',
  },
  {
    name: 'Principal review & sign-off',
    desc: "Every deliverable carries the principal's name and credentials.",
  },
] as const;

export function MethodologyIntro() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id="methodology"
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden py-[56px] md:py-[72px]"
      style={{ borderTop: '1px solid #D5D9E8' }}
      aria-labelledby="method-heading"
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16" style={{ zIndex: 1 }}>

        {/* Kicker */}
        <div style={fade(inView, 0)}>
          <span className="font-mono text-forest uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
            Methodology
          </span>
        </div>

        <div className="mt-4 grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-16 items-start">

          {/* Methodology components — 2x2, list leads on the left this time */}
          <div style={fade(inView, 60)} className="grid grid-cols-2 gap-x-6 gap-y-8 lg:order-1">
            {COMPONENTS.map((c, i) => {
              const closing = i === COMPONENTS.length - 1;
              return (
                <div
                  key={c.name}
                  style={fade(inView, 120 + i * 70)}
                  className={closing ? 'col-span-2 pt-6 border-t border-forest/30' : ''}
                >
                  <h3
                    className="font-display font-bold text-ink leading-tight tracking-tight"
                    style={{ fontSize: closing ? 'clamp(1.15rem, 1.7vw, 1.35rem)' : 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
                  >
                    {c.name}
                  </h3>
                  <p className="mt-1.5 font-sans text-ink-2 leading-[1.6] pretty" style={{ fontSize: closing ? '14px' : '12.5px', maxWidth: closing ? '44ch' : undefined }}>
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Text column */}
          <div style={fade(inView, 100)} className="lg:order-2">
            <h2
              id="method-heading"
              className="font-display font-extrabold leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
            >
              <span className="text-ink">Experience-based risk</span>
              <br />
              <span className="text-ink">intelligence, quantified.</span>
            </h2>

            <div className="mt-6 space-y-4 max-w-[62ch]">
              <p className="font-sans text-ink-2 leading-[1.75] pretty" style={{ fontSize: '16px' }}>
                TRAVO&rsquo;s methodology is grounded in quantitative analysis
                but is not limited to it. The firm draws on an extensive base
                of completed project audits, post-project reviews, historical
                performance data, and lessons learned: the input layer that
                transforms Monte Carlo simulation from a generic statistical
                exercise into a context-specific assessment of the risks that
                actually matter on a given project.
              </p>
              <p className="font-sans text-ink-2 leading-[1.75] pretty" style={{ fontSize: '16px' }}>
                Every quantitative output, every P50, every P80, every
                contingency recommendation, is derivable from documented
                methodology, traceable inputs, and validated assumptions.
                Where it strengthens the process, TRAVO applies AI-supported
                analysis to surface recurring risk categories across
                historical data; such techniques remain strictly subordinate
                to expert judgment, and the principal personally reviews and
                signs every analytical product.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="/methodology"
                className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200 inline-block"
              >
                Read the Methodology
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function fade(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(26px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}
