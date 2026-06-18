'use client';

import { useState } from 'react';
import { useInView } from '../../../hooks/useInView';

/* ── Minimal 20×20 stroke icons per service code ── */
function IconCurve() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M2 16 C3.5 16 5 10 7 7 C8.5 4.5 9.5 3.5 10 3.5 C10.5 3.5 11.5 4.5 13 7 C15 10 16.5 16 18 16" />
      <line x1="2" y1="16" x2="18" y2="16" strokeOpacity="0.3" />
    </svg>
  );
}
function IconList() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <rect x="3" y="3" width="14" height="14" />
      <line x1="6" y1="7" x2="14" y2="7" />
      <line x1="6" y1="10" x2="14" y2="10" />
      <line x1="6" y1="13" x2="10" y2="13" />
    </svg>
  );
}
function IconBid() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <rect x="3" y="6" width="14" height="11" />
      <path d="M7 6V4h6v2" />
      <line x1="7" y1="10" x2="13" y2="10" />
      <line x1="7" y1="13" x2="10" y2="13" />
    </svg>
  );
}
function IconReview() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <circle cx="9" cy="9" r="5" />
      <line x1="13" y1="13" x2="17" y2="17" />
      <polyline points="7 9 9 11 12 7" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <rect x="2" y="4" width="16" height="14" />
      <line x1="2" y1="9" x2="18" y2="9" />
      <line x1="6" y1="2" x2="6" y2="6" />
      <line x1="14" y1="2" x2="14" y2="6" />
    </svg>
  );
}
function IconTrend() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <line x1="2" y1="18" x2="2" y2="2" strokeOpacity="0.3" />
      <line x1="2" y1="18" x2="18" y2="18" strokeOpacity="0.3" />
      <polyline points="3 14 7 9 11 11 16 4" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M10 2 L17 5 V10 C17 14.5 13.5 17.5 10 18.5 C6.5 17.5 3 14.5 3 10 V5 Z" />
      <line x1="10" y1="8" x2="10" y2="12" />
      <circle cx="10" cy="14.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconLoop() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M15 4 C17.5 6.5 18 11 15 14.5 C12 18 7 18 4 15" />
      <polyline points="4 10 4 15 9 15" />
    </svg>
  );
}
function IconBars() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <line x1="2" y1="18" x2="18" y2="18" strokeOpacity="0.3" />
      <rect x="2.5" y="12" width="4" height="6" />
      <rect x="8" y="8" width="4" height="10" />
      <rect x="13.5" y="4" width="4" height="14" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M3 4 H12 C13.1 4 14 4.9 14 6 V16 H3 Z" />
      <path d="M14 6 C14 5 16 5 17 6 V17 C16 17 14 17 14 16" />
      <line x1="6" y1="8" x2="11" y2="8" />
      <line x1="6" y1="11" x2="11" y2="11" />
    </svg>
  );
}
function IconBranch() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <line x1="3" y1="10" x2="9" y2="10" />
      <path d="M9 10 L13 6 L17 6" />
      <path d="M9 10 L13 14 L17 14" />
      <circle cx="17" cy="6" r="1.5" strokeWidth="1" />
      <circle cx="17" cy="14" r="1.5" strokeWidth="1" />
    </svg>
  );
}

const SERVICE_ICONS: Record<string, React.ReactElement> = {
  A1: <IconCurve />,
  A2: <IconList />,
  A3: <IconBid />,
  A4: <IconReview />,
  A5: <IconBranch />,
  B1: <IconCalendar />,
  B2: <IconTrend />,
  B3: <IconShield />,
  C1: <IconLoop />,
  C2: <IconBars />,
  C3: <IconBook />,
};

type Service = {
  code: string;
  name: string;
  desc: string;
  timeline: string;
  fee: string;
};

type Category = {
  id: 'A' | 'B' | 'C';
  name: string;
  intro: string;
  accentColor: string;
  services: Service[];
};

