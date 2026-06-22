'use client';

import { useEffect, useState } from 'react';
import { useInView } from '../../../hooks/useInView';

/* ── Pseudo-random helper (SSR-safe) ── */
const rng = (i: number, s: number) => {
  const x = Math.sin(i * 9301 + s * 49297) * 233280;
  return x - Math.floor(x);
};

/* ── Chart 1: Monte Carlo scatter ─────────────────────── */
type Dot = { x: number; y: number; delay: number; c: string };

function ChartMonteCarlo({ active }: { active: boolean }) {
  const W = 300, H = 160, cx = W / 2, cy = H / 2 - 2;
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    setDots(Array.from({ length: 80 }, (_, i) => {
      const a = (i / 80) * Math.PI * 2;
      const r = 18 + rng(i, 1) * 88 + Math.sin(i * 0.7) * 10;
      const colorSeed = rng(i, 4);
      return {
        x: cx + Math.cos(a) * r + (rng(i, 2) - 0.5) * 26,
        y: cy + Math.sin(a) * r * 0.58 + (rng(i, 3) - 0.5) * 18,
        delay: i * 14,
        c: colorSeed > 0.65 ? '#FF5B5E' : colorSeed > 0.4 ? '#FFB9BB' : '#71D2CF',
      };
    }));
  }, [cx, cy]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" fill="none" aria-hidden>
      <ellipse cx={cx} cy={cy} rx={108} ry={58} stroke="#71D2CF" strokeOpacity="0.18" strokeDasharray="3 4.5" />
      <ellipse cx={cx} cy={cy} rx={58} ry={32} stroke="#71D2CF" strokeOpacity="0.32" strokeDasharray="3 4.5" />
      <circle cx={cx} cy={cy} r="4.5" fill="#71D2CF" style={{ filter: 'drop-shadow(0 0 8px #71D2CF)' }} />
      <circle cx={cx} cy={cy} r="10" fill="#71D2CF" opacity="0.1">
        <animate attributeName="r" values="4;20;4" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.45;0;0.45" dur="3s" repeatCount="indefinite" />
      </circle>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3" fill={d.c}
          opacity={active ? 0.95 : 0}
          style={{ transition: `opacity 0.35s ease ${d.delay}ms`, filter: `drop-shadow(0 0 5px ${d.c})` }}
        />
      ))}
      <text x="8" y={H - 6} fontSize="7.5" fill="#8A95B2" fontFamily="JetBrains Mono, monospace">N = 10,000 SIMULATIONS</text>
    </svg>
  );
}

