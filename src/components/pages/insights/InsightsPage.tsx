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
// 7-dimension illustrative risk profile. Retained from the former dedicated
// Risk Index section as the page's one visual accent — the full Index dataset
// and category detail now live on /research and /risk-index.
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
      style={{ display: 'block', maxWidth: '280px' }}>

      {/* Grid polygons */}
      {grids.map((pts, gi) => (
        <polygon key={gi} points={pts} fill="none"
          stroke={P.ruleL} strokeWidth={gi === 3 ? 0.8 : 0.5} />
      ))}

      {/* Axis spokes */}
      {SPIDER_DIMS.map((_, i) => {
        const a = aRad(i);
        return (
          <line key={i} x1={CX} y1={CY}
            x2={(CX + R * Math.cos(a)).toFixed(1)}
            y2={(CY + R * Math.sin(a)).toFixed(1)}
            stroke={P.ruleL} strokeWidth="0.5" />
        );
      })}

      {/* Risk polygon — scales up from centroid on scroll */}
      <polygon points={polyStr}
        fill="rgba(62,166,163,0.13)" stroke={P.tealDp}
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
          fill={P.tealDp}
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
            fill={P.forest} fontSize="7.5" fontWeight={600} fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.6"
            opacity={active ? 1 : 0}
            style={{ transition: `opacity 0.45s ${720 + i * 40}ms` }}>
            {SPIDER_DIMS[i].label}
          </text>
        );
      })}
    </svg>
  );
}

// ── Archive-status notice ─────────────────────────────────────────────────────
function Notice({
  tone, label, children,
}: { tone: 'light' | 'dark'; label: string; children: string }) {
  const isDark = tone === 'dark';
  return (
    <div
      style={{
        border: `1px solid ${isDark ? P.ruleD : P.ruleL}`,
        padding: '18px 22px',
      }}
    >
      <p className="font-mono uppercase"
        style={{ fontSize: '9px', letterSpacing: '0.16em', color: isDark ? P.teal : P.forest, marginBottom: '8px' }}>
        {label}
      </p>
      <p className="font-sans"
        style={{ fontSize: '14px', lineHeight: 1.65, color: isDark ? P.slate : P.ink3, maxWidth: '68ch' }}>
        {children}
      </p>
    </div>
  );
}

