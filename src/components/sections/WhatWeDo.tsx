import { useInView } from '../../hooks/useInView';

const DECISION_POINTS = [
  {
    title: 'Procurement Decisions',
    desc: 'Quantifying the cost and schedule risk embedded in delivery method, contract structure, and bid selection; before commitments are locked in.',
  },
  {
    title: 'Contingency Derivation',
    desc: 'Replacing intuition-driven contingencies with probabilistic analysis derived from documented risk drivers and defensible confidence levels.',
  },
  {
    title: 'Schedule Baselines',
    desc: 'Testing baselines against the uncertainty they actually carry, exposing where a plan is fragile and how much float is real.',
  },
  {
    title: 'Mid-Project Trend Analysis',
    desc: 'Reassessing the trend early when a project begins to drift, while the decision can still change the outcome.',
  },
  {
    title: 'Pre-Claim Assessment',
    desc: 'An independent, quantified view of exposure and entitlement before a dispute hardens into a claim.',
  },
] as const;

export function WhatWeDo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.06 });

  return (
    <section
      id="values"
      ref={ref}
      className="bg-canvas text-ink py-[96px] md:py-[120px]"
      aria-labelledby="wwd-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end mb-12">
          <div style={fade(inView, 0)}>
            <h2
              id="wwd-heading"
              className="font-display font-extrabold leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
            >
              <span className="text-ink">Where the analysis is worth</span>
              <br />
              <span className="text-forest">millions, not thousands.</span>
            </h2>
            <p className="mt-4 font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '16px', maxWidth: '58ch' }}>
              Five decision points across the project lifecycle where the gap between
              rigorous probabilistic analysis and intuition has a direct financial cost.
            </p>
          </div>
          <div style={fade(inView, 80)}>
            <a
              href="#services"
              className="font-mono text-[10px] uppercase tracking-label text-forest border-b border-forest/40 pb-[2px] hover:border-forest transition-colors duration-200 whitespace-nowrap"
            >
              Full service catalog →
            </a>
          </div>
        </div>

        {/* 2-column grid of decision points */}
        <div
          className="grid sm:grid-cols-2 border border-rule-l"
          role="list"
          aria-label="Decision points"
        >
          {DECISION_POINTS.map((pt, i) => (
            <div
              key={pt.title}
              role="listitem"
              style={fade(inView, 100 + i * 55)}
              className={`px-7 py-8 border-rule-l hover:bg-canvas-1 transition-colors duration-200 cursor-default group
                ${i % 2 === 0 ? 'border-r' : ''}
                ${i >= 2 ? 'border-t' : ''}
                ${i === 4 ? 'sm:col-span-2 border-r-0' : ''}
              `}
            >
              {/* Number + title row */}
              <div className="flex items-baseline gap-4 mb-3">
                <span
                  className="font-display font-extrabold text-forest leading-none tracking-display shrink-0"
                  style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="font-display font-bold text-ink leading-snug tracking-tight"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
                >
                  {pt.title}
                </h3>
              </div>
              <p
                className="font-sans text-ink-2 leading-[1.68] pretty pl-[calc(clamp(1.6rem,2.8vw,2.4rem)+1rem)]"
                style={{ fontSize: '15px', maxWidth: i === 4 ? '64ch' : undefined }}
              >
                {pt.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function fade(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(18px)',
    transition: `opacity 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
  };
}
