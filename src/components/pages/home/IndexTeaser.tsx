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
  const W = 300, H = 78, PAD_L = 8, PAD_R = 8, PAD_T = 8, PAD_B = 16;
  const xs = SPARK_DATA.map((_, i) => PAD_L + (i / (SPARK_DATA.length - 1)) * (W - PAD_L - PAD_R));
  const minV = Math.min(...SPARK_DATA.map(d => d.v)) - 4;
  const maxV = Math.max(...SPARK_DATA.map(d => d.v)) + 4;
  const ys = SPARK_DATA.map(d => PAD_T + (1 - (d.v - minV) / (maxV - minV)) * (H - PAD_T - PAD_B));

  const linePath = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  const fillPath = `${linePath} L${xs[xs.length - 1].toFixed(1)},${H - PAD_B} L${xs[0].toFixed(1)},${H - PAD_B} Z`;

  const peakIdx = SPARK_DATA.findIndex(d => d.v === Math.max(...SPARK_DATA.map(d => d.v)));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-label="NJ/NY regional cost overrun trend 2018 to 2024"
      className="w-full"
      style={{ display: 'block' }}
    >
      <path d={fillPath} fill="#3EA6A3" opacity="0.08" />

      {[25, 35].map(v => {
        const gy = PAD_T + (1 - (v - minV) / (maxV - minV)) * (H - PAD_T - PAD_B);
        return (
          <line key={v} x1={PAD_L} y1={gy} x2={W - PAD_R} y2={gy}
            stroke="#D5D9E8" strokeWidth="0.75" />
        );
      })}

      <path
        d={linePath}
        stroke="#3EA6A3"
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

      {xs.map((x, i) => (
        <circle
          key={i}
          cx={x} cy={ys[i]} r={i === peakIdx ? 3 : 2}
          fill={i === peakIdx ? '#9B2D30' : '#3EA6A3'}
          opacity={active ? 1 : 0}
          style={{ transition: `opacity 0.3s ${600 + i * 80}ms` }}
        />
      ))}

      <text
        x={xs[peakIdx]} y={ys[peakIdx] - 5}
        textAnchor="middle"
        fill="#9B2D30" fontSize="6.5"
        fontFamily="JetBrains Mono, monospace"
        opacity={active ? 0.85 : 0}
        style={{ transition: 'opacity 0.4s 1200ms' }}
      >
        {SPARK_DATA[peakIdx].v}%
      </text>

      <text
        x={xs[xs.length - 1] + 3} y={ys[ys.length - 1] + 1}
        fill="#2C5251" fontSize="6.5"
        fontFamily="JetBrains Mono, monospace"
        opacity={active ? 0.85 : 0}
        style={{ transition: 'opacity 0.4s 1400ms' }}
      >
        {SPARK_DATA[SPARK_DATA.length - 1].v}%
      </text>

      {xs.map((x, i) => (
        <text key={i} x={x} y={H - 2} textAnchor="middle"
          fill="#5F6884" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
          {SPARK_DATA[i].year}
        </text>
      ))}

      <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="#D5D9E8" strokeWidth="0.75" />
    </svg>
  );
}

const STREAMS = [
  'Peer-reviewed academic publication',
  'Industry-press publication',
  'Self-published Insights and Commentary',
  'The annual NJ/NY Construction Risk Index',
] as const;

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
      className="relative bg-canvas text-ink overflow-hidden pt-[56px] md:pt-[72px] pb-[44px] md:pb-[52px]"
      aria-labelledby="pub-heading"
    >

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16" style={{ zIndex: 1 }}>

        {/* Kicker */}
        <div style={fade(inView, 0)} className="flex items-center justify-between flex-wrap gap-3">
          <span className="font-mono text-forest uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
            Research &amp; Publication
          </span>
          <a
            href="/research"
            className="font-mono uppercase text-forest border-b border-forest/40 pb-[2px] hover:border-forest transition-colors"
            style={{ fontSize: '10px', letterSpacing: '0.12em' }}
          >
            View the research program →
          </a>
        </div>

        {/* Heading + lede */}
        <div style={fade(inView, 40)} className="mt-4 max-w-[820px]">
          <h2
            id="pub-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
          >
            <span className="text-ink">Publication is operational, not optional.</span>
          </h2>
          <p className="mt-5 font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '17px', maxWidth: '72ch' }}>
            TRAVO publishes: peer-reviewed research, industry-press articles,
            an annual regional benchmark, and insights from past projects, on
            a defined cadence regardless of how busy engagement work becomes.
            Publication is the mechanism by which the firm&rsquo;s
            standards-setting position is built and maintained.
          </p>
        </div>

        {/* Two cards — unequal widths, the Index card carries more weight */}
        <div className="mt-12 grid lg:grid-cols-[1fr_1.3fr] gap-[1px] bg-rule-l border border-rule-l">

          {/* Publishing Program card */}
          <div style={fade(inView, 100)} className="bg-canvas p-8 md:p-10 flex flex-col">
            <span className="font-mono uppercase text-forest" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
              Publishing Program
            </span>
            <h3
              className="mt-3 font-display font-bold text-ink leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)' }}
            >
              Four continuous streams
            </h3>
            <ul className="mt-5 space-y-3 flex-1">
              {STREAMS.map((s) => (
                <li key={s} className="flex items-start gap-3 pt-3 border-t border-rule-l first:pt-0 first:border-t-0">
                  <span className="font-sans text-ink-2 leading-[1.6]" style={{ fontSize: '14.5px' }}>{s}</span>
                </li>
              ))}
            </ul>
            <a
              href="/insights"
              className="mt-7 font-mono uppercase text-forest border-b border-forest/40 pb-[2px] hover:border-forest transition-colors self-start"
              style={{ fontSize: '10.5px', letterSpacing: '0.12em' }}
            >
              Explore the publishing program →
            </a>
          </div>

          {/* Planned Benchmark card */}
          <div style={fade(inView, 160)} className="relative bg-canvas p-8 md:p-10 flex flex-col overflow-hidden">
            <span className="font-mono uppercase text-forest" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
              Planned Benchmark
            </span>
            <h3
              className="mt-3 font-display font-bold text-ink leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)' }}
            >
              The NJ/NY Construction Risk Index
            </h3>
            <p className="mt-4 font-sans text-ink-2 leading-[1.7] pretty" style={{ fontSize: '14.5px' }}>
              A planned annual benchmark report on regional construction
              outcomes: schedule slippage rates, cost overrun distributions,
              contingency adequacy, and claim emergence patterns, segmented
              by project type and asset class.
            </p>

            <div className="mt-6 pt-5 border-t border-rule-l">
              <p className="font-mono uppercase font-semibold text-forest mb-2" style={{ fontSize: '9px', letterSpacing: '0.12em' }}>
                NJ/NY avg. cost overrun · 2018–2024 (illustrative)
              </p>
              <Sparkline active={inView} />
            </div>

            <div className="mt-6 pt-5 border-t border-rule-l grid grid-cols-2 gap-x-6 gap-y-4">
              {SCOPE.map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono uppercase font-semibold text-forest" style={{ fontSize: '9px', letterSpacing: '0.12em' }}>
                    {label}
                  </p>
                  <p className="font-sans text-ink mt-[3px] leading-snug" style={{ fontSize: '12.5px' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="/risk-index"
              className="mt-7 font-mono uppercase text-forest border-b border-forest/40 pb-[2px] hover:border-forest transition-colors self-start"
              style={{ fontSize: '10.5px', letterSpacing: '0.12em' }}
            >
              About the Risk Index →
            </a>
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
