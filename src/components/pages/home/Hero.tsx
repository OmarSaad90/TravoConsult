'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCountUp } from '../../../hooks/useCountUp';

/* ── Ticker ─────────────────────────────────────────── */
const TICKER_ITEMS = [
  'QUANTITATIVE CONSTRUCTION RISK ADVISORY',
  'MONTE CARLO SIMULATION',
  'P10 · P50 · P80',
  'NJ / NY METROPOLITAN REGION',
  'INDEPENDENT ANALYSIS',
  'AACE RECOMMENDED PRACTICES',
  'DEFENSIBLE CONTINGENCY',
  'PROBABILISTIC COST MODELING',
];

/* ── Risk Gauge ──────────────────────────────────────── */
const GAUGE_LEVELS = [
  { label: 'Managed',  color: '#71D2CF' }, // Tidal Aqua
  { label: 'Baseline', color: '#C5ECFE' }, // Glacier Sky
  { label: 'Monitor',  color: '#FFB9BB' }, // Blush Rose
  { label: 'Elevated', color: '#FF8B8D' }, // Coral Ember ~75%
  { label: 'Critical', color: '#FF5B5E' }, // Coral Ember 100
];

function RiskGauge({ mounted }: { mounted: boolean }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(() => setIdx(i => (i + 1) % GAUGE_LEVELS.length), 950);
    return () => clearInterval(t);
  }, [mounted]);

  return (
    <div className="px-6 md:px-12 lg:px-16 pb-0">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="rounded-full inline-block"
          style={{
            width: '6px', height: '6px',
            backgroundColor: GAUGE_LEVELS[idx].color,
            boxShadow: `0 0 7px ${GAUGE_LEVELS[idx].color}`,
            transition: 'background-color 0.4s, box-shadow 0.4s',
          }}
        />
        <span className="font-mono text-haze uppercase" style={{ fontSize: '8.5px', letterSpacing: '0.16em' }}>
          Risk Posture
        </span>
      </div>
      <div className="flex gap-[2px]" style={{ height: '38px' }}>
        {GAUGE_LEVELS.map((l, i) => (
          <div
            key={l.label}
            className="flex-1"
            style={{
              backgroundColor: i <= idx ? l.color : 'rgba(255,255,255,0.05)',
              transition: 'background-color 0.45s ease',
              boxShadow: i === idx ? `0 0 12px ${l.color}55` : 'none',
            }}
          />
        ))}
      </div>
      <div className="flex gap-[2px] mt-[6px]">
        {GAUGE_LEVELS.map((l, i) => (
          <div key={l.label} className="flex-1">
            <span
              className="font-mono uppercase block"
              style={{
                fontSize: '8px', letterSpacing: '0.07em',
                color: i <= idx ? l.color : '#8A95B2',
                fontWeight: i === idx ? '600' : '400',
                transition: 'color 0.4s, font-weight 0.4s',
              }}
            >
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Distribution panel curve ────────────────────────── */
const PW = 340, PH = 110;

function buildPanelCurve(w: number, h: number, n = 90): string {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t   = i / n;
    const xn  = t * 8 - 4;
    const yRaw = Math.exp(-xn * xn / 2);
    pts.push(`${i === 0 ? 'M' : 'L'}${(t * w).toFixed(1)},${(h - yRaw * h * 0.84).toFixed(1)}`);
  }
  return pts.join(' ');
}

// Percentile x-positions (slightly right-skewed feel: P50 slightly right of center)
const P10_T = 0.34;
const P50_T = 0.51;
const P80_T = 0.66;

function percentilePoint(t: number, w: number, h: number) {
  const xn   = t * 8 - 4;
  const yRaw = Math.exp(-xn * xn / 2);
  return { x: t * w, y: h - yRaw * h * 0.84 };
}

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const curvePath = useMemo(() => buildPanelCurve(PW, PH), []);
  const fillPath  = useMemo(() => `${curvePath} L${PW},${PH} L0,${PH} Z`, [curvePath]);

  const p10 = percentilePoint(P10_T, PW, PH);
  const p50 = percentilePoint(P50_T, PW, PH);
  const p80 = percentilePoint(P80_T, PW, PH);

  // Confidence band fill P10→P80
  const bandPath = useMemo(() => {
    const pts: string[] = [];
    const n = 90;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      if (t < P10_T || t > P80_T) continue;
      const xn   = t * 8 - 4;
      const yRaw = Math.exp(-xn * xn / 2);
      pts.push(`${pts.length === 0 ? 'M' : 'L'}${(t * PW).toFixed(1)},${(PH - yRaw * PH * 0.84).toFixed(1)}`);
    }
    pts.push(`L${p80.x.toFixed(1)},${PH} L${p10.x.toFixed(1)},${PH} Z`);
    return pts.join(' ');
  }, [p10.x, p80.x]);

  // Count-up values (in $100K units, displayed as $XX.XM)
  const v10 = useCountUp(148, 1600, mounted); // $14.8M
  const v50 = useCountUp(214, 1800, mounted); // $21.4M
  const v80 = useCountUp(266, 2000, mounted); // $26.6M

  const reveal = (delay: number): React.CSSProperties => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? 'none' : 'translateY(28px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      id="home"
      className="relative bg-navy overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Introduction"
    >
      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      {/* ── Ticker strip ───────────────────────────────── */}
      <div
        className="relative border-b border-rule-d overflow-hidden"
        style={{ height: '34px', zIndex: 2 }}
        aria-hidden
      >
        <div
          className="marquee-track flex items-center h-full gap-0 whitespace-nowrap"
          style={{ animation: 'marquee 38s linear infinite', width: 'max-content' }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center">
              <span
                className="font-mono uppercase text-haze"
                style={{ fontSize: '9.5px', letterSpacing: '0.18em', paddingLeft: '28px' }}
              >
                {item}
              </span>
              <span
                className="font-mono text-teal mx-3"
                style={{ fontSize: '7px', opacity: 0.5 }}
              >
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main content ───────────────────────────────── */}
      <div
        className="relative"
        style={{ zIndex: 2, minHeight: 'calc(100svh - 34px - 56px)', display: 'flex', flexDirection: 'column' }}
      >
        {/* Two-column content area */}
        <div className="flex-1 max-w-site mx-auto w-full px-6 md:px-12 lg:px-16 py-8 md:py-10 grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* Left — headline + body + CTAs */}
          <div>
            <div style={reveal(60)}>
              <span className="font-mono text-[10px] font-medium tracking-label uppercase text-teal">
                Quantitative Construction Risk Advisory
                <span className="mx-[10px]" style={{ opacity: 0.35 }}>·</span>
                New Jersey &amp; New York Metro
              </span>
            </div>

            <h1
              className="mt-8 font-display font-extrabold tracking-display balance"
              style={{ fontSize: 'clamp(2.6rem, 4.8vw, 4.4rem)', lineHeight: 0.95 }}
            >
              <span className="block text-snow" style={reveal(160)}>Most construction</span>
              <span className="block text-snow" style={reveal(230)}>failures are</span>
              <span className="block text-teal" style={reveal(310)}>quantifiable</span>
              <span className="block text-snow" style={reveal(370)}>in advance.</span>
            </h1>

            <div style={reveal(470)} className="mt-8">
              <p
                className="font-sans text-slate leading-[1.78] pretty"
                style={{ fontSize: '17px', maxWidth: '50ch' }}
              >
                A specialty advisory practice that quantifies cost, schedule, and
                commercial risk at the decisions where uncertainty most directly
                drives project outcomes, serving owners, public agencies,
                contractors, sureties, and lenders delivering complex capital
                projects across the region.
              </p>
            </div>

            <div style={reveal(560)} className="mt-9 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="font-mono text-[11px] tracking-label uppercase bg-teal text-navy px-7 py-[14px] hover:bg-teal-deep transition-colors duration-200"
              >
                Start a Conversation
              </a>
              <a
                href="#services"
                className="font-mono text-[11px] tracking-label uppercase text-teal border border-teal/50 px-7 py-[14px] hover:border-teal hover:bg-teal/[0.08] transition-all duration-200"
              >
                View Service Catalog
              </a>
            </div>
          </div>

          {/* Right — distribution output panel */}
          <div
            style={{
              ...reveal(280),
              position: 'relative',
            }}
          >
            <div
              className="border border-rule-d"
              style={{
                background: '#252538',
                padding: '24px',
              }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-teal uppercase" style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
                  Cost-at-Completion Forecast
                </span>
                <span className="font-mono text-haze uppercase" style={{ fontSize: '9px', letterSpacing: '0.14em' }}>
                  Sample Output
                </span>
              </div>

              {/* Distribution SVG */}
              <svg
                viewBox={`0 0 ${PW} ${PH}`}
                className="w-full"
                style={{ display: 'block', overflow: 'visible' }}
                fill="none"
                aria-label="Probability distribution of project cost outcomes"
              >
                {/* Full fill */}
                <path d={fillPath} fill="#71D2CF" opacity="0.06" />

                {/* Confidence band P10→P80 */}
                <path d={bandPath} fill="#71D2CF" opacity="0.10" />

                {/* Curve — draws in on mount */}
                <path
                  id="hero-bell-curve"
                  d={curvePath}
                  stroke="#71D2CF"
                  strokeWidth="1.8"
                  fill="none"
                  pathLength="1"
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: mounted ? 0 : 1,
                    transition: 'stroke-dashoffset 2.4s cubic-bezier(0.16,1,0.3,1) 300ms',
                  }}
                />

                {/* Traveling simulation dot */}
                <circle r="4.5" fill="#71D2CF" opacity={mounted ? 0.9 : 0}
                  style={{ transition: 'opacity 0.5s 2800ms', filter: 'drop-shadow(0 0 6px #71D2CF)' }}>
                  <animateMotion dur="5.5s" repeatCount="indefinite" begin="2.8s">
                    <mpath href="#hero-bell-curve" />
                  </animateMotion>
                </circle>

                {/* P10 marker */}
                <line x1={p10.x} y1={p10.y} x2={p10.x} y2={PH} stroke="#3EA6A3" strokeWidth="0.75" strokeDasharray="3,4" opacity={mounted ? 0.9 : 0} style={{ transition: 'opacity 0.4s 900ms' }} />

                {/* P50 marker */}
                <line x1={p50.x} y1={p50.y} x2={p50.x} y2={PH} stroke="#71D2CF" strokeWidth="1" strokeDasharray="3,4" opacity={mounted ? 0.9 : 0} style={{ transition: 'opacity 0.4s 1100ms' }} />

                {/* P80 marker */}
                <line x1={p80.x} y1={p80.y} x2={p80.x} y2={PH} stroke="#FFB9BB" strokeWidth="0.75" strokeDasharray="3,4" opacity={mounted ? 0.9 : 0} style={{ transition: 'opacity 0.4s 1300ms' }} />

                {/* Baseline */}
                <line x1={0} y1={PH} x2={PW} y2={PH} stroke="#162030" strokeWidth="1" />
              </svg>

              {/* Percentile value strip */}
              <div className="grid grid-cols-3 gap-0 mt-4 border-t border-rule-d pt-4">
                <PercentileCell
                  label="P10"
                  value={v10}
                  color="#3EA6A3"
                  sublabel="Optimistic"
                  mounted={mounted}
                  delay={900}
                />
                <PercentileCell
                  label="P50"
                  value={v50}
                  color="#71D2CF"
                  sublabel="Expected"
                  mounted={mounted}
                  delay={1100}
                  center
                />
                <PercentileCell
                  label="P80"
                  value={v80}
                  color="#FFB9BB"
                  sublabel="Conservative"
                  mounted={mounted}
                  delay={1300}
                  right
                />
              </div>

              {/* Panel footer */}
              <div className="mt-4 pt-3 border-t border-rule-d">
                <p className="font-mono text-haze" style={{ fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Monte Carlo · N=10,000 iterations · AACE 41R-08
                </p>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-teal/30 pointer-events-none" aria-hidden />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-teal/30 pointer-events-none" aria-hidden />
          </div>
        </div>

        {/* ── Risk gauge ──────────────────────────────── */}
        <div
          className="pb-5"
          style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s 700ms' }}
          aria-hidden
        >
          <RiskGauge mounted={mounted} />
        </div>
      </div>
    </section>
  );
}

function PercentileCell({
  label, value, color, sublabel, mounted, delay, center, right,
}: {
  label: string; value: number; color: string; sublabel: string;
  mounted: boolean; delay: number; center?: boolean; right?: boolean;
}) {
  const displayVal = (value / 10).toFixed(1); // e.g. 148 → "14.8"
  return (
    <div
      className={`${center ? 'text-center' : right ? 'text-right' : 'text-left'}`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'none' : 'translateY(8px)',
        transition: `opacity 0.5s ${delay}ms, transform 0.5s ${delay}ms`,
      }}
    >
      <div className="font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.16em', color, marginBottom: '4px' }}>
        {label}
      </div>
      <div
        className="font-display font-extrabold leading-none tracking-display"
        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color }}
      >
        ${displayVal}M
      </div>
      <div className="font-mono text-haze uppercase mt-1" style={{ fontSize: '8px', letterSpacing: '0.10em' }}>
        {sublabel}
      </div>
    </div>
  );
}
