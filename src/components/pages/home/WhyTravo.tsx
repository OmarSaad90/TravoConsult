'use client';

import { useInView } from '../../../hooks/useInView';

/* ── Animated gaussian for Academic Rigor card ─────────── */
function AnimGaussian({ active }: { active: boolean }) {
  const W = 200, H = 80;
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const t   = i / 80;
    const xn  = t * 6 - 3;
    const yRaw = Math.exp(-xn * xn / 2);
    pts.push(`${i === 0 ? 'M' : 'L'}${(4 + t * (W - 8)).toFixed(1)},${(H - yRaw * (H - 14) - 4).toFixed(1)}`);
  }
  const d    = pts.join(' ');
  const fill = `${d} L${W - 4},${H} L4,${H} Z`;
  const p10x = 4 + 0.27 * (W - 8);
  const p50x = 4 + 0.5  * (W - 8);
  const p80x = 4 + 0.73 * (W - 8);
  return (
    <svg viewBox={`0 0 ${W} ${H + 10}`} aria-hidden style={{ width: '100%', height: '76px' }} fill="none">
      <path d={fill} fill="#71D2CF" opacity="0.07" />
      <line x1={4} y1={H} x2={W - 4} y2={H} stroke="#D5D9E8" strokeWidth="0.75" />
      <path id="why-gaussian-path" d={d} stroke="#71D2CF" strokeWidth="2" pathLength="1"
        style={{ strokeDasharray: 1, strokeDashoffset: active ? 0 : 1, transition: 'stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 500ms' }}
      />
      {[{ x: p10x, label: 'P10', c: '#3EA6A3' }, { x: p50x, label: 'P50', c: '#71D2CF' }, { x: p80x, label: 'P80', c: '#FFB9BB' }].map(({ x, label, c }, i) => (
        <g key={label} opacity={active ? 1 : 0} style={{ transition: `opacity 0.5s ${1200 + i * 150}ms` }}>
          <line x1={x} y1={H * 0.25} x2={x} y2={H} stroke={c} strokeWidth="0.75" strokeDasharray="2,3" opacity="0.7" />
          <text x={x} y={H + 8} textAnchor="middle" fill="#2C5251" fontSize="7" fontFamily="JetBrains Mono, monospace">{label}</text>
        </g>
      ))}
      {/* 3 dots traveling along the curve, staggered */}
      {active && (
        <>
          <circle r="2.8" fill="#71D2CF" style={{ filter: 'drop-shadow(0 0 5px #71D2CF)' }}>
            <animateMotion dur="4.2s" repeatCount="indefinite" begin="0s">
              <mpath href="#why-gaussian-path" />
            </animateMotion>
          </circle>
          <circle r="2.2" fill="#3EA6A3" style={{ filter: 'drop-shadow(0 0 4px #3EA6A3)' }}>
            <animateMotion dur="4.2s" repeatCount="indefinite" begin="1.4s">
              <mpath href="#why-gaussian-path" />
            </animateMotion>
          </circle>
          <circle r="1.9" fill="#FFB9BB" style={{ filter: 'drop-shadow(0 0 4px #FFB9BB)' }}>
            <animateMotion dur="4.2s" repeatCount="indefinite" begin="2.8s">
              <mpath href="#why-gaussian-path" />
            </animateMotion>
          </circle>
        </>
      )}
    </svg>
  );
}

