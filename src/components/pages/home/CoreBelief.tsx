'use client';

import { useInView } from '../../../hooks/useInView';

// Real breakdown from N≈10,000 capital projects (industry benchmark, PPTX source)
const BUCKETS = [
  { pct: 8,  label: 'Under budget',  color: '#71D2CF' },
  { pct: 22, label: 'On budget',     color: '#3EA6A3' },
  { pct: 28, label: 'Over < 30%',    color: '#FFB9BB' },
  { pct: 42, label: 'Over ≥ 30%',    color: '#FF5B5E' },
] as const;


export function CoreBelief() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id="belief"
      ref={ref}
      className="relative bg-navy text-snow overflow-hidden py-[80px] md:py-[96px]"
      aria-labelledby="belief-heading"
    >
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16" style={{ zIndex: 1 }}>

        {/* Heading */}
        <div style={fade(inView, 0)} className="max-w-[820px]">
          <h2
            id="belief-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)' }}
          >
            <span className="text-snow">Most project failures are not a problem</span>
            <br className="hidden md:block" />
            <span className="text-snow"> of effort, talent, or capital. They are a </span>
            <span className="text-teal">problem of methodology.</span>
          </h2>
        </div>

        {/* Two-column: body copy left, distribution chart right */}
        <div className="mt-14 grid md:grid-cols-[1fr_480px] gap-12 md:gap-20 items-start">

          {/* Body copy */}
          <div style={fade(inView, 100)} className="space-y-5">
            <p className="font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '17px', maxWidth: '64ch' }}>
              The risks behind cost overruns are usually visible at procurement and
              throughout delivery. They are simply rarely modeled with enough rigor to
              inform a decision before they materialize.
            </p>
            <p className="font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '17px', maxWidth: '64ch' }}>
              The industry defaults to color-coded heat maps, single-point estimates,
              and intuition-driven contingencies: methods that obscure the real range
              of likely outcomes rather than reveal them. Travo exists to close that gap.
            </p>
          </div>

          {/* Outcome distribution visualization */}
          <div style={fade(inView, 160)}>

            {/* Two headline statistics */}
            <div className="flex gap-12 mb-8">
              <div>
                <div
                  className="font-display font-extrabold leading-none"
                  style={{ fontSize: 'clamp(3.2rem, 5.2vw, 4.4rem)', color: '#FF5B5E' }}
                >
                  70%
                </div>
                <div
                  className="font-mono uppercase mt-[7px] text-haze"
                  style={{ fontSize: '8px', letterSpacing: '0.16em' }}
                >
                  overrun budget
                </div>
              </div>
              <div>
                <div
                  className="font-display font-extrabold leading-none"
                  style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', color: '#FFB9BB' }}
                >
                  ≈30%
                </div>
                <div
                  className="font-mono uppercase mt-[7px] text-haze"
                  style={{ fontSize: '8px', letterSpacing: '0.16em' }}
                >
                  avg. size of overrun
                </div>
              </div>
            </div>

            {/* Outcome distribution — horizontal stacked bar */}
            <div aria-hidden role="presentation">
              <div className="flex overflow-hidden" style={{ height: '36px' }}>
                {BUCKETS.map((b, i) => (
                  <div
                    key={b.label}
                    style={{
                      flex: b.pct,
                      backgroundColor: b.color,
                      transformOrigin: 'center bottom',
                      transform: inView ? 'scaleY(1)' : 'scaleY(0)',
                      opacity: inView ? 1 : 0,
                      transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${160 + i * 80}ms, opacity 0.4s ease-out ${160 + i * 80}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="flex mt-[7px]">
                {BUCKETS.map((b) => (
                  <div key={b.label} style={{ flex: b.pct }} className="overflow-hidden pr-1">
                    <div
                      className="font-display font-bold leading-none"
                      style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.3rem)', color: b.color }}
                    >
                      {b.pct}%
                    </div>
                    <div
                      className="font-mono uppercase mt-[4px] text-haze"
                      style={{ fontSize: '7px', letterSpacing: '0.08em', opacity: 0.65, whiteSpace: 'nowrap' }}
                    >
                      {b.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source + insight line */}
            <div className="mt-6 pt-5 border-t border-rule-d space-y-2">
              <p className="font-mono uppercase text-haze" style={{ fontSize: '8.5px', letterSpacing: '0.10em' }}>
                Distribution of capital project cost outcomes · N≈10,000 projects · Industry benchmark
              </p>
              <p className="font-sans text-slate leading-snug" style={{ fontSize: '14px' }}>
                <span className="text-snow font-semibold">70%</span> of capital projects overrun their budget.
                More than half overrun by{' '}
                <span className="text-coral font-semibold">30% or more.</span>
              </p>
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
