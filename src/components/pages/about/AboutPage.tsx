'use client';

import type { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import { useInView } from '../../../hooks/useInView';

// ── Palette refs for SVG fills (must match tailwind.config.js exactly) ────────
const P = {
  navy:      '#1E1E2E',
  ruleD:     '#28283E',
  ruleL:     '#D5D9E8',
  teal:      '#71D2CF',
  tealDeep:  '#3EA6A3',
  forest:    '#2C5251',
  coral:     '#FF5B5E',
  elevated:  '#FFB9BB',
  snow:      '#E6EAF4',
  slate:     '#8A95B2',
  haze:      '#828DA6',
} as const;

// ── Ticker ─────────────────────────────────────────────────────────────────────
const TICKER = [
  'AN INDEPENDENT PRACTICE',
  'BOUTIQUE BY DESIGN',
  'PRINCIPAL-LED ENGAGEMENTS',
  'NJ / NY METROPOLITAN REGION',
  'GROUNDED IN AACE STANDARDS',
  'FOUNDED BY DR. KARIM S. KARAM',
  'SENIOR ATTENTION ON EVERY FILE',
  'SELECTIVE ENGAGEMENT',
];

function TickerStrip() {
  return (
    <div className="border-b border-rule-d overflow-hidden" style={{ height: '34px' }} aria-hidden>
      <div
        className="marquee-track flex items-center h-full whitespace-nowrap"
        style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}
      >
        {[...TICKER, ...TICKER].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono uppercase text-haze" style={{ fontSize: '9.5px', letterSpacing: '0.18em', paddingLeft: '28px' }}>
              {item}
            </span>
            <span className="font-mono text-teal mx-3" style={{ fontSize: '7px', opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Needle Gauge (hero) ────────────────────────────────────────────────────────
// Paths & label positions taken directly from the Visual Identity reference gauge.
// Five zone segments run left (MANAGED) → right (CRITICAL). The needle sweeps
// from the CRITICAL position (72° clockwise from north) to MANAGED (-72°).
const GAUGE_ZONES = [
  { d: 'M 75.03 217.12 A 165 165 0 0 1 104.86 125.29',  stroke: '#2C5251', label: 'MANAGED',  threshold: '< 5%',   lx: 49.8,  ly: 151, tx: 49.8,  ty: 163 },
  { d: 'M 108.16 120.67 A 165 165 0 0 1 186.21 63.91',  stroke: '#3EA6A3', label: 'BASELINE', threshold: '5–10%',  lx: 122.4, ly: 52,  tx: 122.4, ty: 64  },
  { d: 'M 191.65 62.26 A 165 165 0 0 1 288.35 62.26',   stroke: '#71D2CF', label: 'MONITOR',  threshold: '10–18%', lx: 240,   ly: 14,  tx: 240,   ty: 26  },
  { d: 'M 293.79 63.91 A 165 165 0 0 1 371.84 120.67',  stroke: '#FFB9BB', label: 'ELEVATED', threshold: '18–28%', lx: 357.6, ly: 52,  tx: 357.6, ty: 64  },
  { d: 'M 375.14 125.29 A 165 165 0 0 1 404.97 217.12', stroke: '#FF5B5E', label: 'CRITICAL', threshold: '> 28%',  lx: 430.2, ly: 151, tx: 430.2, ty: 163 },
] as const;

// Needle sweep sequence: big reveal (CRITICAL→MANAGED), then sequential left→right loop
const NEEDLE_SEQ = [
  { a: -57.6, dur: 1800, hold: 1200 }, // 0  MANAGED  — initial reveal
  { a: -28.8, dur: 1000, hold: 1100 }, // 1  BASELINE
  { a:  0,    dur:  900, hold: 1000 }, // 2  MONITOR
  { a:  28.8, dur:  900, hold: 1000 }, // 3  ELEVATED
  { a:  57.6, dur:  900, hold: 1000 }, // 4  CRITICAL
  { a: -57.6, dur: 1400, hold: 1200 }, // 5  MANAGED  — loop anchor (back to left)
] as const;

function zoneOf(a: number) {
  if (a < -43.2) return 0; // MANAGED
  if (a < -14.4) return 1; // BASELINE
  if (a < 14.4)  return 2; // MONITOR
  if (a < 43.2)  return 3; // ELEVATED
  return 4;                // CRITICAL
}

function NeedleGauge({ active }: { active: boolean }) {
  const [angle, setAngle]           = useState(72);      // start at CRITICAL
  const [activeZone, setActiveZone] = useState(4);
  const [sweepDur, setSweepDur]     = useState(2400);

  useEffect(() => {
    if (!active) {
      setAngle(72);
      setActiveZone(4);
      setSweepDur(350);
      return;
    }
    let idx = 0;
    let tid: ReturnType<typeof setTimeout>;
    function advance() {
      const { a, dur, hold } = NEEDLE_SEQ[idx];
      setSweepDur(dur);
      setAngle(a);
      setActiveZone(zoneOf(a));
      // after the last step loop back to step 1 (skip the initial reveal)
      idx = idx >= NEEDLE_SEQ.length - 1 ? 1 : idx + 1;
      tid = setTimeout(advance, dur + hold);
    }
    tid = setTimeout(advance, 500);
    return () => clearTimeout(tid);
  }, [active]);

  return (
    <svg viewBox="-10 0 500 252" width="100%" fill="none" aria-hidden>
      {/* Background track */}
      <path d="M 75.03 217.12 A 165 165 0 0 1 404.97 217.12"
        stroke="rgba(255,255,255,0.05)" strokeWidth="36" strokeLinecap="butt" />

      {/* Zone segments — active zone grows and glows */}
      {GAUGE_ZONES.map((z, i) => {
        const isHit = activeZone === i;
        return (
          <path key={i} d={z.d} strokeLinecap="butt"
            style={{
              stroke: z.stroke,
              strokeWidth: isHit ? 38 : 26,
              opacity: active ? (isHit ? 1 : 0.62) : 0,
              filter: isHit ? `drop-shadow(0 0 10px ${z.stroke})` : 'none',
              transition: [
                `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${80 + i * 150}ms`,
                'stroke-width 0.55s cubic-bezier(0.16,1,0.3,1)',
                'filter 0.55s ease',
              ].join(', '),
            }}
          />
        );
      })}

      {/* Zone labels + thresholds — active zone brightens */}
      {GAUGE_ZONES.map((z, i) => {
        const isHit = activeZone === i;
        return (
          <g key={z.label}
            opacity={active ? (isHit ? 1 : 0.55) : 0}
            style={{ transition: `opacity 0.5s` }}>
            <text x={z.lx} y={z.ly} textAnchor="middle" fill={z.stroke}
              fontSize="8" fontWeight="600" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">
              {z.label}
            </text>
            <text x={z.tx} y={z.ty} textAnchor="middle" fill="#828DA6"
              fontSize="7" fontFamily="JetBrains Mono, monospace">
              {z.threshold}
            </text>
          </g>
        );
      })}

      {/* Needle */}
      <g transform="translate(240, 220)">
        <g style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0px 0px',
          transition: `transform ${sweepDur}ms cubic-bezier(0.16,1,0.3,1)`,
        }}>
          <polygon points="0,-126 5,8 -5,8" fill="#E6EAF4"
            opacity={active ? 0.92 : 0}
            style={{ transition: 'opacity 0.3s 380ms' }}
          />
        </g>
        <circle r="14" fill="#1E1E2E" stroke="#71D2CF" strokeWidth="1.5"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s 380ms' }} />
        <circle r="5" fill="#71D2CF"
          opacity={active ? 1 : 0} style={{ transition: 'opacity 0.3s 380ms' }} />
      </g>

      <text x="240" y="247" textAnchor="middle" fill="#828DA6"
        fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.18em"
        opacity={active ? 0.72 : 0} style={{ transition: 'opacity 0.5s 1900ms' }}>
        RISK SPECTRUM · TRAVO FRAMEWORK
      </text>
    </svg>
  );
}

// ── Ring Gauge Arc (background ornaments in §3 and §5) ─────────────────────────
const GAUGE_SEGS = [
  { fill: P.forest,   label: 'LOW'  },
  { fill: P.tealDeep, label: 'MOD'  },
  { fill: P.teal,     label: 'MID'  },
  { fill: P.elevated, label: 'HIGH' },
  { fill: P.coral,    label: 'SEV'  },
] as const;

const ANGLES = [180, 144, 108, 72, 36, 0] as const;

function pXY(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
}

function segPath(cx: number, cy: number, ro: number, ri: number, a1: number, a2: number) {
  const os = pXY(cx, cy, ro, a1), oe = pXY(cx, cy, ro, a2);
  const ie = pXY(cx, cy, ri, a2), is_ = pXY(cx, cy, ri, a1);
  const la = Math.abs(a1 - a2) > 180 ? 1 : 0;
  return [
    `M ${os.x.toFixed(1)} ${os.y.toFixed(1)}`,
    `A ${ro} ${ro} 0 ${la} 0 ${oe.x.toFixed(1)} ${oe.y.toFixed(1)}`,
    `L ${ie.x.toFixed(1)} ${ie.y.toFixed(1)}`,
    `A ${ri} ${ri} 0 ${la} 1 ${is_.x.toFixed(1)} ${is_.y.toFixed(1)}`,
    'Z',
  ].join(' ');
}

function GaugeArc({
  active, cx = 100, cy = 100, ro = 80, ri = 50, showLabels = true, targetOp = 0.92,
}: {
  active: boolean; cx?: number; cy?: number; ro?: number; ri?: number;
  showLabels?: boolean; targetOp?: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${cx * 2} ${cy + 14}`}
      fill="none"
      aria-hidden
      style={{ width: '100%', height: 'auto', overflow: 'visible' }}
    >
      {GAUGE_SEGS.map((seg, i) => (
        <path
          key={i}
          d={segPath(cx, cy, ro, ri, ANGLES[i], ANGLES[i + 1])}
          fill={seg.fill}
          stroke={P.navy}
          strokeWidth="2"
          opacity={active ? targetOp : 0}
          style={{
            transform: active ? 'scale(1)' : 'scale(0.86)',
            transformOrigin: `${cx}px ${cy}px`,
            transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${100 + i * 200}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${100 + i * 200}ms`,
          }}
        />
      ))}
      <circle
        cx={cx} cy={cy} r={Math.round(ri * 0.18)}
        fill={P.navy}
        opacity={active ? 1 : 0}
        style={{ transition: 'opacity 0.3s 1050ms' }}
      />
      {showLabels && GAUGE_SEGS.map((seg, i) => {
        const midDeg = (ANGLES[i] + ANGLES[i + 1]) / 2;
        const lp = pXY(cx, cy, ro + 14, midDeg);
        return (
          <text
            key={i}
            x={lp.x.toFixed(1)} y={lp.y.toFixed(1)}
            textAnchor="middle" dominantBaseline="middle"
            fill={seg.fill}
            fontSize="6.5"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.08em"
            opacity={active ? 0.88 : 0}
            style={{ transition: `opacity 0.4s ${650 + i * 120}ms` }}
          >
            {seg.label}
          </text>
        );
      })}
    </svg>
  );
}

