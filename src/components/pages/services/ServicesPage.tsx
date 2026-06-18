'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from '@/hooks/useInView';

// ── Data ───────────────────────────────────────────────────────────────────────

const TICKER = [
  'A PRODUCTIZED CATALOG',
  'DEFINED SCOPE · DEFINED DELIVERABLE',
  'AACE 41R-08 · 57R-09',
  'PRE-PROJECT · DURING-PROJECT · POST-PROJECT',
  'NJ / NY METROPOLITAN REGION',
  '11 DEFINED SERVICES',
  'MONTE CARLO SIMULATION',
  'INDEPENDENT ANALYSIS',
];

type Service = {
  code: string;
  name: string;
  desc: string;
  deliverable: string;
  timeline: string;
  fee: string;
};

type Category = {
  id: 'A' | 'B' | 'C';
  phase: string;
  name: string;
  intro: string;
  accent: string;
  services: Service[];
};

const CATALOG: Category[] = [
  {
    id: 'A',
    phase: 'Pre-Project',
    name: 'Pre-Project Risk & Contingency Analysis',
    intro:
      "Risk and contingency work performed during planning and procurement, before construction begins. The front-end discipline where rigorous quantitative analysis produces the largest measurable improvement in a project's net present value. This is Travo's primary entry point with new clients.",
    accent: '#71D2CF',
    services: [
      {
        code: 'A1',
        name: 'Quantitative Risk Analysis & Contingency Derivation',
        desc: "Independent Monte Carlo analysis of a project's cost and schedule outcomes, producing P10 / P50 / P80 distributions for cost-at-completion and completion date, and a defensible, evidence-based contingency recommendation. Grounded in AACE Recommended Practices 41R-08 and 57R-09, with documented sensitivity analysis and fully traceable inputs.",
        deliverable:
          '30–50 page report: executive summary, risk register, methodology, simulation outputs, tornado and sensitivity analyses, and recommended contingency with rationale. Working files on request.',
        timeline: '5–7 weeks',
        fee: '$60,000 – $120,000',
      },
      {
        code: 'A2',
        name: 'Structured Risk Register Development',
        desc: 'Workshop-driven identification, characterization, and structuring of project risks across cost, schedule, technical, regulatory, environmental, and external categories — for projects that require a formal, well-governed risk register before a full quantitative simulation is warranted.',
        deliverable:
          "Structured risk register with owners, probability and impact assessments, and mitigation strategies; methodology documentation; facilitated workshop materials; and a register template for the client's continued use.",
        timeline: '3–5 weeks',
        fee: '$25,000 – $60,000',
      },
      {
        code: 'A3',
        name: 'Risk-Adjusted Bid Leveling & Procurement Support',
        desc: "Independent analysis of bidder pricing through a quantitative risk lens — which bids are realistic, which are buying the work, and where contractual risk has been shifted in ways the owner may not recognize. A fixed-price bid is the floor of project cost, not the ceiling; this analysis is what lets owners see the difference. Particularly valuable on $30M–$150M contractor selections.",
        deliverable:
          'Bid-leveling report with risk-adjusted ranking, identification of latent risk transfer in each bid, and a procurement recommendation supported by quantitative reasoning.',
        timeline: '3–5 weeks',
        fee: '$35,000 – $80,000',
      },
      {
        code: 'A4',
        name: 'Independent Risk Peer Review',
        desc: "Owner-side review of a contractor's submitted risk register and contingency analysis — identifying methodological gaps, missing risks, underestimated impacts, and structural weaknesses in the contractor's approach. A short engagement with disproportionate value to the owner.",
        deliverable:
          'Peer review report with findings, ranked recommendations, and required remediations.',
        timeline: '2–3 weeks',
        fee: '$20,000 – $50,000',
      },
      {
        code: 'A5',
        name: 'Strategic Alternatives & Scenario Analysis',
        desc: 'Structured analysis of capital decisions that involve a choice among substantively different paths: build versus retrofit, alternative technologies, delivery models, or phasing strategies. Where operational risk analysis quantifies variation within a chosen plan, this service quantifies the relative attractiveness of the alternatives themselves. Grounded in decision analysis, multi-criteria methods, and real-options framing where appropriate.',
        deliverable:
          'Scenario analysis report comparing alternatives across cost, schedule, risk, and strategic-value dimensions, with a decision recommendation and sensitivity analysis on key drivers.',
        timeline: '4–8 weeks',
        fee: '$50,000 – $130,000',
      },
    ],
  },
  {
    id: 'B',
    phase: 'During-Project',
    name: 'During-Project Risk Management',
    intro:
      "Risk and contingency work performed during construction execution — the discipline that carries procurement-stage analysis through to project completion, and the firm's primary source of recurring engagement.",
    accent: '#FFB9BB',
    services: [
      {
        code: 'B1',
        name: 'Risk Register Management Retainer',
        desc: "A monthly or quarterly retainer to maintain the project's live risk register, run change-impact assessments, chair scheduled risk reviews, and provide ongoing methodology guidance — for 12–36 month projects where risk discipline is required and internal capacity is not yet in place.",
        deliverable:
          'Maintained risk register with monthly updates, monthly written status reporting, facilitated risk reviews on a defined cadence, and change-impact memos as triggered.',
        timeline: '12–36 months, recurring',
        fee: '$8,000 – $25,000 / month',
      },
      {
        code: 'B2',
        name: 'Trend Risk Analysis & Cost-at-Completion Forecasting',
        desc: "An independent quantitative reassessment of a project's outcome distributions when it begins to trend negatively — typically commissioned by a board, lender, owner, or surety concerned about emerging deterioration. Updates the original analysis with current data to produce revised P50 / P80 forecasts and a clear view of root-cause drivers.",
        deliverable:
          'Updated risk analysis with revised cost- and schedule-at-completion distributions, root-cause identification, and a recommended management response.',
        timeline: '3–5 weeks',
        fee: '$30,000 – $90,000',
      },
      {
        code: 'B3',
        name: 'Pre-Claim & Dispute-Readiness Risk Review',
        desc: "Structured analysis conducted as delays or cost overruns begin to materialize — examining where contractual risk allocation actually sits, what claims may emerge, what the project's defensible position is, and what documentation should be assembled. The bridge between project advisory and forensic claims work.",
        deliverable:
          'Pre-claim analysis report, documentation strategy, recommended evidence-preservation actions, and a risk-allocation map.',
        timeline: '4–6 weeks',
        fee: '$40,000 – $100,000',
      },
    ],
  },
  {
    id: 'C',
    phase: 'Post-Project & Portfolio',
    name: 'Post-Project & Portfolio Services',
    intro:
      'Risk work performed after project completion or across portfolios of projects — where structured learning and regional benchmarking compound into long-term institutional value.',
    accent: '#FF5B5E',
    services: [
      {
        code: 'C1',
        name: 'Lessons-Learned Risk Capture',
        desc: 'A structured post-project review of which risks materialized, which were missed, where mitigation worked, and what should change — converting experience into specific improvements for the next project, for institutional owners running ongoing capital programs.',
        deliverable:
          "Lessons-learned report with concrete updates to the owner's risk methodology, templates, and procurement language for future projects.",
        timeline: '4–6 weeks',
        fee: '$25,000 – $60,000',
      },
      {
        code: 'C2',
        name: 'Portfolio Risk Benchmarking',
        desc: "An annual subscription comparing an institutional owner's portfolio risk profile and outcome distributions against Travo's regional dataset, with quarterly updates and benchmark refreshes. Available as the firm's regional dataset reaches sufficient depth.",
        deliverable:
          "Annual benchmark report, quarterly update memos, portfolio-specific comparative analysis, and direct access to the firm's research staff for ad hoc questions.",
        timeline: 'Annual, multi-year preferred',
        fee: '$25,000 – $60,000 / year',
      },
      {
        code: 'C3',
        name: 'Methodology Implementation & Training',
        desc: "An engagement to help an institutional owner or large contractor build their own internal risk methodology, train their team on quantitative risk tooling, and stand up a durable risk-management capability. Travo does not shield itself from clients building internal capability — those clients remain clients for higher-order work, and refer the firm broadly.",
        deliverable:
          'Methodology framework, training program, implementation support, templates, tooling configuration, and organizational change recommendations.',
        timeline: '8–16 weeks',
        fee: '$75,000 – $200,000',
      },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function fade(visible: boolean, delay: number): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(22px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

// ── Ticker strip ───────────────────────────────────────────────────────────────

function TickerStrip() {
  return (
    <div className="border-b border-rule-d overflow-hidden" style={{ height: '34px' }} aria-hidden>
      <div
        className="flex items-center h-full whitespace-nowrap"
        style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}
      >
        {[...TICKER, ...TICKER].map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-mono uppercase text-haze"
              style={{ fontSize: '9.5px', letterSpacing: '0.18em', paddingLeft: '28px' }}
            >
              {item}
            </span>
            <span className="font-mono text-teal mx-3" style={{ fontSize: '7px', opacity: 0.5 }}>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Catalog index panel ────────────────────────────────────────────────────────

function CatalogIndexPanel({ mounted }: { mounted: boolean }) {
  return (
    <div
      className="relative border border-rule-d"
      style={{
        background: '#252538',
        padding: '28px',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'none' : 'translateY(32px)',
        transition:
          'opacity 1s cubic-bezier(0.16,1,0.3,1) 360ms, transform 1s cubic-bezier(0.16,1,0.3,1) 360ms',
      }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between mb-7 pb-5 border-b border-rule-d">
        <span
          className="font-mono text-teal uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.18em' }}
        >
          Service Catalog
        </span>
        <span
          className="font-mono text-haze uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.14em' }}
        >
          Vol. 01
        </span>
      </div>

      {/* Category rows */}
      <div className="flex flex-col gap-5">
        {CATALOG.map((cat, ci) => (
          <div key={cat.id} className="flex items-center gap-4">
            <span
              className="font-display font-extrabold tracking-display leading-none shrink-0"
              style={{ fontSize: '2rem', color: cat.accent, width: '32px' }}
            >
              {cat.id}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-[6px]">
                <span
                  className="font-mono uppercase text-slate"
                  style={{ fontSize: '9px', letterSpacing: '0.12em' }}
                >
                  {cat.phase}
                </span>
                <span className="font-mono" style={{ fontSize: '10px', color: cat.accent }}>
                  {cat.services.length}
                </span>
              </div>
              <div className="h-[2px] bg-rule-d">
                <div
                  style={{
                    height: '100%',
                    backgroundColor: cat.accent,
                    opacity: 0.65,
                    width: mounted ? `${(cat.services.length / 11) * 100}%` : '0%',
                    transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${500 + ci * 80}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer metadata */}
      <div className="mt-7 pt-5 border-t border-rule-d flex flex-col gap-[10px]">
        {[
          ['Total Services', '11'],
          ['Region', 'NJ / NY Metropolitan'],
          ['Methodology', 'AACE 41R-08 · 57R-09'],
          ['Independence', 'Owner-side only'],
        ].map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-3">
            <span
              className="font-mono uppercase text-haze shrink-0"
              style={{ fontSize: '8.5px', letterSpacing: '0.14em' }}
            >
              {label}
            </span>
            <span className="font-mono text-slate" style={{ fontSize: '10.5px', letterSpacing: '0.04em' }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-0 right-0 w-4 h-4 border-t border-r border-teal/30 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-teal/30 pointer-events-none"
        aria-hidden
      />
    </div>
  );
}

// ── Lifecycle bar ──────────────────────────────────────────────────────────────

function LifecycleBar({ mounted }: { mounted: boolean }) {
  const phases = [
    { id: 'A', label: 'Pre-Project', sub: 'Planning & Procurement', count: 5, accent: '#71D2CF', flex: 5 },
    { id: 'B', label: 'During-Project', sub: 'Construction Execution', count: 3, accent: '#FFB9BB', flex: 3 },
    { id: 'C', label: 'Post-Project', sub: 'Portfolio & Learning', count: 3, accent: '#FF5B5E', flex: 3 },
  ];

  return (
    <div
      className="px-6 md:px-12 lg:px-16 pt-5 pb-8"
      style={{
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 700ms',
      }}
      aria-hidden
    >
      {/* Milestone labels */}
      <div className="hidden sm:flex items-center mb-2">
        {['Project Start', 'Contract Award', 'Substantial Completion', 'Closeout'].map((m, i) => (
          <span key={m} className="flex items-center" style={{ flex: i === 0 || i === 3 ? '0 0 auto' : 1 }}>
            <span
              className="font-mono text-haze uppercase whitespace-nowrap"
              style={{ fontSize: '7.5px', letterSpacing: '0.12em' }}
            >
              {m}
            </span>
            {i < 3 && <div className="flex-1 border-t border-rule-d/40 mx-3" />}
          </span>
        ))}
      </div>

      {/* Phase segments */}
      <div className="flex gap-[2px]" style={{ height: '30px' }}>
        {phases.map((p) => (
          <a
            key={p.id}
            href={`#cat-${p.id.toLowerCase()}`}
            className="flex items-center justify-between px-3 group transition-all duration-300 hover:opacity-90"
            style={{
              flex: p.flex,
              backgroundColor: mounted ? `${p.accent}18` : 'rgba(255,255,255,0.025)',
              borderTop: `2px solid ${p.accent}`,
              transition: 'background-color 0.8s cubic-bezier(0.16,1,0.3,1)',
              textDecoration: 'none',
            }}
          >
            <span
              className="font-mono uppercase whitespace-nowrap"
              style={{ fontSize: '8px', letterSpacing: '0.1em', color: p.accent }}
            >
              {p.label}
            </span>
            <span
              className="font-mono hidden sm:block"
              style={{ fontSize: '9px', color: p.accent, opacity: 0.6 }}
            >
              {p.count}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Hero section ───────────────────────────────────────────────────────────────

function ServicesHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : 'translateY(26px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section className="relative bg-navy overflow-hidden" aria-label="Services catalog introduction">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <TickerStrip />

      <div className="relative" style={{ zIndex: 2 }}>
        {/* Two-column hero content */}
        <div className="max-w-site mx-auto w-full px-6 md:px-12 lg:px-16 py-16 md:py-20 grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">

          {/* Left: heading + lead + CTAs */}
          <div>
            <div style={reveal(60)}>
              <span className="font-mono text-[10px] tracking-label uppercase text-teal">
                Services
                <span className="mx-[10px]" style={{ opacity: 0.35 }}>·</span>
                Quantitative Risk Advisory
              </span>
            </div>

            <h1
              className="mt-6 font-display font-extrabold tracking-display"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5.2rem)', lineHeight: 0.92 }}
            >
              <span className="block text-snow" style={reveal(140)}>A productized</span>
              <span className="block text-snow" style={reveal(210)}>catalog, organized</span>
              <span className="block text-teal" style={reveal(290)}>to the project</span>
              <span className="block text-snow" style={reveal(350)}>lifecycle.</span>
            </h1>

            <p
              className="mt-7 font-sans text-slate leading-[1.78] pretty"
              style={{ fontSize: '17px', maxWidth: '52ch', ...reveal(460) }}
            >
              Every offering carries a defined deliverable, methodology, scope, and fee structure.
              The catalog is intentionally bounded — Travo accepts only engagements where
              quantitative risk analysis is central to the decision.
            </p>

            <div className="mt-8 flex flex-wrap gap-3" style={reveal(550)}>
              <a
                href="#cat-a"
                className="font-mono text-[11px] tracking-label uppercase bg-teal text-navy px-7 py-[14px] hover:bg-teal-deep transition-colors duration-200"
              >
                View Catalog
              </a>
              <a
                href="/contact"
                className="font-mono text-[11px] tracking-label uppercase text-teal border border-teal/50 px-7 py-[14px] hover:border-teal hover:bg-teal/[0.08] transition-all duration-200"
              >
                Start a Conversation
              </a>
            </div>
          </div>

          {/* Right: catalog index panel */}
          <div>
            <CatalogIndexPanel mounted={mounted} />
          </div>
        </div>

        {/* Lifecycle timeline — full width */}
        <div className="border-t border-rule-d/50">
          <LifecycleBar mounted={mounted} />
        </div>
      </div>
    </section>
  );
}

// ── Sidebar navigator ──────────────────────────────────────────────────────────

function SidebarNav({ activeId }: { activeId: 'A' | 'B' | 'C' }) {
  return (
    <nav aria-label="Service categories" className="flex flex-col h-full">
      <span
        className="font-mono uppercase text-haze mb-5 mt-10"
        style={{ fontSize: '8.5px', letterSpacing: '0.18em' }}
      >
        Catalog
      </span>

      <div className="flex flex-col gap-0">
        {CATALOG.map((cat) => {
          const active = activeId === cat.id;
          return (
            <a
              key={cat.id}
              href={`#cat-${cat.id.toLowerCase()}`}
              className="flex items-center gap-4 py-4 group transition-all duration-200"
              style={{
                borderLeft: `2px solid ${active ? cat.accent : '#28283E'}`,
                paddingLeft: '18px',
                textDecoration: 'none',
              }}
            >
              <span
                className="font-display font-extrabold tracking-display leading-none shrink-0 transition-colors duration-200"
                style={{ fontSize: '1.6rem', color: active ? cat.accent : '#8A95B2' }}
              >
                {cat.id}
              </span>
              <div>
                <div
                  className="font-mono uppercase transition-colors duration-200"
                  style={{
                    fontSize: '8.5px',
                    letterSpacing: '0.12em',
                    color: active ? '#E6EAF4' : '#8A95B2',
                  }}
                >
                  {cat.phase}
                </div>
                <div
                  className="font-mono mt-[3px] transition-colors duration-200"
                  style={{ fontSize: '8.5px', color: active ? cat.accent : '#3A3A5C' }}
                >
                  {cat.services.length} services
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-auto pb-10">
        <div className="border-t border-rule-d pt-6">
          <a
            href="/contact"
            className="font-mono text-[9px] tracking-label uppercase text-teal hover:text-snow transition-colors duration-200 block"
          >
            Start a Conversation
          </a>
          <a
            href="/"
            className="font-mono text-[9px] tracking-label uppercase text-haze hover:text-slate transition-colors duration-200 block mt-3"
          >
            Back to Home
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Service meta datum ─────────────────────────────────────────────────────────

function MetaDatum({
  label,
  value,
  feeColor,
}: {
  label: string;
  value: string;
  feeColor?: string;
}) {
  return (
    <div>
      <span
        className="font-mono uppercase block"
        style={{ fontSize: '8px', letterSpacing: '0.16em', color: '#828DA6' }}
      >
        {label}
      </span>
      <span
        className="font-mono block mt-[3px]"
        style={{ fontSize: '11px', letterSpacing: '0.04em', color: feeColor ?? '#323B5B' }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Mini visualizations for featured services ─────────────────────────────────

function MiniDistributionA1() {
  // Static probability distribution — the literal output of A1
  const W = 188, H = 76;
  const pts: string[] = [];
  for (let i = 0; i <= 70; i++) {
    const t = i / 70;
    const xn = t * 8 - 4;
    const yRaw = Math.exp(-xn * xn / 2);
    pts.push(`${i === 0 ? 'M' : 'L'}${(t * W).toFixed(1)},${(H - yRaw * H * 0.82).toFixed(1)}`);
  }
  const curve = pts.join(' ');
  const fill = `${curve} L${W},${H} L0,${H} Z`;

  const p10x = 0.34 * W, p50x = 0.51 * W, p80x = 0.66 * W;

  return (
    <div className="hidden lg:flex flex-col shrink-0" style={{ width: '188px' }}>
      <span
        className="font-mono uppercase block mb-2"
        style={{ fontSize: '7.5px', letterSpacing: '0.14em', color: '#828DA6' }}
      >
        Sample Output
      </span>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', display: 'block', overflow: 'visible' }}
        fill="none"
        aria-label="Probability distribution of project cost outcomes"
      >
        <path d={fill} fill="#3EA6A3" opacity="0.08" />
        <path d={curve} stroke="#3EA6A3" strokeWidth="1.5" fill="none" />
        {/* P10 */}
        <line x1={p10x} y1="0" x2={p10x} y2={H} stroke="#3EA6A3" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.7" />
        {/* P50 */}
        <line x1={p50x} y1="0" x2={p50x} y2={H} stroke="#2C5251" strokeWidth="1" strokeDasharray="2,3" opacity="0.85" />
        {/* P80 */}
        <line x1={p80x} y1="0" x2={p80x} y2={H} stroke="#9B2D30" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.7" />
        {/* Baseline */}
        <line x1="0" y1={H} x2={W} y2={H} stroke="#D5D9E8" strokeWidth="0.75" />
      </svg>
      <div className="flex justify-between mt-[5px]">
        {[['P10', '#3EA6A3'], ['P50', '#2C5251'], ['P80', '#9B2D30']].map(([label, color]) => (
            <span key={label} className="font-mono" style={{ fontSize: '7px', letterSpacing: '0.1em', color }}>
              {label}
            </span>
          ))
        }
      </div>
    </div>
  );
}

function MiniCadenceB1() {
  // Monthly cadence timeline — shows what "recurring retainer" means visually
  const totalMonths = 14;
  const reviewAt = [0, 2, 5, 8, 11]; // initial + quarterly reviews
  const W = 188, H = 44;
  const step = W / (totalMonths - 1);

  return (
    <div className="hidden lg:flex flex-col shrink-0" style={{ width: '188px' }}>
      <span
        className="font-mono uppercase block mb-2"
        style={{ fontSize: '7.5px', letterSpacing: '0.14em', color: '#828DA6' }}
      >
        Monthly Cadence
      </span>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', display: 'block' }}
        fill="none"
        aria-hidden
      >
        {/* Base timeline */}
        <line x1="0" y1={H / 2} x2={W - 8} y2={H / 2} stroke="#D5D9E8" strokeWidth="1" />
        {/* Recurring arrow */}
        <path
          d={`M${W - 8} ${H / 2 - 6} C${W} ${H / 2 - 6} ${W} ${H / 2 + 6} ${W - 8} ${H / 2 + 6}`}
          stroke="#D5D9E8" strokeWidth="0.8" fill="none"
        />

        {/* Monthly tick marks */}
        {Array.from({ length: totalMonths }, (_, i) => {
          const x = i * step;
          const isReview = reviewAt.includes(i);
          return (
            <g key={i}>
              <line
                x1={x} y1={isReview ? H / 2 - 9 : H / 2 - 5}
                x2={x} y2={isReview ? H / 2 + 9 : H / 2 + 5}
                stroke={isReview ? '#2C5251' : '#D5D9E8'}
                strokeWidth={isReview ? 1.5 : 0.75}
              />
              {isReview && i > 0 && (
                <text
                  x={x} y={H - 2}
                  textAnchor="middle"
                  fill="#828DA6"
                  fontSize="6"
                  fontFamily="monospace"
                >
                  M{i + 1}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="flex items-center gap-[6px] mt-1">
        <div style={{ width: '10px', height: '1.5px', backgroundColor: '#2C5251' }} />
        <span className="font-mono" style={{ fontSize: '6.5px', letterSpacing: '0.1em', color: '#828DA6' }}>
          Scheduled risk review
        </span>
      </div>
    </div>
  );
}

const FEATURED_VIZ: Partial<Record<string, React.ReactElement>> = {
  A1: <MiniDistributionA1 />,
  B1: <MiniCadenceB1 />,
};

// ── Featured service entry (first in each category — full width) ───────────────

function FeaturedServiceEntry({
  svc,
  accent,
  feeColor,
  visible,
}: {
  svc: Service;
  accent: string;
  feeColor: string;
  visible: boolean;
}) {
  const viz = FEATURED_VIZ[svc.code];

  return (
    <article className="border-b border-rule-l" style={fade(visible, 0)}>
      <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 py-9 lg:py-11 px-7 md:px-10 lg:px-12">

        {/* Code anchor */}
        <div className="shrink-0" style={{ width: '84px' }}>
          <span
            className="font-display font-extrabold tracking-display leading-none block"
            style={{ fontSize: 'clamp(3rem, 4.8vw, 4rem)', color: accent }}
          >
            {svc.code}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-display font-bold text-ink tracking-tight leading-tight balance"
            style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.55rem)' }}
          >
            {svc.name}
          </h3>

          <p
            className="mt-3 font-sans text-ink-2 leading-[1.76] pretty"
            style={{ fontSize: '15.5px', maxWidth: '60ch' }}
          >
            {svc.desc}
          </p>

          <div className="mt-5 pt-4 border-t border-rule-l">
            <span
              className="font-mono uppercase block mb-[5px]"
              style={{ fontSize: '8px', letterSpacing: '0.16em', color: '#828DA6' }}
            >
              Deliverable
            </span>
            <p
              className="font-sans text-ink-3 leading-[1.68]"
              style={{ fontSize: '13.5px', maxWidth: '60ch' }}
            >
              {svc.deliverable}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-8">
            <MetaDatum label="Engagement Scope" value={svc.timeline} />
            <MetaDatum label="Indicative Range" value={svc.fee} feeColor={feeColor} />
          </div>
        </div>

        {/* Mini visualization — only for services that have one, desktop only */}
        {viz && (
          <div className="shrink-0 self-center pt-6 sm:pt-0">
            {viz}
          </div>
        )}
      </div>
    </article>
  );
}

// ── Grid service entry (remaining services — 2-column grid) ───────────────────

function GridServiceEntry({
  svc,
  accent,
  feeColor,
  index,
  visible,
}: {
  svc: Service;
  accent: string;
  feeColor: string;
  index: number;
  visible: boolean;
}) {
  return (
    <article
      className="bg-canvas-1 flex flex-col p-7 lg:p-8"
      style={fade(visible, 60 + index * 55)}
    >
      {/* Code */}
      <span
        className="font-display font-extrabold tracking-display leading-none block mb-4"
        style={{ fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', color: accent }}
      >
        {svc.code}
      </span>

      {/* Name */}
      <h3
        className="font-display font-bold text-ink tracking-tight leading-tight balance mb-3"
        style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
      >
        {svc.name}
      </h3>

      {/* Description */}
      <p
        className="font-sans text-ink-2 leading-[1.72] pretty flex-1"
        style={{ fontSize: '13.5px' }}
      >
        {svc.desc}
      </p>

      {/* Deliverable */}
      <div className="mt-4 pt-4 border-t border-rule-l">
        <span
          className="font-mono uppercase block mb-[4px]"
          style={{ fontSize: '7.5px', letterSpacing: '0.16em', color: '#828DA6' }}
        >
          Deliverable
        </span>
        <p
          className="font-sans text-ink-3 leading-[1.65]"
          style={{ fontSize: '12.5px' }}
        >
          {svc.deliverable}
        </p>
      </div>

      {/* Metadata */}
      <div className="mt-3 pt-3 border-t border-rule-l flex flex-wrap gap-5">
        <MetaDatum label="Scope" value={svc.timeline} />
        <MetaDatum label="Fee Range" value={svc.fee} feeColor={feeColor} />
      </div>
    </article>
  );
}

// ── Category section ───────────────────────────────────────────────────────────

// Readable accent colors on light canvas background per category
const FEE_COLORS: Record<'A' | 'B' | 'C', string> = {
  A: '#2C5251', // forest — harbor teal dark, 7.88:1 on canvas
  B: '#7A3E44', // dark rose, readable on light
  C: '#9B2D30', // dark coral, readable on light
};

function CategorySection({
  cat,
  onVisible,
}: {
  cat: Category;
  onVisible: (id: 'A' | 'B' | 'C') => void;
}) {
  const { ref: headerRef, inView: headerVisible } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: servicesRef, inView: servicesVisible } = useInView<HTMLDivElement>({ threshold: 0.04 });
  const sectionRef = useRef<HTMLElement>(null);

  const stableOnVisible = useCallback(() => onVisible(cat.id), [cat.id, onVisible]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) stableOnVisible();
      },
      { threshold: 0.2, rootMargin: '-10% 0px -55% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stableOnVisible]);

  const [featured, ...rest] = cat.services;
  const feeColor = FEE_COLORS[cat.id];

  return (
    <section id={`cat-${cat.id.toLowerCase()}`} ref={sectionRef}>

      {/* Dark category header band — compact */}
      <div ref={headerRef} className="relative bg-navy overflow-hidden border-t border-rule-d">
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />
        <div className="relative px-7 md:px-10 lg:px-12 py-8 lg:py-10">
          <div className="flex items-center gap-5 lg:gap-8">

            {/* Category letter — large, commanding */}
            <span
              aria-hidden
              className="font-display font-extrabold tracking-display leading-none shrink-0 select-none"
              style={{
                fontSize: 'clamp(5.5rem, 10vw, 8.5rem)',
                color: cat.accent,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                ...fade(headerVisible, 0),
              }}
            >
              {cat.id}
            </span>

            {/* Vertical rule */}
            <div
              className="hidden sm:block shrink-0 self-stretch"
              style={{ width: '1px', backgroundColor: cat.accent, opacity: 0.18 }}
              aria-hidden
            />

            {/* Category info */}
            <div style={fade(headerVisible, 80)}>
              <span
                className="font-mono uppercase text-haze block mb-2"
                style={{ fontSize: '8.5px', letterSpacing: '0.18em' }}
              >
                Category {cat.id} · {cat.phase}
              </span>
              <h2
                className="font-display font-extrabold tracking-display text-snow balance"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.75rem)', lineHeight: 1.0 }}
              >
                {cat.name}
              </h2>
              <p
                className="mt-3 font-sans text-slate leading-[1.68] pretty"
                style={{ fontSize: '14px', maxWidth: '64ch' }}
              >
                {cat.intro}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service content — canvas-1 is less glaring than pure canvas */}
      <div ref={servicesRef} className="bg-canvas-1">

        {/* Featured first service — full width */}
        <FeaturedServiceEntry
          svc={featured}
          accent={cat.accent}
          feeColor={feeColor}
          visible={servicesVisible}
        />

        {/* Remaining services — 2-column grid, gap trick for separators */}
        {rest.length > 0 && (
          <div
            className="grid sm:grid-cols-2 border-t border-rule-l"
            style={{ gap: '1px', backgroundColor: '#C8CEDF' }}
          >
            {rest.map((svc, i) => (
              <GridServiceEntry
                key={svc.code}
                svc={svc}
                accent={cat.accent}
                feeColor={feeColor}
                index={i + 1}
                visible={servicesVisible}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Fee disclaimer ─────────────────────────────────────────────────────────────

function FeeDisclaimer() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div ref={ref} className="bg-canvas-1 border-t border-rule-l">
      <div
        className="px-6 md:px-10 lg:px-12 py-7"
        style={fade(inView, 0)}
      >
        <p className="font-sans text-ink-3 leading-[1.7]" style={{ fontSize: '13px', maxWidth: '72ch' }}>
          Ranges shown are indicative and scoped to each engagement's complexity. Travo accepts only
          work where quantitative risk analysis is central to the decision, and declines engagements
          that fall outside this catalog regardless of fee.
        </p>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export function ServicesPage() {
  const [activeId, setActiveId] = useState<'A' | 'B' | 'C'>('A');

  const handleVisible = useCallback((id: 'A' | 'B' | 'C') => {
    setActiveId(id);
  }, []);

  return (
    <>
      <ServicesHero />

      {/* Catalog: sidebar + scrolling content */}
      <div className="flex bg-canvas">

        {/* Sticky dark sidebar (desktop only) */}
        <aside
          className="hidden lg:flex flex-col shrink-0 bg-navy border-r border-rule-d"
          style={{ width: '220px' }}
          aria-label="Catalog navigation"
        >
          <div
            className="sticky flex flex-col h-[calc(100vh-68px)] px-6 overflow-auto"
            style={{ top: '68px' }}
          >
            <SidebarNav activeId={activeId} />
          </div>
        </aside>

        {/* Main catalog content */}
        <div className="flex-1 min-w-0">
          {CATALOG.map((cat) => (
            <CategorySection key={cat.id} cat={cat} onVisible={handleVisible} />
          ))}
          <FeeDisclaimer />
        </div>
      </div>
    </>
  );
}