/* ── Chart 2: P10/P50/P80 animated bars ───────────────── */
function ChartPercentiles({ active }: { active: boolean }) {
  const bars = [
    { label: 'P10', height: 38, color: '#3EA6A3', sub: 'Optimistic' },
    { label: 'P50', height: 62, color: '#71D2CF', sub: 'Expected'   },
    { label: 'P80', height: 86, color: '#FFB9BB', sub: 'Conservative'},
  ];
  return (
    <div className="w-full">
      {/* P labels above bars — use Harbor Teal for contrast on canvas (4.5:1+) */}
      <div className="flex gap-3 mb-2">
        {bars.map(b => (
          <div key={b.label} className="flex-1 text-center">
            <span className="font-display font-extrabold" style={{ color: '#2C5251', fontSize: 'clamp(0.9rem,1.6vw,1.15rem)' }}>
              {b.label}
            </span>
          </div>
        ))}
      </div>
      {/* Bars growing from bottom */}
      <div className="flex gap-3 items-end" style={{ height: '60px' }}>
        {bars.map((b, i) => (
          <div
            key={b.label}
            style={{
              flex: 1,
              height: active ? `${b.height}%` : '4px',
              backgroundColor: b.color,
              opacity: 0.85,
              transition: `height 0.95s cubic-bezier(0.16,1,0.3,1) ${300 + i * 160}ms`,
            }}
          />
        ))}
      </div>
      {/* Sublabels below */}
      <div className="flex gap-3 mt-2">
        {bars.map(b => (
          <div key={b.label} className="flex-1 text-center">
            <span className="font-mono text-haze uppercase" style={{ fontSize: '7px', letterSpacing: '0.08em' }}>{b.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Chart 3: Animated Gantt ───────────────────────────── */
function ChartGantt({ active }: { active: boolean }) {
  const bars = [
    { y: 10, w: 56,  label: 'Design',   color: '#3EA6A3', float: 10 },
    { y: 30, w: 80,  label: 'Procure',  color: '#71D2CF', float: 16 },
    { y: 50, w: 104, label: 'Build',    color: '#FFB9BB', float: 24 },
    { y: 70, w: 70,  label: 'Commiss.', color: '#FF5B5E', float: 18 },
  ];
  return (
    <svg viewBox="0 0 270 92" className="w-full h-full" fill="none" aria-hidden>
      {bars.map((b, i) => (
        <g key={i}>
          <rect x="46" y={b.y} height="12"
            width={active ? b.w : 0}
            fill={b.color} opacity="0.85"
            style={{ transition: `width 0.75s cubic-bezier(0.16,1,0.3,1) ${180 + i * 95}ms` }}
          />
          <rect x={46 + b.w} y={b.y + 2} height="8"
            width={active ? b.float : 0}
            fill={b.color} opacity="0.2"
            style={{ transition: `width 0.55s cubic-bezier(0.16,1,0.3,1) ${380 + i * 95}ms` }}
          />
          <text x="42" y={b.y + 9} textAnchor="end" fill="#8A95B2" fontSize="6.5" fontFamily="JetBrains Mono, monospace">{b.label}</text>
        </g>
      ))}
      <line x1="108" y1="4" x2="108" y2="88" stroke="#71D2CF" strokeWidth="0.75" strokeDasharray="3,3"
        opacity={active ? 0.45 : 0} style={{ transition: 'opacity 0.5s 750ms' }} />
      <text x="110" y="11" fill="#71D2CF" fontSize="6" fontFamily="JetBrains Mono, monospace"
        opacity={active ? 0.6 : 0} style={{ transition: 'opacity 0.4s 850ms' }}>TODAY</text>
    </svg>
  );
}

/* ── Chart 4: Live updating trend ──────────────────────── */
function ChartLiveTrend({ active }: { active: boolean }) {
  const [data, setData] = useState(() =>
    Array.from({ length: 36 }, (_, i) => 50 + Math.sin(i / 2.8) * 13 + Math.cos(i / 1.6) * 5)
  );
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setData(d => [...d.slice(1), Math.max(24, Math.min(88, d[d.length - 1] + (Math.random() - 0.45) * 9))]);
    }, 950);
    return () => clearInterval(t);
  }, [active]);

  const W = 300, H = 130, PAD = 8;
  const minV = Math.min(...data) - 5;
  const maxV = Math.max(...data) + 5;
  const toX = (i: number) => PAD + (i / (data.length - 1)) * (W - PAD * 2);
  const toY = (v: number) => PAD + (1 - (v - minV) / (maxV - minV)) * (H - PAD * 2);

  const actualPath = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ');
  const fillPath   = `${actualPath} L${toX(data.length - 1).toFixed(1)},${H} L${PAD},${H} Z`;
  const plannedEnd = 20;
  const plannedPath = Array.from({ length: plannedEnd }, (_, i) => {
    const v = data[0] - i * 0.25;
    return `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`;
  }).join(' ');

  const lastX = toX(data.length - 1);
  const lastY = toY(data[data.length - 1]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" fill="none" aria-hidden>
      {[0.25, 0.5, 0.75].map((p, i) => (
        <line key={i} x1={PAD} x2={W - PAD}
          y1={PAD + (1 - p) * (H - PAD * 2)} y2={PAD + (1 - p) * (H - PAD * 2)}
          stroke="#DDE2EE" strokeWidth="0.75" />
      ))}
      <path d={fillPath} fill="#71D2CF" opacity="0.05" />
      <path d={plannedPath} stroke="#71D2CF" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.4" />
      <path d={actualPath} stroke="#FF5B5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="4" fill="#FF5B5E" />
      <circle cx={lastX} cy={lastY} r="9" fill="#FF5B5E" opacity="0.15">
        <animate attributeName="r" values="4;11;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.25;0;0.25" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x={PAD + 4} y={PAD + 11} fill="#71D2CF" fontSize="7" fontFamily="JetBrains Mono, monospace" opacity="0.5">PLAN</text>
      <text x={PAD + 4} y={PAD + 22} fill="#FFB9BB" fontSize="7" fontFamily="JetBrains Mono, monospace" opacity="0.75">ACTUAL</text>
    </svg>
  );
}

/* ── Chart 5: Risk allocation ──────────────────────────── */
function ChartRiskAlloc({ active }: { active: boolean }) {
  const segments = [
    { label: 'Mitigated', pct: 28, color: '#3EA6A3' },
    { label: 'Monitored', pct: 22, color: '#71D2CF' },
    { label: 'At Risk',   pct: 30, color: '#FFB9BB' },
    { label: 'Exposure',  pct: 20, color: '#FF5B5E' },
  ];
  return (
    <div className="w-full" aria-hidden>
      <div className="flex overflow-hidden" style={{ height: '44px', gap: '2px' }}>
        {segments.map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: s.pct,
              backgroundColor: s.color,
              opacity: 0.85,
              transform: active ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${200 + i * 110}ms`,
            }}
          />
        ))}
      </div>
      <div className="flex mt-4" style={{ gap: '2px' }}>
        {segments.map((s, i) => (
          <div key={s.label} style={{ flex: s.pct,  minWidth: 0 }}>
            <div
              className="font-display font-extrabold"
              style={{ color: '#2C5251', fontSize: 'clamp(0.85rem,1.6vw,1.2rem)',
                opacity: active ? 1 : 0,
                transition: `opacity 0.5s ${500 + i * 100}ms`,
              }}
            >
              {s.pct}%
            </div>
            <div className="font-mono text-haze uppercase" style={{ fontSize: '7px', letterSpacing: '0.07em' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */
export function WhatWeDo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.04 });

  return (
    <section
      id="what-we-do"
      ref={ref}
      className="bg-canvas text-ink py-[64px] md:py-[80px]"
      aria-labelledby="wwd-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div
          className="grid md:grid-cols-[1fr_auto] gap-6 items-end mb-10"
          style={fade(inView, 0)}
        >
          <h2
            id="wwd-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
          >
            <span className="text-ink">Five decision points.</span>
            <br />
            <span className="text-forest">One discipline.</span>
          </h2>
          <a
            href="#services"
            className="font-mono text-[10px] uppercase tracking-label text-forest border-b border-forest/40 pb-[2px] hover:border-forest transition-colors whitespace-nowrap"
          >
            Full service catalog →
          </a>
        </div>

        {/*
          Bento grid — 2 columns desktop
          Card 1: col 1, rows 1–2 (tall)
          Card 2: col 2, row 1
          Card 3: col 2, row 2
          Card 4: col 1, rows 3–4 (tall)
          Card 5: col 2, rows 3–4 (tall)
        */}
        <div
          className="bento-grid grid gap-[1px] lg:grid-cols-2 bg-[#DDE2EE] border border-[#DDE2EE]"
          role="list"
          aria-label="Decision points"
        >

          {/* Card 1 — Procurement, tall */}
          <div
            className="flex flex-col bg-canvas p-7 lg:col-start-1 lg:row-start-1 lg:row-span-2"
            style={fade(inView, 80)}
            role="listitem"
          >
            <div className="shrink-0">
              <span className="font-display font-extrabold text-forest leading-none" style={{ fontSize: 'clamp(1.4rem,2.4vw,2rem)' }}>01</span>
              <h3 className="font-display font-bold text-ink mt-1 leading-tight" style={{ fontSize: 'clamp(1rem,1.5vw,1.25rem)' }}>
                Procurement Decisions
              </h3>
              <p className="font-sans text-ink-2 mt-2 leading-[1.65]" style={{ fontSize: '14px', maxWidth: '36ch' }}>
                Cost and schedule risk in delivery method, contract structure, and bid selection — quantified before commitments lock in.
              </p>
            </div>
            <div className="flex-1 min-h-0 mt-5" style={{ minHeight: '140px' }}>
              <ChartMonteCarlo active={inView} />
            </div>
          </div>

          {/* Card 2 — Contingency */}
          <div
            className="flex flex-col bg-canvas p-7 lg:col-start-2 lg:row-start-1"
            style={fade(inView, 140)}
            role="listitem"
          >
            <div className="shrink-0">
              <span className="font-display font-extrabold text-forest leading-none" style={{ fontSize: 'clamp(1.4rem,2.4vw,2rem)' }}>02</span>
              <h3 className="font-display font-bold text-ink mt-1 leading-tight" style={{ fontSize: 'clamp(1rem,1.5vw,1.25rem)' }}>
                Contingency Derivation
              </h3>
              <p className="font-sans text-ink-2 mt-1 leading-[1.6]" style={{ fontSize: '13.5px' }}>
                Probability-derived P-values replace gut-feel contingency.
              </p>
            </div>
            <div className="flex-1 min-h-0 mt-4">
              <ChartPercentiles active={inView} />
            </div>
          </div>

          {/* Card 3 — Schedule */}
          <div
            className="flex flex-col bg-canvas p-7 lg:col-start-2 lg:row-start-2"
            style={fade(inView, 200)}
            role="listitem"
          >
            <div className="shrink-0">
              <span className="font-display font-extrabold text-forest leading-none" style={{ fontSize: 'clamp(1.4rem,2.4vw,2rem)' }}>03</span>
              <h3 className="font-display font-bold text-ink mt-1 leading-tight" style={{ fontSize: 'clamp(1rem,1.5vw,1.25rem)' }}>
                Schedule Baselines
              </h3>
              <p className="font-sans text-ink-2 mt-1 leading-[1.6]" style={{ fontSize: '13.5px' }}>
                Testing baselines against the uncertainty they actually carry.
              </p>
            </div>
            <div className="flex-1 min-h-0 mt-4">
              <ChartGantt active={inView} />
            </div>
          </div>

          {/* Card 4 — Trend, tall */}
          <div
            className="flex flex-col bg-canvas p-7 lg:col-start-1 lg:row-start-3 lg:row-span-2"
            style={fade(inView, 140)}
            role="listitem"
          >
            <div className="shrink-0">
              <span className="font-display font-extrabold text-forest leading-none" style={{ fontSize: 'clamp(1.4rem,2.4vw,2rem)' }}>04</span>
              <h3 className="font-display font-bold text-ink mt-1 leading-tight" style={{ fontSize: 'clamp(1rem,1.5vw,1.25rem)' }}>
                Mid-Project Trend Analysis
              </h3>
              <p className="font-sans text-ink-2 mt-2 leading-[1.65]" style={{ fontSize: '14px', maxWidth: '36ch' }}>
                Reassessing while the decision can still change the outcome.
              </p>
            </div>
            <div className="flex-1 min-h-0 mt-5" style={{ minHeight: '130px' }}>
              <ChartLiveTrend active={inView} />
            </div>
            <div className="shrink-0 grid grid-cols-3 mt-4 pt-4 border-t border-[#DDE2EE]">
              {[['Drift', '+14d', '#FF5B5E'], ['Burn rate', '68%', '#2C5251'], ['EAC', '$51.2M', '#2C5251']].map(([label, val, color]) => (
                <div key={label as string}>
                  <p className="font-mono text-haze uppercase" style={{ fontSize: '7.5px', letterSpacing: '0.12em' }}>{label}</p>
                  <p className="font-display font-bold" style={{ fontSize: 'clamp(0.85rem,1.4vw,1.05rem)', color: color as string }}>{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5 — Pre-Claim, tall */}
          <div
            className="flex flex-col bg-canvas p-7 lg:col-start-2 lg:row-start-3 lg:row-span-2"
            style={fade(inView, 260)}
            role="listitem"
          >
            <div className="shrink-0">
              <span className="font-display font-extrabold text-forest leading-none" style={{ fontSize: 'clamp(1.4rem,2.4vw,2rem)' }}>05</span>
              <h3 className="font-display font-bold text-ink mt-1 leading-tight" style={{ fontSize: 'clamp(1rem,1.5vw,1.25rem)' }}>
                Pre-Claim Assessment
              </h3>
              <p className="font-sans text-ink-2 mt-2 leading-[1.65]" style={{ fontSize: '14px', maxWidth: '36ch' }}>
                An independent, quantified view of exposure and entitlement before a dispute hardens into a claim.
              </p>
            </div>
            <div className="mt-7 shrink-0">
              <ChartRiskAlloc active={inView} />
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