// ── Animated Gaussian curve ────────────────────────────────────────────────────
function AnimGaussian({ active }: { active: boolean }) {
  const W = 200, H = 80;
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = i / 80, xn = t * 6 - 3, yRaw = Math.exp(-xn * xn / 2);
    pts.push(`${i === 0 ? 'M' : 'L'}${(4 + t * (W - 8)).toFixed(1)},${(H - yRaw * (H - 14) - 4).toFixed(1)}`);
  }
  const d = pts.join(' ');
  const fillD = `${d} L${W - 4},${H} L4,${H} Z`;
  const p10x = 4 + 0.27 * (W - 8), p50x = 4 + 0.5 * (W - 8), p80x = 4 + 0.73 * (W - 8);
  return (
    <svg viewBox={`0 0 ${W} ${H + 10}`} aria-hidden style={{ width: '100%', height: '76px' }} fill="none">
      <path d={fillD} fill={P.teal} opacity="0.07" />
      <line x1={4} y1={H} x2={W - 4} y2={H} stroke={P.ruleL} strokeWidth="0.75" />
      <path
        id="about-gauss-path"
        d={d}
        stroke={P.teal}
        strokeWidth="2"
        pathLength="1"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: active ? 0 : 1,
          transition: 'stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 400ms',
        }}
      />
      {([
        { x: p10x, label: 'P10', c: P.tealDeep },
        { x: p50x, label: 'P50', c: P.teal     },
        { x: p80x, label: 'P80', c: P.elevated  },
      ] as const).map(({ x, label, c }, i) => (
        <g key={label} opacity={active ? 1 : 0} style={{ transition: `opacity 0.4s ${1100 + i * 140}ms` }}>
          <line x1={x} y1={H * 0.25} x2={x} y2={H} stroke={c} strokeWidth="0.75" strokeDasharray="2,3" opacity="0.7" />
          <text x={x} y={H + 8} textAnchor="middle" fill={P.forest} fontSize="7" fontFamily="JetBrains Mono, monospace">{label}</text>
        </g>
      ))}
      {/* Invisible path for animateMotion */}
      <path id="about-gauss-motion" d={d} stroke="none" fill="none" />
      {active && (
        <>
          <circle r="2.8" fill={P.teal} style={{ filter: `drop-shadow(0 0 4px ${P.teal})` }}>
            <animateMotion dur="4.2s" repeatCount="indefinite" begin="0s">
              <mpath href="#about-gauss-motion" />
            </animateMotion>
          </circle>
          <circle r="1.8" fill={P.tealDeep}>
            <animateMotion dur="4.2s" repeatCount="indefinite" begin="1.4s">
              <mpath href="#about-gauss-motion" />
            </animateMotion>
          </circle>
        </>
      )}
    </svg>
  );
}

