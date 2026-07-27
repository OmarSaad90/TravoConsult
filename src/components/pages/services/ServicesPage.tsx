'use client';

import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';

// Per client spec: dark data viz support uses Harbor Teal (forest) not custom warm darks
const FOREST = '#2C5251'; // Harbor Teal 100 — 7.9:1 on canvas
const TEAL_DEEP = '#3EA6A3'; // Tidal Aqua 80 — readable teal on light canvas

// ── Data ───────────────────────────────────────────────────────────────────────

const TICKER = [
  'A PRODUCTIZED CATALOG',
  'DEFINED SCOPE · DEFINED DELIVERABLE',
  'AACE 41R-08 · 57R-09',
  'PRE-PROJECT · CAPITAL AT RISK · DURING-PROJECT · POST-PROJECT · TRAINING',
  'NJ / NY METROPOLITAN REGION',
  '14 DEFINED SERVICES',
  'MONTE CARLO SIMULATION',
  'INDEPENDENT ANALYSIS',
];

type ServiceNote = { label: string; body: string };

type Service = {
  code: string;
  name: string;
  desc: string;
  notes?: ServiceNote[];
  deliverable: string;
  timeline: string;
  fee: string;
};

type CategoryId = 'A' | 'B' | 'C' | 'D' | 'E';

type Category = {
  id: CategoryId;
  phase: string;
  kickerLabel: string;
  name: string;
  intro: string;
  services: Service[];
};

