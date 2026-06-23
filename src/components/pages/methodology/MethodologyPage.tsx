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

/* ── Hero Distribution SVG ───────────────────────────────────────────────── */

const BELL =
  'M 20 130 C 80 130, 120 129, 160 123 C 200 115, 220 95, 240 72 ' +
  'C 260 49, 278 18, 300 12 ' +
  'C 322 18, 340 49, 360 72 ' +
  'C 380 95, 400 115, 440 123 C 480 129, 520 130, 580 130';

const MARKERS = [
  { x: 200, label: 'P10', color: '#3EA6A3' },
  { x: 300, label: 'P50', color: '#71D2CF' },
  { x: 400, label: 'P80', color: '#FFB9BB' },
] as const;

function HeroDistribution() {
  const [phase,   setPhase]   = useState(0); // 0=spike, 1=spreading, 2=markers in
  const [looping, setLooping] = useState(false);

  useEffect(() => {
    const pref =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) { setPhase(2); setLooping(true); return; }

    const a = setTimeout(() => setPhase(1),   600);
    const b = setTimeout(() => setPhase(2),   1900);
    const c = setTimeout(() => setLooping(true), 3400); // after markers fully settle
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
        {/* Axis baseline */}
        <line x1="20" y1="130" x2="580" y2="130" stroke="#28283E" strokeWidth="1.5" />

        {/* Single-point estimate — fades out when spread begins */}
        <g
          style={{
            opacity: phase >= 1 ? 0 : 1,
            transition: 'opacity 0.45s ease-out',
          }}
        >
          <rect x="294" y="16" width="12" height="114" fill="#71D2CF" fillOpacity="0.45" />
          <text
            x="300"
            y="11"
            textAnchor="middle"
            fill="#71D2CF"
            fillOpacity="0.5"
            fontSize="8.5"
            fontFamily="JetBrains Mono, Menlo, monospace"
            letterSpacing="0.12em"
          >
            POINT ESTIMATE
          </text>
        </g>

        {/* Bell curve — expands from spike, then breathes */}
        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: '50% 100%',
            transform: phase >= 1 ? 'scaleX(1)' : 'scaleX(0.04)',
            opacity: looping ? undefined : (phase >= 1 ? 1 : 0),
            transition: looping
              ? 'none'
              : 'transform 1.6s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease-out',
            animation: looping ? 'distBreath 5s ease-in-out infinite' : 'none',
          }}
        >
          <path d={`${BELL} L 580 130 L 20 130 Z`} fill="#71D2CF" fillOpacity="0.07" />
          <path d={BELL} stroke="#71D2CF" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Percentile markers — fade in last; P50 pulses once settled */}
        {MARKERS.map(({ x, label, color }) => (
          <g
            key={label}
            style={{
              opacity: looping ? undefined : (phase === 2 ? 1 : 0),
              transition: looping ? 'none' : 'opacity 0.8s cubic-bezier(0.16,1,0.3,1)',
              animation: looping && label === 'P50'
                ? 'p50Live 3.5s ease-in-out infinite'
                : 'none',
            }}
          >
            <line
              x1={x}
              y1="18"
              x2={x}
              y2="130"
              stroke={color}
              strokeWidth="1"
              strokeDasharray="4 3"
              strokeOpacity="0.6"
            />
            <text
              x={x}
              y="149"
              textAnchor="middle"
              fill={color}
              fontSize="11"
              fontFamily="JetBrains Mono, Menlo, monospace"
              letterSpacing="0.08em"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>

      <p
        className="font-mono text-haze text-center"
        style={{
          fontSize: '9px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginTop: '12px',
          opacity: phase === 2 ? 0.5 : 0,
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
    <section
      ref={ref}
      className="bg-navy text-snow relative overflow-hidden"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div
        className="absolute inset-0 bg-grid-dark pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      <div
        className="max-w-site mx-auto px-6 md:px-12 lg:px-16 relative"
        style={{ zIndex: 1 }}
      >
        <div className="grid lg:grid-cols-[1fr_480px] gap-x-20 gap-y-14 items-center">

          {/* Left: text */}
          <div>
            <div style={fade(inView, 0)}>
              <span
                className="font-mono text-teal uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.2em' }}
              >
                Methodology
              </span>
            </div>

            <div style={fade(inView, 60)} className="mt-5">
              <h1
                className="font-display font-extrabold text-snow leading-[0.95] tracking-display balance"
                style={{ fontSize: 'clamp(2.8rem, 5.2vw, 5.2rem)' }}
              >
                Through methodology,
                <br />
                <span className="text-teal">not advocacy.</span>
              </h1>
            </div>

            <div style={fade(inView, 150)} className="mt-6">
              <p
                className="font-sans text-slate leading-[1.78] pretty"
                style={{ fontSize: '17px', maxWidth: '50ch' }}
              >
                Travo closes the gap between rigorous analysis and intuition
                through quantitative modeling, not narrative reassurance; and
                through independence, not alignment with any single party&apos;s
                position.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-2 mt-8"
              style={fade(inView, 220)}
            >
              {['AACE 41R-08', 'AACE 57R-09', 'P10 / P50 / P80'].map((t) => (
                <span
                  key={t}
                  className="font-mono text-haze uppercase"
                  style={{
                    fontSize: '9.5px',
                    letterSpacing: '0.15em',
                    border: '1px solid #28283E',
                    padding: '5px 12px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: animated distribution */}
          <div
            className="hidden lg:flex justify-center"
            style={fade(inView, 100)}
          >
            <HeroDistribution />
          </div>

        </div>
      </div>
    </section>
  );
}

// Custom color: readable on canvas, used for "Option B" / P80 alternative overlays
const DARK_ROSE = '#7A3E44';

/* ── Two Forms mini visualizations ───────────────────────────────────────── */

function OperationalViz() {
  const path =
    'M 8 58 C 22 58, 36 57, 54 52 C 72 46, 80 36, 88 22 ' +
    'C 94 10, 98 6, 100 5 ' +
    'C 102 6, 106 10, 112 22 ' +
    'C 120 36, 128 46, 146 52 C 164 57, 178 58, 192 58';
  return (
    <svg
      viewBox="0 0 200 70"
      fill="none"
      style={{ width: '100%', maxWidth: 200, height: 'auto' }}
      aria-hidden
    >
      <line x1="8" y1="60" x2="192" y2="60" stroke="#D5D9E8" strokeWidth="1" />
      <path
        d={`${path} L 192 60 L 8 60 Z`}
        fill="#2C5251"
        fillOpacity="0.1"
      />
      <path d={path} stroke="#2C5251" strokeWidth="1.5" strokeLinecap="round" />
      {[
        { x: 70,  label: 'P10', color: '#3EA6A3' },
        { x: 100, label: 'P50', color: '#2C5251' },
        { x: 130, label: 'P80', color: DARK_ROSE },
      ].map(({ x, label, color }) => (
        <g key={label}>
          <line
            x1={x} y1="8" x2={x} y2="60"
            stroke={color} strokeWidth="1"
            strokeDasharray="3 2" strokeOpacity="0.6"
          />
          <text
            x={x} y="70" textAnchor="middle"
            fill={color} fontSize="8"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.08em"
          >
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
    <svg
      viewBox="0 0 200 70"
      fill="none"
      style={{ width: '100%', maxWidth: 200, height: 'auto' }}
      aria-hidden
    >
      <line x1="5" y1="60" x2="195" y2="60" stroke="#D5D9E8" strokeWidth="1" />
      <path
        d={`${pathA} L 190 60 L 5 60 Z`}
        fill="#2C5251"
        fillOpacity="0.1"
      />
      <path
        d={pathA}
        stroke="#2C5251"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text
        x="68" y="47"
        textAnchor="middle"
        fill="#2C5251"
        fontSize="7.5"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.08em"
      >
        OPT A
      </text>
      <path
        d={`${pathB} L 195 60 L 22 60 Z`}
        fill={DARK_ROSE}
        fillOpacity="0.08"
      />
      <path
        d={pathB}
        stroke={DARK_ROSE}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text
        x="148" y="35"
        textAnchor="middle"
        fill={DARK_ROSE}
        fontSize="7.5"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.08em"
      >
        OPT B
      </text>
    </svg>
  );
}

/* ── Two Forms Section ────────────────────────────────────────────────────── */

const FORMS = [
  {
    id: 'operational',
    label: 'Operational Risk Analysis',
    heading: 'Quantifying uncertainty within a chosen plan',
    body: 'Monte Carlo cost and schedule simulation, sensitivity analysis, and probabilistic contingency derivation: the tools that reveal the actual distribution of likely outcomes behind a single-point estimate.',
    viz: <OperationalViz />,
  },
  {
    id: 'strategic',
    label: 'Strategic Alternatives Analysis',
    heading: 'Quantifying the choice between paths',
    body: 'Structured scenario methods, multi-criteria comparison, and real-options framing where appropriate: the tools that make a choice between substantively different alternatives defensible under long-horizon uncertainty.',
    viz: <StrategicViz />,
  },
];

function TwoFormsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.07 });

  return (
    <section
      ref={ref}
      className="bg-canvas text-ink"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="mb-12" style={fade(inView, 0)}>
          <h2
            className="font-display font-extrabold text-ink leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.1rem)', maxWidth: '28ch' }}
          >
            Two forms of quantitative risk analysis.{' '}
            <span className="text-forest">One standard of rigor.</span>
          </h2>
          <p
            className="font-sans text-ink-2 leading-[1.74] pretty mt-4"
            style={{ fontSize: '16px', maxWidth: '56ch' }}
          >
            The right method depends on the decision. Travo works across both,
            and is explicit about which a given engagement calls for.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2"
          style={{ gap: '1px', backgroundColor: '#D5D9E8' }}
        >
          {FORMS.map((form, i) => (
            <div
              key={form.id}
              className="bg-canvas-1 flex flex-col"
              style={{ padding: '36px 40px', ...fade(inView, 80 + i * 90) }}
            >
              <div className="mb-6 self-start">{form.viz}</div>

              <span
                className="font-mono text-forest uppercase block"
                style={{ fontSize: '9px', letterSpacing: '0.18em', marginBottom: '10px' }}
              >
                {form.label}
              </span>

              <h3
                className="font-display font-bold text-ink leading-snug tracking-tight"
                style={{
                  fontSize: 'clamp(1.15rem, 1.9vw, 1.55rem)',
                  marginBottom: '14px',
                }}
              >
                {form.heading}
              </h3>

              <p
                className="font-sans text-ink-2 leading-[1.72] pretty"
                style={{ fontSize: '15px' }}
              >
                {form.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Standards Section ────────────────────────────────────────────────────── */

const STACK = [
  {
    role: 'Standards',
    color: '#71D2CF',
    items: [
      'AACE Recommended Practice 41R-08',
      'AACE Recommended Practice 57R-09',
      'Peer-reviewed academic research',
    ],
  },
  {
    role: 'Tooling',
    color: '#8A95B2',
    items: [
      'Primavera Risk Analysis',
      'Safran Risk',
      '@RISK · Crystal Ball · Python',
    ],
  },
  {
    role: 'Output',
    color: '#FFB9BB',
    items: [
      'P10 · P50 · P80 distributions',
      'Fully traceable, documented inputs',
      'Validated assumptions at every step',
    ],
  },
] as const;

function Chevron() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
      <line x1="9" y1="0" x2="9" y2="9" stroke="#28283E" strokeWidth="1.5" strokeLinecap="round" />
      <polyline
        points="5,7 9,13 13,7"
        stroke="#28283E"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StandardsSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.07 });

  return (
    <section
      ref={ref}
      className="bg-navy relative overflow-hidden"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div
        className="absolute inset-0 bg-grid-dark pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      <div
        className="max-w-site mx-auto px-6 md:px-12 lg:px-16 relative"
        style={{ zIndex: 1 }}
      >
        <div className="grid lg:grid-cols-[360px_1fr] gap-16 items-start">

          {/* Left: methodology stack schematic */}
          <div className="flex flex-col gap-0" style={fade(inView, 0)}>
            {STACK.map((layer, i) => (
              <React.Fragment key={layer.role}>
                <div
                  className="bg-navy-1 border border-rule-d"
                  style={{ padding: '20px 24px' }}
                >
                  <span
                    className="font-mono uppercase block"
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.2em',
                      color: layer.color,
                      marginBottom: '10px',
                    }}
                  >
                    {layer.role}
                  </span>
                  {layer.items.map((item) => (
                    <p
                      key={item}
                      className="font-sans text-slate"
                      style={{ fontSize: '13px', lineHeight: '1.65', marginTop: '2px' }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
                {i < STACK.length - 1 && (
                  <div className="flex justify-center" style={{ padding: '5px 0' }}>
                    <Chevron />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Right: copy */}
          <div>
            <div style={fade(inView, 80)}>
              <h2
                className="font-display font-extrabold text-snow leading-[0.97] tracking-display balance"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3.3rem)', maxWidth: '22ch' }}
              >
                Grounded, traceable,{' '}
                <span className="text-teal">defensible.</span>
              </h2>
            </div>

            <div
              className="mt-6 flex flex-col gap-4"
              style={fade(inView, 160)}
            >
              <p
                className="font-sans text-slate leading-[1.78] pretty"
                style={{ fontSize: '16.5px', maxWidth: '52ch' }}
              >
                Every Travo analysis is grounded in AACE International
                Recommended Practices, alongside peer-reviewed academic research
                and established quantitative standards. Every output, every P50,
                every P80, every contingency recommendation, is derivable from
                documented methodology, traceable inputs, and validated
                assumptions.
              </p>
              <p
                className="font-sans text-slate leading-[1.78] pretty"
                style={{ fontSize: '16.5px', maxWidth: '52ch' }}
              >
                Our tooling reflects the same standard: Primavera Risk Analysis
                and Safran Risk for schedule simulation; @RISK, Crystal Ball,
                and Python-based modeling for cost. If an analysis cannot be
                defended in detail, it is not finished.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Research Band ────────────────────────────────────────────────────────── */

function ResearchSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="bg-canvas-1"
      style={{
        paddingTop: '64px',
        paddingBottom: '64px',
        borderTop: '1px solid #D5D9E8',
        borderBottom: '1px solid #D5D9E8',
      }}
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">

          <div style={fade(inView, 0)}>
            <h2
              className="font-display font-extrabold text-ink leading-[0.97] tracking-display"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)' }}
            >
              An active research program.
            </h2>
            <p
              className="font-sans text-ink-2 leading-[1.72] pretty mt-4"
              style={{ fontSize: '15.5px', maxWidth: '60ch' }}
            >
              Travo maintains an active research program into how construction
              cost and schedule outcomes actually behave across the New Jersey
              and New York market. It anchors the firm&apos;s methodology in
              regional evidence rather than national averages, and produces the
              flagship benchmark: the NJ/NY Construction Risk Index.
            </p>
          </div>

          <div style={fade(inView, 90)}>
            <Link
              href="/insights"
              className="font-mono text-forest uppercase transition-colors duration-200 hover:text-forest-2"
              style={{
                fontSize: '10px',
                letterSpacing: '0.15em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}
            >
              Explore the research program
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                <line x1="0" y1="5" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" />
                <polyline
                  points="8,1 13,5 8,9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Engagement Process (4-step) ─────────────────────────────────────────── */

const STEPS = [
  {
    n: '01',
    title: 'Frame the decision',
    body: 'Define the specific decision at stake and the uncertainty that bears on it, so the analysis is scoped to what matters and nothing else.',
  },
  {
    n: '02',
    title: 'Build the analysis',
    body: 'Identify and quantify the relevant risks using the appropriate method, with inputs documented and assumptions validated at each step.',
  },
  {
    n: '03',
    title: 'Translate the findings',
    body: 'Present results as a clear picture of likely outcomes and their drivers: not a register, but a defensible basis for decision.',
  },
  {
    n: '04',
    title: 'Stand behind the work',
    body: 'Every deliverable is reviewed and signed personally by the principal, whose name and credentials it carries.',
  },
] as const;

function EngagementProcessSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });

  return (
    <section
      ref={ref}
      className="bg-canvas"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="mb-10" style={fade(inView, 0)}>
          <h2
            className="font-display font-extrabold text-ink leading-[0.97] tracking-display"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
          >
            What an engagement{' '}
            <span className="text-forest">looks like.</span>
          </h2>
        </div>

        {/* Animated rail — desktop only */}
        <div
          className="hidden lg:block"
          style={{ position: 'relative', height: '2px', marginBottom: '0' }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundColor: '#D5D9E8' }} />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              backgroundColor: '#2C5251',
              transformOrigin: 'left',
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 2s cubic-bezier(0.16,1,0.3,1) 300ms',
            }}
          />
        </div>

        {/* Step grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: '1px',
            backgroundColor: '#D5D9E8',
            borderTop: '1px solid #D5D9E8',
            borderBottom: '1px solid #D5D9E8',
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="bg-canvas flex flex-col"
              style={{ padding: '32px 28px', ...fade(inView, 220 + i * 80) }}
            >
              <span
                className="font-mono text-ink-3 block"
                style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '20px' }}
              >
                {step.n}
              </span>

              <h3
                className="font-display font-bold text-ink leading-snug tracking-tight"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.22rem)', marginBottom: '12px' }}
              >
                {step.title}
              </h3>

              <p
                className="font-sans text-ink-2 leading-[1.68] pretty"
                style={{ fontSize: '14.5px' }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Quantitative Output Charts ────────────────────────────────────────────── */

function MonteCarloHistogram({ active }: { active: boolean }) {
  const BINS = [
    { x: -4, h: 0.04 }, { x: -2, h: 0.09 }, { x: 0,  h: 0.16 },
    { x: 2,  h: 0.28 }, { x: 4,  h: 0.43 }, { x: 6,  h: 0.63 },
    { x: 8,  h: 0.80 }, { x: 10, h: 0.92 }, { x: 12, h: 0.98 },
    { x: 14, h: 0.88 }, { x: 16, h: 0.73 }, { x: 18, h: 0.53 },
    { x: 20, h: 0.37 }, { x: 22, h: 0.23 }, { x: 24, h: 0.14 },
    { x: 26, h: 0.08 }, { x: 28, h: 0.04 }, { x: 30, h: 0.02 },
  ];
  const W = 440, H = 160, PL = 8, PR = 8, PT = 22, PB = 28;
  const CW = W - PL - PR, CH = H - PT - PB;
  const BW = CW / BINS.length;
  const toX = (v: number) => PL + ((v + 4) / 36) * CW;

  const MARKERS = [
    { v: 7,  label: 'P10', color: '#3EA6A3' },
    { v: 12, label: 'P50', color: '#71D2CF' },
    { v: 17, label: 'P80', color: '#FFB9BB' },
  ] as const;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      aria-hidden
    >
      <line x1={PL} y1={PT + CH} x2={W - PR} y2={PT + CH} stroke="#28283E" strokeWidth="1" />

      {BINS.map((bin, i) => {
        const barH = bin.h * CH;
        const y = PT + CH - barH;
        const coral = bin.x >= 18;
        return (
          <rect
            key={i}
            x={PL + i * BW + 1}
            y={y}
            width={BW - 2}
            height={barH}
            fill={coral ? '#FF5B5E' : '#71D2CF'}
            fillOpacity={coral ? 0.68 : 0.78}
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center bottom',
              transform: active ? 'scaleY(1)' : 'scaleY(0)',
              opacity: active ? 1 : 0,
              transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${80 + i * 35}ms, opacity 0.4s ease-out ${80 + i * 35}ms`,
            }}
          />
        );
      })}

      {MARKERS.map(({ v, label, color }) => (
        <g key={label} style={{ opacity: active ? 1 : 0, transition: 'opacity 0.6s ease-out 850ms' }}>
          <line x1={toX(v)} y1={PT} x2={toX(v)} y2={PT + CH} stroke={color} strokeWidth="1" strokeDasharray="4 3" />
          <text x={toX(v)} y={PT - 6} textAnchor="middle" fill={color} fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em">
            {label}
          </text>
        </g>
      ))}

      <g style={{ opacity: active ? 0.65 : 0, transition: 'opacity 0.6s ease-out 1100ms' }}>
        <line x1={toX(25)} y1={PT} x2={toX(25)} y2={PT + CH} stroke="#FF5B5E" strokeWidth="1.5" strokeDasharray="3 4" />
        <text x={toX(25) + 4} y={PT + 14} fill="#FF5B5E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.09em">
          +25% CAP
        </text>
      </g>

      {[0, 8, 16, 24].map(v => (
        <text key={v} x={toX(v)} y={H - 4} textAnchor="middle" fill="#5F6884" fontSize="8" fontFamily="JetBrains Mono, monospace">
          {v === 0 ? '±0%' : `+${v}%`}
        </text>
      ))}
    </svg>
  );
}

function CDFCurve({ active }: { active: boolean }) {
  const path =
    'M 30,132 C 55,132 65,130 79,130 C 95,130 125,123 147,120 ' +
    'C 160,106 180,75 195,74 C 210,73 232,42 244,39 ' +
    'C 280,28 340,18 390,17';

  const toX = (v: number) => 30 + ((v + 5) / 37) * 360;
  const toY = (p: number) => 132 - (p / 100) * 116;

  return (
    <svg
      viewBox="0 0 400 160"
      fill="none"
      style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      aria-hidden
    >
      <line x1="30" y1="16" x2="30" y2="132" stroke="#28283E" strokeWidth="1" />
      <line x1="30" y1="132" x2="390" y2="132" stroke="#28283E" strokeWidth="1" />

      {[25, 50, 75].map(p => (
        <line key={p} x1="30" y1={toY(p)} x2="390" y2={toY(p)} stroke="#28283E" strokeWidth="0.5" opacity="0.35" />
      ))}

      <path d={`${path} L 390,132 L 30,132 Z`} fill="#71D2CF" fillOpacity="0.05" />

      <path
        d={path}
        stroke="#71D2CF"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength="1"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: active ? 0 : 1,
          transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1) 200ms',
        }}
      />

      <g style={{ opacity: active ? 0.75 : 0, transition: 'opacity 0.5s ease-out 1400ms' }}>
        <line x1="30" y1={toY(80)} x2={toX(17)} y2={toY(80)} stroke="#FFB9BB" strokeWidth="1" strokeDasharray="4 3" />
        <line x1={toX(17)} y1="16" x2={toX(17)} y2={toY(80)} stroke="#FFB9BB" strokeWidth="1" strokeDasharray="4 3" />
        <text x={toX(17) + 6} y={toY(80) - 5} fill="#FFB9BB" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em">
          80% ≤ +17%
        </text>
      </g>

      {[
        { v: 7,  p: 10, color: '#3EA6A3', label: 'P10' },
        { v: 12, p: 50, color: '#71D2CF', label: 'P50' },
      ].map(({ v, p, color, label }) => (
        <g key={label} style={{ opacity: active ? 0.45 : 0, transition: 'opacity 0.5s ease-out 1600ms' }}>
          <line x1="30" y1={toY(p)} x2={toX(v)} y2={toY(p)} stroke={color} strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1={toX(v)} y1="16" x2={toX(v)} y2={toY(p)} stroke={color} strokeWidth="0.75" strokeDasharray="3 3" />
        </g>
      ))}

      {[
        { v: 7,  label: 'P10', color: '#3EA6A3' },
        { v: 12, label: 'P50', color: '#71D2CF' },
        { v: 17, label: 'P80', color: '#FFB9BB' },
      ].map(({ v, label, color }) => (
        <text
          key={label}
          x={toX(v)} y="148"
          textAnchor="middle"
          fill={color} fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.07em"
          style={{ opacity: active ? (label === 'P80' ? 0.75 : 0.45) : 0, transition: 'opacity 0.5s ease-out 1400ms' }}
        >
          {label}
        </text>
      ))}

      {[0, 50, 100].map(p => (
        <text key={p} x="25" y={toY(p) + 3} textAnchor="end" fill="#5F6884" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
          {p}%
        </text>
      ))}
    </svg>
  );
}

function QuantOutputSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.06 });
  return (
    <section
      ref={ref}
      className="bg-canvas-1"
      style={{ paddingTop: '96px', paddingBottom: '96px', borderTop: '1px solid #D5D9E8' }}
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="mb-12" style={fade(inView, 0)}>
          <h2
            className="font-display font-extrabold text-ink leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.1rem)', maxWidth: '28ch' }}
          >
            What the analysis produces.
          </h2>
          <p
            className="font-sans text-ink-2 leading-[1.74] pretty mt-4"
            style={{ fontSize: '16px', maxWidth: '58ch' }}
          >
            Every engagement delivers a full probability distribution of outcomes,
            not a single-point estimate. Results are expressed at three standard
            confidence levels — P10, P50, and P80 — derived from 10,000-iteration
            Monte Carlo simulation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div style={fade(inView, 80)}>
              <MonteCarloHistogram active={inView} />
            </div>
            <p
              className="font-mono text-haze uppercase mt-4"
              style={{ ...fade(inView, 600), fontSize: '8px', letterSpacing: '0.14em' }}
            >
              Fig 01 · Monte Carlo cost simulation · 10,000 iterations · P10 +7% · P50 +12% · P80 +17%
            </p>
          </div>
          <div>
            <div style={fade(inView, 160)}>
              <CDFCurve active={inView} />
            </div>
            <p
              className="font-mono text-haze uppercase mt-4"
              style={{ ...fade(inView, 680), fontSize: '8px', letterSpacing: '0.14em' }}
            >
              Fig 02 · Cumulative distribution · 80% confidence: outcome ≤ +17% cost overrun
            </p>
          </div>
        </div>

        <div
          className="mt-10 pt-6"
          style={{ borderTop: '1px solid #D5D9E8', ...fade(inView, 280) }}
        >
          <p className="font-mono text-haze uppercase" style={{ fontSize: '8px', letterSpacing: '0.14em' }}>
            10,000-iteration Monte Carlo · Latin Hypercube sampling · AACE 41R-08 / AACE 57R-09 · Level 3 CPM integration
          </p>
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
      <StandardsSection />
      <QuantOutputSection />
      <ResearchSection />
      <EngagementProcessSection />
    </>
  );
}
