'use client';

import { useInView } from '../../../hooks/useInView';

export function Positioning() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden py-[52px] md:py-[72px]"
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

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Text column — DOM first for mobile reading order, right column on desktop */}
          <div className="lg:col-start-2 lg:row-start-1" style={fade(inView, 80)}>
            <h2
              id="pos-heading"
              className="font-display font-extrabold leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)' }}
            >
              <span className="text-ink">A specialist practice, </span>
              <span className="text-forest">not</span>
              <span className="text-ink"> a generalist consultancy.</span>
            </h2>

            <div className="mt-6 space-y-4 max-w-[64ch]">
              <p className="font-sans text-ink-2 leading-[1.75] pretty" style={{ fontSize: '17px' }}>
                Travo works on a deliberately narrow problem: the risks that
                turn capital projects into cost overruns, schedule delays, and
                disputes. We identify those risks, quantify them with rigorous
                probabilistic methodology, and translate the analysis into
                decisions our clients can defend.
              </p>
              <p className="font-sans text-ink-2 leading-[1.75] pretty" style={{ fontSize: '17px' }}>
                Every engagement has quantitative risk analysis at its core.
                Work that falls outside that focus, we decline.
              </p>
            </div>
          </div>

          {/* Diagram — DOM second, left column on desktop, no border box */}
          <div className="lg:col-start-1 lg:row-start-1" style={fade(inView, 0)}>

            {/* Floating header */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-forest uppercase" style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
                Methodology Comparison
              </span>
              <span className="font-mono text-ink-3 uppercase" style={{ fontSize: '9px', letterSpacing: '0.14em' }}>
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
                <span className="font-mono text-[8px] uppercase tracking-data text-ink-3 block">Single estimate</span>
                <span className="font-mono text-[7.5px] text-ink-3 block mt-[2px]">Industry default</span>
              </div>
              <div style={{ flex: 52 }} />
              <div style={{ flex: 150 }}>
                <span className="font-mono text-[8px] uppercase tracking-data text-forest block">P10 · P50 · P80</span>
                <span className="font-mono text-[7.5px] text-ink-3 block mt-[2px]">Travo approach</span>
              </div>
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