// ── § 1 — Hero ────────────────────────────────────────────────────────────────
function HeroSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });

  const STREAMS = [
    { id: 'S·01', color: P.teal,  name: 'Peer-Reviewed Academic Publication', sub: 'First Submission · Year 2' },
    { id: 'S·02', color: P.sky,   name: 'Industry-Press Publication',         sub: '2-4 Articles Per Year' },
    { id: 'S·03', color: P.blush, name: 'Insights and Commentary',            sub: 'Continuous · As Warranted' },
    { id: 'S·04', color: P.coral, name: 'NJ/NY Construction Risk Index',      sub: 'Forthcoming · Year 3' },
  ] as const;

  return (
    <section ref={ref} aria-labelledby="insights-h1"
      className="relative bg-canvas text-ink overflow-hidden"
      style={{ paddingTop: '52px', paddingBottom: '36px' }}>
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Masthead bar */}
        <div style={{ ...fade(inView, 0), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          className="mb-14">
          <span className="font-mono uppercase font-semibold text-forest" style={{ fontSize: '9.5px', letterSpacing: '0.16em' }}>
            Research &amp; Publishing
          </span>
          <span className="font-mono uppercase font-semibold text-ink-3" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
            Travo · Four Streams · Continuous Output
          </span>
        </div>

        {/* Display heading */}
        <div className="max-w-[860px]">
          <h1 id="insights-h1"
            className="font-display font-extrabold tracking-display"
            style={{ fontSize: 'clamp(2.6rem, 5.6vw, 5.2rem)', lineHeight: 0.92 }}>
            <span className="block text-ink" style={fade(inView, 60)}>
              Publication is operational,
            </span>
            <span className="block" style={{ ...fade(inView, 140), color: P.forest }}>
              not optional.
            </span>
          </h1>

          <p className="mt-7 font-sans text-ink-2 leading-[1.78] pretty"
            style={{ ...fade(inView, 240), fontSize: '17px', maxWidth: '62ch' }}>
            TRAVO publishes on a defined cadence regardless of how busy engagement
            work becomes. Publication is not marketing. It is the mechanism by which
            the firm’s standards-setting position is built and maintained, and the
            means by which its methodology remains defensible under formal scrutiny.
            Four streams operate continuously.
          </p>
        </div>

        {/* Stream summary strip */}
        <div className="mt-16 border-t border-rule-l" style={fade(inView, 320)}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y divide-rule-l sm:divide-y-0 sm:divide-x sm:divide-rule-l">
            {STREAMS.map((s, i) => (
              <div key={s.id} className="py-6" style={{ ...fade(inView, 360 + i * 70), paddingLeft: i > 0 ? '24px' : undefined }}>
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
                  <span className="font-mono uppercase text-forest"
                    style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
                    {s.id}
                  </span>
                </div>
                <p className="font-display font-bold text-ink"
                  style={{ fontSize: '15px', letterSpacing: '-0.01em', lineHeight: 1.22 }}>
                  {s.name}
                </p>
                <p className="font-mono uppercase font-semibold text-forest mt-1"
                  style={{ fontSize: '9px', letterSpacing: '0.12em' }}>
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

// ── § 2 — Four Streams ────────────────────────────────────────────────────────
type StreamCard = {
  n: string;
  status: string;
  statusColor: string;
  title: string;
  cadence: string;
  refBlock?: { label: string; lines: readonly string[] };
  subject?: string;
  purpose: string;
  link?: { label: string; href: string };
};

const STREAM_CARDS: readonly StreamCard[] = [
  {
    n: '01',
    status: 'Planned publication',
    statusColor: P.forest,
    title: 'Peer-Reviewed Academic Publication',
    cadence: 'First submission targeted by the end of the firm’s second year. One peer-reviewed article per year thereafter.',
    refBlock: {
      label: 'Target journals',
      lines: [
        'Journal of Construction Engineering and Management',
        'ASCE Journal of Management in Engineering, or equivalent',
      ],
    },
    subject: 'Topics drawn from anonymized engagement data and supervised graduate research.',
    purpose: 'Defensibility of the firm’s methodology if challenged in formal proceedings, and reinforcement of the academic credentialing that anchors the practice.',
  },
  {
    n: '02',
    status: 'Planned publication',
    statusColor: P.forest,
    title: 'Industry-Press Publication',
    cadence: 'Two to three articles per year in the first two years, aimed first at the surety, lending, and construction-law audience. Three to four per year thereafter.',
    refBlock: {
      label: 'Target outlets',
      lines: [
        'Engineering News-Record · Construction Executive',
        'AACE Cost Engineering · ABA Construction Lawyer · or NJBIZ',
      ],
    },
    subject: 'Topics drawn from current engagement themes and the regional benchmark dataset, always bylined with the principal’s full credentials.',
    purpose: 'Market presence among buyers and referral sources.',
  },
  {
    n: '03',
    status: 'Publication program',
    statusColor: P.forest,
    title: 'Insights and Commentary',
    cadence: 'A continuous stream of shorter-form, self-published commentary on TRAVO’s own channels, this website, professional networks, and a periodic newsletter, published as observations warrant rather than on a fixed schedule.',
    subject: 'The principal’s operating experience, anonymized lessons from completed projects, observations arising from ongoing research, and commentary on industry developments affecting the New Jersey and New York capital projects market. This stream is also the home for the principal’s existing body of written work.',
    purpose: 'A continuous published presence between formal publications, demonstrated active thinking for prospects and referral sources, and, over time, a searchable archive of expertise that compounds the firm’s authority. As with all TRAVO publishing, insights reinforce the firm’s risk-methodology focus rather than drifting into generic industry commentary.',
  },
  {
    n: '04',
    status: 'Forthcoming',
    statusColor: P.forest,
    title: 'The NJ/NY Construction Risk Index',
    cadence: 'Annual benchmark report planned to begin in the firm’s third year, built from public records, partner-contributed data, and the firm’s own engagement base. A Pre-Index Baseline Briefing, built entirely from public records, publishes within the firm’s first year.',
    purpose: 'The standards-setting artifact of the practice: the published regional benchmark against which TRAVO’s own analyses are continuously validated.',
    link: { label: 'About the Risk Index', href: '/risk-index' },
  },
] as const;

function FourStreamsSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.04 });

  return (
    <section ref={ref} className="bg-canvas border-t border-rule-l" style={{ paddingTop: '48px', paddingBottom: '56px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Section header row */}
        <div style={{ ...fade(inView, 0), display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${P.ruleL}`, paddingBottom: '16px', marginBottom: '20px' }}>
          <span className="font-mono uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em', color: P.forest }}>
            The Publishing Program
          </span>
          <span className="font-mono uppercase font-semibold" style={{ fontSize: '10px', letterSpacing: '0.14em', color: P.ink3 }}>
            Streams 01 · 02 · 03 · 04
          </span>
        </div>

        <h2 className="font-display font-extrabold tracking-display balance"
          style={{ ...fade(inView, 40), fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', lineHeight: 0.97, color: P.ink2, maxWidth: '18ch', marginBottom: '52px' }}>
          Four streams operate continuously.
        </h2>

        {/* Card grid */}
        <div className="grid gap-px lg:grid-cols-2 bg-rule-l border border-rule-l"
          style={fade(inView, 100)}>
          {STREAM_CARDS.map((card) => (
            <div key={card.n} className="flex flex-col bg-canvas" style={{ padding: '32px' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display font-extrabold" style={{ fontSize: '13px', color: P.ink3 }}>
                  {card.n}
                </span>
                <span className="font-mono uppercase font-semibold" style={{ fontSize: '9.5px', letterSpacing: '0.16em', color: card.statusColor }}>
                  {card.status}
                </span>
              </div>

              <h3 className="font-display font-extrabold tracking-display"
                style={{ fontSize: 'clamp(1.3rem, 1.9vw, 1.6rem)', lineHeight: 1.05, color: P.ink2, marginBottom: '14px' }}>
                {card.title}
              </h3>

              <p className="font-sans leading-[1.7]" style={{ fontSize: '14.5px', color: P.ink3, maxWidth: '52ch' }}>
                {card.cadence}
              </p>

              {card.refBlock && (
                <div style={{ marginTop: '18px', border: `1px solid ${P.ruleL}`, padding: '14px 18px', backgroundColor: 'rgba(113,210,207,0.04)' }}>
                  <p className="font-mono uppercase font-semibold" style={{ fontSize: '9.5px', letterSpacing: '0.16em', color: P.forest, marginBottom: '8px' }}>
                    {card.refBlock.label}
                  </p>
                  {card.refBlock.lines.map(line => (
                    <p key={line} className="font-sans" style={{ fontSize: '13.5px', color: P.ink3, lineHeight: 1.55 }}>
                      {line}
                    </p>
                  ))}
                </div>
              )}

              <div style={{ marginTop: '18px', borderTop: `1px solid ${P.ruleL}` }}>
                {card.subject && (
                  <div style={{ padding: '11px 0', borderBottom: `1px solid ${P.ruleL}` }}>
                    <span className="font-mono uppercase font-semibold block" style={{ fontSize: '9.5px', letterSpacing: '0.14em', color: P.forest, marginBottom: '4px' }}>
                      Subject matter
                    </span>
                    <span className="font-sans" style={{ fontSize: '13.5px', color: P.ink3, lineHeight: 1.55 }}>
                      {card.subject}
                    </span>
                  </div>
                )}
                <div style={{ padding: '11px 0' }}>
                  <span className="font-mono uppercase font-semibold block" style={{ fontSize: '9.5px', letterSpacing: '0.14em', color: P.forest, marginBottom: '4px' }}>
                    Purpose
                  </span>
                  <span className="font-sans" style={{ fontSize: '13.5px', color: P.ink3, lineHeight: 1.55 }}>
                    {card.purpose}
                  </span>
                </div>
              </div>

              {card.link && (
                <div style={{ marginTop: '18px' }}>
                  <a href={card.link.href}
                    className="font-mono uppercase inline-flex items-center gap-2"
                    style={{ fontSize: '10.5px', letterSpacing: '0.14em', color: P.forest, textDecoration: 'none', borderBottom: `1px solid ${P.forest}`, paddingBottom: '3px' }}>
                    {card.link.label}
                    <svg width="14" height="9" viewBox="0 0 16 10" fill="none" aria-hidden>
                      <path d="M0 5h14M10 1l4 4-4 4" stroke={P.forest} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Archive status notice */}
        <div style={{ ...fade(inView, 160), marginTop: '24px' }}>
          <Notice tone="light" label="Archive status">
            No articles are listed here yet. Publications will appear on this page as they are released; titles, dates, and links will be added only when work is actually published. Streams above are labeled planned or forthcoming accordingly.
          </Notice>
        </div>

        {/* Sub-block: the research role */}
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start"
          style={{ ...fade(inView, 220), marginTop: '64px', paddingTop: '48px', borderTop: `1px solid ${P.ruleL}` }}>
          <div>
            <h3 className="font-display font-extrabold tracking-display"
              style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', lineHeight: 1.05, color: P.ink2, marginBottom: '16px' }}>
              The research role
            </h3>
            <p className="font-sans leading-[1.78] pretty"
              style={{ fontSize: '15.5px', color: P.ink3, maxWidth: '62ch' }}>
              Research is a working part of the practice, not an adjacent activity.
              Topics originate in anonymized engagement data and supervised graduate
              research conducted through the principal’s academic platform at Stevens
              Institute of Technology, and findings feed back into engagement
              methodology. The objective is a body of published work, academic,
              industry, and benchmark, that defines how quantitative construction risk
              analysis is measured in the NJ/NY region.
            </p>
            <div style={{ marginTop: '22px' }}>
              <a href="/research"
                className="font-mono uppercase inline-flex items-center gap-2"
                style={{ fontSize: '11px', letterSpacing: '0.14em', color: P.forest, textDecoration: 'none', borderBottom: `1px solid ${P.forest}`, paddingBottom: '4px' }}>
                Explore the research program
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

// ── § 3 — Insights & Commentary ───────────────────────────────────────────────
const THEME_CARDS = [
  {
    title: 'Why heat maps hide the answer',
    body: 'What a qualitative five-by-five actually communicates, what it conceals, and what a probability distribution shows in its place.',
  },
  {
    title: 'Contingency is a decision, not a habit',
    body: 'Ten percent is a convention, not a derivation. What it costs an owner to hold capital against risk the analysis does not support, and to hold too little.',
  },
  {
    title: 'Reading a claim before it is filed',
    body: 'The leading indicators that precede most disputes, and the documentation posture that determines the outcome once one emerges.',
  },
] as const;

function CommentarySection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });

  return (
    <section ref={ref} aria-labelledby="commentary-h2"
      className="relative bg-canvas text-ink overflow-hidden border-t border-rule-l"
      style={{ paddingTop: '44px', paddingBottom: '76px' }}>

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Section header row */}
        <div style={{ ...fade(inView, 0), display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${P.ruleL}`, paddingBottom: '16px', marginBottom: '52px' }}>
          <span className="font-mono uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em', color: P.forest }}>
            Insights &amp; Commentary
          </span>
          <span className="font-mono uppercase font-semibold text-ink-3" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
            Stream 03
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-12 md:gap-16 items-start">
          <div>
            <h2 id="commentary-h2"
              className="font-display font-extrabold tracking-display balance"
              style={{ ...fade(inView, 60), fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', lineHeight: 0.97, color: P.ink2, maxWidth: '18ch' }}>
              Shorter-form writing, published as observations warrant.
            </h2>

            <p className="font-sans leading-[1.78] pretty"
              style={{ ...fade(inView, 140), marginTop: '24px', fontSize: '16px', color: P.ink3, maxWidth: '62ch' }}>
              Between formal publications, TRAVO publishes commentary drawn from the
              principal’s operating experience, anonymized lessons from completed
              projects, observations arising from ongoing research, and developments
              affecting the NJ/NY capital-projects market. Over time this becomes a
              searchable archive of expertise. Commentary reinforces the firm’s
              risk-methodology focus rather than drifting into generic industry
              commentary.
            </p>
          </div>

          {/* Illustrative accent: risk fingerprint */}
          <div style={{ ...fade(inView, 220), paddingTop: '4px' }}>
            <p className="font-mono uppercase font-semibold text-forest"
              style={{ fontSize: '9.5px', letterSpacing: '0.14em', marginBottom: '4px' }}>
              Risk fingerprint · 7 dimensions
            </p>
            <p className="font-mono font-medium" style={{ fontSize: '8px', letterSpacing: '0.10em', color: P.ink3, marginBottom: '10px' }}>
              Illustrative profile, not published data
            </p>
            <RiskFingerprint active={inView} />
          </div>
        </div>

        {/* Recurring-theme cards */}
        <div className="grid sm:grid-cols-3 gap-[1px] bg-rule-l"
          style={{ ...fade(inView, 240), marginTop: '56px' }}>
          {THEME_CARDS.map(theme => (
            <div key={theme.title} className="bg-canvas p-6 flex flex-col gap-3 hover:bg-canvas-1 transition-colors duration-200">
              <span className="font-mono uppercase text-forest" style={{ fontSize: '8px', letterSpacing: '0.16em' }}>
                Recurring theme
              </span>
              <h3 className="font-display font-extrabold tracking-display"
                style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)', lineHeight: 1.15, color: P.ink2 }}>
                {theme.title}
              </h3>
              <p className="font-sans leading-[1.6]" style={{ fontSize: '13.5px', color: P.ink3 }}>
                {theme.body}
              </p>
            </div>
          ))}
        </div>

        {/* Archive status notice */}
        <div style={{ ...fade(inView, 320), marginTop: '24px' }}>
          <Notice tone="light" label="Archive status">
            The themes above describe the subjects this stream will address. No
            articles are listed yet. Titles, dates, and links will appear here as
            pieces are published.
          </Notice>
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
      style={{ paddingTop: '64px', paddingBottom: '80px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid md:grid-cols-[200px_1fr] gap-10 md:gap-20 items-start">
          {/* Left label */}
          <div style={fade(inView, 0)}>
            <span className="font-mono uppercase font-semibold"
              style={{ fontSize: '11.5px', letterSpacing: '0.14em', color: P.forest }}>
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
                risk their next project actually carries. Travo’s research program
                exists to replace that gap with regional evidence, and to keep the
                firm’s own methodology accountable to data rather than habit.
              </p>
            </div>

            <div style={{ ...fade(inView, 260), marginTop: '32px' }}>
              <a href="/methodology"
                className="font-mono uppercase group hover:opacity-65 focus-visible:opacity-65 transition-opacity duration-200"
                style={{
                  fontSize: '11px', letterSpacing: '0.14em', color: P.forest,
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px',
                  borderBottom: `1px solid ${P.forest}`,
                  paddingBottom: '4px',
                }}>
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
      <FourStreamsSection />
      <CommentarySection />
      <WhySection />
    </>
  );
}
