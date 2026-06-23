'use client';

import { useInView } from '../../../hooks/useInView';

/* ── Sparkline: NJ/NY regional cost overrun trend 2018–2024 ── */
// Fictional but plausible regional data points (% average overrun)
const SPARK_DATA = [
  { year: '18', v: 24 },
  { year: '19', v: 28 },
  { year: '20', v: 38 }, // COVID spike
  { year: '21', v: 42 },
  { year: '22', v: 36 },
  { year: '23', v: 31 },
  { year: '24', v: 33 },
];

function Sparkline({ active }: { active: boolean }) {
  const W = 210, H = 64, PAD_L = 8, PAD_R = 8, PAD_T = 8, PAD_B = 16;
  const xs = SPARK_DATA.map((_, i) => PAD_L + (i / (SPARK_DATA.length - 1)) * (W - PAD_L - PAD_R));
  const minV = Math.min(...SPARK_DATA.map(d => d.v)) - 4;
  const maxV = Math.max(...SPARK_DATA.map(d => d.v)) + 4;
  const ys = SPARK_DATA.map(d => PAD_T + (1 - (d.v - minV) / (maxV - minV)) * (H - PAD_T - PAD_B));

  const linePath = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  const fillPath = `${linePath} L${xs[xs.length - 1].toFixed(1)},${H - PAD_B} L${xs[0].toFixed(1)},${H - PAD_B} Z`;

  // Highest point (COVID spike) — index 3
  const peakIdx = SPARK_DATA.findIndex(d => d.v === Math.max(...SPARK_DATA.map(d => d.v)));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-label="NJ/NY regional cost overrun trend 2018 to 2024"
      className="w-full"
      style={{ maxWidth: '220px', display: 'block' }}
    >
      {/* Fill area */}
      <path d={fillPath} fill="#71D2CF" opacity="0.06" />

      {/* Grid lines — horizontal */}
      {[25, 35].map(v => {
        const gy = PAD_T + (1 - (v - minV) / (maxV - minV)) * (H - PAD_T - PAD_B);
        return (
          <line key={v} x1={PAD_L} y1={gy} x2={W - PAD_R} y2={gy}
            stroke="#28283E" strokeWidth="0.75" />
        );
      })}

      {/* Sparkline — draws in on scroll */}
      <path
        d={linePath}
        stroke="#71D2CF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: active ? 0 : 1,
          transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1) 200ms',
        }}
      />

      {/* Data points */}
      {xs.map((x, i) => (
        <circle
          key={i}
          cx={x} cy={ys[i]} r={i === peakIdx ? 3 : 2}
          fill={i === peakIdx ? '#FF5B5E' : '#71D2CF'}
          opacity={active ? 1 : 0}
          style={{ transition: `opacity 0.3s ${600 + i * 80}ms` }}
        />
      ))}

      {/* Peak annotation */}
      <text
        x={xs[peakIdx]} y={ys[peakIdx] - 5}
        textAnchor="middle"
        fill="#FF5B5E" fontSize="6"
        fontFamily="JetBrains Mono, monospace"
        opacity={active ? 0.8 : 0}
        style={{ transition: 'opacity 0.4s 1200ms' }}
      >
        {SPARK_DATA[peakIdx].v}%
      </text>

      {/* Latest value */}
      <text
        x={xs[xs.length - 1] + 3} y={ys[ys.length - 1] + 1}
        fill="#71D2CF" fontSize="6"
        fontFamily="JetBrains Mono, monospace"
        opacity={active ? 0.8 : 0}
        style={{ transition: 'opacity 0.4s 1400ms' }}
      >
        {SPARK_DATA[SPARK_DATA.length - 1].v}%
      </text>

      {/* Year labels */}
      {xs.map((x, i) => (
        <text key={i} x={x} y={H - 2} textAnchor="middle"
          fill="#828DA6" fontSize="6" fontFamily="JetBrains Mono, monospace">
          {SPARK_DATA[i].year}
        </text>
      ))}

      {/* Baseline */}
      <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="#28283E" strokeWidth="0.75" />
    </svg>
  );
}

