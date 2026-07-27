'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

// ── Tokens ────────────────────────────────────────────────────────────────────
const P = {
  navy:    '#1E1E2E',
  navy1:   '#252538',
  ruleD:   '#28283E',
  ruleL:   '#D5D9E8',
  canvas1: '#EBEFF8',
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

function fade(active: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    active ? 1 : 0,
    transform:  active ? 'none' : 'translateY(22px)',
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

// ── Index Roadmap (hero viz) ─────────────────────────────────────────────────
// Vertical build-out timeline, grounded in RoleAndTiming's "Planned launch
// timing" copy below: Year 1 baseline briefing → Year 3 Edition 1 → annual
// thereafter → the five-year standards-setting ambition. Single forest hue
// throughout (not the 5-stop risk spectrum) — this is a timeline, not a risk
// diagnostic, and the spectrum is reserved for risk-state encoding only.
// Hero is a light (bg-canvas) section — forest/navy/ink3, not teal/snow/slate.
const ROADMAP_STOPS = [
  { y: 28,  r: 4,   tag: 'Year 1',  name: 'Pre-Index Baseline Briefing', desc: 'Public OPRA / FOIL records',  delay: 300 },
  { y: 118, r: 5.5, tag: 'Year 3',  name: 'Index Edition 1',             desc: 'Publication begins',           delay: 700 },
  { y: 208, r: 7,   tag: 'Annual',  name: 'Edition 2, 3…',               desc: 'Recurring benchmark',          delay: 1100 },
  { y: 298, r: 8.5, tag: 'Year 5',  name: 'Regional Standard',           desc: 'Most-cited benchmark',         delay: 1500 },
] as const;

function IndexRoadmap({ active }: { active: boolean }) {
  const lineX = 46;
  return (
    <svg viewBox="0 0 300 326" aria-hidden fill="none"
      style={{ width: '100%', maxWidth: '380px', display: 'block', overflow: 'visible' }}>

      {/* Vertical line draw-in */}
      <path d={`M ${lineX},20 L ${lineX},306`} stroke={P.forest} strokeOpacity="0.4" strokeWidth="1"
        pathLength="1"
        style={{
          strokeDashoffset: active ? 0 : 1,
          transition: 'stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 100ms',
        }} />

      {ROADMAP_STOPS.map((s) => (
        <g key={s.tag} opacity={active ? 1 : 0}
          style={{ transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${s.delay}ms` }}>

          {/* Glow halo + dot, growing at each stop */}
          <circle cx={lineX} cy={s.y} r={s.r + 6} fill={P.forest} opacity="0.12" />
          <circle cx={lineX} cy={s.y} r={s.r} fill={P.forest}
            style={{ filter: `drop-shadow(0 0 4px ${P.forest}66)` }} />

          {/* Year tag */}
          <text x={lineX + 24} y={s.y - 10} textAnchor="start"
            fill={P.forest} fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.14em">
            {s.tag.toUpperCase()}
          </text>
          {/* Milestone name */}
          <text x={lineX + 24} y={s.y + 6} textAnchor="start"
            fill={P.navy} fontSize="13" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">
            {s.name}
          </text>
          {/* Descriptor */}
          <text x={lineX + 24} y={s.y + 20} textAnchor="start"
            fill={P.ink3} fontSize="9.5" fontWeight="400" fontFamily="Barlow, sans-serif">
            {s.desc}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Outcome Distribution (Template 02) ───────────────────────────────────────
// Small right-skewed histogram illustrating "distribution of regional
// outcomes" — what all 4 benchmark categories actually measure (not per-risk
// probability/impact scoring, which is the qualitative heat-map convention
// Travo's own messaging elsewhere explicitly positions against).
const OUTCOME_BINS = [
  0.08, 0.16, 0.30, 0.48, 0.68, 0.86, 1.00, 0.90,
  0.72, 0.56, 0.42, 0.30, 0.20, 0.13, 0.08,
] as const;
const BASELINE_IDX = 5;

function OutcomeDistribution({ active }: { active: boolean }) {
  const W = 320, H = 190, PL = 12, PR = 12, PT = 22, PB = 34;
  const CW = W - PL - PR, CH = H - PT - PB;
  const BW = CW / OUTCOME_BINS.length;
  const baselineX = PL + BASELINE_IDX * BW + BW / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden fill="none"
      style={{ width: '100%', display: 'block' }}>

      <line x1={PL} y1={PT + CH} x2={W - PR} y2={PT + CH} stroke={P.ruleL} strokeWidth="1" />

      {OUTCOME_BINS.map((h, i) => {
        const barH = h * CH;
        const y = PT + CH - barH;
        const overrun = i > BASELINE_IDX;
        const severity = overrun ? (i - BASELINE_IDX) / (OUTCOME_BINS.length - 1 - BASELINE_IDX) : 0;
        const color = !overrun ? P.tealDp : severity > 0.55 ? P.coral : P.blush;
        return (
          <rect key={i} x={PL + i * BW + 1} y={y} width={BW - 2} height={barH}
            fill={color} fillOpacity={overrun ? 0.82 : 0.72}
            style={{
              transformBox: 'fill-box', transformOrigin: 'center bottom',
              transform: active ? 'scaleY(1)' : 'scaleY(0)',
              transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${60 + i * 30}ms`,
            }} />
        );
      })}

      <line x1={baselineX} y1={PT} x2={baselineX} y2={PT + CH}
        stroke={P.ink3} strokeWidth="1" strokeDasharray="3 3"
        opacity={active ? 0.6 : 0} style={{ transition: 'opacity 0.5s 550ms' }} />
      <text x={baselineX} y={PT - 8} textAnchor="middle"
        fill={P.ink3} fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em"
        opacity={active ? 0.85 : 0} style={{ transition: 'opacity 0.5s 650ms' }}>
        BASELINE
      </text>

      <text x={PL} y={PT + CH + 20} textAnchor="start"
        fill={P.tealDp} fontSize="8" fontWeight={600} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em"
        opacity={active ? 1 : 0} style={{ transition: 'opacity 0.5s 750ms' }}>
        ON BUDGET
      </text>
      <text x={W - PR} y={PT + CH + 20} textAnchor="end"
        fill={P.coral} fontSize="8" fontWeight={600} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em"
        opacity={active ? 1 : 0} style={{ transition: 'opacity 0.5s 750ms' }}>
        OVERRUN
      </text>
    </svg>
  );
}

// ── Section: Hero ─────────────────────────────────────────────────────────────
function RiskIndexHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 180);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative bg-canvas text-ink overflow-hidden pt-[60px] pb-[44px]">
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Publication masthead */}
        <div className="flex items-center justify-between mb-10"
          style={fade(mounted, 0)}>
          <span className="font-mono uppercase font-semibold text-forest"
            style={{ fontSize: '10px', letterSpacing: '0.18em' }}>
            Travo Risk Advisory
          </span>
          <span className="font-mono uppercase font-semibold text-ink-3"
            style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
            NJ/NY Construction Risk Index · Vol. I
          </span>
          <span className="font-mono uppercase font-semibold text-ink-3 hidden md:block"
            style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
            Inaugural Edition · 2026
          </span>
        </div>

        {/* Two-column: heading left, orbit right */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">

          {/* Left: heading + body */}
          <div>
            <h1 className="font-display font-extrabold leading-[0.93] tracking-display"
              style={{ fontSize: 'clamp(3.2rem, 6.5vw, 5.8rem)' }}>
              <span className="block text-ink" style={fade(mounted, 120)}>The NJ/NY</span>
              <span className="block text-ink" style={fade(mounted, 220)}>Construction</span>
              <span className="block text-ink" style={fade(mounted, 320)}>Risk Index.</span>
            </h1>

            <p className="mt-8 font-sans text-ink-2 leading-[1.76] pretty"
              style={{ fontSize: '16.5px', maxWidth: '52ch', ...fade(mounted, 450) }}>
              A planned annual benchmark report on regional construction
              outcomes, built from public regional records,
              partner-contributed anonymized data, and the firm&rsquo;s
              accumulating engagement and research base. The Index is the
              standards-setting artifact of the practice: the published
              reference against which the firm&rsquo;s own analyses, and, in
              time, the region&rsquo;s expectations, are measured.
            </p>

            <div className="mt-10 flex items-center gap-3" style={fade(mounted, 560)}>
              <span className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: P.coral,
                  boxShadow: `0 0 8px ${P.coral}`,
                  animation: 'p50Live 2.4s ease-in-out infinite' }} />
              <span className="font-mono uppercase font-semibold text-forest"
                style={{ fontSize: '9.5px', letterSpacing: '0.16em' }}>
                Inaugural Edition · In Development
              </span>
            </div>
          </div>

          {/* Right: index roadmap */}
          <div style={fade(mounted, 300)} className="hidden lg:flex justify-center">
            <IndexRoadmap active={mounted} />
          </div>
        </div>

        {/* Bottom fact strip */}
        <div className="mt-16 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ borderColor: P.ruleL, ...fade(mounted, 700) }}>
          {[
            { label: 'Region',    value: 'NJ / NY Metro'     },
            { label: 'Categories', value: '4 Measured'       },
            { label: 'Cadence',   value: 'Annual Edition'    },
            { label: 'Status',    value: 'Vol. I: Pending'   },
          ].map(f => (
            <div key={f.label}>
              <p className="font-mono uppercase font-semibold text-forest" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
                {f.label}
              </p>
              <p className="font-mono text-ink mt-1" style={{ fontSize: '13px', letterSpacing: '0.06em' }}>
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: What the Index Will Measure ─────────────────────────────────────
const BENCHMARK_CATEGORIES = [
  {
    n: '01',
    heading: 'Schedule slippage rates',
    body: 'How regional project completion dates move against baseline: the distribution of schedule outcomes, not an anecdote or an average alone.',
  },
  {
    n: '02',
    heading: 'Cost overrun distributions',
    body: 'The shape of cost-at-completion outcomes across the regional dataset: where projects actually land relative to budget.',
  },
  {
    n: '03',
    heading: 'Contingency adequacy',
    body: 'Whether the contingencies projects held were sufficient, excessive, or exhausted: the empirical test of how contingency is being set in the region.',
  },
  {
    n: '04',
    heading: 'Claim emergence patterns',
    body: 'How and when claims and disputes surface across regional projects: the leading indicators visible before a dispute fully materializes.',
  },
] as const;

function WhatIndexMeasures() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });

  return (
    <section ref={ref} className="bg-canvas text-ink pt-[44px] md:pt-[52px] pb-[56px] md:pb-[72px] overflow-hidden border-t border-rule-l">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="max-w-[64ch]" style={fade(inView, 0)}>
          <p className="font-mono uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em', color: P.forest }}>
            What the Index Will Measure
          </p>
          <h2 className="mt-4 font-display font-extrabold leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}>
            <span className="text-ink">Four benchmark categories, segmented by project type and asset class.</span>
          </h2>
        </div>

        {/* Four category cards */}
        <div className="mt-14 grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="grid sm:grid-cols-2 gap-px border border-rule-l" style={{ backgroundColor: P.ruleL }}>
            {BENCHMARK_CATEGORIES.map((c, i) => (
              <div key={c.n} className="bg-canvas p-7 md:p-8"
                style={fade(inView, 120 + i * 90)}>
                <span className="font-mono text-forest" style={{ fontSize: '8.5px', letterSpacing: '0.16em' }}>
                  Category {c.n} / 04
                </span>
                <h3 className="font-display font-bold text-ink mt-3 leading-[1.0] tracking-display"
                  style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)' }}>
                  {c.heading}
                </h3>
                <p className="mt-2 font-sans text-ink-3 leading-[1.68] pretty"
                  style={{ fontSize: '14.5px' }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          {/* Illustrative regional outcome distribution — supporting visual, not a separate claim */}
          <div className="border p-6" style={{ borderColor: P.ruleL, backgroundColor: P.canvas1, ...fade(inView, 420) }}>
            <p className="font-mono font-semibold text-forest uppercase mb-4" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
              Illustrative regional outcome distribution
            </p>
            <OutcomeDistribution active={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Role & Timing ────────────────────────────────────────────────────
const ROLE_TIMING_ITEMS = [
  {
    n: '01',
    heading: 'Dataset role',
    body: (
      <>
        The Index is built from three sources assembled from year one: public
        records obtained systematically through OPRA and FOIL requests to NJ
        and NY agencies, bid tabulations, change orders, schedule and cost
        outcomes on public work; anonymized data contributed under agreement
        by surety and lender relationships; and TRAVO&rsquo;s own accumulating
        engagement base. Every engagement that strengthens the dataset
        strengthens the benchmark, and the benchmark in turn validates the
        assumptions used in future analyses.
      </>
    ),
  },
  {
    n: '02',
    heading: 'Planned launch timing',
    body: (
      <>
        Publication is planned to begin in the firm&rsquo;s third year, once
        the assembled dataset supports defensible regional benchmarks. The
        first edition is deliberately scoped to what the data honestly
        supports, likely public-sector schedule and cost outcome
        distributions, and expands from there; a narrow Index that is
        defensible beats a broad one that is not. It will be published
        annually thereafter. The credibility engine does not wait for year
        three: within the firm&rsquo;s first year, TRAVO will publish a
        Pre-Index Baseline Briefing built entirely from the public records
        assembled through OPRA and FOIL, a short, fully sourced regional
        snapshot that demonstrates, in print, how the firm handles, verifies,
        and publishes data before any partner is asked to contribute theirs.
      </>
    ),
  },
  {
    n: '03',
    heading: 'Relationship to portfolio benchmarking',
    body: (
      <>
        The Index underpins TRAVO&rsquo;s{' '}
        <Link href="/services#d2" className="text-teal underline underline-offset-2 hover:text-teal-deep transition-colors duration-200">
          Portfolio Risk Benchmarking
        </Link>{' '}
        service: founding-subscriber commitments open after Index Edition 1,
        and full benchmarking delivery begins alongside Edition 2, once the
        dataset supports portfolio-level comparison.
      </>
    ),
  },
  {
    n: '04',
    heading: 'Standards-setting ambition',
    body: (
      <>
        Within five years, the Index should be the most cited regional
        benchmark for construction risk in the NJ/NY market, the reference an
        owner, agency, surety, or counsel reaches for when asking whether a
        project&rsquo;s risk position is normal.
      </>
    ),
  },
] as const;

function RoleAndTiming() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section ref={ref} className="relative bg-navy text-snow overflow-hidden py-[68px] md:py-[88px]">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="max-w-[62ch] mx-auto text-center" style={fade(inView, 0)}>
          <p className="font-mono font-semibold text-teal uppercase" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
            Role &amp; Timing
          </p>
          <h2 className="mt-4 font-display font-extrabold text-snow leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}>
            Dataset, benchmark,<br />
            and standard.
          </h2>
        </div>

        <div className="mt-14 border-t" style={{ borderColor: P.ruleD }}>

          {/* Row 1 — the substantive pair (01, 02): side-by-side columns, hairline divider */}
          <div className="py-10 border-b grid lg:grid-cols-[1fr_1px_1fr] gap-x-14 gap-y-10 items-start"
            style={{ borderColor: P.ruleD }}>
            {ROLE_TIMING_ITEMS.slice(0, 2).map((it, i) => (
              <React.Fragment key={it.n}>
                {i === 1 && <div className="hidden lg:block" style={{ backgroundColor: P.ruleD }} />}
                <div style={{ ...fade(inView, 100 + i * 120), marginTop: i === 1 ? '36px' : 0 }}>
                  <span className="font-mono text-teal" style={{ fontSize: '9px', letterSpacing: '0.14em' }}>
                    {it.n} / 04
                  </span>
                  <h3 className="mt-2 font-display font-bold text-snow leading-[1.05] tracking-display"
                    style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', marginBottom: '14px' }}>
                    {it.heading}
                  </h3>
                  <p className="font-sans text-slate leading-[1.76] pretty" style={{ fontSize: '15px' }}>
                    {it.body}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Row 2 — the short closing pair (03, 04): tighter, inline number + heading */}
          <div className="py-9 border-b grid md:grid-cols-2 gap-x-14 gap-y-8"
            style={{ borderColor: P.ruleD }}>
            {ROLE_TIMING_ITEMS.slice(2).map((it, i) => (
              <div key={it.n} className="flex gap-4" style={fade(inView, 340 + i * 100)}>
                <span className="font-mono text-teal shrink-0" style={{ fontSize: '9px', letterSpacing: '0.14em', marginTop: '3px' }}>
                  {it.n}
                </span>
                <div>
                  <h3 className="font-display font-bold text-snow leading-[1.1] tracking-display"
                    style={{ fontSize: 'clamp(0.98rem, 1.3vw, 1.15rem)', marginBottom: '6px' }}>
                    {it.heading}
                  </h3>
                  <p className="font-sans text-slate leading-[1.68] pretty" style={{ fontSize: '13.5px' }}>
                    {it.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Interested in the Index? (Closing CTA) ─────────────────────────────
function IndexClosingCTA() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 });

  return (
    <section ref={ref} className="bg-canvas text-ink py-[52px] md:py-[68px]">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          {/* Left: heading + lede */}
          <div style={fade(inView, 0)} className="max-w-[58ch]">
            <h2 className="font-display font-extrabold leading-[0.95] tracking-display balance text-ink"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}>
              Interested<br />
              in the Index?
            </h2>
            <p className="mt-6 font-sans leading-[1.76] pretty"
              style={{ fontSize: '16px', color: P.ink2 }}>
              Institutional owners, public agencies, sureties, lenders, and
              counsel who want to be notified when the first edition is
              published, or to discuss contributing anonymized portfolio data
              or subscribing to portfolio benchmarking, are invited to get in
              touch.
            </p>
          </div>

          {/* Right: CTA button */}
          <div style={fade(inView, 140)} className="shrink-0">
            <Link href="/contact"
              className="inline-block font-mono uppercase bg-coral text-navy px-8 py-[15px] text-[11px] tracking-label hover:bg-coral/90 transition-colors duration-200">
              Inquire About the Risk Index
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────
export function RiskIndexPage() {
  return (
    <>
      <RiskIndexHero />
      <WhatIndexMeasures />
      <RoleAndTiming />
      <IndexClosingCTA />
    </>
  );
}
