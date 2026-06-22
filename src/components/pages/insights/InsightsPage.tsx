'use client';

import type { CSSProperties } from 'react';
import { useInView } from '../../../hooks/useInView';

// ── Design tokens ─────────────────────────────────────────────────────────────
const P = {
  navy:    '#1E1E2E',
  navy1:   '#252538',
  ruleD:   '#28283E',
  ruleL:   '#D5D9E8',
  teal:    '#71D2CF',
  tealDp:  '#3EA6A3',
  forest:  '#2C5251',
  sky:     '#C5ECFE',
  coral:   '#FF5B5E',
  blush:   '#FFB9BB',
  snow:    '#E6EAF4',
  slate:   '#8A95B2',
  haze:    '#828DA6',
  ink2:    '#323B5B',
  ink3:    '#5F6884',
} as const;

function fade(active: boolean, delay: number): CSSProperties {
  return {
    opacity:    active ? 1 : 0,
    transform:  active ? 'none' : 'translateY(22px)',
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

// ── Risk fingerprint / spider chart ──────────────────────────────────────────
// 7-dimension risk profile for an illustrative NJ/NY construction project.
const SPIDER_DIMS = [
  { label: 'SCHEDULE',    v: 75 },
  { label: 'COST',        v: 58 },
  { label: 'PROCUREMENT', v: 44 },
  { label: 'GEOLOGICAL',  v: 30 },
  { label: 'REGULATORY',  v: 65 },
  { label: 'STAKEHOLDER', v: 25 },
  { label: 'CONTRACT',    v: 52 },
] as const;

function RiskFingerprint({ active }: { active: boolean }) {
  const N  = SPIDER_DIMS.length;
  const CX = 120, CY = 108, R = 70, LR = 90;

  const aRad = (i: number) => ((-90 + (i * 360) / N) * Math.PI) / 180;

  const outerPts = SPIDER_DIMS.map((d, i) => {
    const a = aRad(i);
    return { x: CX + R * (d.v / 100) * Math.cos(a), y: CY + R * (d.v / 100) * Math.sin(a) };
  });

  const labelPts = SPIDER_DIMS.map((_, i) => {
    const a = aRad(i);
    return { x: CX + LR * Math.cos(a), y: CY + LR * Math.sin(a) };
  });

  const polyStr = outerPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const grids = [0.25, 0.5, 0.75, 1].map(pct =>
    SPIDER_DIMS.map((_, i) => {
      const a = aRad(i);
      return `${(CX + R * pct * Math.cos(a)).toFixed(1)},${(CY + R * pct * Math.sin(a)).toFixed(1)}`;
    }).join(' ')
  );

  return (
    <svg viewBox="0 0 240 218" width="100%" aria-hidden fill="none"
      style={{ display: 'block', maxWidth: '300px' }}>

      {/* Grid polygons */}
      {grids.map((pts, gi) => (
        <polygon key={gi} points={pts} fill="none"
          stroke={P.ruleD} strokeWidth={gi === 3 ? 0.8 : 0.5} />
      ))}

      {/* Axis spokes */}
      {SPIDER_DIMS.map((_, i) => {
        const a = aRad(i);
        return (
          <line key={i} x1={CX} y1={CY}
            x2={(CX + R * Math.cos(a)).toFixed(1)}
            y2={(CY + R * Math.sin(a)).toFixed(1)}
            stroke={P.ruleD} strokeWidth="0.5" />
        );
      })}

      {/* Risk polygon — scales up from centroid on scroll */}
      <polygon points={polyStr}
        fill="rgba(113,210,207,0.13)" stroke={P.teal}
        strokeWidth="1.3" strokeLinejoin="round"
        style={{
          transformBox: 'fill-box',
          transformOrigin: '50% 50%',
          transform: `scale(${active ? 1 : 0.01})`,
          transition: 'transform 1.15s cubic-bezier(0.16,1,0.3,1) 200ms',
        }} />

      {/* Data point markers */}
      {outerPts.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="2.5"
          fill={P.teal}
          opacity={active ? 0.9 : 0}
          style={{ transition: `opacity 0.35s ${520 + i * 55}ms` }} />
      ))}

      {/* Axis labels */}
      {labelPts.map((p, i) => {
        const anchor = p.x < CX - 12 ? 'end' : p.x > CX + 12 ? 'start' : 'middle';
        const baselineOffset = p.y < CY - 8 ? '-3' : p.y > CY + 8 ? '10' : '4';
        return (
          <text key={i} x={p.x.toFixed(1)} y={p.y.toFixed(1)}
            textAnchor={anchor} dy={baselineOffset}
            fill={P.haze} fontSize="5" fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.8"
            opacity={active ? 0.72 : 0}
            style={{ transition: `opacity 0.45s ${720 + i * 40}ms` }}>
            {SPIDER_DIMS[i].label}
          </text>
        );
      })}
    </svg>
  );
}