/* ── Animated bars for Senior Operator card ───────────── */
function AnimBars({ active }: { active: boolean }) {
  const bars = [
    { label: 'PRE-CON',   h: 44, color: '#71D2CF' },
    { label: 'EXECUTION', h: 72, color: '#FFB9BB' },
    { label: 'POST',      h: 36, color: '#3EA6A3' },
  ];
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
          <span className="font-mono text-haze uppercase text-center" style={{ fontSize: '6.5px', letterSpacing: '0.08em' }}>
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Larger NJ/NY map for Regional Depth card ─────────── */
function NJNYMapLarge() {
  return (
    <div aria-label="New Jersey and New York metropolitan region" role="img">
      <svg viewBox="0 0 140 122" fill="none" style={{ width: '160px', height: '132px', overflow: 'visible' }}>
        <path d={NY_PATH} fill="#71D2CF" fillOpacity="0.1" stroke="#71D2CF" strokeWidth="1.2" strokeOpacity="0.4" />
        <path d={NJ_PATH} fill="#3EA6A3" fillOpacity="0.14" stroke="#3EA6A3" strokeWidth="1.2" strokeOpacity="0.5" />
        {CITIES.map((c) => (
          <g key={c.label}>
            {/* Pulse ring */}
            <circle cx={c.cx} cy={c.cy} r={c.pulseR * 0.45} fill="none"
              stroke="#71D2CF" strokeWidth="2.5" opacity="0.4">
              <animate attributeName="r" values={`${c.pulseR * 0.35};${c.pulseR * 1.2};${c.pulseR * 0.35}`} dur={c.pulseDur} begin={c.pulseDelay} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur={c.pulseDur} begin={c.pulseDelay} repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="3;0.75;3" dur={c.pulseDur} begin={c.pulseDelay} repeatCount="indefinite" />
            </circle>
            {/* Glow halo */}
            <circle cx={c.cx} cy={c.cy} r="7" fill="#71D2CF" opacity="0.28" />
            {/* Solid dot */}
            <circle cx={c.cx} cy={c.cy} r="4.5" fill="#3EA6A3" opacity="1"
              style={{ filter: 'drop-shadow(0 0 6px #3EA6A3)' }} />
            <text x={c.cx + 7} y={c.cy + 2} fill="#2C5251" fontSize="6.5" fontFamily="JetBrains Mono, monospace" opacity="0.9">{c.label}</text>
          </g>
        ))}
        <text x="42" y="30" fill="#71D2CF" fontSize="8" fontFamily="JetBrains Mono, monospace" opacity="0.45" letterSpacing="0.1em">NY</text>
        <text x="104" y="80" fill="#3EA6A3" fontSize="8" fontFamily="JetBrains Mono, monospace" opacity="0.55" letterSpacing="0.1em">NJ</text>
        <circle cx="84" cy="62" r="22" stroke="#71D2CF" strokeWidth="0.5" strokeDasharray="3,4" opacity="0.22" />
      </svg>
      <p className="font-mono text-haze mt-1" style={{ fontSize: '7.5px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        NJ / NY Metro Region
      </p>
    </div>
  );
}

/* ── NJ/NY simplified map ─────────────────────────────── */
// Simplified polygon approximations of state outlines
const NY_PATH =
  'M 8,6 L 108,6 L 114,18 L 112,30 L 102,36 L 90,40 L 86,48 L 90,54 L 84,60 L 76,62 L 66,58 L 54,64 L 42,62 L 30,56 L 16,58 L 8,50 L 6,32 Z';
const NJ_PATH =
  'M 90,54 L 108,46 L 120,52 L 125,66 L 121,80 L 114,94 L 102,106 L 90,110 L 80,100 L 74,84 L 76,68 Z';

const CITIES = [
  { cx: 84, cy: 60, label: 'NYC',     pulseR: 12, pulseDur: '2.6s', pulseDelay: '0s'   },
  { cx: 78, cy: 68, label: 'Newark',  pulseR: 9,  pulseDur: '3.1s', pulseDelay: '0.8s' },
  { cx: 90, cy: 82, label: 'Trenton', pulseR: 8,  pulseDur: '3.5s', pulseDelay: '1.6s' },
];


const DIFFERENTIATORS = [
  {
    id: '01',
    title: 'Academic Rigor',
    desc: 'Methodology grounded in peer-reviewed research and recognized quantitative standards, not the visually impressive but analytically empty deliverables the risk industry too often produces.',
    visual: 'curve' as const,
  },
  {
    id: '02',
    title: 'Senior Operator Experience',
    desc: 'Analysis informed by hands-on delivery of heavy civil construction at scale. We have lived the decisions we model, which keeps the work practical rather than theoretical.',
    visual: 'timeline' as const,
  },
  {
    id: '03',
    title: 'Regional Depth',
    desc: 'A working knowledge of the relationships, regulatory environment, and capital project ecosystem specific to the New Jersey and New York metropolitan region.',
    visual: 'coords' as const,
  },
] as const;

export function WhyTravo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.06 });

  return (
    <section
      id="values"
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden py-[96px] md:py-[120px]"
      aria-labelledby="why-heading"
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div style={fade(inView, 0)} className="mb-10">
          <h2
            id="why-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
          >
            <span className="text-ink">Three things the broader market</span>
            <br />
            <span className="text-forest">rarely combines.</span>
          </h2>
        </div>

        {/* Three differentiators — horizontal on desktop, stacked on mobile */}
        <div
          className="grid lg:grid-cols-3 border-t border-rule-l"
          role="list"
          aria-label="Differentiators"
        >
          {DIFFERENTIATORS.map((d, i) => (
            <article
              key={d.title}
              role="listitem"
              style={fade(inView, 80 + i * 100)}
              className={[
                'pt-10 pb-12',
                i < 2  ? 'lg:pr-12 lg:border-r lg:border-rule-l' : '',
                i > 0  ? 'lg:pl-12' : '',
                i > 0  ? 'border-t border-rule-l lg:border-t-0' : '',
              ].join(' ')}
            >
              {/* Sequence indicator */}
              <div className="font-mono text-forest uppercase mb-5" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
                {d.id} / 03
              </div>

              {/* Title */}
              <h3
                className="font-display font-bold text-ink leading-[0.97] tracking-display"
                style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)' }}
              >
                {d.title}
              </h3>

              {/* Teal accent rule */}
              <div className="mt-4 h-px w-10" style={{ backgroundColor: '#71D2CF', opacity: 0.5 }} />

              {/* Description */}
              <p
                className="mt-5 font-sans text-ink-2 leading-[1.72] pretty"
                style={{ fontSize: '15.5px' }}
              >
                {d.desc}
              </p>

              {/* Bottom visual element */}
              <div className="mt-8 pt-5 border-t border-rule-l">
                {d.visual === 'curve' && <AnimGaussian active={inView} />}
                {d.visual === 'timeline' && <AnimBars active={inView} />}
                {d.visual === 'coords' && <NJNYMapLarge />}
              </div>
            </article>
          ))}
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