const CATALOG: Category[] = [
  {
    id: 'A',
    phase: 'Pre-Project',
    kickerLabel: 'Owner-Side Preconstruction',
    name: 'Pre-Project Risk and Contingency Analysis',      intro:
      "Risk and contingency work performed during planning and procurement, before construction begins: the front-end discipline through which the largest improvements in project net present value are achievable, before final investment decision is made. TRAVO provides the quantitative risk component of that discipline. Within the firm's phased go-to-market, the short Independent Risk Peer Review (A2) is the early entry point, fixed-fee, principal-signed, and the fastest way for a new client to test the methodology; the full studies are typically engaged on the strength of completed regional references.",
    services: [
      {
        code: 'A1',
        name: 'Quantitative Risk Analysis and Contingency Derivation',
        desc:
          "Independent Monte Carlo–based probabilistic analysis of cost and schedule outcomes for a defined project, producing P10/P50/P80 distributions for cost-at-completion and completion date, and a defensible contingency recommendation, including identification of where contingency can be right-sized, quantifying capital currently held against risk the analysis shows is not warranted. The flagship analytical engagement: an owner or capital decision-maker setting contingency and schedule baselines on a defined project, where the difference between a derived contingency and an intuition-based one is directly financial. It is most often the second engagement with a client, following an A2 peer review.",
        notes: [
          {
            label: 'Structured risk register',
            body: 'Workshop-driven risk identification, characterization, and register development is delivered as an integral component of this service (and of A2). TRAVO does not issue standalone qualitative registers: a register without the quantitative layer is exactly the heat-map product this practice exists to replace. Ongoing register updating is provided through the C1 retainer.',
          },
          {
            label: 'Public-sector variant',
            body: "For federally supported transit and infrastructure projects, deliverables are mapped to FTA Oversight Procedure OP-40/40b review formats and AACE deliverable structures, so a sponsor or its program-management consultant can place TRAVO's work product directly into an oversight review package.",
          },
        ],
        deliverable:
          '30–50 page report: executive summary, integrated risk register, methodology documentation, simulation outputs, sensitivity and tornado analyses, and recommended contingency with rationale, including the capital implication of over- or under-held contingency against modeled risk. Working files delivered to client on request.',
        timeline: '5–7 weeks',
        fee: '$75,000 – $250,000, by project size and complexity',
      },
      {
        code: 'A2',
        name: 'Independent Risk Peer Review',
        desc:
          "Owner-side review of a contractor's submitted risk register and contingency analysis. Identifies methodological gaps, missing risks, underestimated impacts, and structural weaknesses in the contractor's approach. The catalog's deliberate door-opener and a lead service in the firm's early go-to-market: a short, fixed-fee, principal-signed engagement with large value to the owner, giving an independent quantitative check on the risk submissions on which contingency and procurement decisions rest, and a low-commitment way to evaluate TRAVO's methodology before a full A1 analysis or C1 retainer.",
        deliverable: 'Peer review report with findings, ranked recommendations, and required remediations.',
        timeline: '2–3 weeks',
        fee: 'Fixed fee, $25,000 – $60,000',
      },
      {
        code: 'A3',
        name: 'Risk-Adjusted Bid Leveling and Procurement Support',
        desc:
          "Independent analysis of bidder pricing through a quantitative risk lens. Identifies which bids are realistic given market conditions, which are buying the work, where contractual risk has been shifted in ways the owner may not fully recognize, and what the risk-adjusted ranking of bidders should be. Particularly valuable for institutional and private owners selecting general contractors on $30M–$150M projects where the lowest nominal bid is not the lowest expected total cost, including data-center and healthcare procurements, where award discretion exists and latent risk transfer is common. A fixed-price bid is the floor of project cost, not the ceiling; risk-adjusted analysis is what allows owners to see the difference.",
        notes: [
          {
            label: 'Public-bidding caveat',
            body: 'On public work governed by lowest-responsible-bidder statutes in New Jersey and New York, this analysis informs contingency setting, contract administration, and risk-allocation strategy; it does not and cannot re-rank a statutory award. Public owners should confirm the permissible use of bid-risk analysis with procurement counsel before engagement.',
          },
        ],
        deliverable:
          'Bid-leveling analysis report with risk-adjusted ranking (or, on statutory public bids, risk exposure analysis by bidder), identification of latent risk transfer in each bid, and a procurement or contract-administration recommendation supported by quantitative reasoning.',
        timeline: '3–5 weeks, aligned to the procurement calendar',
        fee: 'Scoped per engagement',
      },
      {
        code: 'A4',
        name: 'Strategic Alternatives and Scenario Analysis',
        desc:
          "Structured scenario analysis for capital decisions involving choice among significantly different alternatives: make versus buy, build versus retrofit, alternative technology paths, alternative delivery models, alternative phasing strategies. Distinct from operational quantitative risk analysis (which quantifies variation within a chosen plan), strategic alternatives analysis quantifies the relative attractiveness of substantively different paths under long-horizon uncertainty. Value optimization in its most direct form, at concept-select stage. TRAVO accepts these engagements selectively: because long-horizon inputs are inherently softer than project-stage data, every scenario analysis documents its priors explicitly and presents sensitivity to them, so the analysis remains defensible under the same scrutiny applied to the firm's project-stage work.",
        deliverable:
          'Scenario analysis report with structured comparison of alternatives across cost, schedule, risk, and strategic-value dimensions; decision recommendation supported by quantitative reasoning; and sensitivity analysis on key drivers, including the stated priors.',
        timeline: '4–8 weeks',
        fee: 'Scoped per engagement',
      },
    ],
  },
  {
    id: 'B',
    phase: 'Capital at Risk',
    kickerLabel: 'Capital at Risk',
    name: 'Lender, Surety and Underwriting Services',
    intro:
      "Independent risk services for the parties whose capital is at risk: construction lenders, sureties, and investors. This category leads the firm's early go-to-market, is its first source of recurring monitoring revenue, and is built the way capital providers procure: standardized, panel-ready deliverables in credit-file format, published indicative fees, reliance letters issued under the firm's professional-liability program, and TRAVO's quantitative P50/P80 layer included within every product rather than sold as an exotic add-on. Independence is the product, not a feature of it.",
    services: [
      {
        code: 'B1',
        name: 'Construction Loan Monitoring and Draw Review',
        desc:
          "The standard lender-services product, delivered to panel expectations: pre-closing plan and cost review (budget, schedule, and contract review; contractor and borrower capability assessment), followed by monthly draw-request review, site monitoring, contingency tracking, and cost-to-complete analysis through loan maturity, with TRAVO's probabilistic cost- and schedule-risk layer included in every report at no separate charge. Regional banks, community banks, debt funds, and private-credit lenders on construction loans of $10M–$150M, including complex collateral where template monitoring underperforms: data centers, affordable-housing and public-housing conversion deals, and building-decarbonization retrofit lending.",
        notes: [
          {
            label: 'Reliance',
            body: "Reports are issued in credit-file format with reliance letters on TRAVO's standard terms, backed by the firm's errors-and-omissions program. Turnaround commitments are stated in the engagement letter.",
          },
        ],
        deliverable:
          'Pre-closing plan & cost review report; monthly monitoring report with draw recommendation, site observations, schedule status, contingency position, cost-to-complete, and probabilistic outlook; early-warning flags on emerging deterioration.',
        timeline: 'Pre-closing review 2–4 weeks; monthly monitoring for the life of the loan',
        fee: 'Plan & cost review $15,000 – $50,000 per loan; monitoring $2,500 – $7,500 / month, by project size and inspection cadence; portfolio pricing available for five or more concurrent loans',
      },
      {
        code: 'B2',
        name: 'Underwriting Risk Opinion',
        desc:
          'Independent, third-party quantitative risk opinion commissioned by a surety, construction lender, or investor at underwriting or financing: P50/P80 cost and schedule distributions for the project, an independent contingency adequacy assessment, and an explicit statement of the assumptions the credit or bond decision would be relying on, tracked against realized performance through execution where monitoring is retained. The buyer is the party with capital at risk, not the project team. Complex or unusual collateral where a standard plan-and-cost review is not enough: large or phased projects, data centers and power-adjacent work, conversion and retrofit programs, and any account where the underwriting committee wants a probabilistic view rather than a single-point opinion.',
        deliverable:
          'Underwriting-stage risk opinion with P50/P80 cost and schedule distributions, contingency assessment, and stated reliance terms; optional periodic monitoring memos benchmarking realized trend against underwritten assumptions.',
        timeline: 'Underwriting review 2–4 weeks; monitoring on a defined cadence',
        fee: '$25,000 – $75,000 per opinion, by project size and complexity; monitoring per B1 rates',
      },
      {
        code: 'B3',
        name: 'Contractor Financial-Health and Default-Risk Monitoring',
        desc:
          'Initial assessment and continuous monitoring of contractor and subcontractor financial condition for sureties, subcontractor-default-insurance (SDI) programs, and owners, reading the signals that annual financial statements miss: pay-application cycle drift, unapproved change-order balances, underbilling swings, backlog concentration, and trade-credit tightening. The industry-wide condition this service answers is documented: payment and cash-flow disputes are the fastest-rising dispute category in the Americas, and record backlogs routinely mask margin compression and cash stress that surface only at 60–80 percent completion. Sureties, SDI underwriters, and owners with significant contractor exposure need continuous, quantitative visibility, not an annual statement review.',
        deliverable:
          'Initial financial-health and default-risk assessment; quarterly (or monthly, on watchlist accounts) monitoring memos with defined early-warning indicators and threshold triggers.',
        timeline: 'Initial assessment 2–4 weeks; continuous monitoring by subscription',
        fee: 'Initial assessment $15,000 – $60,000 per account; monitoring $2,000 – $5,000 / month per account, by cadence and account complexity',
      },
    ],
  },
  {
    id: 'C',
    phase: 'During-Project',
    kickerLabel: 'Execution',
    name: 'During-Project Risk Management',
    intro:
      "Risk and contingency work performed during construction execution: the bridge between procurement-stage analysis and project completion, sustaining risk discipline as conditions change. Trend and pre-claim work on drifting projects (C2, C3) sits alongside Category B in the firm's early go-to-market; the C1 retainer is the default continuation of every A1 analysis and C2 reassessment, the mechanism by which a one-time analysis becomes a maintained discipline.",
    services: [
      {
        code: 'C1',
        name: 'Risk Register Management Retainer',
        desc:
          "Recurring retainer to maintain and update the project's live risk register, run change-impact assessments, chair scheduled risk review meetings, and provide ongoing methodology guidance: the “risk updating” discipline described on the Methodology page, practiced on a defined cadence. Projects 12–36 months in duration where ongoing risk discipline is required and the owner or general contractor lacks the internal capacity to maintain it independently. Offered in two defined tiers so the cadence matches the project's tempo.",
        deliverable:
          'Maintained risk register with updates on the retained cadence; written status report each cycle; facilitated risk review meetings; change-impact memos as triggered by defined thresholds; refreshed P50/P80 cost and schedule forecast against current data.',
        timeline: '12–36 months, recurring',
        fee: 'Quarterly cadence $3,500 – $5,000 / month; monthly cadence (register updates, status report, and chaired review every month) $6,000 – $10,000 / month; 12–36 month terms',
      },
      {
        code: 'C2',
        name: 'Trend Risk Analysis and Cost-at-Completion Forecasting',
        desc:
          'Independent quantitative reassessment of project outcome distributions, cost, schedule, and earned value, when a project begins trending negatively. Updates the original risk analysis with current data and produces revised P50/P80 forecasts. Typically triggered by a board, lender, owner, or surety concerned about emerging cost or schedule deterioration. Often urgent, often premium-priced, and alongside Category B, a lead service in the firm\'s early go-to-market.',
        notes: [
          {
            label: 'Urgent triage variant',
            body: 'A 10-business-day engagement, at a premium day rate, producing a preliminary revised cost-at-completion range, the three-to-five dominant drivers, and a board- or credit-committee-ready briefing, with the full reassessment to follow if retained. Built for the lenders and sureties who most often trigger these engagements and cannot wait five weeks for an answer.',
          },
        ],
        deliverable:
          'Updated risk analysis report with revised cost-at-completion and schedule-at-completion distributions, identification of root-cause drivers, and recommended management response. Urgent triage: preliminary range, driver ranking, and executive briefing within 10 business days.',
        timeline: 'Full reassessment 3–5 weeks; urgent triage 10 business days',
        fee: 'Scoped per engagement',
      },
      {
        code: 'C3',
        name: 'Pre-Claim and Dispute-Readiness Risk Review',
        desc:
          "Structured analysis conducted when delays or cost overruns are starting to materialize. Examines where contractual risk allocation actually sits, what claims may emerge, what the project's defensible position is, and what documentation should be assembled. A bridge between project advisory and forensic claims work, positioning the project before a dispute fully materializes, and a lead service in the firm's early go-to-market. Most engagements arrive by referral from construction-litigation counsel; TRAVO maintains active referral relationships with the regional construction bar and offers joint continuing-education seminars built on the firm's claim-emergence research.",
        notes: [
          {
            label: 'Role-sequencing rule',
            body: "Which role TRAVO plays on a project is decided at engagement acceptance, in writing: where the firm has performed the project's risk analysis or retainer work, its pre-claim role is bounded so that prior work product and potential fact-witness exposure are disclosed to counsel at the outset. TRAVO does not serve owner and contractor on the same project in any combination of roles.",
          },
        ],
        deliverable: 'Pre-claim analysis report; documentation strategy; recommended evidence-preservation actions; risk-allocation map.',
        timeline: '4–6 weeks',
        fee: 'Scoped per engagement',
      },
    ],
  },
  {
    id: 'D',
    phase: 'Post-Project',
    kickerLabel: 'Portfolio & Public-Interest',
    name: 'Post-Project Learning, Portfolio Benchmarking and Public-Interest Review',
    intro:
      'Risk work performed after project completion, across portfolios, and for public decision-makers: converting completed projects into systematic improvement across capital programs, and providing independent analysis where communities and capital intersect.',
    services: [
      {
        code: 'D1',
        name: 'Lessons-Learned Risk Capture',
        desc:
          "Structured post-mortem on which risks materialized, which were missed, where mitigation worked, and what should be updated in the next project's risk approach. Institutional owners with ongoing capital programs who want to systematically improve forward project performance through structured learning rather than informal recollection. With client consent, anonymized findings also strengthen the regional dataset behind the NJ/NY Construction Risk Index.",
        deliverable: "Lessons-learned report with specific updates to the owner's risk methodology, templates, and procurement language for future projects.",
        timeline: '4–6 weeks',
        fee: 'Scoped per engagement',
      },
      {
        code: 'D2',
        name: 'Portfolio Risk Benchmarking',
        desc:
          "An annual subscription product providing institutional owners with comparative benchmarks of their portfolio's risk profile and outcome distributions against the firm's regional dataset, with quarterly updates and benchmark refreshes. Owners who want portfolio-level visibility into how their projects' risk profiles and outcomes compare to the regional pattern, anchored to the NJ/NY Construction Risk Index dataset.",
        notes: [
          {
            label: 'Sequencing',
            body: 'This service launches deliberately behind the Index: founding-subscriber commitments open following publication of Index Edition 1, and full subscription delivery begins alongside Edition 2, once the dataset supports portfolio-level comparison. TRAVO will not sell benchmarking against a dataset that does not yet exist.',
          },
        ],
        deliverable: "Annual benchmark report; quarterly update memos; portfolio-specific comparative analysis; direct access to the firm's research staff for ad hoc questions.",
        timeline: 'Annual subscription; multi-year commitments preferred',
        fee: '$10,000 – $25,000 per year per institution, by portfolio size',
      },
      {
        code: 'D3',
        name: 'Independent Third-Party Review',
        desc:
          "Independent quantitative review of large public and private projects for municipalities, counties, state frameworks, and private owners: probabilistic assessment of construction cost and schedule claims, utility-interconnection and grid-cost exposure, water and infrastructure demands, fiscal-impact assumptions, and the adequacy of proposed community-benefit commitments, commissioned by the decision-maker, public or private, never by the party whose proposal is under review. New Jersey's data-center boom has produced exactly the condition this service answers: municipalities approving or rejecting billion-dollar facilities without analysis they can trust, communities asking publicly for review by a third party paid by neither the town nor the developer, and a state regulatory framework taking shape around community-benefit agreements and grid-cost accountability. TRAVO's independence, of contractors, owners, developers, and technology vendors, is the qualification.",
        deliverable:
          "Independent review report in plain public language with technical appendix: quantified assessment of the proposal's cost, schedule, infrastructure, and fiscal claims; risk register for the host community; and an adequacy opinion on proposed community-benefit terms.",
        timeline: '4–8 weeks, aligned to the approval calendar',
        fee: 'Scoped per engagement',
      },
    ],
  },
  {
    id: 'E',
    phase: 'Training',
    kickerLabel: 'Training',
    name: 'Training and Capability Building',
    intro:
      "Structured transfer of TRAVO's methodology into client organizations: training owners' and contractors' teams to practice quantitative risk analysis internally, with the same rigor the firm applies on its own engagements. TRAVO deliberately does not protect itself from clients building internal capability: a client that learns the methodology becomes a more sophisticated buyer of the firm's higher-order work, and the region's standard rises with it.",
    services: [
      {
        code: 'E1',
        name: 'Methodology Implementation and Training',
        desc:
          'Engagement to help an institutional owner or large contractor build their internal risk methodology, train their team on quantitative risk analysis tooling, and stand up their own ongoing risk management capability. Owners and contractors building internal quantitative risk capability. Clients who build their own capability remain TRAVO clients for higher-order work and refer the firm broadly.',
        notes: [
          {
            label: 'Executive short course',
            body: "Subject to university approval, TRAVO plans a periodic executive short course in quantitative construction risk analysis delivered through the principal's academic platform: an open-enrollment introduction to the methodology for owner and agency capital-program staff, and the natural entry point to a full implementation engagement.",
          },
        ],
        deliverable: 'Methodology framework; training program; implementation support; templates, tooling configuration, and organizational change recommendations.',
        timeline: '8–16 weeks',
        fee: 'Scoped per engagement',
      },
    ],
  },
];