// ── Cost-overrun distribution histogram ───────────────────────────────────────
// Plausible NJ/NY regional outcome shape — representative, not published data.
const HIST_DATA = [
  { label: '<−10',  h: 0.07, color: P.forest  },
  { label: '−10·0', h: 0.14, color: P.tealDp  },
  { label: '0·10',  h: 0.25, color: P.teal    },
  { label: '10·20', h: 0.22, color: P.sky      },
  { label: '20·30', h: 0.17, color: P.blush    },
  { label: '30·50', h: 0.10, color: P.coral    },
  { label: '>50',   h: 0.05, color: P.coral    },
] as const;

function OverrunHistogram({ active }: { active: boolean }) {
  const W = 300, INNER_H = 118, PAD_B = 22, TOTAL_H = INNER_H + PAD_B;
  const GAP = 3;
  const barW = (W - GAP * (HIST_DATA.length - 1)) / HIST_DATA.length;

  return (
    <svg viewBox={`0 0 ${W} ${TOTAL_H}`} width="100%" aria-hidden fill="none"
      style={{ display: 'block', maxWidth: '340px' }}>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map(pct => (
        <line key={pct}
          x1={0} y1={INNER_H * (1 - pct)} x2={W} y2={INNER_H * (1 - pct)}
          stroke={P.ruleD} strokeWidth="0.6" />
      ))}
      {/* Bars */}
      {HIST_DATA.map((bar, i) => {
        const x = i * (barW + GAP);
        return (
          <g key={i}>
            <rect x={x} y={0} width={barW} height={INNER_H}
              fill={bar.color} opacity={0.9}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'bottom',
                transform: `scaleY(${active ? bar.h : 0.01})`,
                transition: `transform 1.05s cubic-bezier(0.16,1,0.3,1) ${60 + i * 95}ms`,
              }} />
            <text x={x + barW / 2} y={TOTAL_H - 5}
              textAnchor="middle" fill={P.haze}
              fontSize="5.2" fontFamily="JetBrains Mono, monospace">
              {bar.label}
            </text>
          </g>
        );
      })}
      {/* Baseline */}
      <line x1={0} y1={INNER_H} x2={W} y2={INNER_H} stroke={P.ruleD} strokeWidth="1" />
      {/* Y labels */}
      <text x={2} y={INNER_H * 0 + 9} fill={P.haze} fontSize="5" fontFamily="JetBrains Mono, monospace">HIGH</text>
      <text x={2} y={INNER_H * 0.5 + 3} fill={P.haze} fontSize="5" fontFamily="JetBrains Mono, monospace">MED</text>
    </svg>
  );
}

// ── Risk spectrum bar ─────────────────────────────────────────────────────────
const SPECTRUM = [
  { color: P.forest,  label: 'MANAGED'  },
  { color: P.tealDp,  label: 'BASELINE' },
  { color: P.teal,    label: 'MONITOR'  },
  { color: P.blush,   label: 'ELEVATED' },
  { color: P.coral,   label: 'CRITICAL' },
] as const;