const CATALOG: Category[] = [
  {
    id: 'A',
    name: 'Pre-Project Risk & Contingency',
    intro: 'Risk and contingency analysis during planning and procurement, before construction begins; the front-end discipline where the work has the highest leverage on financial outcomes. This is Travo\'s primary entry point with new clients.',
    accentColor: '#71D2CF',
    services: [
      {
        code: 'A1',
        name: 'Quantitative Risk Analysis & Contingency Derivation',
        desc: 'Independent Monte Carlo P10/P50/P80 on cost and schedule, with defensible contingency derived from documented risk drivers.',
        timeline: '5–7 weeks',
        fee: '$60K–$120K',
      },
      {
        code: 'A2',
        name: 'Structured Risk Register Development',
        desc: 'Workshop-driven risk identification and characterization, structured for quantitative analysis and ongoing project management.',
        timeline: '3–5 weeks',
        fee: '$25K–$60K',
      },
      {
        code: 'A3',
        name: 'Risk-Adjusted Bid Leveling & Procurement Support',
        desc: 'A fixed-price bid is the floor of project cost, not the ceiling. We show owners the difference before commitments are locked in.',
        timeline: '3–5 weeks',
        fee: '$35K–$80K',
      },
      {
        code: 'A4',
        name: 'Independent Risk Peer Review',
        desc: "Owner-side review of a contractor's risk register and contingency. Short engagement, disproportionate value to the owner.",
        timeline: '2–3 weeks',
        fee: '$20K–$50K',
      },
      {
        code: 'A5',
        name: 'Strategic Alternatives & Scenario Analysis',
        desc: 'Structured analysis of capital decisions that involve a choice among substantively different paths: build versus retrofit, alternative technologies, delivery models, or phasing strategies. Where A1 quantifies variation within a chosen plan, A5 quantifies the relative attractiveness of the alternatives themselves.',
        timeline: '4–8 weeks',
        fee: '$50K–$130K',
      },
    ],
  },
  {
    id: 'B',
    name: 'During-Project Risk Management',
    intro: 'Risk discipline through construction execution; retainers, trend forecasting, and dispute-readiness review that carry procurement-stage analysis through to project completion. The firm\'s primary source of recurring engagement.',
    accentColor: '#FFB9BB',
    services: [
      {
        code: 'B1',
        name: 'Risk Register Management Retainer',
        desc: 'Monthly retainer to maintain the live register, update probability distributions as conditions change, and chair the risk review cadence.',
        timeline: '12–36 months',
        fee: '$8K–$25K / mo',
      },
      {
        code: 'B2',
        name: 'Trend Risk Analysis & Cost-at-Completion Forecasting',
        desc: 'Independent reassessment when a project starts trending negatively. Quantifies exposure and identifies the decision options that remain.',
        timeline: '3–5 weeks',
        fee: '$30K–$90K',
      },
      {
        code: 'B3',
        name: 'Pre-Claim & Dispute-Readiness Risk Review',
        desc: 'Documentation strategy and risk-allocation map, structured before a claim becomes a dispute and while positions are still negotiable.',
        timeline: '4–6 weeks',
        fee: '$40K–$100K',
      },
    ],
  },
  {
    id: 'C',
    name: 'Post-Project & Portfolio Services',
    intro: "Structured learning and regional benchmarking that compound into institutional value across an owner's capital program.",
    accentColor: '#FF5B5E',
    services: [
      {
        code: 'C1',
        name: 'Lessons-Learned Risk Capture',
        desc: 'Structured post-mortem on which risks materialized, which were mitigated effectively, and what the register should carry forward.',
        timeline: '4–6 weeks',
        fee: '$25K–$60K',
      },
      {
        code: 'C2',
        name: 'Portfolio Risk Benchmarking',
        desc: "Annual comparison of your portfolio against the firm's regional dataset, with quarterly refreshes and sector-segmented outcomes data.",
        timeline: 'Annual',
        fee: '$25K–$60K / yr',
      },
      {
        code: 'C3',
        name: 'Methodology Implementation & Training',
        desc: "Build your team's own quantitative risk methodology capability. Clients who build it stay clients for higher-order independent review work.",
        timeline: '8–16 weeks',
        fee: '$75K–$200K',
      },
    ],
  },
];