const TOTAL_SERVICES = CATALOG.reduce((n, c) => n + c.services.length, 0);

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
    <div className="overflow-hidden" style={{ height: '34px', borderBottom: '1px solid #D5D9E8' }} aria-hidden>
      <div
        className="marquee-track flex items-center h-full whitespace-nowrap"
        style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}
      >
        {[...TICKER, ...TICKER].map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-mono uppercase text-ink-3"
              style={{ fontSize: '9.5px', letterSpacing: '0.18em', paddingLeft: '28px' }}
            >
              {item}
            </span>
            <span className="font-mono text-forest mx-3" style={{ fontSize: '7px', opacity: 0.6 }}>
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
      className="relative"
      style={{
        background: '#FFFFFF',
        border: '1px solid #D5D9E8',
        padding: '28px',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'none' : 'translateY(32px)',
        transition:
          'opacity 1s cubic-bezier(0.16,1,0.3,1) 360ms, transform 1s cubic-bezier(0.16,1,0.3,1) 360ms',
      }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between mb-7 pb-5" style={{ borderBottom: '1px solid #D5D9E8' }}>
        <span className="font-mono font-semibold text-forest uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em' }}>
          Service Catalog
        </span>
        <span className="font-mono font-semibold text-ink-3 uppercase" style={{ fontSize: '9px', letterSpacing: '0.14em' }}>
          Vol. 02
        </span>
      </div>

      {/* Category rows */}
      <div className="flex flex-col gap-5">
        {CATALOG.map((cat, ci) => (
          <div key={cat.id} className="flex items-center gap-4">
            <span
              className="font-display font-extrabold tracking-display leading-none shrink-0 text-forest"
              style={{ fontSize: '2rem', width: '32px' }}
            >
              {cat.id}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-[6px]">
                <span className="font-mono uppercase font-semibold text-forest" style={{ fontSize: '9px', letterSpacing: '0.12em' }}>
                  {cat.phase}
                </span>
                <span className="font-mono text-forest" style={{ fontSize: '10px' }}>
                  {cat.services.length}
                </span>
              </div>
              <div className="h-[2px]" style={{ backgroundColor: '#D5D9E8' }}>
                <div
                  style={{
                    height: '100%',
                    backgroundColor: '#2C5251',
                    opacity: 0.75,
                    width: `${(cat.services.length / TOTAL_SERVICES) * 100}%`,
                    transformOrigin: 'left center',
                    transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
                    transition: `transform 1.2s cubic-bezier(0.16,1,0.3,1) ${500 + ci * 80}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer metadata */}
      <div className="mt-7 pt-5 flex flex-col gap-[10px]" style={{ borderTop: '1px solid #D5D9E8' }}>
        {[
          ['Total Services', String(TOTAL_SERVICES)],
          ['Region', 'NJ / NY Metropolitan'],
          ['Methodology', 'AACE 41R-08 · 57R-09'],
          ['Independence', 'Owner-side only'],
        ].map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-3">
            <span className="font-mono uppercase font-semibold text-forest shrink-0" style={{ fontSize: '9px', letterSpacing: '0.14em' }}>
              {label}
            </span>
            <span className="font-mono text-ink-2" style={{ fontSize: '10.5px', letterSpacing: '0.04em' }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-forest/40 pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-forest/40 pointer-events-none" aria-hidden />
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
    <section className="relative bg-canvas overflow-hidden" aria-label="Services catalog introduction">
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <TickerStrip />

      <div className="relative" style={{ zIndex: 2 }}>
        <div className="max-w-site mx-auto w-full px-6 md:px-12 lg:px-16 py-16 md:py-20 grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">

          <div>
            <div style={reveal(60)}>
              <span className="font-mono text-[10px] tracking-label uppercase text-forest">
                Service Catalog
                <span className="mx-[10px]" style={{ opacity: 0.35 }}>·</span>
                Quantitative Risk Advisory
              </span>
            </div>

            <h1
              className="mt-6 font-display font-extrabold tracking-display"
              style={{ fontSize: 'clamp(2.6rem, 4.8vw, 4.8rem)', lineHeight: 0.94 }}
            >
              <span className="block text-ink" style={reveal(140)}>One discipline.</span>
              <span className="block text-ink" style={reveal(220)}>A deliberately</span>
              <span className="block text-ink" style={reveal(300)}>bounded catalog.</span>
            </h1>

            <p
              className="mt-7 font-sans text-ink-2 leading-[1.78] pretty"
              style={{ fontSize: '17px', maxWidth: '58ch', ...reveal(460) }}
            >
              TRAVO&rsquo;s service offerings are organized into five categories aligned to the construction
              project lifecycle. The catalog is deliberately bounded, and each offering is productized: a
              recognizable, repeatable service with defined deliverables, methodology, and scope, so a buyer
              understands exactly what they are purchasing. The catalog is entered in phases: independent
              underwriting, monitoring, trend, pre-claim, and peer-review work (Category B, C2, C3, and the A2
              peer review) leads the firm&rsquo;s early go-to-market; full preconstruction studies and
              portfolio services scale on the references that work produces. Recurring capital-at-risk
              services (Category B and the C1 retainer) carry published indicative fees and standardized,
              reliance-ready deliverables; analytical engagements are scoped per decision. Indicative fees are
              planning figures, not quotations; every engagement is confirmed by a written proposal with
              defined scope and re-open triggers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3" style={reveal(550)}>
              <a
                href="#cat-a"
                className="font-mono text-[11px] tracking-label uppercase bg-forest text-canvas px-7 py-[14px] hover:bg-forest-2 transition-colors duration-200"
              >
                View Catalog
              </a>
              <a
                href="/contact"
                className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200"
              >
                Discuss a Project
              </a>
            </div>
          </div>

          <div>
            <CatalogIndexPanel mounted={mounted} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Service meta datum ─────────────────────────────────────────────────────────

function MetaDatum({ label, value, feeColor }: { label: string; value: string; feeColor?: string }) {
  return (
    <div>
      <span className="font-mono uppercase font-semibold block" style={{ fontSize: '11.5px', letterSpacing: '0.1em', color: FOREST }}>
        {label}
      </span>
      <span className="font-mono block mt-[5px]" style={{ fontSize: '13.5px', letterSpacing: '0.02em', color: feeColor ?? '#1E1E2E' }}>
        {value}
      </span>
    </div>
  );
}

function ServiceNoteBlock({ note }: { note: ServiceNote }) {
  return (
    <div className="mt-3">
      <span className="font-mono uppercase font-semibold block mb-[5px]" style={{ fontSize: '11px', letterSpacing: '0.1em', color: FOREST }}>
        {note.label}
      </span>
      <p className="font-sans text-ink-3 leading-[1.62]" style={{ fontSize: '12.5px', maxWidth: '62ch' }}>
        {note.body}
      </p>
    </div>
  );
}

// ── Mini visualizations for featured services ─────────────────────────────────

function MiniDistributionA1() {
  const W = 340, H = 96;
  const pts: string[] = [];
  for (let i = 0; i <= 70; i++) {
    const t = i / 70;
    const xn = t * 8 - 4;
    const yRaw = Math.exp(-xn * xn / 2);
    pts.push(`${i === 0 ? 'M' : 'L'}${(t * W).toFixed(1)},${(H - yRaw * (H - 18) * 0.88).toFixed(1)}`);
  }
  const curve = pts.join(' ');
  const fillPath = `${curve} L${W},${H} L0,${H} Z`;
  const p10x = 0.34 * W, p50x = 0.51 * W, p80x = 0.66 * W;

  return (
    <div className="flex flex-col">
      <span className="font-mono uppercase font-semibold block mb-2" style={{ fontSize: '9px', letterSpacing: '0.14em', color: FOREST }}>
        Sample Output: P10 / P50 / P80 Distribution
      </span>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', display: 'block', overflow: 'visible' }}
        fill="none"
        aria-label="Probability distribution of project cost outcomes showing P10, P50, and P80 percentiles"
      >
        <path d={fillPath} fill="#3EA6A3" opacity="0.09" />
        <path d={curve} stroke="#3EA6A3" strokeWidth="1.5" fill="none" />
        <line x1={p10x} y1="4" x2={p10x} y2={H} stroke="#3EA6A3" strokeWidth="0.9" strokeDasharray="2,3" opacity="0.75" />
        <line x1={p50x} y1="4" x2={p50x} y2={H} stroke="#2C5251" strokeWidth="1.1" strokeDasharray="2,3" opacity="0.9" />
        <line x1={p80x} y1="4" x2={p80x} y2={H} stroke="#9B2D30" strokeWidth="0.9" strokeDasharray="2,3" opacity="0.75" />
        <line x1="0" y1={H} x2={W} y2={H} stroke="#D5D9E8" strokeWidth="0.75" />
        <text x={p10x} y={H + 9} textAnchor="middle" fill="#3EA6A3" fontSize="7" fontFamily="monospace">P10</text>
        <text x={p50x} y={H + 9} textAnchor="middle" fill="#2C5251" fontSize="7" fontFamily="monospace">P50</text>
        <text x={p80x} y={H + 9} textAnchor="middle" fill="#9B2D30" fontSize="7" fontFamily="monospace">P80</text>
      </svg>
    </div>
  );
}

function MiniTrendC1() {
  // Cost-at-completion trend with confidence band — what a managed register retainer produces
  const W = 340, H = 112;
  const PL = 6, PR = 8, PT = 10, PB = 22;
  const xL = PL, xR = W - PR;
  const yT = PT, yB = H - PB;
  const toX = (m: number) => xL + (m / 24) * (xR - xL);
  const toY = (c: number) => yB - ((c - 92) / 30) * (yB - yT);

  const cx0 = toX(0), cy0 = toY(100);
  const cx12 = toX(12), cy12 = toY(103);
  const cx24 = toX(24), cy24 = toY(106);
  const uy0 = toY(115), uy12 = toY(113), uy24 = toY(112);
  const ly0 = toY(96), ly12 = toY(98), ly24 = toY(102);
  const todayX = toX(12);

  const bandPath = `M${cx0},${uy0} Q${cx12},${uy12} ${cx24},${uy24} L${cx24},${ly24} Q${cx12},${ly12} ${cx0},${ly0} Z`;
  const centerPath = `M${cx0},${cy0} Q${cx12},${cy12} ${cx24},${cy24}`;

  return (
    <div className="flex flex-col">
      <span className="font-mono uppercase font-semibold block mb-2" style={{ fontSize: '9px', letterSpacing: '0.14em', color: FOREST }}>
        Cost-at-Completion Trend · Managed Retainer
      </span>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', display: 'block' }}
        fill="none"
        aria-label="Cost-at-completion trend chart showing managed risk band converging over project life"
      >
        <path d={bandPath} fill="#FFB9BB" opacity="0.20" />
        <path d={`M${cx0},${uy0} Q${cx12},${uy12} ${cx24},${uy24}`} stroke="#FFB9BB" strokeWidth="0.85" opacity="0.55" />
        <path d={`M${cx0},${ly0} Q${cx12},${ly12} ${cx24},${ly24}`} stroke="#FFB9BB" strokeWidth="0.85" opacity="0.55" />
        <path d={centerPath} stroke="#2C5251" strokeWidth="1.6" />
        <circle cx={cx24} cy={cy24} r="2.5" fill="#2C5251" />
        <line x1={todayX} y1={yT} x2={todayX} y2={yB} stroke="#8A95B2" strokeWidth="0.8" strokeDasharray="2,3" />
        <line x1={xL} y1={yB} x2={xR} y2={yB} stroke="#D5D9E8" strokeWidth="0.75" />
        <text x={cx24 - 4} y={uy24 - 3} textAnchor="end" fill="#FFB9BB" fontSize="6.5" fontFamily="monospace" opacity="0.85">P80</text>
        <text x={xL} y={H - 4} textAnchor="start" fill="#828DA6" fontSize="6.5" fontFamily="monospace">Contract</text>
        <text x={todayX} y={H - 4} textAnchor="middle" fill="#8A95B2" fontSize="6.5" fontFamily="monospace">Today</text>
        <text x={xR} y={H - 4} textAnchor="end" fill="#828DA6" fontSize="6.5" fontFamily="monospace">Completion</text>
      </svg>
      <div className="flex items-center gap-5 mt-2">
        <div className="flex items-center gap-[6px]">
          <div style={{ width: '18px', height: '2px', backgroundColor: '#2C5251' }} />
          <span className="font-mono" style={{ fontSize: '6.5px', letterSpacing: '0.08em', color: '#828DA6' }}>Cost-at-Completion</span>
        </div>
        <div className="flex items-center gap-[6px]">
          <div style={{ width: '14px', height: '7px', backgroundColor: '#FFB9BB', opacity: 0.38 }} />
          <span className="font-mono" style={{ fontSize: '6.5px', letterSpacing: '0.08em', color: '#828DA6' }}>P20 – P80 Band</span>
        </div>
      </div>
    </div>
  );
}

const FEATURED_VIZ: Partial<Record<string, React.ReactElement>> = {
  A1: <MiniDistributionA1 />,
  C1: <MiniTrendC1 />,
};

// ── Expand marker: a + that rotates into a × ────────────────────────────────────

function ExpandMarker({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="relative shrink-0"
      style={{
        width: '20px',
        height: '20px',
        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <span style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1.5px', backgroundColor: FOREST, transform: 'translateY(-50%)' }} />
      <span style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1.5px', backgroundColor: FOREST, transform: 'translateX(-50%)' }} />
    </span>
  );
}

// ── Service row — collapsed by default, expands in place ───────────────────────

function ServiceRow({
  svc,
  isOpen,
  onToggle,
  isLast,
}: {
  svc: Service;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const viz = FEATURED_VIZ[svc.code];

  return (
    <div className={isLast ? '' : 'border-b border-rule-l'}>
      <button
        type="button"
        id={svc.code.toLowerCase()}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`svc-panel-${svc.code}`}
        className="w-full text-left hover:bg-black/[0.02] transition-colors duration-200 cursor-pointer scroll-mt-[112px]"
      >
        <div className="max-w-site mx-auto flex items-center gap-4 md:gap-7 py-6 px-6 md:px-12 lg:px-16">
          <span
            className="font-display font-extrabold tracking-display leading-none shrink-0 transition-colors duration-300"
            style={{ fontSize: 'clamp(1.7rem, 2.6vw, 2.2rem)', width: '68px', color: isOpen ? FOREST : TEAL_DEEP }}
          >
            {svc.code}
          </span>

          <span className="flex-1 min-w-0 flex items-center gap-2.5">
            <h3
              className="font-display font-bold text-ink tracking-tight leading-snug"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
            >
              {svc.name}
            </h3>
            {viz && (
              <span
                aria-hidden
                title="Includes a sample output visualization"
                className="shrink-0 rounded-full"
                style={{ width: '5px', height: '5px', backgroundColor: TEAL_DEEP }}
              />
            )}
          </span>

          <span className="hidden md:block font-mono uppercase text-ink-3 shrink-0" style={{ fontSize: '10px', letterSpacing: '0.06em' }}>
            {svc.timeline}
          </span>

          <ExpandMarker open={isOpen} />
        </div>
      </button>

      <div
        id={`svc-panel-${svc.code}`}
        role="region"
        aria-hidden={!isOpen}
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="max-w-site mx-auto pb-9 lg:pb-11 px-6 md:px-12 lg:px-16">
            <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_300px]">
              <div>
                <p className="font-sans text-ink-2 leading-[1.76] pretty" style={{ fontSize: '15px', maxWidth: '60ch' }}>
                  {svc.desc}
                </p>
                {svc.notes?.map((n) => <ServiceNoteBlock key={n.label} note={n} />)}
                {viz && (
                  <div className="mt-6 lg:hidden">
                    {viz}
                  </div>
                )}
              </div>

              <div className="lg:pl-9 lg:border-l lg:border-rule-l flex flex-col gap-5">
                <MetaDatum label="Engagement Scope" value={svc.timeline} />
                <MetaDatum label="Indicative Range" value={svc.fee} feeColor={FOREST} />
                <div>
                  <span className="font-mono uppercase font-semibold block mb-[5px]" style={{ fontSize: '11.5px', letterSpacing: '0.1em', color: FOREST }}>
                    Deliverable
                  </span>
                  <p className="font-sans text-ink-3 leading-[1.62]" style={{ fontSize: '12.5px' }}>
                    {svc.deliverable}
                  </p>
                </div>
                {viz && (
                  <div className="hidden lg:block mt-1">
                    {viz}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Category section ───────────────────────────────────────────────────────────

function CategorySection({ cat }: { cat: Category }) {
  const { ref: headerRef, inView: headerVisible } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: servicesRef, inView: servicesVisible } = useInView<HTMLDivElement>({ threshold: 0.04 });

  const [openCodes, setOpenCodes] = useState<Set<string>>(new Set());

  // Deep-link support: /services#a1 opens that row on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (cat.services.some((s) => s.code.toLowerCase() === hash)) {
      setOpenCodes(new Set([hash.toUpperCase()]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (code: string) => {
    setOpenCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  return (
    <section id={`cat-${cat.id.toLowerCase()}`}>
      {/* Category header — plain, light, aligned. No bleed, no dark. */}
      <div ref={headerRef} className="bg-canvas">
        <div className="max-w-site mx-auto border-t-2 border-ink px-6 md:px-12 lg:px-16 py-10 lg:py-12">
          <div className="flex items-center gap-6 lg:gap-9">
            <span
              aria-hidden
              className="font-display font-extrabold tracking-display leading-none shrink-0 select-none"
              style={{ fontSize: 'clamp(3rem, 5vw, 4.2rem)', letterSpacing: '-0.03em', color: TEAL_DEEP, ...fade(headerVisible, 0) }}
            >
              {cat.id}
            </span>

            <div className="shrink-0 self-stretch bg-rule-l" style={{ width: '1px' }} aria-hidden />

            <div style={fade(headerVisible, 80)}>
              <span className="font-mono uppercase font-semibold block mb-2" style={{ fontSize: '11.5px', letterSpacing: '0.12em', color: FOREST }}>
                Category {cat.id} · {cat.kickerLabel}
              </span>
              <h2 className="font-display font-extrabold tracking-display text-ink balance" style={{ fontSize: 'clamp(1.3rem, 2.1vw, 1.85rem)', lineHeight: 1.05 }}>
                {cat.name}
              </h2>
              <p className="mt-3 font-sans text-ink-3 leading-[1.68] pretty" style={{ fontSize: '14px', maxWidth: '68ch' }}>
                {cat.intro}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div ref={servicesRef} className="bg-canvas" style={fade(servicesVisible, 0)}>
        {cat.services.map((svc, i) => (
          <ServiceRow
            key={svc.code}
            svc={svc}
            isOpen={openCodes.has(svc.code)}
            onToggle={() => toggle(svc.code)}
            isLast={i === cat.services.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

// ── Closing sections: commercial terms, public-sector pathway, governance ──────

function ClosingInfo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  return (
    <div ref={ref} className="bg-canvas border-t border-rule-l">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16 py-14 lg:py-16 grid md:grid-cols-3 gap-10" style={fade(inView, 0)}>
        <div>
          <span className="font-mono uppercase font-semibold block mb-3" style={{ fontSize: '11.5px', letterSpacing: '0.1em', color: FOREST }}>
            Commercial Terms
          </span>
          <p className="font-sans text-ink-2 leading-[1.7]" style={{ fontSize: '13.5px' }}>
            TRAVO is a focused specialty practice, not a generalist construction-management consultancy.
            Engagements without a quantitative risk component at the core, staff augmentation, and
            lifecycle project-services bundles sit outside the catalog. Indicative fees above are planning
            figures for recurring capital-at-risk products; all engagements are confirmed by written
            proposal with defined scope, deliverables, timeline, and re-open triggers. TRAVO does not
            accept success-based or contingent compensation on any independence-sensitive engagement.
          </p>
          <a href="/contact" className="mt-4 inline-block font-mono uppercase text-teal-deep" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
            Discuss a project →
          </a>
        </div>

        <div>
          <span className="font-mono uppercase font-semibold block mb-3" style={{ fontSize: '11.5px', letterSpacing: '0.1em', color: FOREST }}>
            Public-Sector Pathway
          </span>
          <p className="font-sans text-ink-2 leading-[1.7]" style={{ fontSize: '13.5px' }}>
            TRAVO serves public buyers the way public procurement actually works. The firm is completing
            vendor registration in the region&rsquo;s procurement systems, NJSTART (New Jersey), PASSPort
            (New York City), and the Port Authority and MTA vendor programs, and is pursuing the
            small-business and diversity certifications for which it is eligible. On major federally
            supported programs, TRAVO&rsquo;s primary route is as a specialist quantitative-risk
            subconsultant to program-management and oversight primes, with deliverables mapped to FTA
            Oversight Procedure and AACE formats so they drop directly into existing review structures.
            Direct public engagements are pursued where sole-source
            or small-purchase thresholds permit, including Category D3 municipal reviews.
          </p>
        </div>

        <div>
          <span className="font-mono uppercase font-semibold block mb-3" style={{ fontSize: '11.5px', letterSpacing: '0.1em', color: FOREST }}>
            Governance, Reliance and Capacity
          </span>
          <p className="font-sans text-ink-2 leading-[1.7]" style={{ fontSize: '13.5px' }}>
            Every capital provider&rsquo;s first questions, professional-liability coverage, reliance
            terms, conflict management, data security, and who actually does the work, are answered in
            writing before engagement. The firm&rsquo;s governance framework is published on the About page.
          </p>
          <a href="/about#governance" className="mt-4 inline-block font-mono uppercase text-teal-deep" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
            Read the governance framework →
          </a>
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16 pb-14 lg:pb-16 flex flex-wrap gap-4 border-t border-rule-l pt-10" style={fade(inView, 100)}>
        <a href="/contact" className="font-mono text-[11px] tracking-label uppercase bg-forest text-canvas px-7 py-[14px] hover:bg-forest-2 transition-colors duration-200">
          Discuss a Project
        </a>
        <a href="/methodology" className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200">
          How the Analysis Is Built
        </a>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export function ServicesPage() {
  return (
    <>
      <ServicesHero />

      <div className="bg-canvas">
        {CATALOG.map((cat) => (
          <CategorySection key={cat.id} cat={cat} />
        ))}
        <ClosingInfo />
      </div>
    </>
  );
}
