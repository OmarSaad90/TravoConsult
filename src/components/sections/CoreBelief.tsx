import { useInView } from '../../hooks/useInView';

// Real breakdown from N≈10,000 capital projects (industry benchmark, PPTX source)
const BUCKETS = [
  { pct: 8,  label: 'Under budget',  color: '#71D2CF' }, // teal
  { pct: 22, label: 'On budget',     color: '#3EA6A3' }, // teal-deep
  { pct: 28, label: 'Over < 30%',    color: '#E88060' }, // elevated
  { pct: 42, label: 'Over ≥ 30%',    color: '#FF5B5E' }, // coral
] as const;

export function CoreBelief() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id="belief"
      ref={ref}
      className="relative bg-navy text-snow overflow-hidden py-[120px] md:py-[152px]"
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

            {/* Percentage labels + bucket names above the bar */}
            <div className="flex overflow-visible mb-4">
              {BUCKETS.map((b) => (
                <div key={b.label} style={{ flex: b.pct }} className="overflow-visible pr-1">
                  <div
                    className="font-display font-extrabold leading-none"
                    style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: b.color }}
                  >
                    {b.pct}%
                  </div>
                  <div
                    className="font-mono uppercase mt-[6px] whitespace-nowrap"
                    style={{ fontSize: '8px', letterSpacing: '0.10em', color: b.color, opacity: 0.7 }}
                  >
                    {b.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Stacked bar — animates left to right on scroll */}
            <div className="flex gap-[2px]" style={{ height: '52px' }} aria-hidden>
              {BUCKETS.map((b, i) => (
                <div
                  key={b.label}
                  className="origin-left"
                  style={{
                    flex: b.pct,
                    backgroundColor: b.color,
                    transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                    transition: `transform 1.3s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`,
                  }}
                />
              ))}
            </div>

            {/* Source + insight line */}
            <div className="mt-5 pt-5 border-t border-rule-d space-y-2">
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
    transform:  inView ? 'none' : 'translateY(22px)',
    transition: `opacity 0.75s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms, transform 0.75s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
  };
}
