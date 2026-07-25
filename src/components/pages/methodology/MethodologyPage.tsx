'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';

/* ── Utility ──────────────────────────────────────────────────────────────── */

function fade(v: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: v ? 1 : 0,
    transform: v ? 'none' : 'translateY(28px)',
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-mono text-forest uppercase transition-colors duration-200 hover:text-forest-2"
      style={{
        fontSize: '9.5px',
        letterSpacing: '0.13em',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
      }}
    >
      {children}
      <svg width="14" height="9" viewBox="0 0 16 10" fill="none" aria-hidden>
        <line x1="0" y1="5" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" />
        <polyline points="8,1 13,5 8,9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

/* ── Hero Distribution SVG ───────────────────────────────────────────────── */

const BELL =
  'M 20 130 C 80 130, 120 129, 160 123 C 200 115, 220 95, 240 72 ' +
  'C 260 49, 278 18, 300 12 ' +
  'C 322 18, 340 49, 360 72 ' +
  'C 380 95, 400 115, 440 123 C 480 129, 520 130, 580 130';

const MARKERS = [
  { x: 200, label: 'P10', color: '#3EA6A3' },
  { x: 300, label: 'P50', color: '#2C5251' },
  { x: 400, label: 'P80', color: '#2C5251' },
] as const;

function HeroDistribution() {
  const [phase, setPhase] = useState(0);
  const [looping, setLooping] = useState(false);

  useEffect(() => {
    const pref =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) { setPhase(2); setLooping(true); return; }

    const a = setTimeout(() => setPhase(1), 600);
    const b = setTimeout(() => setPhase(2), 1900);
    const c = setTimeout(() => setLooping(true), 3400);
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c); };
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      <svg
        viewBox="0 0 600 158"
        fill="none"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        role="img"
        aria-label="Probability distribution from P10 to P80, derived from Monte Carlo simulation"
      >
        <line x1="20" y1="130" x2="580" y2="130" stroke="#D5D9E8" strokeWidth="1.5" />

        <g style={{ opacity: phase >= 1 ? 0 : 1, transition: 'opacity 0.45s ease-out' }}>
          <rect x="294" y="16" width="12" height="114" fill="#2C5251" fillOpacity="0.45" />
          <text x="300" y="11" textAnchor="middle" fill="#2C5251" fillOpacity="0.6" fontSize="8.5" fontFamily="JetBrains Mono, Menlo, monospace" letterSpacing="0.12em">
            POINT ESTIMATE
          </text>
        </g>

        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: '50% 100%',
            transform: phase >= 1 ? 'scaleX(1)' : 'scaleX(0.04)',
            opacity: looping ? undefined : (phase >= 1 ? 1 : 0),
            transition: looping ? 'none' : 'transform 1.6s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease-out',
            animation: looping ? 'distBreath 5s ease-in-out infinite' : 'none',
          }}
        >
          <path d={`${BELL} L 580 130 L 20 130 Z`} fill="#2C5251" fillOpacity="0.1" />
          <path d={BELL} stroke="#2C5251" strokeWidth="2" strokeLinecap="round" />
        </g>

        {MARKERS.map(({ x, label, color }) => (
          <g
            key={label}
            style={{
              opacity: looping ? undefined : (phase === 2 ? 1 : 0),
              transition: looping ? 'none' : 'opacity 0.8s cubic-bezier(0.16,1,0.3,1)',
              animation: looping && label === 'P50' ? 'p50Live 3.5s ease-in-out infinite' : 'none',
            }}
          >
            <line x1={x} y1="18" x2={x} y2="130" stroke={color} strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.6" />
            <text x={x} y="149" textAnchor="middle" fill={color} fontSize="11" fontFamily="JetBrains Mono, Menlo, monospace" letterSpacing="0.08em">
              {label}
            </text>
          </g>
        ))}
      </svg>

      <p
        className="font-mono text-ink-3 text-center"
        style={{
          fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase',
          marginTop: '12px', opacity: phase === 2 ? 1 : 0,
          transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        Probability distribution · Cost at completion
      </p>
    </div>
  );
}

/* ── Methodology Hero ─────────────────────────────────────────────────────── */

