'use client';

import { useInView } from '../../../hooks/useInView';

type Category = {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  name: string;
  desc: string;
};

const CATEGORIES: Category[] = [
  {
    id: 'A',
    name: 'Owner-Side Preconstruction Analysis',
    desc: 'Quantitative risk analysis and contingency derivation, independent risk peer review, risk-adjusted bid leveling, and strategic alternatives analysis: the front-end decisions where analysis has the highest leverage on financial outcomes.',
  },
  {
    id: 'B',
    name: 'Capital at Risk: Lender, Surety & Underwriting',
    desc: "The firm's early go-to-market lead and recurring commercial core: construction loan monitoring and draw review, underwriting risk opinions on complex collateral, and continuous contractor financial-health monitoring for sureties and subcontractor-default programs. Panel-ready deliverables, reliance letters, published indicative fees.",
  },
  {
    id: 'C',
    name: 'During-Project Risk Management',
    desc: 'Risk discipline during execution: risk register management retainers with defined tiers, trend risk analysis and cost-at-completion forecasting, including a 10-day urgent triage, and pre-claim, dispute-readiness review.',
  },
  {
    id: 'D',
    name: 'Post-Project, Portfolio & Public-Interest',
    desc: 'Lessons-learned risk capture, portfolio risk benchmarking against the regional dataset, and independent third-party review of large public and private project proposals for the decision-makers who must approve or fund them.',
  },
  {
    id: 'E',
    name: 'Training & Capability Building',
    desc: "Structured transfer of TRAVO's methodology into client organizations: implementation and training for owners and contractors building internal quantitative risk capability, with the same rigor the firm applies on its own engagements.",
  },
];

export function ServicesOverview() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.04 });

  return (
    <section
      id="services"
      ref={ref}
      className="bg-canvas text-ink pt-[44px] md:pt-[52px] pb-[52px] md:pb-[72px]"
      style={{ borderTop: '1px solid #D5D9E8' }}
      aria-labelledby="svc-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Kicker */}
        <div style={fade(inView, 0)}>
          <span className="font-mono text-forest uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
            Services
          </span>
        </div>

        {/* Header */}
        <div style={fade(inView, 40)} className="mt-4 mb-10">
          <h2
            id="svc-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
          >
            <span className="text-ink">Fourteen named services across</span>
            <br />
            <span className="text-forest">five categories.</span>
          </h2>
          <p className="mt-4 font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '16px', maxWidth: '72ch' }}>
            The catalog is deliberately bounded and productized: each offering
            is a recognizable, repeatable service with a defined deliverable,
            methodology, and scope. The firm enters the market in phases:
            independent reviews for sureties, lenders, and counsel, and trend
            and pre-claim work on drifting projects, lead; owner-side
            preconstruction studies scale on the strength of those references.
            Recurring capital-at-risk services carry published indicative
            fees; analytical engagements are scoped per decision.
          </p>
        </div>

        {/* Category cards — A leads as a featured double-width cell, not a uniform grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: '#D5D9E8' }} role="list" aria-label="Service categories">
          {CATEGORIES.map((cat, i) => {
            const featured = cat.id === 'A';
            return (
              <a
                key={cat.id}
                href={`/services#cat-${cat.id.toLowerCase()}`}
                role="listitem"
                style={fade(inView, 100 + i * 60)}
                className={`group bg-canvas flex flex-col hover:bg-canvas-1 transition-colors duration-200 ${
                  featured ? 'sm:col-span-2 p-8' : 'p-6'
                }`}
              >
                <span
                  className="font-display font-extrabold leading-none tracking-display block mb-3 text-forest"
                  style={{ fontSize: featured ? 'clamp(2.4rem, 3.4vw, 3.2rem)' : 'clamp(1.6rem, 2.2vw, 2rem)' }}
                >
                  {cat.id}
                </span>

                <h3
                  className="font-display font-bold text-ink leading-snug tracking-tight"
                  style={{ fontSize: featured ? 'clamp(1.2rem, 1.9vw, 1.5rem)' : 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
                >
                  {cat.name}
                </h3>
                <p
                  className={`mt-2 font-sans text-ink-2 leading-[1.6] pretty flex-1 ${featured ? 'max-w-[52ch]' : ''}`}
                  style={{ fontSize: featured ? '14.5px' : '13.5px' }}
                >
                  {cat.desc}
                </p>
                <span
                  className="mt-5 font-mono uppercase text-forest group-hover:text-forest-2 transition-colors duration-200"
                  style={{ fontSize: '10px', letterSpacing: '0.12em' }}
                >
                  Category {cat.id} services →
                </span>
              </a>
            );
          })}
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