export function ServicesOverview() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.04 });
  const [activeId, setActiveId] = useState<'A' | 'B' | 'C'>('A');
  const active = CATALOG.find((c) => c.id === activeId)!;

  return (
    <section
      id="services"
      ref={ref}
      className="bg-navy text-snow py-[72px] md:py-[96px]"
      aria-labelledby="svc-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div style={fade(inView, 0)} className="mb-10">
          <h2
            id="svc-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
          >
            <span className="text-snow">Nine services. Three categories.</span>
            <br />
            <span className="text-teal">One discipline.</span>
          </h2>
          <p className="mt-4 font-sans text-slate leading-[1.72] pretty" style={{ fontSize: '16px', maxWidth: '66ch' }}>
            Every offering carries a defined deliverable, methodology, scope, and
            fee structure. The catalog is intentionally bounded.
          </p>
        </div>

        {/* Tab selectors */}
        <div
          style={fade(inView, 60)}
          className="flex border-b border-rule-d mb-0"
          role="tablist"
          aria-label="Service categories"
        >
          {CATALOG.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeId === cat.id}
              onClick={() => setActiveId(cat.id)}
              className="relative flex items-center gap-3 px-6 py-4 font-mono text-[10px] uppercase tracking-label transition-colors duration-200 cursor-pointer border-0 bg-transparent"
              style={{
                color: activeId === cat.id ? cat.accentColor : '#8A95B2',
              }}
            >
              <span
                className="font-display font-extrabold tracking-display leading-none"
                style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)' }}
              >
                {cat.id}
              </span>
              <span className="hidden sm:block">{cat.name}</span>
              {activeId === cat.id && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: cat.accentColor }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Active category content */}
        <div key={activeId} style={fade(inView, 100)}>
          <p
            className="font-sans text-slate leading-[1.68] py-6 border-b border-rule-d"
            style={{ fontSize: '15px', maxWidth: '72ch' }}
          >
            {active.intro}
          </p>

          {/* Service grid — 2 per row */}
          <div className="grid sm:grid-cols-2 gap-[1px] bg-rule-d">
            {active.services.map((svc, si) => (
              <div
                key={svc.code}
                style={fade(inView, 120 + si * 40)}
                className="bg-navy p-6 flex flex-col gap-0 hover:bg-navy-1 transition-colors duration-200 cursor-default"
              >
                {/* Header row: code + icon */}
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="font-display font-extrabold leading-none tracking-display"
                    style={{ fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)', color: active.accentColor }}
                  >
                    {svc.code}
                  </span>
                  <span style={{ color: active.accentColor, width: '18px', opacity: 0.55 }}>
                    {SERVICE_ICONS[svc.code]}
                  </span>
                </div>

                <h4
                  className="font-display font-bold text-snow leading-snug tracking-tight"
                  style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
                >
                  {svc.name}
                </h4>
                <p
                  className="mt-2 font-sans text-slate leading-[1.6] pretty flex-1"
                  style={{ fontSize: '13.5px' }}
                >
                  {svc.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-rule-d flex flex-wrap gap-x-8 gap-y-1">
                  <Datum label="Timeline" value={svc.timeline} />
                  <Datum label="Fee" value={svc.fee} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function Datum({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-mono text-[9px] uppercase tracking-label text-haze block">{label}</span>
      <span className="font-mono text-[11.5px] text-slate mt-[2px] block">{value}</span>
    </div>
  );
}

function fade(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(26px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}
