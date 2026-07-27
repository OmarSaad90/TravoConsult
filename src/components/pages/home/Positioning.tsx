'use client';

import { useInView } from '../../../hooks/useInView';

const CREDENTIALS = [
  {
    title: 'Graduate-level methodology',
    desc: 'Monte Carlo based cost and schedule simulation, sensitivity analysis, and probabilistic contingency derivation, grounded in AACE Recommended Practices, peer-reviewed academic research, and established quantitative standards.',
    footer: 'AACE RP · Peer-Reviewed Standards',
  },
  {
    title: 'Senior operator experience',
    desc: 'Operating experience at scale in heavy civil construction delivery: the base of completed project audits, post-project reviews, and lessons learned that separates analysis that is academically sound from analysis that has survived contact with a live project.',
    footer: 'Heavy Civil Delivery At Scale',
  },
  {
    title: 'An active research program',
    desc: "Published regional benchmarks against which TRAVO's analyses are continuously validated: the mechanism by which a standards-setting position is built and maintained.",
    footer: 'NJ/NY Construction Risk Index',
  },
] as const;

export function Positioning() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.06 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden pt-[52px] md:pt-[72px] pb-[40px] md:pb-[52px]"
      aria-labelledby="pos-heading"
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16" style={{ zIndex: 1 }}>

        {/* Top rule */}
        <div
          className="w-full h-px bg-rule-l mb-12 origin-left"
          style={{
            transform: inView ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)',
          }}
          aria-hidden
        />

        {/* Kicker */}
        <div style={fade(inView, 0)}>
          <span className="font-mono text-forest uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
            Positioning
          </span>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Text column — DOM first for mobile reading order, right column on desktop */}
          <div className="lg:col-start-2 lg:row-start-1" style={fade(inView, 80)}>
            <h2
              id="pos-heading"
              className="font-display font-extrabold leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)' }}
            >
              <span className="text-ink">A specialty practice, not a generalist consultancy.</span>
            </h2>

            <div className="mt-6 space-y-4 max-w-[64ch]">
              <p className="font-sans text-ink-2 leading-[1.75] pretty" style={{ fontSize: '17px' }}>
                The construction advisory market is crowded with generalists
                who provide some risk work alongside many other services.
                There are very few firms that practice quantitative risk
                methodology with rigor, fewer still that combine it with
                senior operator credibility, and almost none that maintain
                the academic standards required to defend their analyses
                under serious scrutiny. TRAVO occupies that intersection.
              </p>
            </div>
          </div>

          {/* Diagram — DOM second, left column on desktop, bleeds into the gutter for asymmetry */}
          <div className="relative lg:col-start-1 lg:row-start-1 lg:w-[112%] lg:-ml-[12%]" style={fade(inView, 0)}>

            {/* Floating header */}
            <div className="relative flex items-center justify-between gap-4 mb-4">
              <span className="font-mono font-semibold text-forest uppercase" style={{ fontSize: '9.5px', letterSpacing: '0.18em', whiteSpace: 'nowrap' }}>
                Methodology Comparison
              </span>
              <span className="font-mono font-semibold text-ink-3 uppercase shrink-0" style={{ fontSize: '9px', letterSpacing: '0.14em' }}>
                Conceptual
              </span>
            </div>

            {/* Comparison SVG — full-width, no container box */}
            <svg
              viewBox="0 0 360 90"
              aria-label="Comparison of single-point estimate vs probability distribution"
              className="w-full"
              fill="none"
            >
              {/* LEFT: single point estimate */}
              <line x1="10" y1="76" x2="148" y2="76" stroke="#D5D9E8" strokeWidth="1" />
              <path
                d="M79,76 L79,30"
                stroke="#71D2CF" strokeWidth="2"
                pathLength="1"
                style={{ strokeDasharray: 1, strokeDashoffset: inView ? 0 : 1, transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1) 300ms' }}
              />
              <circle cx="79" cy="76" r="4" fill="#71D2CF" />
              <circle cx="79" cy="30" r="3" fill="#71D2CF" opacity={inView ? 0.6 : 0}
                style={{ transition: 'opacity 0.4s 900ms' }} />
              <text x="79" y="22" textAnchor="middle" fill="#2C5251" fontSize="8" fontFamily="JetBrains Mono, monospace"
                opacity={inView ? 0.8 : 0} style={{ transition: 'opacity 0.4s 1000ms' }}>
                $42M
              </text>

              {/* CENTER DIVIDER */}
              <line x1="180" y1="16" x2="180" y2="76" stroke="#D5D9E8" strokeWidth="1" strokeDasharray="2,4" />

              {/* RIGHT: probability distribution */}
              <path
                d="M200,75 L215,73.5 L230,68 L237.5,62 L245,55 L252.5,46 L260,38 L267.5,32 L275,30 L282.5,32 L290,38 L297.5,46 L305,55 L312.5,62 L320,68 L335,73.5 L350,75 L350,76 L200,76 Z"
                fill="#71D2CF" opacity="0.07"
              />
              <path
                d="M244,56 L252.5,46 L260,38 L267.5,32 L275,30 L282.5,32 L290,38 L297.5,46 L305,55 L305,76 L244,76 Z"
                fill="#71D2CF" opacity="0.09"
              />
              <path
                d="M200,75 L215,73.5 L230,68 L237.5,62 L245,55 L252.5,46 L260,38 L267.5,32 L275,30 L282.5,32 L290,38 L297.5,46 L305,55 L312.5,62 L320,68 L335,73.5 L350,75"
                stroke="#71D2CF" strokeWidth="2" strokeLinecap="round"
                pathLength="1"
                style={{ strokeDasharray: 1, strokeDashoffset: inView ? 0 : 1, transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) 600ms' }}
              />
              <line x1="200" y1="76" x2="350" y2="76" stroke="#D5D9E8" strokeWidth="1" />

              {/* P markers */}
              {[
                { x: 244, y: 56, label: 'P10', c: '#3EA6A3', val: '$36M', delay: 1400 },
                { x: 275, y: 30, label: 'P50', c: '#71D2CF', val: '$42M', delay: 1600 },
                { x: 305, y: 55, label: 'P80', c: '#FFB9BB', val: '$51M', delay: 1800 },
              ].map(({ x, y, label, c, val, delay }) => (
                <g key={label} opacity={inView ? 1 : 0} style={{ transition: `opacity 0.5s ${delay}ms` }}>
                  <line x1={x} y1={y} x2={x} y2="76" stroke={c} strokeWidth="0.75" strokeDasharray="2,3" opacity="0.7" />
                  <circle cx={x} cy={y} r="2.5" fill={c} />
                  <text x={x} y={y - 5} textAnchor="middle" fill="#2C5251" fontSize="7.5" fontFamily="JetBrains Mono, monospace">{label}</text>
                  <text x={x} y={y - 14} textAnchor="middle" fill="#2C5251" fontSize="7" fontFamily="JetBrains Mono, monospace" opacity="0.7">{val}</text>
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="flex mt-3 pt-3 border-t border-rule-l">
              <div style={{ flex: 148 }}>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-data text-ink-3 block">Single estimate</span>
                <span className="font-mono text-[8px] font-semibold text-ink-3 block mt-[2px]">Industry default</span>
              </div>
              <div style={{ flex: 52 }} />
              <div style={{ flex: 150 }}>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-data text-forest block">P10 · P50 · P80</span>
                <span className="font-mono text-[8px] font-semibold text-ink-3 block mt-[2px]">Travo approach</span>
              </div>
            </div>
          </div>

        </div>

        {/* Credential cards */}
        <div
          className="mt-16 grid md:grid-cols-3 border-t border-rule-l"
          role="list"
          aria-label="Credentials"
        >
          {CREDENTIALS.map((c, i) => (
            <div
              key={c.title}
              role="listitem"
              style={fade(inView, 120 + i * 80)}
              className={[
                'pt-8 pb-2',
                i < 2 ? 'md:pr-10 md:border-r md:border-rule-l' : '',
                i > 0 ? 'md:pl-10' : '',
              ].join(' ')}
            >
              <h3
                className="font-display font-bold text-ink leading-[1.0] tracking-display"
                style={{ fontSize: `clamp(${1.35 - i * 0.12}rem, ${2.2 - i * 0.2}vw, ${1.65 - i * 0.15}rem)` }}
              >
                {c.title}
              </h3>
              <div className="mt-3 h-px w-10 bg-teal opacity-60" />
              <p className="mt-4 font-sans text-ink-2 leading-[1.68] pretty" style={{ fontSize: '14.5px' }}>
                {c.desc}
              </p>
              <p className="mt-5 font-mono uppercase text-forest" style={{ fontSize: '8.5px', letterSpacing: '0.12em' }}>
                {c.footer}
              </p>
            </div>
          ))}
        </div>

        {/* Closing paragraph */}
        <div style={fade(inView, 380)} className="mt-12 pt-10 border-t border-rule-l max-w-[76ch]">
          <p className="font-sans text-ink-2 leading-[1.75] pretty" style={{ fontSize: '16px' }}>
            Unlike traditional construction management consultants, TRAVO does
            not augment client staff or provide lifecycle project services. We
            provide independent, methodologically rigorous risk analysis at
            the specific decision points where uncertainty has the largest
            financial impact: underwriting and monitoring, mid-project trend
            analysis, pre-claim assessment, contingency derivation, and
            procurement. The analysis is the method. A better-optimized
            capital decision, a right-sized contingency, a value-adjusted
            procurement, a defensible reserve, is the result.
          </p>
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
