'use client';

import { useInView } from '../../../hooks/useInView';

// Real breakdown from N≈10,000 capital projects (industry benchmark, Flyvbjerg et al.)
const BUCKETS = [
  { pct: 8,  label: 'Under budget',  color: '#71D2CF' },
  { pct: 22, label: 'On budget',     color: '#3EA6A3' },
  { pct: 28, label: 'Over < 30%',    color: '#FFB9BB' },
  { pct: 42, label: 'Over ≥ 30%',    color: '#FF5B5E' },
] as const;

const DATA_POINTS = [
  { label: 'Large projects overrun', value: '~9 of 10' },
  { label: 'Avg. overrun (Flyvbjerg et al.)', value: '20–30%' },
  { label: 'Avg. NA dispute (Arcadis 2025)', value: '$60.1M' },
  { label: 'Disputed capex (HKA CRUX)', value: '~1/3' },
] as const;

const REPLACEMENTS = [
  { from: 'Heat maps', to: 'Probability distributions' },
  { from: 'Single points', to: 'P10 / P50 / P80' },
  { from: 'Intuition', to: 'Derived contingency' },
] as const;

export function CoreBelief() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.06 });

  return (
    <section
      id="belief"
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden py-[56px] md:py-[72px]"
      style={{ borderTop: '1px solid #D5D9E8' }}
      aria-labelledby="belief-heading"
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16" style={{ zIndex: 1 }}>

        {/* Kicker */}
        <div style={fade(inView, 0)}>
          <span className="font-mono text-forest uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
            The Construction-Risk Problem
          </span>
        </div>

        {/* Heading */}
        <div style={fade(inView, 40)} className="mt-4 max-w-[820px]">
          <h2
            id="belief-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)' }}
          >
            <span className="text-ink">Most construction project failures are quantifiable in advance.</span>
          </h2>
        </div>

        {/* Asymmetric row: intro paragraph left, headline proof right */}
        <div className="mt-8 grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">

          <div style={fade(inView, 90)}>
            <p className="font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '17px', maxWidth: '62ch' }}>
              Peer-reviewed research on capital project performance, most prominently
              Flyvbjerg and colleagues, finds cost overruns on roughly nine of ten
              large projects, with average overruns in the range of 20 to 30 percent
              and a heavy tail of far worse outcomes. The pattern is durable across
              sectors, regions, and decades. It is not a problem of effort, talent,
              or capital availability. It is a problem of methodology. Regionally,
              the current numbers agree: Arcadis&rsquo; 2025 Global Construction
              Disputes Report puts the average North American construction dispute
              at $60.1 million, and HKA&rsquo;s CRUX program finds disputed sums
              averaging roughly one-third of capital expenditure on affected
              projects, with payment and cash-flow disputes rising fastest in the
              Americas. Every figure TRAVO publishes, including this one, is
              traceable to its source and quoted within the bounds of what the
              source actually found.
            </p>
          </div>

          {/* Outcome distribution visualization — the intro's proof, not an afterthought */}
          <div style={fade(inView, 170)}>

            {/* Two headline statistics */}
            <div className="flex gap-10 mb-7">
              <div>
                <div
                  className="font-display font-extrabold leading-none"
                  style={{ fontSize: 'clamp(3.4rem, 5.6vw, 4.8rem)', color: '#FF5B5E' }}
                >
                  70%
                </div>
                <div
                  className="font-mono uppercase font-semibold mt-[7px] text-forest"
                  style={{ fontSize: '9px', letterSpacing: '0.16em' }}
                >
                  overrun budget
                </div>
              </div>
              <div className="self-end pb-[3px]">
                <div
                  className="font-display font-extrabold leading-none"
                  style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)', color: '#9B2D30' }}
                >
                  ≈30%
                </div>
                <div
                  className="font-mono uppercase font-semibold mt-[7px] text-forest"
                  style={{ fontSize: '9px', letterSpacing: '0.16em' }}
                >
                  avg. size of overrun
                </div>
              </div>
            </div>

            {/* Outcome distribution — horizontal stacked bar */}
            <div aria-hidden role="presentation">
              <div className="flex overflow-hidden" style={{ height: '32px' }}>
                {BUCKETS.map((b, i) => (
                  <div
                    key={b.label}
                    style={{
                      flex: b.pct,
                      backgroundColor: b.color,
                      transformOrigin: 'center bottom',
                      transform: inView ? 'scaleY(1)' : 'scaleY(0)',
                      opacity: inView ? 1 : 0,
                      transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${200 + i * 80}ms, opacity 0.4s ease-out ${200 + i * 80}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="flex mt-[7px]">
                {BUCKETS.map((b) => (
                  <div key={b.label} style={{ flex: b.pct }} className="overflow-hidden pr-1">
                    <div
                      className="font-display font-bold leading-none"
                      style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)', color: b.color === '#71D2CF' || b.color === '#3EA6A3' ? '#2C5251' : b.color }}
                    >
                      {b.pct}%
                    </div>
                    <div
                      className="font-mono uppercase font-semibold mt-[4px] text-forest"
                      style={{ fontSize: '8px', letterSpacing: '0.08em', opacity: 0.85, whiteSpace: 'nowrap' }}
                    >
                      {b.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source + insight line */}
            <div className="mt-5 pt-4 border-t border-rule-l space-y-2">
              <p className="font-mono uppercase font-semibold text-forest" style={{ fontSize: '9px', letterSpacing: '0.10em' }}>
                Distribution of capital project cost outcomes · N≈10,000 projects · Flyvbjerg et al., peer-reviewed benchmark
              </p>
              <p className="font-sans text-ink-2 leading-snug" style={{ fontSize: '13.5px' }}>
                <span className="text-ink font-semibold">70%</span> of capital projects overrun their budget.
                More than half overrun by{' '}
                <span className="text-coral font-semibold">30% or more.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Data point strip — the divider between proof and argument */}
        <div
          style={fade(inView, 240)}
          className="mt-12 py-6 border-y border-rule-l grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5"
        >
          {DATA_POINTS.map((d) => (
            <div key={d.label}>
              <div className="font-display font-extrabold text-forest leading-none" style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.35rem)' }}>
                {d.value}
              </div>
              <div className="font-mono uppercase font-semibold text-forest mt-[6px]" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>
                {d.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two arguments, side by side */}
        <div className="mt-12 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-0">

          <div style={fade(inView, 300)}>
            <h3
              className="font-display font-bold text-ink leading-[0.98] tracking-display balance"
              style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.05rem)' }}
            >
              Where qualitative methods fall short
            </h3>
            <div className="mt-3 h-px w-10 bg-forest opacity-50" />
            <p className="mt-4 font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15.5px', maxWidth: '54ch' }}>
              The risks that drive cost overruns, schedule delays, and disputes
              are usually visible at the preconstruction stage and then through
              the project lifecycle. They are rarely modeled with sufficient
              rigor to inform decisions before they materialize. The industry
              routinely defaults to qualitative heat maps, single-point cost
              estimates, and intuition-driven contingencies: methods that
              obscure rather than illuminate the actual distribution of likely
              outcomes.
            </p>
            <p className="mt-4 font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15.5px', maxWidth: '54ch' }}>
              TRAVO exists to close that gap. Through methodology, not
              advocacy. Through quantitative analysis, not narrative
              reassurance. Through independence, not alignment with any single
              party&rsquo;s commercial position.
            </p>
          </div>

          <div style={fade(inView, 360)} className="lg:pl-12 lg:border-l lg:border-rule-l">
            <h3
              className="font-display font-bold text-ink leading-[0.98] tracking-display balance"
              style={{ fontSize: 'clamp(1.25rem, 1.9vw, 1.6rem)' }}
            >
              Why precision optimizes value
            </h3>
            <div className="mt-3 h-px w-10 bg-forest opacity-50" />
            <p className="mt-4 font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15.5px', maxWidth: '52ch' }}>
              Closing the gap is not only safer. It is more valuable. Capital
              held against risk that never materializes is capital that could
              have built scope, funded reserves, or earned a return elsewhere,
              while an under-held contingency exposes the project to outcomes
              it cannot absorb. Precision is what converts risk analysis into
              decisions that optimize value.
            </p>

            <ul
              className="mt-6 space-y-3"
              aria-label="Qualitative methods TRAVO replaces"
            >
              {REPLACEMENTS.map((r) => (
                <li key={r.from} className="flex items-center gap-3 font-mono uppercase font-semibold" style={{ fontSize: '11px', letterSpacing: '0.06em' }}>
                  <span className="text-ink-3">{r.from}</span>
                  <span className="text-forest" aria-hidden>→</span>
                  <span className="text-forest">{r.to}</span>
                </li>
              ))}
            </ul>
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