// ── Animated phase bars ────────────────────────────────────────────────────────
function AnimBars({ active }: { active: boolean }) {
  const bars = [
    { label: 'PRE-CON',   h: 44, color: P.teal     },
    { label: 'EXECUTION', h: 72, color: P.elevated  },
    { label: 'POST',      h: 36, color: P.tealDeep  },
  ] as const;
  return (
    <div className="flex items-end gap-3" style={{ height: '84px' }} aria-hidden>
      {bars.map((b, i) => (
        <div key={b.label} className="flex-1 flex flex-col items-center justify-end gap-[6px]">
          <div
            style={{
              width: '100%',
              height: `${b.h}px`,
              backgroundColor: b.color,
              opacity: active ? 0.78 : 0,
              transformOrigin: 'center bottom',
              transform: active ? 'scaleY(1)' : 'scaleY(0)',
              transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${300 + i * 160}ms, opacity 0.5s ${300 + i * 160}ms`,
            }}
          />
          <span
            className="font-mono text-forest uppercase"
            style={{ fontSize: '6.5px', letterSpacing: '0.08em', textAlign: 'center', display: 'block' }}
          >
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── NJ/NY regional map ─────────────────────────────────────────────────────────
const NY_PATH = 'M 8,6 L 108,6 L 114,18 L 112,30 L 102,36 L 90,40 L 86,48 L 90,54 L 84,60 L 76,62 L 66,58 L 54,64 L 42,62 L 30,56 L 16,58 L 8,50 L 6,32 Z';
const NJ_PATH = 'M 90,54 L 108,46 L 120,52 L 125,66 L 121,80 L 114,94 L 102,106 L 90,110 L 80,100 L 74,84 L 76,68 Z';
const CITIES = [
  { cx: 84, cy: 60, label: 'NYC',     pR: 12, dur: '2.6s', delay: '0s'   },
  { cx: 78, cy: 68, label: 'Newark',  pR: 9,  dur: '3.1s', delay: '0.8s' },
  { cx: 90, cy: 82, label: 'Trenton', pR: 8,  dur: '3.5s', delay: '1.6s' },
] as const;

function NJNYMap() {
  return (
    <div role="img" aria-label="New Jersey and New York metropolitan region">
      <svg viewBox="0 0 140 122" fill="none" style={{ width: '160px', height: '132px', overflow: 'visible' }}>
        <path d={NY_PATH} fill={P.teal} fillOpacity="0.1" stroke={P.teal} strokeWidth="1.2" strokeOpacity="0.4" />
        <path d={NJ_PATH} fill={P.tealDeep} fillOpacity="0.14" stroke={P.tealDeep} strokeWidth="1.2" strokeOpacity="0.5" />
        {CITIES.map((c) => (
          <g key={c.label}>
            <circle cx={c.cx} cy={c.cy} r={c.pR * 0.45} fill="none" stroke={P.teal} strokeWidth="2.5" opacity="0.4">
              <animate attributeName="r" values={`${c.pR * 0.35};${c.pR * 1.2};${c.pR * 0.35}`} dur={c.dur} begin={c.delay} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur={c.dur} begin={c.delay} repeatCount="indefinite" />
            </circle>
            <circle cx={c.cx} cy={c.cy} r="7" fill={P.teal} opacity="0.28" />
            <circle cx={c.cx} cy={c.cy} r="4.5" fill={P.tealDeep} style={{ filter: `drop-shadow(0 0 6px ${P.tealDeep})` }} />
            <text x={c.cx + 7} y={c.cy + 2} fill={P.forest} fontSize="6.5" fontFamily="JetBrains Mono, monospace" opacity="0.9">{c.label}</text>
          </g>
        ))}
        <text x="42" y="30" fill={P.teal} fontSize="8" fontFamily="JetBrains Mono, monospace" opacity="0.45" letterSpacing="0.1em">NY</text>
        <text x="104" y="80" fill={P.tealDeep} fontSize="8" fontFamily="JetBrains Mono, monospace" opacity="0.55" letterSpacing="0.1em">NJ</text>
      </svg>
      <p className="font-mono text-forest mt-1" style={{ fontSize: '7.5px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        NJ / NY Metro Region
      </p>
    </div>
  );
}

// ── Page content ───────────────────────────────────────────────────────────────
const BIO_ACTS = [
  {
    act: 'Formation',
    institutions: 'MIT · Imperial College London',
    detail: 'Ground settlement research under Professor Burland. Theoretical physics under Professor Veneziano.',
    color: P.teal,
  },
  {
    act: 'Practice',
    institutions: 'Sarooj Construction · Travo SARL',
    detail: '$1.3B+ heavy civil project delivery at scale. Senior operator before becoming principal analyst.',
    color: P.elevated,
  },
  {
    act: 'Research',
    institutions: 'Stevens Institute of Technology',
    detail: 'Quantitative risk methodology. Active research into AI-assisted construction risk analysis.',
    color: P.tealDeep,
  },
] as const;

const DIFFERENTIATORS = [
  {
    title: 'Academic Rigor',
    desc:  'Methodology grounded in peer-reviewed research and recognized quantitative standards, not the visually impressive but analytically empty deliverables the risk industry too often produces.',
    viz:   'gaussian' as const,
  },
  {
    title: 'Senior Operator Experience',
    desc:  'Analysis informed by hands-on delivery of heavy civil construction at scale. We have lived the decisions we model, which keeps the work practical rather than theoretical.',
    viz:   'bars' as const,
  },
  {
    title: 'Regional Depth',
    desc:  'A working knowledge of the relationships, regulatory environment, and capital project ecosystem specific to the New Jersey and New York metropolitan region.',
    viz:   'map' as const,
  },
] as const;

const VALUES = [
  {
    num: '01', title: 'Rigor Over Theater',
    body: 'The industry routinely substitutes color-coded heat maps and single-point estimates for genuine analysis. Every Travo output, from P50 to contingency figures, is derived from documented methodology, traceable inputs, and validated assumptions. We take the time that requires.',
  },
  {
    num: '02', title: 'Independence Without Exception',
    body: 'We do not advise owner and contractor on the same project, accept referral arrangements that compromise objectivity, or soften findings to preserve a relationship. Independence is what allows our analysis to be relied upon, and it does not survive a single exception.',
  },
  {
    num: '03', title: 'Foresight, Not Hindsight',
    body: 'The risks that drive overruns, delays, and disputes are usually visible at procurement and throughout delivery; they are simply rarely modeled with enough rigor to act on. We exist to surface and quantify those risks while the decision can still be changed.',
  },
  {
    num: '04', title: 'Disciplined Focus',
    body: 'Travo takes on work only where quantitative risk analysis sits at the core, and declines work that falls outside that scope regardless of fee. A specialty practice earns trust by doing one thing exceptionally, not many things adequately.',
  },
  {
    num: '05', title: 'Accountable by Name',
    body: "Every deliverable carries the principal's name and credentials and is reviewed and signed personally. Analysts and supervised researchers execute the underlying work; responsibility for the conclusions is never delegated.",
  },
] as const;

// ── Animation helpers ──────────────────────────────────────────────────────────
function fade(v: boolean, delay: number): CSSProperties {
  return {
    opacity:    v ? 1 : 0,
    transform:  v ? 'none' : 'translateY(22px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

function slideUp(v: boolean, delay: number): CSSProperties {
  return {
    transform:  v ? 'translateY(0)' : 'translateY(112%)',
    transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

// ── Component ──────────────────────────────────────────────────────────────────
export function AboutPage() {
  const { ref: heroRef,      inView: heroActive      } = useInView<HTMLElement>({ threshold: 0.04 });
  const { ref: practiceRef,  inView: practiceActive  } = useInView<HTMLElement>({ threshold: 0.08 });
  const { ref: principalRef, inView: principalActive } = useInView<HTMLElement>({ threshold: 0.04 });
  const { ref: diffRef,      inView: diffActive      } = useInView<HTMLElement>({ threshold: 0.06 });
  const { ref: visionRef,    inView: visionActive    } = useInView<HTMLElement>({ threshold: 0.10 });
  const { ref: valuesRef,    inView: valuesActive    } = useInView<HTMLElement>({ threshold: 0.04 });

  return (
    <>
      {/* ── §1  Hero ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative bg-navy text-snow overflow-hidden"
        aria-labelledby="about-h1"
      >
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />
        <TickerStrip />

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16 pt-[72px] pb-[96px] md:pt-[88px] md:pb-[124px]">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-center">

            {/* Left — headline + lead + links */}
            <div>
              <h1
                id="about-h1"
                className="font-display font-extrabold leading-[0.95] tracking-display"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 4.8rem)' }}
              >
                {(
                  [
                    { text: 'An independent', accent: false },
                    { text: 'practice, built around', accent: false },
                    { text: 'a single discipline.', accent: true },
                  ] as const
                ).map(({ text, accent }, i) => (
                  <div key={i} style={{ overflow: 'hidden', display: 'block' }}>
                    <span className="block" style={slideUp(heroActive, i * 85)}>
                      {accent
                        ? <span className="text-teal">{text}</span>
                        : <span className="text-snow">{text}</span>
                      }
                    </span>
                  </div>
                ))}
              </h1>

              <p
                className="mt-8 font-sans text-slate leading-[1.78] pretty"
                style={{ fontSize: '17px', maxWidth: '54ch', ...fade(heroActive, 330) }}
              >
                Travo (Total Risk Analysis and Value Optimization) is a specialty quantitative risk advisory practice and the emerging regional standard for quantitative construction risk analysis in the New Jersey and New York metropolitan market.
              </p>

              <div className="mt-8" style={fade(heroActive, 460)}>
                <a
                  href="/services"
                  className="font-mono text-[10.5px] tracking-label uppercase bg-coral text-snow px-7 py-[13px] hover:bg-coral/90 transition-colors duration-200"
                >
                  View Services
                </a>
              </div>
            </div>

            {/* Right — needle gauge sweeps CRITICAL → MANAGED on load */}
            <div
              className="hidden lg:block"
              aria-hidden
              style={{
                transform: heroActive ? 'none' : 'translateY(20px)',
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1) 60ms',
              }}
            >
              <NeedleGauge active={heroActive} />
            </div>

          </div>
        </div>
      </section>

      {/* ── §2  The Practice ─────────────────────────────────────────────── */}
      <section
        ref={practiceRef}
        className="relative bg-canvas text-ink overflow-hidden py-[96px] md:py-[128px]"
        aria-label="About the practice"
      >
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

          {/* Editorial heading — bold, full-width, no label kicker */}
          <div className="mb-12 md:mb-16" style={fade(practiceActive, 0)}>
            <h2
              className="font-display font-extrabold leading-[0.95] tracking-display"
              style={{ fontSize: 'clamp(2.4rem, 4.4vw, 4rem)', textWrap: 'balance' } as CSSProperties}
            >
              <span className="text-ink">Rigorous, independent analysis</span><br />
              <span className="text-forest">at the decisions that matter most.</span>
            </h2>
          </div>

          {/* Two-column prose */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 border-t border-rule-l pt-10">
            <p
              className="font-sans text-ink-2 leading-[1.78] pretty"
              style={{ fontSize: '17px', ...fade(practiceActive, 100) }}
            >
              We provide independent, systematic risk and contingency analysis to institutional owners, public agencies, mid-sized general contractors, sureties, construction lenders, and construction-litigation counsel: the parties responsible for delivering complex capital projects across the region.
            </p>
            <div className="space-y-6">
              <p
                className="font-sans text-ink-2 leading-[1.78] pretty"
                style={{ fontSize: '17px', ...fade(practiceActive, 180) }}
              >
                Our role is independent and analytical: methodologically rigorous risk analysis at the specific decision points where uncertainty has the largest financial impact, across preconstruction planning, contingency derivation, mid-project trend analysis, and pre-claim assessment.
              </p>
              <p
                className="font-sans text-ink-2 leading-[1.78] pretty"
                style={{ fontSize: '17px', ...fade(practiceActive, 260) }}
              >
                We are boutique by design. Senior attention on every engagement, the discipline to stay within a defined specialty, and the selectivity that makes the work reliable.
              </p>
            </div>
          </div>

          {/* Engagement windows — when the firm operates in the project lifecycle */}
          <div className="mt-16 border-t border-rule-l pt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {([
                {
                  window: 'Pre-Project',
                  desc: 'Budget baseline, risk register, contingency derivation, and procurement risk assessment before commitments are made.',
                  color: P.forest,
                },
                {
                  window: 'During Execution',
                  desc: 'Mid-project trend analysis, contingency drawdown assessment, and schedule risk reassessment as conditions develop.',
                  color: P.teal,
                },
                {
                  window: 'Post-Project',
                  desc: 'Claims support, dispute positioning, and portfolio-level risk review for owners and litigation counsel.',
                  color: P.elevated,
                },
              ] as const).map((w, i) => (
                <div
                  key={w.window}
                  style={{
                    opacity: practiceActive ? 1 : 0,
                    transform: practiceActive ? 'none' : 'translateY(16px)',
                    transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${360 + i * 100}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${360 + i * 100}ms`,
                  }}
                >
                  <div style={{ width: '28px', height: '2px', backgroundColor: w.color, marginBottom: '16px' }} />
                  <h3
                    className="font-display font-bold text-ink tracking-display"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
                  >
                    {w.window}
                  </h3>
                  <p className="font-sans text-ink-2 leading-[1.65] pretty mt-3" style={{ fontSize: '14.5px' }}>
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── §3  The Principal ────────────────────────────────────────────── */}
      <section
        ref={principalRef}
        className="relative bg-navy text-snow overflow-hidden py-[96px] md:py-[128px]"
        aria-labelledby="principal-h"
      >
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

        {/* Large gauge as atmospheric background ornament */}
        <div
          className="absolute right-0 top-1/2 pointer-events-none select-none"
          aria-hidden
          style={{ width: '540px', opacity: 0.13, transform: 'translate(18%, -50%)' }}
        >
          <GaugeArc active={principalActive} cx={200} cy={190} ro={180} ri={110} showLabels={false} targetOp={1} />
        </div>

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

          <h2
            id="principal-h"
            className="font-display font-extrabold leading-[0.97] tracking-display mb-14 md:mb-16"
            style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)', ...fade(principalActive, 0) }}
          >
            <span className="text-snow">The </span>
            <span className="text-teal">Principal.</span>
          </h2>

          <div className="grid md:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-start">

            {/* Photo — visible placeholder; swap div for <Image> when karim.jpg arrives */}
            <div style={{ ...fade(principalActive, 80), width: '260px', maxWidth: '100%' }}>
              {/*
                When the portrait arrives: replace the entire div below with:
                <div className="relative overflow-hidden" style={{ width: 'min(260px, 100%)', aspectRatio: '3/4' }}>
                  <Image src="/karim.jpg" alt="Dr. Karim S. Karam, Founder & Principal" fill className="object-cover object-top" />
                </div>
              */}
              {/*
                When portrait arrives: replace the div below with:
                <div className="relative overflow-hidden" style={{ width: 'min(260px, 100%)', aspectRatio: '3/4' }}>
                  <Image src="/karim.jpg" alt="Dr. Karim S. Karam, Founder & Principal" fill className="object-cover object-top" />
                </div>
              */}
              <div
                className="relative"
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  border: '1.5px solid rgba(113,210,207,0.65)',
                  backgroundColor: 'rgba(113,210,207,0.06)',
                  boxShadow: '0 0 0 1px rgba(113,210,207,0.08) inset',
                }}
              >
                {/* Film-frame corner marks */}
                <div className="absolute" style={{ top: 10, left: 10, width: 20, height: 20, borderTop: `1.5px solid ${P.teal}`, borderLeft: `1.5px solid ${P.teal}`, opacity: 0.9 }} />
                <div className="absolute" style={{ top: 10, right: 10, width: 20, height: 20, borderTop: `1.5px solid ${P.teal}`, borderRight: `1.5px solid ${P.teal}`, opacity: 0.9 }} />
                <div className="absolute" style={{ bottom: 10, left: 10, width: 20, height: 20, borderBottom: `1.5px solid ${P.teal}`, borderLeft: `1.5px solid ${P.teal}`, opacity: 0.9 }} />
                <div className="absolute" style={{ bottom: 10, right: 10, width: 20, height: 20, borderBottom: `1.5px solid ${P.teal}`, borderRight: `1.5px solid ${P.teal}`, opacity: 0.9 }} />

                {/* Person silhouette, centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingBottom: '48px' }}>
                  <svg width="100" height="112" viewBox="0 0 100 112" fill="none" aria-hidden>
                    <circle cx="50" cy="36" r="24" stroke={P.teal} strokeWidth="1.5" opacity="0.9" />
                    <path d="M 4 112 Q 4 72 50 72 Q 96 72 96 112"
                      stroke={P.teal} strokeWidth="1.5" fill="none" opacity="0.9" />
                  </svg>
                  <p className="font-mono mt-5 uppercase" style={{ fontSize: '8px', letterSpacing: '0.22em', color: P.teal, opacity: 0.85 }}>
                    Portrait
                  </p>
                </div>

                {/* Bottom label strip */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3"
                  style={{ borderTop: '1px solid rgba(113,210,207,0.2)', backgroundColor: 'rgba(0,0,0,0.55)' }}>
                  <p className="font-mono uppercase" style={{ fontSize: '8.5px', letterSpacing: '0.16em', color: P.teal }}>
                    Dr. Karim S. Karam
                  </p>
                  <p className="font-mono mt-1" style={{ fontSize: '7.5px', letterSpacing: '0.12em', color: P.haze }}>
                    /public/karim.jpg
                  </p>
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div>
              <div style={fade(principalActive, 120)}>
                <h3
                  className="font-display font-extrabold leading-[0.97] tracking-display text-snow"
                  style={{ fontSize: 'clamp(1.9rem, 3.2vw, 3rem)' }}
                >
                  Dr. Karim S. Karam
                </h3>
                <p className="font-mono text-haze uppercase mt-3" style={{ fontSize: '8.5px', letterSpacing: '0.18em' }}>
                  Founder & Principal · Travo Risk Advisory
                </p>
              </div>

              {/* Biographical three-act layout: Formation · Practice · Research */}
              <div className="mt-10 border-t border-rule-d pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                  {BIO_ACTS.map((act, i) => (
                    <div
                      key={act.act}
                      style={{
                        opacity: principalActive ? 1 : 0,
                        transform: principalActive ? 'none' : 'translateY(14px)',
                        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${220 + i * 100}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${220 + i * 100}ms`,
                      }}
                    >
                      <div style={{ width: '24px', height: '2px', backgroundColor: act.color, marginBottom: '14px' }} />
                      <p className="font-mono uppercase mb-3" style={{ fontSize: '7.5px', letterSpacing: '0.18em', color: act.color }}>
                        {act.act}
                      </p>
                      <p className="font-display font-bold text-snow leading-tight tracking-display mb-2"
                        style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}>
                        {act.institutions}
                      </p>
                      <p className="font-sans text-slate leading-[1.65] pretty" style={{ fontSize: '13.5px' }}>
                        {act.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature quote */}
              <div className="mt-9 border-t border-rule-d pt-7" style={fade(principalActive, 560)}>
                <blockquote
                  className="font-sans text-teal leading-[1.7] pretty"
                  style={{ fontSize: '18px', fontStyle: 'italic' }}
                >
                  &ldquo;If an analysis cannot be defended in detail, it is not finished.&rdquo;
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── §4  Three Differentiators ─────────────────────────────────────── */}
      <section
        ref={diffRef}
        className="relative bg-canvas text-ink overflow-hidden py-[80px] md:py-[112px]"
        aria-label="What distinguishes the practice"
      >
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

          <div className="mb-12" style={fade(diffActive, 0)}>
            <h2
              className="font-display font-extrabold leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)' }}
            >
              <span className="text-ink">Credentials the broader market</span><br />
              <span className="text-forest">rarely combines.</span>
            </h2>
            <p className="mt-4 font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '16px', maxWidth: '52ch' }}>
              Most firms in the construction risk space hold one of these qualifications. Travo&apos;s work is built on all three.
            </p>
          </div>

          <div className="grid md:grid-cols-3 border-t border-rule-l" role="list">
            {DIFFERENTIATORS.map((d, i) => (
              <article
                key={d.title}
                role="listitem"
                style={fade(diffActive, 80 + i * 100)}
                className={[
                  'pt-10 pb-12',
                  i < 2 ? 'md:pr-12 md:border-r md:border-rule-l' : '',
                  i > 0 ? 'md:pl-12 border-t border-rule-l md:border-t-0' : '',
                ].join(' ')}
              >
                <h3
                  className="font-display font-bold text-ink leading-[0.97] tracking-display"
                  style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}
                >
                  {d.title}
                </h3>
                <div className="mt-4 h-px w-10" style={{ backgroundColor: P.teal, opacity: 0.5 }} />
                <p className="mt-5 font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15.5px' }}>
                  {d.desc}
                </p>
                <div className="mt-8 pt-5 border-t border-rule-l">
                  {d.viz === 'gaussian' && <AnimGaussian active={diffActive} />}
                  {d.viz === 'bars'     && <AnimBars     active={diffActive} />}
                  {d.viz === 'map'      && <NJNYMap />}
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ── §5  Vision ────────────────────────────────────────────────────── */}
      <section
        ref={visionRef}
        className="relative bg-forest overflow-hidden py-[96px] md:py-[128px]"
        aria-labelledby="vision-h"
      >
        {/* Grid texture on forest surface */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 96px)' }}
        />

        {/* Background gauge ornament */}
        <div
          className="absolute left-0 top-1/2 pointer-events-none select-none"
          aria-hidden
          style={{ width: '440px', opacity: 0.15, transform: 'translate(-28%, -50%)' }}
        >
          <GaugeArc active={visionActive} cx={200} cy={190} ro={180} ri={110} showLabels={false} targetOp={1} />
        </div>

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-[72ch]">

            {/* Label — rises up */}
            <div style={{ overflow: 'hidden' }}>
              <p
                className="font-mono uppercase"
                style={{ fontSize: '9px', letterSpacing: '0.18em', color: P.teal, ...slideUp(visionActive, 0) }}
              >
                Where We Are Headed
              </p>
            </div>

            {/* Heading — line by line */}
            <h2
              id="vision-h"
              className="font-display font-extrabold leading-[0.95] tracking-display mt-5 mb-10"
              style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.4rem)' }}
            >
              {(['A specific ambition,', 'not a vague one.'] as const).map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', display: 'block' }}>
                  <span className="block" style={{ color: P.snow, ...slideUp(visionActive, 80 + i * 80) }}>
                    {line}
                  </span>
                </div>
              ))}
            </h2>

            {/* Statement */}
            <div
              className="border-t pt-8"
              style={{ borderColor: 'rgba(255,255,255,0.14)', ...fade(visionActive, 320) }}
            >
              <p
                className="font-sans leading-[1.85] pretty"
                style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.28rem)', color: P.snow, opacity: 0.9 }}
              >
                To establish quantitative risk analysis as the standard discipline behind how capital projects are planned, priced, and delivered across the New Jersey and New York metropolitan market, so that the cost of uncertainty is measured before it is paid.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── §6  Five Values ───────────────────────────────────────────────── */}
      <section
        ref={valuesRef}
        className="relative bg-canvas text-ink overflow-hidden py-[80px] md:py-[112px]"
        aria-labelledby="values-h"
      >
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

          <div className="mb-12" style={fade(valuesActive, 0)}>
            <h2
              id="values-h"
              className="font-display font-extrabold leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)' }}
            >
              Five commitments the<br />practice is built on.
            </h2>
          </div>

          <div className="border-t border-rule-l">
            {VALUES.map((v, i) => {
              const isEven = i % 2 === 1;
              return (
              <div
                key={v.num}
                className="py-8 border-b border-rule-l"
                style={{
                  opacity:    valuesActive ? 1 : 0,
                  transform:  valuesActive ? 'none' : 'translateY(18px)',
                  transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 85}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 85}ms`,
                }}
              >
                {/* Mobile: inline number + title, body below */}
                <div className="flex items-baseline gap-4 mb-3 md:hidden">
                  <span
                    className="font-display font-extrabold tracking-display shrink-0"
                    style={{ fontSize: '1.3rem', color: P.coral }}
                    aria-hidden
                  >{v.num}</span>
                  <h3
                    className="font-display font-bold text-ink leading-tight tracking-display"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
                  >{v.title}</h3>
                </div>
                <p className="font-sans text-ink-2 leading-[1.78] pretty md:hidden" style={{ fontSize: '15.5px' }}>
                  {v.body}
                </p>

                {/* Desktop: 3-column ruled grid — even rows indent right for asymmetry */}
                <div
                  className="hidden md:grid md:gap-x-10 md:items-start"
                  style={{
                    gridTemplateColumns: isEven ? '72px 220px 1fr' : '72px 196px 1fr',
                    transform: isEven ? 'translateX(48px)' : 'none',
                  }}
                >
                  <span
                    className="font-display font-extrabold tracking-display leading-none"
                    style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', color: P.coral }}
                    aria-hidden
                  >{v.num}</span>
                  <h3
                    className="font-display font-bold text-ink leading-[1.1] tracking-display"
                    style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', paddingTop: '4px' }}
                  >{v.title}</h3>
                  <p className="font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '15.5px' }}>
                    {v.body}
                  </p>
                </div>
              </div>
              );
            })}
          </div>

        </div>
      </section>

    </>
  );
}