function MethodologyHero() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.04 });

  return (
    <section ref={ref} className="bg-canvas text-ink relative overflow-hidden" style={{ paddingTop: '60px', paddingBottom: '52px' }}>
      <div className="absolute inset-0 bg-grid-light pointer-events-none" style={{ opacity: 0.5 }} />

      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16 relative" style={{ zIndex: 1 }}>
        <div className="grid lg:grid-cols-[1fr_480px] gap-x-20 gap-y-14 items-center">
          <div>
            <div style={fade(inView, 0)}>
              <span className="font-mono font-semibold text-forest uppercase" style={{ fontSize: '11.5px', letterSpacing: '0.16em' }}>
                Methodology
              </span>
            </div>

            <div style={fade(inView, 60)} className="mt-5">
              <h1
                className="font-display font-extrabold text-ink leading-[0.95] tracking-display balance"
                style={{ fontSize: 'clamp(2.8rem, 5.2vw, 5.2rem)' }}
              >
                The rigor is <span className="text-forest">the product.</span>
              </h1>
            </div>

            <div style={fade(inView, 150)} className="mt-6">
              <p className="font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '17px', maxWidth: '54ch' }}>
                Every quantitative output, every P50, every P80, every contingency recommendation, is derivable
                from documented methodology, traceable inputs, and validated assumptions. Travo will not produce
                visually impressive risk registers and color-coded heat maps without underlying probabilistic
                analysis.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-8" style={fade(inView, 220)}>
              {['AACE 41R-08', 'AACE 57R-09', 'P10 / P50 / P80'].map((t) => (
                <span
                  key={t}
                  className="font-mono text-ink-3 uppercase"
                  style={{ fontSize: '9.5px', letterSpacing: '0.15em', border: '1px solid #D5D9E8', padding: '5px 12px' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center" style={fade(inView, 100)}>
            <HeroDistribution />
          </div>
        </div>
      </div>
    </section>
  );
}

// Harbor Teal (forest) — spec-prescribed dark support for data viz on canvas
const DARK_ROSE = '#2C5251';

/* ── Two Forms mini visualizations ───────────────────────────────────────── */

function OperationalViz() {
  const path =
    'M 8 58 C 22 58, 36 57, 54 52 C 72 46, 80 36, 88 22 ' +
    'C 94 10, 98 6, 100 5 ' +
    'C 102 6, 106 10, 112 22 ' +
    'C 120 36, 128 46, 146 52 C 164 57, 178 58, 192 58';
  return (
    <svg viewBox="0 0 200 70" fill="none" style={{ width: '100%', maxWidth: 200, height: 'auto' }} aria-hidden>
      <line x1="8" y1="60" x2="192" y2="60" stroke="#D5D9E8" strokeWidth="1" />
      <path d={`${path} L 192 60 L 8 60 Z`} fill="#2C5251" fillOpacity="0.1" />
      <path d={path} stroke="#2C5251" strokeWidth="1.5" strokeLinecap="round" />
      {[
        { x: 70, label: 'P10', color: '#3EA6A3' },
        { x: 100, label: 'P50', color: '#2C5251' },
        { x: 130, label: 'P80', color: DARK_ROSE },
      ].map(({ x, label, color }) => (
        <g key={label}>
          <line x1={x} y1="8" x2={x} y2="60" stroke={color} strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.6" />
          <text x={x} y="70" textAnchor="middle" fill={color} fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function StrategicViz() {
  const pathA =
    'M 5 60 C 18 60, 32 59, 52 54 C 72 48, 80 37, 86 24 ' +
    'C 91 13, 94 7, 97 5 ' +
    'C 100 7, 103 13, 108 24 ' +
    'C 114 37, 122 48, 142 54 C 162 59, 175 60, 190 60';
  const pathB =
    'M 22 60 C 36 60, 55 59, 76 53 C 97 47, 108 35, 116 22 ' +
    'C 122 11, 126 6, 130 4 ' +
    'C 134 6, 138 11, 144 22 ' +
    'C 152 35, 163 47, 176 54 C 185 58, 190 60, 195 60';
  return (
    <svg viewBox="0 0 200 70" fill="none" style={{ width: '100%', maxWidth: 200, height: 'auto' }} aria-hidden>
      <line x1="5" y1="60" x2="195" y2="60" stroke="#D5D9E8" strokeWidth="1" />
      <path d={`${pathA} L 190 60 L 5 60 Z`} fill="#2C5251" fillOpacity="0.1" />
      <path d={pathA} stroke="#2C5251" strokeWidth="1.5" strokeLinecap="round" />
      <text x="68" y="47" textAnchor="middle" fill="#2C5251" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">
        OPT A
      </text>
      <path d={`${pathB} L 195 60 L 22 60 Z`} fill={DARK_ROSE} fillOpacity="0.08" />
      <path d={pathB} stroke={DARK_ROSE} strokeWidth="1.5" strokeLinecap="round" />
      <text x="148" y="35" textAnchor="middle" fill={DARK_ROSE} fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">
        OPT B
      </text>
    </svg>
  );
}

/* ── 01 · Two Forms of Quantitative Analysis ─────────────────────────────── */

const FORMS = [
  {
    id: 'operational',
    label: 'Within a chosen plan',
    heading: 'Operational quantitative risk analysis',
    body: 'Monte Carlo–based schedule and cost simulation, sensitivity analysis, and probabilistic contingency derivation; quantifying uncertainty within a chosen plan: how much could this project cost, how long could it take, and how much contingency is defensible.',
    viz: <OperationalViz />,
  },
  {
    id: 'strategic',
    label: 'Among different paths',
    heading: 'Strategic alternatives analysis',
    body: 'Structured scenario methods, multi-criteria comparison, and real-options framing where appropriate; quantifying the comparative attractiveness among substantively different alternatives under long-horizon uncertainty: make versus buy, build versus retrofit, alternative delivery models or phasing strategies.',
    viz: <StrategicViz />,
  },
];

function FormMark({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-display font-extrabold text-forest select-none"
      style={{ fontSize: 'clamp(3.2rem, 5.4vw, 4.8rem)', lineHeight: 0.8, display: 'block' }}
      aria-hidden
    >
      {children}
    </span>
  );
}

function TwoFormsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.07 });

  return (
    <section ref={ref} className="bg-canvas text-ink border-t border-rule-l" style={{ paddingTop: '44px', paddingBottom: '76px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-16" style={fade(inView, 0)}>
          <h2
            className="font-display font-extrabold text-ink leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.1rem)', maxWidth: '34ch' }}
          >
            Operational risk analysis{' '}
            <span className="text-forest">and strategic alternatives analysis.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-14">
          {FORMS.map((form, i) => (
            <div
              key={form.id}
              className="flex gap-6"
              style={{ ...fade(inView, 80 + i * 110), marginTop: i === 1 ? '56px' : 0 }}
            >
              <FormMark>{i === 0 ? 'I' : 'II'}</FormMark>
              <div className="flex flex-col pt-2 min-w-0">
                <div className="flex items-start justify-between gap-6 mb-5">
                  <span className="font-mono font-semibold text-forest uppercase" style={{ fontSize: '9.5px', letterSpacing: '0.16em', marginTop: '6px' }}>
                    {form.label}
                  </span>
                  <div style={{ width: 140, flexShrink: 0, marginTop: '20px' }}>{form.viz}</div>
                </div>
                <h3 className="font-display font-bold text-ink leading-snug tracking-tight" style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.55rem)', marginBottom: '14px' }}>
                  {form.heading}
                </h3>
                <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15px' }}>
                  {form.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-sans text-ink-2 leading-[1.74] pretty mt-14 pt-8" style={{ fontSize: '15px', maxWidth: '68ch', borderTop: '1px solid #D5D9E8', ...fade(inView, 300) }}>
          All methodology is grounded in AACE Recommended Practices, peer-reviewed academic research,
          established quantitative standards, and institutional experience drawn from completed project
          audits and lessons learned.
        </p>
      </div>
    </section>
  );
}

/* ── 02 · Operational Risk Management ────────────────────────────────────── */

function MonteCarloHistogram({ active }: { active: boolean }) {
  const BINS = [
    { x: -4, h: 0.04 }, { x: -2, h: 0.09 }, { x: 0, h: 0.16 },
    { x: 2, h: 0.28 }, { x: 4, h: 0.43 }, { x: 6, h: 0.63 },
    { x: 8, h: 0.80 }, { x: 10, h: 0.92 }, { x: 12, h: 0.98 },
    { x: 14, h: 0.88 }, { x: 16, h: 0.73 }, { x: 18, h: 0.53 },
    { x: 20, h: 0.37 }, { x: 22, h: 0.23 }, { x: 24, h: 0.14 },
    { x: 26, h: 0.08 }, { x: 28, h: 0.04 }, { x: 30, h: 0.02 },
  ];
  const W = 440, H = 150, PL = 8, PR = 8, PT = 20, PB = 26;
  const CW = W - PL - PR, CH = H - PT - PB;
  const BW = CW / BINS.length;
  const toX = (v: number) => PL + ((v + 4) / 36) * CW;

  const markers = [
    { v: 7, label: 'P10', color: '#3EA6A3' },
    { v: 12, label: 'P50', color: '#71D2CF' },
    { v: 17, label: 'P80', color: '#FFB9BB' },
  ] as const;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none" style={{ width: '100%', height: 'auto', overflow: 'visible' }} aria-hidden>
      <line x1={PL} y1={PT + CH} x2={W - PR} y2={PT + CH} stroke="#28283E" strokeWidth="1" />
      {BINS.map((bin, i) => {
        const barH = bin.h * CH;
        const y = PT + CH - barH;
        const coral = bin.x >= 18;
        return (
          <rect
            key={i} x={PL + i * BW + 1} y={y} width={BW - 2} height={barH}
            fill={coral ? '#FF5B5E' : '#71D2CF'} fillOpacity={coral ? 0.68 : 0.78}
            style={{
              transformBox: 'fill-box', transformOrigin: 'center bottom',
              transform: active ? 'scaleY(1)' : 'scaleY(0)', opacity: active ? 1 : 0,
              transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${80 + i * 35}ms, opacity 0.4s ease-out ${80 + i * 35}ms`,
            }}
          />
        );
      })}
      {markers.map(({ v, label, color }) => (
        <g key={label} style={{ opacity: active ? 1 : 0, transition: 'opacity 0.6s ease-out 850ms' }}>
          <line x1={toX(v)} y1={PT} x2={toX(v)} y2={PT + CH} stroke={color} strokeWidth="1" strokeDasharray="4 3" />
          <text x={toX(v)} y={PT - 6} textAnchor="middle" fill={color} fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const OPERATIONAL_ITEMS = [
  {
    id: 'monte-carlo',
    heading: 'Monte Carlo simulation',
    body: 'A computational method that models an uncertain outcome by sampling its input variables from probability distributions thousands of times and recording the result of each iteration. Instead of one cost figure or one completion date, the simulation produces a full cost distribution and schedule distribution: the range of outcomes and how likely each is. It is the standard technique underlying probabilistic cost and schedule analysis in capital projects.',
  },
  {
    id: 'percentiles',
    heading: 'P10 · P50 · P80',
    body: 'Percentile readings of a simulated distribution, expressed in JetBrains Mono throughout Travo deliverables. P10: a 10 percent chance the outcome will not exceed this value, an optimistic bound. P50: the median; outcomes are equally likely to land above or below. P80: an 80 percent chance the outcome will not exceed this value, a common basis for owner budgets and contingency positions. Whether "exceed" means more cost or more time depends on the distribution being read; Travo states the adverse direction on every chart.',
  },
  {
    id: 'sensitivity',
    heading: 'Sensitivity analysis',
    body: 'Sensitivity analysis measures the relative influence each uncertain input has on the simulated project outcome. It lets decision-makers interrogate assumptions and determine where money and time spent on mitigation will actually move the result. The results are typically visualized in a tornado chart: influences ranked as horizontal bars, so it is visible at a glance which few risks dominate the outcome and deserve attention.',
  },
  {
    id: 'contingency',
    heading: 'Contingency derivation',
    body: 'Setting contingency as the difference between the base estimate and a selected confidence level of the simulated distribution (for example, funding to P80), rather than applying a flat percentage by habit. A derived contingency is defensible, auditable, and right-sized: it makes explicit both the risk of holding too little and the capital cost of holding too much.',
  },
] as const;

function OperationalRiskSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section ref={ref} className="bg-canvas-1" style={{ paddingTop: '60px', paddingBottom: '76px', borderTop: '1px solid #D5D9E8' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-14 items-start mb-12">
          <div style={fade(inView, 0)}>
            <h2
              className="font-display font-extrabold text-ink leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.1rem)', maxWidth: '30ch' }}
            >
              Within a chosen plan: from{' '}
              <span className="text-forest">single points to distributions.</span>
            </h2>
            <p className="font-sans text-ink-2 leading-[1.74] pretty mt-4" style={{ fontSize: '16px', maxWidth: '62ch' }}>
              Quantifying uncertainty within a chosen plan: how much could this project cost, how long could
              it take, and how much contingency is defensible. A brief technical primer: the explanations
              below are general methodology context, distinct from claims about Travo&apos;s own engagements;
              sources are listed at the end of this page.
            </p>
          </div>

          <div style={{ ...fade(inView, 120), marginTop: '56px' }}>
            <MonteCarloHistogram active={inView} />
            <p className="font-mono font-semibold text-forest uppercase mt-3" style={{ fontSize: '9px', letterSpacing: '0.14em' }}>
              Illustrative Monte Carlo output · 10,000 iterations
            </p>
          </div>
        </div>

        <div
          className="pb-10 mb-10"
          style={{ borderBottom: '1px solid #D5D9E8', ...fade(inView, 180) }}
        >
          <h3 className="font-display font-bold text-ink leading-snug tracking-tight" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)', marginBottom: '14px' }}>
            {OPERATIONAL_ITEMS[0].heading}
          </h3>
          <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15px', maxWidth: '72ch' }}>
            {OPERATIONAL_ITEMS[0].body}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-x-10 gap-y-8">
          {OPERATIONAL_ITEMS.slice(1).map((item, i) => (
            <div
              key={item.id}
              className={i > 0 ? 'sm:border-l sm:pl-8 border-[#D5D9E8]' : ''}
              style={fade(inView, 280 + i * 90)}
            >
              <h3 className="font-display font-bold text-ink leading-snug tracking-tight" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', marginBottom: '10px' }}>
                {item.heading}
              </h3>
              <p className="font-sans text-ink-2 leading-[1.68] pretty" style={{ fontSize: '13.5px' }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 03 · Strategic Risk Management ──────────────────────────────────────── */

const STRATEGIC_ITEMS = [
  {
    id: 'alternatives',
    heading: 'Strategic alternatives analysis',
    body: 'Decision-analysis techniques for comparing substantively different paths: make versus buy, build versus retrofit, alternative technology choices, alternative delivery models or phasing strategies. Quantifying the relative attractiveness of each path across cost, schedule, risk, and strategic-value dimensions, so the choice is made on evidence rather than advocacy.',
  },
  {
    id: 'scenario',
    heading: 'Scenario and multi-criteria methods',
    body: 'Decision-analysis techniques for comparing substantively different paths: structured scenario analysis stresses each alternative against coherent future states; multi-criteria analysis scores alternatives across cost, schedule, risk, and strategic-value dimensions; real-options framing values flexibility, the ability to defer, stage, expand, or abandon, where that flexibility has economic worth under long-horizon uncertainty.',
  },
] as const;

function StrategicRiskSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.07 });

  return (
    <section ref={ref} className="bg-canvas" style={{ paddingTop: '60px', paddingBottom: '76px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_240px] gap-14 items-start mb-12">
          <div style={fade(inView, 0)}>
            <h2
              className="font-display font-extrabold text-ink leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.1rem)', maxWidth: '32ch' }}
            >
              Among different paths: comparing{' '}
              <span className="text-forest">alternatives under uncertainty.</span>
            </h2>
            <p className="font-sans text-ink-2 leading-[1.74] pretty mt-4" style={{ fontSize: '16px', maxWidth: '64ch' }}>
              Quantifying the comparative attractiveness among substantively different alternatives under
              long-horizon uncertainty: before commitment, at the stage where the largest improvements in
              project value are achievable and the cost of methodological rigor is lowest.
            </p>
          </div>
          <div className="hidden lg:flex justify-start" style={{ ...fade(inView, 120), marginTop: '64px' }}>
            <StrategicViz />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-x-14 items-start">
          <div style={fade(inView, 200)}>
            <h3 className="font-display font-bold text-ink leading-snug tracking-tight" style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)', marginBottom: '14px' }}>
              {STRATEGIC_ITEMS[0].heading}
            </h3>
            <p className="font-sans text-ink-2 leading-[1.7] pretty" style={{ fontSize: '14.5px' }}>
              {STRATEGIC_ITEMS[0].body}
            </p>
          </div>
          <div className="hidden lg:block" style={{ background: '#D5D9E8' }} />
          <div style={{ ...fade(inView, 300), marginTop: '44px' }}>
            <h3 className="font-display font-bold text-ink leading-snug tracking-tight" style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)', marginBottom: '14px' }}>
              {STRATEGIC_ITEMS[1].heading}
            </h3>
            <p className="font-sans text-ink-2 leading-[1.7] pretty" style={{ fontSize: '14.5px' }}>
              {STRATEGIC_ITEMS[1].body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 04 · Risk Register Development & Updating ───────────────────────────── */

const REGISTER_ITEMS = [
  {
    id: 'development',
    heading: 'Risk register development',
    body: 'Workshop-driven identification, characterization, and structuring of project risks across cost, schedule, technical, regulatory, environmental, and external categories: each risk assigned an owner, a probability and impact assessment, and a mitigation strategy. The structured register is what feeds defensible probability distributions and impact assessments into the quantitative model.',
    links: [{ label: 'Structured risk register development', href: '/services#a1' }],
  },
  {
    id: 'updating',
    heading: 'Risk updating',
    body: 'Conditions change; the register must change with them. On a defined cadence, and whenever a material change occurs, risks are re-scored, retired risks are closed with their outcomes recorded, emerging risks are added, change-impact assessments are run, and the quantitative forecast (P50/P80 cost and schedule) is refreshed against current data. Updating is what converts a register from a compliance artifact into an early-warning system.',
    links: [
      { label: 'Risk register management retainer', href: '/services#c1' },
      { label: 'Trend risk analysis', href: '/services#c2' },
    ],
  },
] as const;

function RiskRegisterSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.07 });

  return (
    <section ref={ref} className="bg-canvas-1" style={{ paddingTop: '60px', paddingBottom: '76px', borderTop: '1px solid #D5D9E8' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-16 mx-auto text-center" style={{ ...fade(inView, 0), maxWidth: '58ch' }}>
          <h2
            className="font-display font-extrabold text-ink leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.1rem)' }}
          >
            The register: developed once,{' '}
            <span className="text-forest">kept alive throughout.</span>
          </h2>
          <p className="font-sans text-ink-2 leading-[1.74] pretty mt-4 mx-auto" style={{ fontSize: '16px' }}>
            The risk register is the structured foundation beneath both forms of analysis: the documented
            record of what could go wrong, how likely, how large, and who owns the response. A register that
            is built and then shelved is methodological theater; Travo treats it as a living instrument.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_64px_1fr] gap-x-4 items-start">
          <div style={fade(inView, 100)}>
            <h3 className="font-display font-bold text-ink leading-snug tracking-tight" style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.55rem)', marginBottom: '14px' }}>
              {REGISTER_ITEMS[0].heading}
            </h3>
            <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15px' }}>
              {REGISTER_ITEMS[0].body}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
              {REGISTER_ITEMS[0].links.map((l) => (
                <ArrowLink key={l.href} href={l.href}>{l.label}</ArrowLink>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center" style={{ paddingTop: '48px', ...fade(inView, 200) }}>
            <svg width="40" height="14" viewBox="0 0 40 14" fill="none" className="text-forest" aria-hidden>
              <line x1="0" y1="7" x2="30" y2="7" stroke="currentColor" strokeWidth="1.5" />
              <polyline points="24,1 31,7 24,13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ ...fade(inView, 260), marginTop: '48px' }}>
            <h3 className="font-display font-bold text-ink leading-snug tracking-tight" style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.55rem)', marginBottom: '14px' }}>
              {REGISTER_ITEMS[1].heading}
            </h3>
            <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15px' }}>
              {REGISTER_ITEMS[1].body}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
              {REGISTER_ITEMS[1].links.map((l) => (
                <ArrowLink key={l.href} href={l.href}>{l.label}</ArrowLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 05 · The Observational Method ───────────────────────────────────────── */

function ObservationalLoop() {
  const steps = ['Predict', 'Observe', 'Update'];
  return (
    <div className="flex items-start" aria-hidden>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className="flex flex-col items-center" style={{ width: '58px' }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#2C5251' }} />
            <span className="font-mono font-semibold text-forest uppercase mt-2 text-center" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 1, background: '#D5D9E8', marginTop: '4px' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ObservationalMethodSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="bg-canvas"
      style={{ paddingTop: '64px', paddingBottom: '64px', borderTop: '1px solid #D5D9E8' }}
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_220px] gap-12 items-center">
          <div style={fade(inView, 0)}>
            <h2 className="font-display font-extrabold text-ink leading-[0.97] tracking-display" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)' }}>
              Construction as an information-gathering phase.
            </h2>
            <p className="font-sans text-ink-2 leading-[1.72] pretty mt-4" style={{ fontSize: '15.5px', maxWidth: '68ch' }}>
              An approach from geotechnical engineering in which construction
              itself is treated as an information-gathering phase: the plan is updated as new data arrives and
              uncertainty resolves. It is central to the principal&apos;s doctoral research and to how Travo
              frames during-project risk management, monitoring, reassessment, and structured
              response as conditions change.
            </p>
          </div>
          <div className="hidden lg:block" style={{ paddingTop: '4px', ...fade(inView, 150) }}>
            <ObservationalLoop />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 06 · Experience-Based Risk Intelligence ─────────────────────────────── */

function ExperienceBasedSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });

  return (
    <section ref={ref} className="bg-navy relative overflow-hidden" style={{ paddingTop: '68px', paddingBottom: '88px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16 relative" style={{ zIndex: 1 }}>
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div style={fade(inView, 0)}>
            <h2
              className="font-display font-extrabold text-snow leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.3rem)', maxWidth: '20ch', marginBottom: '20px' }}
            >
              The knowledge base <span className="text-teal">behind the model.</span>
            </h2>
            <div className="flex flex-col gap-4">
              <p className="font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '15.5px' }}>
                Travo&apos;s methodology is grounded in quantitative analysis but is not limited to it. The
                firm draws on an extensive base of completed project audits, post-project reviews, historical
                performance data, and lessons learned: generated across decades of capital project delivery
                through the principal&apos;s operating experience at Sarooj Construction Company and refined
                through Travo&apos;s ongoing applied research.
              </p>
              <p className="font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '15.5px' }}>
                This institutional knowledge informs how risks are identified, interpreted, and prioritized.
                It is the input layer that transforms Monte Carlo simulation from a generic statistical
                exercise into a context-specific assessment of the risks that actually matter on a given
                project.
              </p>
              <p className="font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '15.5px' }}>
                The premise is consistent with established methodology: AACE Recommended Practice 41R-08
                identifies expert judgment and historical analog projects as primary inputs to probabilistic
                risk analysis. No quantitative model produces useful outputs without a defensible knowledge
                base feeding its probability distributions and impact assessments. Travo&apos;s combination
                of academic methodology and substantial completed-project experience provides that knowledge
                base in a way pure-academic and pure-consulting competitors typically cannot.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[1px]" style={{ backgroundColor: '#28283E' }}>
            {[
              {
                label: 'AI-supported analysis, and its limits',
                body: "Where it strengthens the process, Travo applies analytical tools, informed by the principal's active research into AI applications in risk assessment, to surface recurring risk categories and early-warning indicators across historical audit and lessons-learned data that traditional methods may overlook. Such techniques remain strictly subordinate to expert judgment and established quantitative methods. The principal personally reviews and signs every analytical product.",
              },
              {
                label: 'Independence & traceability',
                body: 'Travo does not take engagements from contractors and owners on the same project, does not enter referral arrangements that compromise objectivity, and does not soften analysis to maintain client relationships. Every analysis is built on traceable inputs and documented assumptions, so it can be defended under serious scrutiny.',
              },
            ].map((card, i) => (
              <div key={card.label} className="bg-navy-1" style={{ padding: '28px 32px', ...fade(inView, 120 + i * 100) }}>
                <span className="font-mono text-teal uppercase block" style={{ fontSize: '9px', letterSpacing: '0.16em', marginBottom: '10px' }}>
                  {card.label}
                </span>
                <p className="font-sans text-slate leading-[1.7] pretty" style={{ fontSize: '13.5px' }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 07 · Standards & Tooling ─────────────────────────────────────────────── */

const SOURCES = [
  { name: 'AACE International, Recommended Practices', url: 'web.aacei.org', href: 'https://web.aacei.org' },
  { name: 'Oracle, Primavera Risk Analysis and Crystal Ball documentation', url: 'www.oracle.com', href: 'https://www.oracle.com' },
  { name: 'Safran, Safran Risk product documentation', url: 'www.safran.com', href: 'https://www.safran.com' },
  { name: 'Lumivero, @RISK product documentation', url: 'lumivero.com', href: 'https://lumivero.com' },
  { name: 'Python Software Foundation, Python language', url: 'www.python.org', href: 'https://www.python.org' },
] as const;

function StandardsSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.07 });

  return (
    <section ref={ref} className="bg-canvas" style={{ paddingTop: '60px', paddingBottom: '76px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-12" style={fade(inView, 0)}>
          <h2 className="font-display font-extrabold text-ink leading-[0.97] tracking-display" style={{ fontSize: 'clamp(2rem, 3.6vw, 3.3rem)' }}>
            Named standards. <span className="text-forest">Named software.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-x-14 items-start">
          <div style={fade(inView, 100)}>
            <span className="font-mono text-forest uppercase block" style={{ fontSize: '9px', letterSpacing: '0.18em', marginBottom: '12px' }}>
              Standards
            </span>
            <h3 className="font-display font-bold text-ink" style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', marginBottom: '14px' }}>
              AACE Recommended Practices
            </h3>
            <p className="font-sans text-ink-2 leading-[1.7] pretty" style={{ fontSize: '14px', marginBottom: '14px' }}>
              Travo&apos;s contingency and risk analysis methodology is grounded in AACE International
              Recommended Practices, including:
            </p>
            <ul className="flex flex-col gap-3">
              <li className="font-sans text-ink-2 leading-[1.65]" style={{ fontSize: '13.5px' }}>
                <strong className="text-ink">RP 41R-08</strong>, Risk Analysis and Contingency Determination
                Using Range Estimating: identifying expert judgment and historical analog projects as primary
                inputs to probabilistic analysis.
              </li>
              <li className="font-sans text-ink-2 leading-[1.65]" style={{ fontSize: '13.5px' }}>
                <strong className="text-ink">RP 57R-09</strong>, Integrated Cost and Schedule Risk Analysis
                Using Monte Carlo Simulation of a CPM Model.
              </li>
            </ul>
          </div>

          <div className="hidden lg:block" style={{ background: '#D5D9E8' }} />

          <div style={{ ...fade(inView, 200), marginTop: '40px' }} className="lg:mt-0">
            <span className="font-mono text-forest uppercase block" style={{ fontSize: '9px', letterSpacing: '0.18em', marginBottom: '12px' }}>
              Software
            </span>
            <h3 className="font-display font-bold text-ink" style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', marginBottom: '14px' }}>
              Simulation tooling
            </h3>
            <div className="flex flex-col mb-4" style={{ border: '1px solid #D5D9E8' }}>
              {[
                { k: 'Schedule', v: 'Primavera Risk Analysis · Safran Risk' },
                { k: 'Cost', v: '@RISK · Crystal Ball · Python-based simulation' },
              ].map((row, i) => (
                <div
                  key={row.k}
                  className="grid"
                  style={{ gridTemplateColumns: '88px 1fr', borderTop: i > 0 ? '1px solid #D5D9E8' : 'none' }}
                >
                  <div
                    className="font-mono font-semibold text-forest uppercase"
                    style={{ fontSize: '9.5px', letterSpacing: '0.08em', padding: '11px 12px', borderRight: '1px solid #D5D9E8' }}
                  >
                    {row.k}
                  </div>
                  <div className="font-sans text-ink-2" style={{ fontSize: '13px', padding: '11px 12px' }}>
                    {row.v}
                  </div>
                </div>
              ))}
            </div>
            <p className="font-sans text-ink-3 leading-[1.65] pretty" style={{ fontSize: '13px' }}>
              Tool selection follows the problem; the methodology, documented, traceable, reviewable, does not
              change with the software.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6" style={{ borderTop: '1px solid #D5D9E8', ...fade(inView, 260) }}>
          <h3 className="font-mono font-semibold text-forest uppercase" style={{ fontSize: '11px', letterSpacing: '0.16em', marginBottom: '14px' }}>
            Sources &amp; further reading
          </h3>
          <p className="font-sans text-ink-2 leading-[1.7] pretty" style={{ fontSize: '13.5px', maxWidth: '60ch', marginBottom: '14px' }}>
            General technical context on this page draws on the official sources below. These references
            explain methods and tools; they are not claims about Travo engagements, and no endorsement or
            affiliation is implied.
          </p>
          <ul className="flex flex-col gap-2">
            {SOURCES.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href} target="_blank" rel="noopener noreferrer"
                  className="font-mono transition-colors duration-200"
                  style={{ fontSize: '11px', letterSpacing: '0.02em', color: '#5F6884' }}
                >
                  <span className="text-ink-2">{s.name}</span>
                  {' · '}{s.url}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-4 mt-10 pt-8" style={{ borderTop: '1px solid #D5D9E8', ...fade(inView, 320) }}>
          <Link href="/contact" className="font-mono text-[11px] tracking-label uppercase bg-forest text-canvas px-7 py-[14px] hover:bg-forest-2 transition-colors duration-200">
            Discuss a Project
          </Link>
          <Link href="/services" className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200">
            See Where the Methodology Is Applied
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Page root ────────────────────────────────────────────────────────────── */

export function MethodologyPage() {
  return (
    <>
      <MethodologyHero />
      <TwoFormsSection />
      <OperationalRiskSection />
      <StrategicRiskSection />
      <RiskRegisterSection />
      <ObservationalMethodSection />
      <ExperienceBasedSection />
      <StandardsSection />
    </>
  );
}