const SCOPE = [
  { label: 'Publication', value: 'Annual, with quarterly updates' },
  { label: 'Segmentation', value: 'Project type · Asset class · Method' },
  { label: 'Geographic scope', value: 'New Jersey · New York Metro' },
  { label: 'Use case', value: 'Owner benchmarking · Contractor calibration' },
] as const;

export function IndexTeaser() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id="research"
      ref={ref}
      className="relative bg-navy text-snow overflow-hidden py-[56px] md:py-[80px]"
      aria-labelledby="index-heading"
    >
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Publication masthead — full width */}
        <div
          style={fade(inView, 0)}
          className="flex items-center justify-between border-t border-b border-rule-d py-3 mb-10"
        >
          <span className="font-mono uppercase text-haze" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
            Flagship Research
          </span>
          <span className="font-mono uppercase text-haze" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
            Vol. 01 · Annual Benchmark · NJ / NY Metro
          </span>
        </div>

        {/* Main layout: volume number left, content right */}
        <div className="grid md:grid-cols-[260px_1fr] gap-12 md:gap-20 items-start">

          {/* Volume number column */}
          <div style={fade(inView, 80)}>
            <div
              className="font-display font-extrabold leading-none tracking-display text-teal"
              style={{ fontSize: 'clamp(4rem, 9vw, 7rem)' }}
              aria-hidden
            >
              01
            </div>
            <div
              className="mt-4 font-mono uppercase text-haze leading-relaxed"
              style={{ fontSize: '9px', letterSpacing: '0.14em' }}
            >
              NJ / NY<br />Construction<br />Risk Index
            </div>

            {/* Regional overrun sparkline */}
            <div className="mt-6 pt-5 border-t border-rule-d">
              <p className="font-mono uppercase text-haze mb-3" style={{ fontSize: '7.5px', letterSpacing: '0.12em' }}>
                NJ/NY avg. cost overrun · 2018–2024
              </p>
              <Sparkline active={inView} />
            </div>
          </div>

          {/* Content */}
          <div>
            <div style={fade(inView, 120)}>
              <h2
                id="index-heading"
                className="font-display font-extrabold leading-[0.97] tracking-display balance"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}
              >
                <span className="text-snow">Regional construction risk,</span>
                <br />
                <span className="text-teal">quantified annually.</span>
              </h2>

              <p className="mt-5 font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '17px', maxWidth: '56ch' }}>
                An annual benchmark on regional construction outcomes, segmented by
                project type and asset class. The Index gives owners and contractors
                an empirical reference calibrated to the market they actually build
                in, rather than national averages.
              </p>
              <p className="mt-4 font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '17px', maxWidth: '56ch' }}>
                Travo's ambition: to make this the most-cited regional benchmark for
                construction risk in the New Jersey and New York market.
              </p>
            </div>

            {/* Scope metadata — 2-column grid */}
            <div className="mt-8 pt-6 border-t border-rule-d grid sm:grid-cols-2 gap-x-10 gap-y-6">
              {SCOPE.map(({ label, value }, i) => (
                <div key={label} style={fade(inView, 200 + i * 50)}>
                  <p className="font-mono uppercase text-haze" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
                    {label}
                  </p>
                  <p className="font-sans text-snow mt-[5px] leading-snug" style={{ fontSize: '14.5px' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div style={fade(inView, 360)} className="mt-7">
              <a
                href="/contact"
                className="font-mono uppercase text-teal border border-teal/60 px-6 py-[13px] hover:bg-teal hover:text-navy transition-all duration-200 inline-block"
                style={{ fontSize: '11px', letterSpacing: '0.16em' }}
              >
                Register Interest in the Index
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