function SpectrumBar({ active }: { active: boolean }) {
  return (
    <div aria-hidden className="relative flex h-[8px] gap-[2px] overflow-hidden">
      {SPECTRUM.map((s, i) => (
        <div key={s.label}
          style={{
            flex: 1,
            backgroundColor: s.color,
            opacity: active ? 0.95 : 0,
            transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
          }} />
      ))}
      {/* Light sweep — loops after initial reveal, signals risk direction */}
      {active && (
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0,
          width: '25%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)',
          animation: 'spectrumScan 4s linear 1.8s infinite',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
}

// ── § 1 — Hero ────────────────────────────────────────────────────────────────
function HeroSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });

  const STREAMS = [
    { id: 'S·01', color: P.teal,  name: 'Peer-Reviewed Research', sub: 'ASCE JCEM · Annual' },
    { id: 'S·02', color: P.sky,   name: 'Industry Writing',       sub: 'Bylined · Regional reach' },
    { id: 'S·03', color: P.coral, name: 'NJ/NY Risk Index',       sub: 'Inaugural Edition In Development' },
  ] as const;

  return (
    <section ref={ref} aria-labelledby="insights-h1"
      className="relative bg-navy text-snow overflow-hidden"
      style={{ paddingTop: '72px', paddingBottom: '48px' }}>
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Masthead bar */}
        <div style={{ ...fade(inView, 0), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          className="border-t border-b border-rule-d py-3 mb-14">
          <span className="font-mono uppercase text-haze" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
            Research &amp; Publishing
          </span>
          <span className="font-mono uppercase text-haze" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
            Travo · Three Streams · Continuous Output
          </span>
        </div>

        {/* Display heading */}
        <div className="max-w-[860px]">
          <h1 id="insights-h1"
            className="font-display font-extrabold tracking-display"
            style={{ fontSize: 'clamp(2.6rem, 5.6vw, 5.2rem)', lineHeight: 0.92 }}>
            <span className="block text-snow" style={fade(inView, 60)}>
              Publishing is a service line,
            </span>
            <span className="block" style={{ ...fade(inView, 140), color: P.teal }}>
              not a marketing function.
            </span>
          </h1>

          <p className="mt-7 font-sans text-slate leading-[1.78] pretty"
            style={{ ...fade(inView, 240), fontSize: '17px', maxWidth: '60ch' }}>
            Three streams of research and publishing operate continuously at Travo.
            Together they hold the firm to the standard it sells, and build the
            regional evidence base that grounds every engagement.
          </p>
        </div>

        {/* Stream summary strip */}
        <div className="mt-16 border-t border-rule-d" style={fade(inView, 320)}>
          <div className="grid sm:grid-cols-3 divide-y divide-rule-d sm:divide-y-0 sm:divide-x sm:divide-rule-d">
            {STREAMS.map((s, i) => (
              <div key={s.id} className="py-6" style={{ ...fade(inView, 360 + i * 70), paddingLeft: i > 0 ? '28px' : undefined }}>
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    style={{
                      display: 'inline-block', width: 5, height: 5,
                      backgroundColor: s.color, flexShrink: 0,
                      animation: inView
                        ? `insightsDotPulse 3.2s ease-in-out ${i * 0.9}s infinite`
                        : 'none',
                    }}
                    aria-hidden />
                  <span className="font-mono uppercase"
                    style={{ fontSize: '9px', letterSpacing: '0.18em', color: s.color }}>
                    {s.id}
                  </span>
                </div>
                <p className="font-display font-bold text-snow"
                  style={{ fontSize: '16px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {s.name}
                </p>
                <p className="font-mono uppercase text-haze mt-1"
                  style={{ fontSize: '8px', letterSpacing: '0.12em' }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── § 2 — Stream 01 & 02 ──────────────────────────────────────────────────────
function StreamsSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.04 });

  const S01_META = [
    { label: 'Frequency',  value: 'At least one article per year' },
    { label: 'Data basis', value: 'Anonymized engagement data + supervised graduate research' },
    { label: 'Purpose',    value: 'Methodology defensibility in formal proceedings' },
  ] as const;

  const S02_META = [
    { label: 'Medium',    value: 'Construction and construction-law press' },
    { label: 'Frequency', value: 'Several articles per year' },
    { label: 'Byline',    value: 'Principal full credentials, always named' },
    { label: 'Audience',  value: 'Buyers and referral sources in the NJ/NY regional market' },
  ] as const;

  return (
    <section ref={ref} className="bg-canvas" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Section header row */}
        <div style={{ ...fade(inView, 0), display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${P.ruleL}`, paddingBottom: '16px', marginBottom: '72px' }}>
          <span className="font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.16em', color: P.ink3 }}>
            The Research Archive
          </span>
          <span className="font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.16em', color: P.ink3 }}>
            Streams 01 · 02
          </span>
        </div>

        {/* ── Stream 01 ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-16 items-start"
          style={fade(inView, 60)}>

          {/* Giant number as architectural element — forest at 25% is visible on canvas */}
          <div className="relative hidden md:block select-none" aria-hidden>
            <div className="font-display font-extrabold leading-none tracking-display"
              style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', color: P.forest, opacity: 0.25, lineHeight: 0.85 }}>
              01
            </div>
            <span className="absolute top-0 left-0 font-mono uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.18em', color: P.forest, paddingTop: '4px' }}>
              Stream 01
            </span>
          </div>

          {/* Content */}
          <div>
            {/* Mobile stream label */}
            <span className="md:hidden font-mono uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.18em', color: P.forest, display: 'block', marginBottom: '10px' }}>
              Stream 01
            </span>

            <h2 className="font-display font-extrabold tracking-display balance"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)', lineHeight: 0.96, color: P.ink2 }}>
              Peer-Reviewed Research
            </h2>

            {/* Citation block */}
            <div style={{ marginTop: '24px', border: `1px solid ${P.ruleL}`, padding: '18px 22px', backgroundColor: 'rgba(113,210,207,0.04)' }}>
              <p className="font-mono uppercase"
                style={{ fontSize: '8px', letterSpacing: '0.16em', color: P.forest, marginBottom: '10px' }}>
                Target Journals
              </p>
              <p className="font-sans"
                style={{ fontSize: '14.5px', color: P.ink2, lineHeight: 1.6 }}>
                ASCE Journal of Construction Engineering and Management
              </p>
              <p className="font-sans"
                style={{ fontSize: '14.5px', color: P.ink3, lineHeight: 1.6 }}>
                Journal of Management in Engineering
              </p>
            </div>

            <p className="font-sans leading-[1.78] pretty"
              style={{ marginTop: '22px', fontSize: '16px', color: P.ink3, maxWidth: '62ch' }}>
              At least one peer-reviewed article each year, drawn from anonymized
              engagement data and supervised graduate research. Peer review is what
              makes Travo's methodology defensible if it is ever challenged in formal
              proceedings.
            </p>

            {/* Metadata */}
            <div style={{ marginTop: '22px', borderTop: `1px solid ${P.ruleL}` }}>
              {S01_META.map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '32px', padding: '11px 0', borderBottom: `1px solid ${P.ruleL}` }}>
                  <span className="font-mono uppercase"
                    style={{ fontSize: '9px', letterSpacing: '0.14em', color: P.forest, minWidth: '100px', flexShrink: 0 }}>
                    {label}
                  </span>
                  <span className="font-sans"
                    style={{ fontSize: '14px', color: P.ink3 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────── */}
        <div style={{ margin: '72px 0', borderTop: `1px solid ${P.ruleL}` }} />

        {/* ── Stream 02 ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-[1fr_180px] gap-8 md:gap-16 items-start"
          style={fade(inView, 160)}>

          {/* Content */}
          <div>
            {/* Mobile stream label */}
            <span className="md:hidden font-mono uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.18em', color: P.forest, display: 'block', marginBottom: '10px' }}>
              Stream 02
            </span>

            <h2 className="font-display font-extrabold tracking-display balance"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)', lineHeight: 0.96, color: P.ink2 }}>
              Industry Writing
            </h2>

            {/* Byline block */}
            <div style={{ marginTop: '24px', border: `1px solid ${P.ruleL}`, padding: '18px 22px', backgroundColor: 'rgba(197,236,254,0.09)' }}>
              <p className="font-mono uppercase"
                style={{ fontSize: '8px', letterSpacing: '0.16em', color: P.ink3, marginBottom: '10px' }}>
                Byline
              </p>
              <p className="font-sans"
                style={{ fontSize: '14.5px', color: P.ink2, lineHeight: 1.6 }}>
                Dr. Karim S. Karam · Travo Risk Advisory
              </p>
              <p className="font-sans"
                style={{ fontSize: '14.5px', color: P.ink3, lineHeight: 1.6 }}>
                Published in the construction and construction-law press
              </p>
            </div>

            <p className="font-sans leading-[1.78] pretty"
              style={{ marginTop: '22px', fontSize: '16px', color: P.ink3, maxWidth: '62ch' }}>
              Several articles each year in the construction and construction-law press,
              drawn from current engagement themes and the regional dataset, and always
              bylined with the principal's full credentials. The purpose is presence
              among the buyers and referral sources who shape the regional market.
            </p>

            {/* Metadata */}
            <div style={{ marginTop: '22px', borderTop: `1px solid ${P.ruleL}` }}>
              {S02_META.map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '32px', padding: '11px 0', borderBottom: `1px solid ${P.ruleL}` }}>
                  <span className="font-mono uppercase"
                    style={{ fontSize: '9px', letterSpacing: '0.14em', color: P.ink3, minWidth: '100px', flexShrink: 0 }}>
                    {label}
                  </span>
                  <span className="font-sans"
                    style={{ fontSize: '14px', color: P.ink3 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Giant number — right column, forest at lower opacity creates visual depth difference from 01 */}
          <div className="relative hidden md:block select-none" aria-hidden>
            <div className="font-display font-extrabold leading-none tracking-display text-right"
              style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', color: P.forest, opacity: 0.14, lineHeight: 0.85 }}>
              02
            </div>
            <span className="absolute top-0 right-0 font-mono uppercase text-right"
              style={{ fontSize: '9px', letterSpacing: '0.18em', color: P.forest, paddingTop: '4px' }}>
              Stream 02
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── § 3 — Risk Index Feature (Stream 03) ─────────────────────────────────────
function RiskIndexSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });

  const INDEX_META = [
    { label: 'Publication',       value: 'Annual benchmark, with quarterly updates' },
    { label: 'Segmentation',      value: 'Project type · Asset class · Delivery method' },
    { label: 'Geographic scope',  value: 'New Jersey · New York Metropolitan Region' },
    { label: 'Use case',          value: 'Owner benchmarking · Contractor calibration' },
  ] as const;

  return (
    <section ref={ref} aria-labelledby="risk-index-h2"
      className="relative bg-navy text-snow overflow-hidden"
      style={{ paddingTop: '0', paddingBottom: '0' }}>
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      {/* Full-width spectrum bar flush at top of section */}
      <div style={fade(inView, 0)}>
        <SpectrumBar active={inView} />
      </div>

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Masthead bar */}
        <div style={{ ...fade(inView, 120), display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '36px', paddingBottom: '16px', borderBottom: `1px solid ${P.ruleD}` }}>
          <span className="font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.16em', color: P.coral }}>
            Stream 03
          </span>
          <span className="font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.16em', color: P.haze }}>
            Inaugural Edition In Development
          </span>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-[1fr_320px] gap-12 md:gap-20 items-start"
          style={{ paddingTop: '56px', paddingBottom: '80px' }}>

          {/* Left: heading + copy + meta */}
          <div>
            <h2 id="risk-index-h2"
              className="font-display font-extrabold tracking-display balance"
              style={{ ...fade(inView, 180), fontSize: 'clamp(2.4rem, 4.8vw, 4.6rem)', lineHeight: 0.93 }}>
              <span className="text-snow block">The NJ/NY</span>
              <span className="block" style={{ color: P.coral }}>Construction Risk Index</span>
            </h2>

            <p className="font-sans leading-[1.78] pretty"
              style={{ ...fade(inView, 260), marginTop: '24px', fontSize: '17px', color: P.slate, maxWidth: '58ch' }}>
              Travo's flagship research initiative: an annual benchmark on regional
              construction outcomes: schedule slippage rates, cost-overrun distributions,
              contingency adequacy, and claim-emergence patterns, segmented by project
              type and asset class.
            </p>

            <p className="font-sans leading-[1.78] pretty"
              style={{ ...fade(inView, 300), marginTop: '16px', fontSize: '17px', color: P.slate, maxWidth: '58ch' }}>
              The Index gives owners and contractors an empirical reference calibrated
              to the market they actually build in, rather than national averages.
              Travo's ambition: to make this the most-cited regional benchmark for
              construction risk in the New Jersey and New York market.
            </p>

            {/* Metadata grid */}
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5"
              style={{ marginTop: '36px', paddingTop: '28px', borderTop: `1px solid ${P.ruleD}` }}>
              {INDEX_META.map(({ label, value }, i) => (
                <div key={label} style={fade(inView, 360 + i * 50)}>
                  <p className="font-mono uppercase text-haze"
                    style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
                    {label}
                  </p>
                  <p className="font-sans text-snow mt-1"
                    style={{ fontSize: '14.5px', lineHeight: 1.4 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ ...fade(inView, 520), marginTop: '36px' }}>
              <a href="/contact"
                className="font-mono uppercase inline-block"
                style={{
                  fontSize: '11px', letterSpacing: '0.16em',
                  color: P.coral, border: `1px solid ${P.coral}`,
                  padding: '14px 28px',
                  transition: 'background-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = P.coral;
                  (e.currentTarget as HTMLAnchorElement).style.color = P.navy;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color = P.coral;
                }}>
                Register Interest in the Index
              </a>
            </div>
          </div>

          {/* Right: histogram visualization */}
          <div style={{ ...fade(inView, 280), paddingTop: '8px' }}>
            {/* Viz header */}
            <div style={{ marginBottom: '14px' }}>
              <p className="font-mono uppercase text-haze"
                style={{ fontSize: '8px', letterSpacing: '0.14em', marginBottom: '4px' }}>
                Cost overrun distribution · NJ/NY region
              </p>
              <p className="font-mono" style={{ fontSize: '7px', letterSpacing: '0.10em', color: P.haze, opacity: 0.6 }}>
                Representative shape · Inaugural data in development
              </p>
            </div>

            <OverrunHistogram active={inView} />

            {/* Spectrum legend below chart */}
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              {SPECTRUM.map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: 6, height: 6, backgroundColor: s.color, flexShrink: 0 }} aria-hidden />
                  <span className="font-mono uppercase"
                    style={{ fontSize: '6px', letterSpacing: '0.12em', color: P.haze }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Second viz: risk fingerprint spider chart */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${P.ruleD}` }}>
              <p className="font-mono uppercase text-haze"
                style={{ fontSize: '8px', letterSpacing: '0.14em', marginBottom: '4px' }}>
                Risk fingerprint · 7 dimensions
              </p>
              <p className="font-mono" style={{ fontSize: '7px', letterSpacing: '0.10em', color: P.haze, opacity: 0.6, marginBottom: '14px' }}>
                Illustrative profile · Multi-dimensional assessment
              </p>
              <RiskFingerprint active={inView} />
            </div>

            {/* Large "VOL. I" annotation — pulses slowly to signal work in progress */}
            <div style={{ ...fade(inView, 400), marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${P.ruleD}` }}>
              <p className="font-display font-extrabold text-snow"
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', lineHeight: 0.9, letterSpacing: '-0.025em',
                  animation: inView ? 'volPulse 5s ease-in-out 1.4s infinite' : 'none',
                }}
                aria-hidden>
                VOL. I
              </p>
              <p className="font-mono uppercase text-haze"
                style={{ fontSize: '8px', letterSpacing: '0.14em', marginTop: '10px' }}>
                NJ/NY Construction Risk Index
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── § 4 — Why It Matters ──────────────────────────────────────────────────────
function WhySection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="bg-canvas-1"
      style={{ paddingTop: '104px', paddingBottom: '104px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid md:grid-cols-[200px_1fr] gap-10 md:gap-20 items-start">
          {/* Left label */}
          <div style={fade(inView, 0)}>
            <span className="font-mono uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.18em', color: P.ink3 }}>
              Why It Matters
            </span>
          </div>

          {/* Right: quote + body */}
          <div>
            <h2 className="font-display font-extrabold tracking-display balance"
              style={{ ...fade(inView, 80), fontSize: 'clamp(2rem, 3.8vw, 3.6rem)', lineHeight: 0.96, color: P.ink2, maxWidth: '22ch' }}>
              Evidence is the difference between a benchmark and an opinion.
            </h2>

            <div style={fade(inView, 180)}>
              <p className="font-sans leading-[1.78] pretty"
                style={{ marginTop: '28px', fontSize: '17px', color: P.ink3, maxWidth: '60ch' }}>
                National averages tell an owner in New Jersey very little about the
                risk their next project actually carries. Travo's research program
                exists to replace that gap with regional evidence, and to keep the
                firm's own methodology accountable to data rather than habit.
              </p>
            </div>

            <div style={{ ...fade(inView, 260), marginTop: '32px' }}>
              <a href="/methodology"
                className="font-mono uppercase group"
                style={{
                  fontSize: '11px', letterSpacing: '0.14em', color: P.forest,
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px',
                  borderBottom: `1px solid ${P.forest}`,
                  paddingBottom: '4px',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.65'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}>
                See how research informs our methodology
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
                  <path d="M0 5h14M10 1l4 4-4 4" stroke={P.forest} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function InsightsPage() {
  return (
    <>
      <HeroSection />
      <StreamsSection />
      <RiskIndexSection />
      <WhySection />
    </>
  );
}
