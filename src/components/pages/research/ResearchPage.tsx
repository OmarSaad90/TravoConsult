'use client';

import type { CSSProperties } from 'react';
import { useInView } from '@/hooks/useInView';

// ── Design tokens ─────────────────────────────────────────────────────────────
const P = {
  navy:    '#1E1E2E',
  navy1:   '#252538',
  ruleD:   '#28283E',
  ruleL:   '#D5D9E8',
  teal:    '#71D2CF',
  tealDp:  '#3EA6A3',
  forest:  '#2C5251',
  snow:    '#E6EAF4',
  slate:   '#8A95B2',
  haze:    '#828DA6',
  ink2:    '#323B5B',
  ink3:    '#5F6884',
} as const;

function fade(active: boolean, delay = 0): CSSProperties {
  return {
    opacity:    active ? 1 : 0,
    transform:  active ? 'none' : 'translateY(24px)',
    transition: `opacity 0.78s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.78s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

function ArrowIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
      <path d="M0 5h14M10 1l4 4-4 4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── The Compounding Loop diagram ─────────────────────────────────────────────
function LoopDiagram({ active }: { active: boolean }) {
  // Two nodes, two curved arrows running opposite directions between them.
  const boxW = 180, boxH = 82;
  const leftX = 24, rightX = 460 - boxW - 24;
  const midY = 115;

  const topPath = `M ${leftX + boxW - 10} ${midY - 26} C ${leftX + boxW + 90} ${midY - 95}, ${rightX - 90} ${midY - 95}, ${rightX + 10} ${midY - 26}`;
  const botPath = `M ${rightX + 10} ${midY + 26} C ${rightX - 90} ${midY + 95}, ${leftX + boxW + 90} ${midY + 95}, ${leftX + boxW - 10} ${midY + 26}`;

  return (
    <svg viewBox="0 0 460 230" width="100%" aria-hidden fill="none"
      style={{ display: 'block', maxWidth: '580px', overflow: 'visible' }}>

      {/* Top arrow: Engagements → Research */}
      <path d={topPath} stroke={P.forest} strokeWidth="1.6" pathLength="1"
        markerEnd="url(#loopArrowFwd)"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: active ? 0 : 1,
          transition: 'stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1) 200ms',
        }} />
      <text x="230" y="12" textAnchor="middle" fill={P.forest}
        fontSize="10" fontWeight={600} fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em"
        opacity={active ? 0.95 : 0} style={{ transition: 'opacity 0.5s 900ms' }}>
        Anonymized engagement data
      </text>

      {/* Bottom arrow: Research → Engagements */}
      <path d={botPath} stroke={P.tealDp} strokeWidth="1.6" pathLength="1"
        markerEnd="url(#loopArrowBack)"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: active ? 0 : 1,
          transition: 'stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1) 450ms',
        }} />
      <text x="230" y="214" textAnchor="middle" fill={P.tealDp}
        fontSize="10" fontWeight={600} fontFamily="JetBrains Mono, monospace" letterSpacing="0.06em"
        opacity={active ? 0.95 : 0} style={{ transition: 'opacity 0.5s 1150ms' }}>
        Benchmarks and methodology
      </text>

      {/* Arrowhead defs */}
      <defs>
        <marker id="loopArrowFwd" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={P.forest} />
        </marker>
        <marker id="loopArrowBack" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={P.tealDp} />
        </marker>
      </defs>

      {/* Nodes */}
      <g opacity={active ? 1 : 0} style={{ transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) 60ms' }}>
        <rect x={leftX} y={midY - boxH / 2} width={boxW} height={boxH} fill="none"
          stroke={P.ruleL} strokeWidth="1.2" />
        <text x={leftX + boxW / 2} y={midY - 4} textAnchor="middle" fill={P.ink2}
          fontSize="13" fontWeight={700} fontFamily="Barlow Condensed, sans-serif"
          letterSpacing="0.02em">ENGAGEMENTS</text>
        <text x={leftX + boxW / 2} y={midY + 16} textAnchor="middle" fill={P.ink3}
          fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">
          Client work
        </text>
      </g>

      <g opacity={active ? 1 : 0} style={{ transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) 120ms' }}>
        <rect x={rightX} y={midY - boxH / 2} width={boxW} height={boxH} fill="none"
          stroke={P.ruleL} strokeWidth="1.2" />
        <text x={rightX + boxW / 2} y={midY - 4} textAnchor="middle" fill={P.ink2}
          fontSize="13" fontWeight={700} fontFamily="Barlow Condensed, sans-serif"
          letterSpacing="0.02em">RESEARCH</text>
        <text x={rightX + boxW / 2} y={midY + 16} textAnchor="middle" fill={P.ink3}
          fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">
          Applied program
        </text>
      </g>
    </svg>
  );
}

// ── § 1 — Hero ────────────────────────────────────────────────────────────────
function HeroSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });

  const REASONS = [
    { id: '01', name: 'Methodology defensibility', sub: 'Formal proceedings and disputes' },
    { id: '02', name: 'The regional dataset',       sub: 'NJ/NY Construction Risk Index' },
    { id: '03', name: 'Compounding practice',       sub: 'Engagement to engagement' },
  ] as const;

  return (
    <section ref={ref} aria-labelledby="research-h1"
      className="relative bg-canvas text-ink overflow-hidden"
      style={{ paddingTop: '64px', paddingBottom: '44px' }}>
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div style={fade(inView, 0)}>
          <span className="font-mono font-semibold text-forest uppercase" style={{ fontSize: '11.5px', letterSpacing: '0.16em' }}>
            Research
          </span>
        </div>

        <div className="max-w-[880px] mt-5">
          <h1 id="research-h1"
            className="font-display font-extrabold tracking-display balance"
            style={{ fontSize: 'clamp(2.7rem, 5.2vw, 5rem)', lineHeight: 0.95 }}>
            <span className="block text-ink" style={fade(inView, 70)}>
              Research is operational,
            </span>
            <span className="block text-forest" style={fade(inView, 150)}>
              not ornamental.
            </span>
          </h1>

          <p className="mt-7 font-sans text-ink-2 leading-[1.78] pretty"
            style={{ ...fade(inView, 260), fontSize: '17px', maxWidth: '62ch' }}>
            TRAVO maintains an active applied-research program. It exists for three
            reasons: to keep the firm&rsquo;s methodology defensible when it is
            challenged in formal proceedings, to build the regional dataset that
            underpins the NJ/NY Construction Risk Index, and to ensure that what is
            learned on one engagement improves the next. Research topics originate in
            anonymized engagement data and in supervised graduate research.
          </p>
        </div>

        {/* Three reasons strip */}
        <div className="mt-16 border-t border-rule-l" style={fade(inView, 340)}>
          <div className="grid sm:grid-cols-3 divide-y divide-rule-l sm:divide-y-0 sm:divide-x sm:divide-rule-l">
            {REASONS.map((r, i) => (
              <div key={r.id} className="py-6" style={{ ...fade(inView, 380 + i * 70), paddingLeft: i > 0 ? '28px' : undefined }}>
                <span className="font-mono uppercase font-semibold text-forest"
                  style={{ fontSize: '9.5px', letterSpacing: '0.18em' }}>
                  {r.id}
                </span>
                <p className="font-display font-bold text-ink mt-2"
                  style={{ fontSize: '16px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {r.name}
                </p>
                <p className="font-mono uppercase font-semibold text-ink-3 mt-1"
                  style={{ fontSize: '9px', letterSpacing: '0.12em' }}>
                  {r.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-2 mt-8" style={fade(inView, 620)}>
          {['Anonymized Engagement Data', 'Supervised Graduate Research'].map((t) => (
            <span key={t} className="font-mono text-ink-3 uppercase"
              style={{ fontSize: '9.5px', letterSpacing: '0.14em', border: `1px solid ${P.ruleL}`, padding: '5px 12px' }}>
              {t}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── § 2 — The Compounding Loop ───────────────────────────────────────────────
function LoopSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="bg-canvas border-t border-rule-l" style={{ paddingTop: '44px', paddingBottom: '76px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_520px] gap-14 lg:gap-20 items-center">

          <div>
            <span className="font-mono uppercase font-semibold" style={{ ...fade(inView, 0), fontSize: '11.5px', letterSpacing: '0.14em', color: P.forest }}>
              The Compounding Loop
            </span>
            <h2 className="font-display font-extrabold tracking-display balance mt-5"
              style={{ ...fade(inView, 70), fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', lineHeight: 0.97, color: P.ink2, maxWidth: '22ch' }}>
              Engagements feed research; research improves engagements.
            </h2>
          </div>

          <div style={fade(inView, 160)}>
            <LoopDiagram active={inView} />
          </div>

        </div>
      </div>
    </section>
  );
}

// ── § 3 — Lines of Inquiry ────────────────────────────────────────────────────
type Line = {
  n: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
};

const LINES: Line[] = [
  {
    n: 'Line 01',
    title: 'Regional outcome benchmarks',
    body: 'Schedule slippage, cost-overrun distributions, contingency adequacy, and claim-emergence patterns across the NJ/NY market, the dataset that will be published as the NJ/NY Construction Risk Index.',
    link: { label: 'About the Index', href: '/risk-index' },
  },
  {
    n: 'Line 02',
    title: 'Contingency adequacy after the fact',
    body: 'Whether contingencies held on completed projects proved sufficient, excessive, or exhausted, the empirical test of how contingency is actually being set, and the feedback loop that calibrates future derivations.',
  },
  {
    n: 'Line 03',
    title: 'Risk categorization and early-warning indicators',
    body: 'Whether recurring risk categories and leading indicators can be surfaced systematically across historical audit and lessons-learned data, including AI-supported techniques. Such methods remain strictly subordinate to expert judgment.',
    link: { label: 'See the methodology', href: '/methodology' },
  },
  {
    n: 'Line 04',
    title: 'The observational method in construction',
    body: 'Treating construction as an information-gathering phase in which the plan updates as uncertainty resolves, the approach at the center of the principal’s doctoral research, carried into applied capital-project decisions.',
  },
];

function LinesSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.04 });

  return (
    <section ref={ref} className="relative bg-navy text-snow overflow-hidden"
      style={{ paddingTop: '68px', paddingBottom: '88px' }}>

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="max-w-[62ch]" style={fade(inView, 0)}>
          <span className="font-mono font-semibold text-teal uppercase" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
            Lines of Inquiry
          </span>
          <h2 className="font-display font-extrabold tracking-display balance mt-4"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', lineHeight: 0.97 }}>
            What the practice is researching.
          </h2>
          <p className="font-sans text-slate leading-[1.78] pretty mt-5"
            style={{ fontSize: '16px' }}>
            Four lines of inquiry are active. Each is grounded in the firm&rsquo;s
            engagement and audit data, and each is intended to produce published output.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px mt-14"
          style={{ backgroundColor: P.ruleD }}>
          {LINES.map((line, i) => (
            <div key={line.n} className="bg-navy-1 flex flex-col"
              style={{ padding: '32px 34px', ...fade(inView, 100 + i * 90) }}>
              <span className="font-mono uppercase font-semibold text-teal" style={{ fontSize: '9.5px', letterSpacing: '0.16em' }}>
                {line.n}
              </span>
              <h3 className="font-display font-bold text-snow leading-snug tracking-tight mt-3"
                style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)' }}>
                {line.title}
              </h3>
              <p className="font-sans text-slate leading-[1.7] pretty mt-3"
                style={{ fontSize: '14.5px' }}>
                {line.body}
              </p>
              {line.link && (
                <a href={line.link.href}
                  className="font-mono uppercase inline-flex items-center gap-2 mt-5 text-teal hover:text-teal-deep transition-colors duration-200"
                  style={{ fontSize: '10.5px', letterSpacing: '0.12em' }}>
                  {line.link.label}
                  <ArrowIcon color="currentColor" />
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── § 4 — Questions the Dataset Answers ──────────────────────────────────────
function QuestionsSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="bg-canvas-1" style={{ paddingTop: '60px', paddingBottom: '56px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid md:grid-cols-[200px_1fr] gap-10 md:gap-20 items-start">
          <div style={fade(inView, 0)}>
            <span className="font-mono uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em', color: P.forest }}>
              Questions the Dataset Answers
            </span>
          </div>

          <div>
            <h2 className="font-display font-extrabold tracking-display balance"
              style={{ ...fade(inView, 80), fontSize: 'clamp(2rem, 3.8vw, 3.6rem)', lineHeight: 0.96, color: P.ink2, maxWidth: '20ch' }}>
              Portfolio-scale questions, asked quantitatively.
            </h2>

            <p className="font-sans leading-[1.78] pretty"
              style={{ ...fade(inView, 180), marginTop: '28px', fontSize: '17px', color: P.ink3, maxWidth: '62ch' }}>
              The regional dataset is built to answer questions a single project
              cannot, for example, whether a risk that has remained open for months
              is still being managed, or has quietly become a governance problem.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── § 5 — The Academic Platform ───────────────────────────────────────────────
function PlatformSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });

  return (
    <section ref={ref} className="bg-canvas-1 border-t border-rule-l" style={{ paddingTop: '44px', paddingBottom: '76px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[380px_1fr] gap-14 lg:gap-20 items-start">

          {/* Left: credential block */}
          <div style={fade(inView, 0)}>
            <span className="font-mono uppercase font-semibold text-forest" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
              The Academic Platform
            </span>
            <div className="mt-6 border p-6" style={{ borderColor: P.ruleL, backgroundColor: 'rgba(44,82,81,0.04)' }}>
              <p className="font-mono uppercase font-semibold text-forest" style={{ fontSize: '9px', letterSpacing: '0.16em', marginBottom: '12px' }}>
                Academic Appointment
              </p>
              <p className="font-sans text-ink" style={{ fontSize: '14.5px', lineHeight: 1.6 }}>
                Teaching Associate Professor
              </p>
              <p className="font-sans text-ink-2" style={{ fontSize: '14.5px', lineHeight: 1.6 }}>
                Civil, Environmental and Ocean Engineering
              </p>
              <p className="font-sans text-ink-2" style={{ fontSize: '14.5px', lineHeight: 1.6 }}>
                Stevens Institute of Technology &middot; New Jersey
              </p>
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${P.ruleL}` }}>
              <p className="font-mono uppercase font-semibold text-forest" style={{ fontSize: '9.5px', letterSpacing: '0.16em', marginBottom: '8px' }}>
                Publication status
              </p>
              <p className="font-sans text-ink-2 leading-[1.7]" style={{ fontSize: '13.5px' }}>
                No research findings are published yet. Papers, benchmarks, and
                Index editions will be listed as they are released. Titles, dates,
                and links added only when work is actually published.
              </p>
            </div>
          </div>

          {/* Right: copy + buttons + notice */}
          <div>
            <h2 className="font-display font-extrabold tracking-display balance"
              style={{ ...fade(inView, 80), fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', lineHeight: 0.97, color: P.ink2 }}>
              Where the research is done.
            </h2>

            <div style={fade(inView, 160)}>
              <p className="font-sans text-ink-2 leading-[1.78] pretty mt-6"
                style={{ fontSize: '16.5px', maxWidth: '62ch' }}>
                The principal is Teaching Associate Professor of Civil, Environmental
                and Ocean Engineering at Stevens Institute of Technology in New
                Jersey. The appointment provides the research platform, the
                graduate-student analytical capacity, and the peer-review discipline
                that keep TRAVO&rsquo;s methodology defensible under formal scrutiny.
              </p>
              <p className="font-sans text-ink-2 leading-[1.78] pretty mt-4"
                style={{ fontSize: '16.5px', maxWidth: '62ch' }}>
                Supervised graduate researchers work exclusively on this research
                track: anonymized datasets, benchmark development, methodology, and
                co-authored publication. They never staff client engagements and
                never access client-confidential material; confidential work is
                executed by the principal and professional analysts under NDA. The
                arrangement is disclosed in writing under Stevens&rsquo;{' '}
                conflict-of-interest and conflict-of-commitment policies and
                renewed annually. Every published product carries the
                principal&rsquo;s name and credentials.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8" style={fade(inView, 260)}>
              <a href="/insights"
                className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200">
                The Publishing Program
              </a>
              <a href="/about"
                className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200">
                About the Principal
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── § 6 — Contributing Data (closing CTA) ─────────────────────────────────────
function ContributeSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section ref={ref} className="relative bg-canvas text-ink overflow-hidden"
      style={{ paddingTop: '52px', paddingBottom: '56px' }}>
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-[70ch]">
          <span className="font-mono font-semibold text-forest uppercase" style={{ ...fade(inView, 0), fontSize: '11.5px', letterSpacing: '0.16em' }}>
            Contributing Data
          </span>
          <h2 className="font-display font-extrabold tracking-display balance mt-5"
            style={{ ...fade(inView, 70), fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', lineHeight: 0.97, color: P.ink2 }}>
            Institutional owners and agencies can contribute.
          </h2>
          <p className="font-sans text-ink-2 leading-[1.78] pretty mt-6"
            style={{ ...fade(inView, 160), fontSize: '16.5px', maxWidth: '64ch' }}>
            Owners, agencies, sureties, lenders, and counsel who wish to contribute
            anonymized portfolio data, or to be notified when the first Index
            edition is published, are invited to get in touch. Contributed data is
            anonymized before it enters the dataset and is never attributed to a
            named project or client.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-10" style={fade(inView, 260)}>
          <a href="/contact"
            className="font-mono text-[11px] tracking-label uppercase bg-forest text-canvas px-7 py-[14px] hover:bg-forest-2 transition-colors duration-200">
            Discuss Contributing Data
          </a>
          <a href="/risk-index"
            className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200">
            About the Risk Index
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function ResearchPage() {
  return (
    <>
      <HeroSection />
      <LoopSection />
      <LinesSection />
      <QuestionsSection />
      <PlatformSection />
      <ContributeSection />
    </>
  );
}
