'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../../hooks/useInView';

// ── Palette refs for SVG fills (must match tailwind.config.js exactly) ────────
const P = {
  navy:      '#1E1E2E',
  ruleD:     '#28283E',
  ruleL:     '#D5D9E8',
  teal:      '#71D2CF',
  tealDeep:  '#3EA6A3',
  forest:    '#2C5251',
  coral:     '#FF5B5E',
  elevated:  '#FFB9BB',
  snow:      '#E6EAF4',
  slate:     '#8A95B2',
  haze:      '#828DA6',
  ink2:      '#323B5B',
  ink3:      '#5F6884',
} as const;

// ── Ticker ─────────────────────────────────────────────────────────────────────
const TICKER = [
  'AN INDEPENDENT PRACTICE',
  'BOUTIQUE BY DESIGN',
  'PRINCIPAL-LED ENGAGEMENTS',
  'NJ / NY METROPOLITAN REGION',
  'GROUNDED IN AACE STANDARDS',
  'FOUNDED BY DR. KARIM S. KARAM',
  'SENIOR ATTENTION ON EVERY FILE',
  'SELECTIVE ENGAGEMENT',
];

function TickerStrip() {
  return (
    <div className="overflow-hidden" style={{ height: '34px', borderBottom: '1px solid #D5D9E8' }} aria-hidden>
      <div
        className="marquee-track flex items-center h-full whitespace-nowrap"
        style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}
      >
        {[...TICKER, ...TICKER].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono uppercase text-ink-3" style={{ fontSize: '9.5px', letterSpacing: '0.18em', paddingLeft: '28px' }}>
              {item}
            </span>
            <span className="font-mono text-forest mx-3" style={{ fontSize: '7px', opacity: 0.6 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Page content ───────────────────────────────────────────────────────────────

const CORE_VALUES = [
  {
    num: '01',
    title: 'Methodological rigor over methodological theater',
    body: 'The construction risk industry is full of firms that produce visually impressive risk registers and color-coded heat maps without underlying probabilistic analysis. TRAVO will not. Every quantitative output, every P50, every P80, every contingency recommendation, is derivable from documented methodology, traceable inputs, and validated assumptions. The rigor is the product.',
  },
  {
    num: '02',
    title: 'Independence is non-negotiable',
    body: 'TRAVO does not take engagements from contractors and owners on the same project. TRAVO does not enter referral arrangements that compromise objectivity. TRAVO does not soften analysis to maintain client relationships. Independence is what allows institutional owners and public agencies to rely on the work. Once compromised, it cannot be recovered.',
  },
  {
    num: '03',
    title: 'The principal’s name goes on every report',
    body: 'Every TRAVO deliverable carries the principal’s name and credentials. Every report is reviewed and signed off personally. Professional analysts under NDA execute the underlying client work; supervised graduate researchers work only on anonymized research and never on client-confidential material. This is the quality-control mechanism that distinguishes a credentialed specialty practice from a body shop.',
  },
  {
    num: '04',
    title: 'Publication is operational, not optional',
    body: 'TRAVO publishes: peer-reviewed research, industry-press articles, an annual regional benchmark, and insights from past projects, on a defined cadence regardless of how busy engagement work becomes. Publication is the mechanism by which the firm’s standards-setting position is built and maintained.',
  },
  {
    num: '05',
    title: 'Evidence before positioning',
    body: 'The firm does not print claims it cannot yet support. Market validation precedes collateral; completed engagements precede case-study language; the benchmark exists before it is referenced in a sales conversation. This value governs the sequencing of the practice, including the reserved tagline the firm will adopt only when the market’s behavior supports it.',
  },
  {
    num: '06',
    title: 'Engagements should compound',
    body: 'TRAVO is selective in its work. Engagements should strengthen the firm’s knowledge, research, methodology, or future value: an anonymized publishable case study, data that strengthens the regional benchmark, or methodology refinement that improves the next engagement. Asset-building work is what produces a durable, standards-setting practice.',
  },
] as const;

const GOVERNANCE_ITEMS = [
  {
    num: '01',
    title: 'Professional liability and reliance',
    body: 'TRAVO maintains professional-liability (errors-and-omissions) insurance with limits sized to the reliance placed on its work, targeted at $2–5 million per claim for capital-at-risk engagements, and issues reliance letters on standard written terms that state scope, limitations, and the parties entitled to rely. Certificates of insurance are provided on request. Reports state their limitations explicitly; TRAVO does not issue open-ended opinions.',
  },
  {
    num: '02',
    title: 'Conflict checks and engagement acceptance',
    body: 'Every engagement passes a written conflict check and acceptance protocol before proposal. TRAVO does not take engagements from contractors and owners on the same project in any combination of roles, does not enter referral arrangements that compromise objectivity, and does not soften analysis to maintain client relationships. Where the firm serves capital providers and project parties whose interests may intersect across engagements, the overlap is disclosed and resolved in writing at acceptance.',
  },
  {
    num: '03',
    title: 'Role sequencing on disputes',
    body: 'Where TRAVO has performed project-stage analysis, its role in any subsequent pre-claim or dispute matter is decided and bounded at acceptance, with prior work product and potential fact-witness exposure disclosed to counsel at the outset.',
  },
  {
    num: '04',
    title: 'Quality assurance and authorship',
    body: 'Every deliverable receives two-person review, and the principal personally reviews and signs every analytical product. Client work is executed by the principal and professional analysts under NDA; supervised graduate researchers work only on anonymized research and never on client-confidential material. Every quantitative output is derivable from documented methodology, traceable inputs, and validated assumptions.',
  },
  {
    num: '05',
    title: 'Data security and retention',
    body: 'Client materials, including lender-confidential and draw-file data, are held under access-controlled storage with defined retention and destruction schedules, stated in each engagement letter. Contributed research data is anonymized before it enters any dataset and is never attributed to a named project or client.',
  },
  {
    num: '06',
    title: 'Licensure and professional structure',
    body: 'TRAVO’s advisory deliverables are structured as quantitative decision-analysis and management-consulting work product. Where an engagement requires opinions constituting the practice of engineering under New York or New Jersey law, that work is performed under, and in association with, appropriately licensed professional engineers and a firm holding the required certificate of authorization. The boundary is stated in every proposal.',
  },
  {
    num: '07',
    title: 'University governance',
    body: 'The principal’s external practice is conducted under Stevens Institute of Technology’s outside-activity and conflict-of-interest policies, disclosed in writing and renewed annually. The research-only role of graduate researchers, described above, is part of that disclosed arrangement.',
  },
  {
    num: '08',
    title: 'Capacity and delivery calendar',
    body: 'A specialty practice built on principal sign-off must be honest about capacity. TRAVO caps concurrent analytical engagements, states delivery commitments against the academic calendar, and maintains a vetted bench of senior independent specialists, scheduling, cost, geotechnical, and financial, engaged under the same confidentiality and review standards. Buyers are told at proposal who will do the work and when.',
  },
] as const;

const INSTITUTIONS = [
  { role: 'Undergraduate', name: 'Imperial College London', detail: 'Civil & Environmental Engineering' },
  { role: 'Master’s / Ph.D.', name: 'MIT', detail: 'Risk assessment applied to geotechnical engineering' },
  { role: 'Doctoral advisors', name: 'Profs. Herbert Einstein & Daniele Veneziano', detail: '' },
  { role: 'Current role', name: 'Teaching Associate Professor', detail: 'Stevens Institute of Technology' },
] as const;

// ── Animation helpers ──────────────────────────────────────────────────────────
function fade(v: boolean, delay: number): CSSProperties {
  return {
    opacity:    v ? 1 : 0,
    transform:  v ? 'none' : 'translateY(22px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

function slideUp(v: boolean, delay: number): CSSProperties {
  return {
    transform:  v ? 'translateY(0)' : 'translateY(112%)',
    transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

// ── Small shared bits ────────────────────────────────────────────────────────
function KickerDark({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono font-semibold text-teal uppercase" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
      {children}
    </span>
  );
}

function KickerLight({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono font-semibold text-forest uppercase" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
      {children}
    </span>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────
export function AboutPage() {
  const { ref: heroRef,       inView: heroActive       } = useInView<HTMLElement>({ threshold: 0.04 });
  const { ref: firmRef,       inView: firmActive       } = useInView<HTMLElement>({ threshold: 0.06 });
  const { ref: valuesRef,     inView: valuesActive     } = useInView<HTMLElement>({ threshold: 0.04 });
  const { ref: governanceRef, inView: governanceActive } = useInView<HTMLElement>({ threshold: 0.04 });
  const { ref: principalRef,  inView: principalActive  } = useInView<HTMLElement>({ threshold: 0.04 });

  return (
    <>
      {/* ── §1  Hero ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative bg-canvas text-ink overflow-hidden"
        aria-labelledby="about-h1"
      >
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <TickerStrip />

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16 pt-[52px] pb-[68px] md:pt-[64px] md:pb-[84px]">
          <div className="max-w-[720px]">

            {/* Headline + lead + links */}
            <div>
              <div style={{ overflow: 'hidden' }}>
                <span className="block" style={slideUp(heroActive, 0)}>
                  <KickerLight>About Travo</KickerLight>
                </span>
              </div>

              <h1
                id="about-h1"
                className="font-display font-extrabold leading-[0.95] tracking-display mt-5"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 4.8rem)' }}
              >
                {(
                  [
                    'Risk analysis is',
                    'the method. Value',
                    'optimization is the result.',
                  ] as const
                ).map((text, i) => (
                  <div key={i} style={{ overflow: 'hidden', display: 'block' }}>
                    <span className="block" style={slideUp(heroActive, 85 + i * 85)}>
                      <span className="text-ink">{text}</span>
                    </span>
                  </div>
                ))}
              </h1>

              <p
                className="mt-8 font-sans text-ink-2 leading-[1.78] pretty"
                style={{ fontSize: '17px', maxWidth: '56ch', ...fade(heroActive, 420) }}
              >
                TRAVO stands for Total Risk Analysis and Value Optimization. The name reflects the firm’s discipline: every engagement integrates risk identification, quantification, and management with the explicit goal of optimizing value for the owner, contractor, or capital decision-maker who has retained us. The two are not separate offerings; the second is what the first is for.
              </p>

              <div className="mt-8" style={fade(heroActive, 520)}>
                <a
                  href="/services"
                  className="font-mono text-[10.5px] tracking-label uppercase bg-forest text-canvas px-7 py-[13px] hover:bg-forest-2 transition-colors duration-200"
                >
                  View Services
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── §2  The Firm ─────────────────────────────────────────────────── */}
      <section
        ref={firmRef}
        className="relative bg-canvas text-ink overflow-hidden py-[60px] md:py-[80px]"
        aria-labelledby="firm-h"
      >
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

          <div className="mb-14 md:mb-16 grid md:grid-cols-[200px_1fr] gap-4 md:gap-10 items-start" style={fade(firmActive, 0)}>
            <div>
              <KickerLight>The Firm</KickerLight>
            </div>
            <h2
              id="firm-h"
              className="font-display font-extrabold leading-[0.97] tracking-display"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', textWrap: 'balance' } as CSSProperties}
            >
              <span className="text-ink">A specialty quantitative</span><br />
              <span className="text-ink">risk advisory.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 border-t border-rule-l pt-10">

            {/* In brief */}
            <div style={fade(firmActive, 100)}>
              <h3
                className="font-display font-bold text-ink tracking-display mb-5"
                style={{ fontSize: 'clamp(1.3rem, 1.9vw, 1.6rem)' }}
              >
                In brief
              </h3>
              <div className="space-y-5">
                <p className="font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '15.5px' }}>
                  TRAVO is a specialty risk advisory practice serving the New Jersey and New York metropolitan construction market. We help sureties, construction lenders, litigation counsel, institutional owners, public agencies, and contractors make better capital decisions under uncertainty, by applying rigorous Monte Carlo–based risk methodology at the moments where uncertainty most directly affects financial outcomes: underwriting, trend deterioration, pre-claim positioning, contingency, and procurement.
                </p>
                <p className="font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '15.5px' }}>
                  TRAVO combines graduate-level academic credentials, senior operator experience as co-founder of Sarooj Construction Company in Oman, an affiliated firm operating at $1.3B+ portfolio scale across multiple capital project sectors, and an active research program that produces published regional benchmarks. The firm is independent, methodology-driven, and standards-setting by design.
                </p>
              </div>
            </div>

            {/* The executive view */}
            <div style={fade(firmActive, 200)}>
              <h3
                className="font-display font-bold text-ink tracking-display mb-5"
                style={{ fontSize: 'clamp(1.3rem, 1.9vw, 1.6rem)' }}
              >
                The executive view
              </h3>
              <div className="space-y-5">
                <p className="font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '15.5px' }}>
                  TRAVO (Total Risk Analysis and Value Optimization) is built to become the regional standard for quantitative construction risk analysis in the New Jersey and New York metropolitan market, a position the firm treats as earned, not asserted. We provide independent, methodologically rigorous risk and contingency analysis to sureties, construction lenders, construction-litigation counsel, institutional owners, public agencies and municipalities, and mid-sized contractors.
                </p>
                <p className="font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '15.5px' }}>
                  Our practice is built around a single discipline: Monte Carlo–based probabilistic analysis of construction cost and schedule outcomes, applied to the decisions where uncertainty has the largest financial impact. These decisions, increasingly described in the executive vocabulary as <em>preconstruction excellence</em>, are where rigorous quantitative analysis produces the largest measurable improvements in project net present value.
                </p>
                <p className="font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '15.5px' }}>
                  TRAVO’s methodology is grounded in AACE Recommended Practices, peer-reviewed academic research, and an active research program building the region’s leading published benchmark on construction outcome distributions. The principal’s operator credibility derives from his role building Sarooj Construction Company into one of Oman’s leading contractors, the proving ground where TRAVO’s methodology was tested in the field. TRAVO is independent by design, neither a subsidiary nor commercial affiliate of Sarooj, and independent of contractors, owners, and technology vendors. The principal personally signs every report. The discipline of the practice, narrow scope, rigorous methodology, published research, and selective engagement, is the foundation on which TRAVO’s standards-setting position is being earned in the regional market.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── §3  Core Values (dark) ───────────────────────────────────────── */}
      <section
        ref={valuesRef}
        className="relative bg-navy text-snow overflow-hidden py-[68px] md:py-[88px]"
        aria-labelledby="values-h"
      >
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

          <div className="mb-12 md:mb-14 mx-auto text-center" style={{ ...fade(valuesActive, 0), maxWidth: '54ch' }}>
            <KickerDark>Core Values</KickerDark>
            <h2
              id="values-h"
              className="font-display font-extrabold leading-[0.97] tracking-display mt-4"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', textWrap: 'balance' } as CSSProperties}
            >
              <span className="text-snow">Operating principles,</span><br />
              <span className="text-snow">not marketing language.</span>
            </h2>
            <p className="mt-5 mx-auto font-sans text-slate leading-[1.72] pretty" style={{ fontSize: '16px' }}>
              Six values define how engagements are accepted, executed, and declined.
            </p>
          </div>

          <div className="border-t border-rule-d">
            {CORE_VALUES.map((v, i) => {
              const isEven = i % 2 === 1;
              return (
                <div
                  key={v.num}
                  className="py-8 border-b border-rule-d"
                  style={{
                    opacity:    valuesActive ? 1 : 0,
                    transform:  valuesActive ? 'none' : 'translateY(18px)',
                    transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 85}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 85}ms`,
                  }}
                >
                  {/* Mobile: inline number + title, body below */}
                  <div className="flex items-baseline gap-4 mb-3 md:hidden">
                    <span
                      className="font-display font-extrabold tracking-display shrink-0 text-teal"
                      style={{ fontSize: '1.3rem' }}
                      aria-hidden
                    >{v.num}</span>
                    <h3
                      className="font-display font-bold text-snow leading-tight tracking-display"
                      style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
                    >{v.title}</h3>
                  </div>
                  <p className="font-sans text-slate leading-[1.78] pretty md:hidden" style={{ fontSize: '15.5px' }}>
                    {v.body}
                  </p>

                  {/* Desktop: 3-column ruled grid — even rows indent right for asymmetry */}
                  <div
                    className="hidden md:grid md:gap-x-10 md:items-start"
                    style={{
                      gridTemplateColumns: isEven ? '72px 240px 1fr' : '72px 216px 1fr',
                      transform: isEven ? 'translateX(48px)' : 'none',
                    }}
                  >
                    <span
                      className="font-display font-extrabold tracking-display leading-none text-teal"
                      style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)' }}
                      aria-hidden
                    >{v.num}</span>
                    <h3
                      className="font-display font-bold text-snow leading-[1.1] tracking-display"
                      style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', paddingTop: '4px' }}
                    >{v.title}</h3>
                    <p className="font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '15.5px' }}>
                      {v.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── §4  Governance, Liability & Capacity ─────────────────────────── */}
      <section
        id="governance"
        ref={governanceRef}
        className="relative bg-canvas text-ink overflow-hidden pt-[60px] md:pt-[80px] pb-[40px] md:pb-[52px]"
        aria-labelledby="governance-h"
      >

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

          <div className="mb-8 md:mb-10 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 items-start" style={fade(governanceActive, 0)}>
            <div>
              <KickerLight>Governance</KickerLight>
              <h2
                id="governance-h"
                className="font-display font-extrabold leading-[0.97] tracking-display mt-4"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', textWrap: 'balance' } as CSSProperties}
              >
                <span className="text-ink">Governance is not back-office.</span><br />
                <span className="text-ink">For this practice, it is the product’s spine.</span>
              </h2>
            </div>
            <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '16px', marginTop: '34px' }}>
              A firm whose reports are relied on by sureties, lenders, boards, and public decision-makers must answer the governance questions before it is asked. TRAVO publishes its framework so buyers, their counsel, and their credit committees can evaluate it directly.
            </p>
          </div>

          <div
            className="grid sm:grid-cols-2 border-t border-l border-rule-l gap-px bg-rule-l"
          >
            {GOVERNANCE_ITEMS.map((item, i) => (
              <div
                key={item.num}
                className="bg-canvas flex flex-col p-7 lg:p-8"
                style={fade(governanceActive, 60 + i * 55)}
              >
                <span
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: '9.5px', letterSpacing: '0.16em', color: P.forest, opacity: 0.7 }}
                  aria-hidden
                >
                  {item.num}
                </span>
                <h3
                  className="font-display font-bold text-ink leading-tight tracking-display mb-3"
                  style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)' }}
                >
                  {item.title}
                </h3>
                <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '14px' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── §5  The Principal ────────────────────────────────────────────── */}
      <section
        ref={principalRef}
        className="relative bg-canvas text-ink overflow-hidden pt-[40px] md:pt-[52px] pb-[60px] md:pb-[80px]"
        aria-labelledby="principal-h"
      >

        <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

          <div className="grid md:grid-cols-[260px_1fr] gap-12 lg:gap-20 items-start">

            {/* Sticky sidebar — photo, role, institutions. Stays in view while the
                long bio scrolls beside it, instead of running out of content and
                leaving empty space next to a much taller right column. */}
            <div className="md:sticky md:self-start" style={{ ...fade(principalActive, 80), top: '92px', width: '260px', maxWidth: '100%' }}>
              {/*
                When the portrait arrives: replace the entire div below with:
                <div className="relative overflow-hidden" style={{ width: 'min(260px, 100%)', aspectRatio: '3/4' }}>
                  <Image src="/karim.jpg" alt="Dr. Karim S. Karam, Founder & Principal" fill className="object-cover object-top" />
                </div>
              */}
              <div
                className="relative"
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  border: '1.5px solid rgba(44,82,81,0.4)',
                  backgroundColor: 'rgba(44,82,81,0.05)',
                }}
              >
                {/* Film-frame corner marks */}
                <div className="absolute" style={{ top: 10, left: 10, width: 20, height: 20, borderTop: `1.5px solid ${P.forest}`, borderLeft: `1.5px solid ${P.forest}`, opacity: 0.9 }} />
                <div className="absolute" style={{ top: 10, right: 10, width: 20, height: 20, borderTop: `1.5px solid ${P.forest}`, borderRight: `1.5px solid ${P.forest}`, opacity: 0.9 }} />
                <div className="absolute" style={{ bottom: 10, left: 10, width: 20, height: 20, borderBottom: `1.5px solid ${P.forest}`, borderLeft: `1.5px solid ${P.forest}`, opacity: 0.9 }} />
                <div className="absolute" style={{ bottom: 10, right: 10, width: 20, height: 20, borderBottom: `1.5px solid ${P.forest}`, borderRight: `1.5px solid ${P.forest}`, opacity: 0.9 }} />

                {/* Person silhouette, centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingBottom: '48px' }}>
                  <svg width="100" height="112" viewBox="0 0 100 112" fill="none" aria-hidden>
                    <circle cx="50" cy="36" r="24" stroke={P.forest} strokeWidth="1.5" opacity="0.9" />
                    <path d="M 4 112 Q 4 72 50 72 Q 96 72 96 112"
                      stroke={P.forest} strokeWidth="1.5" fill="none" opacity="0.9" />
                  </svg>
                  <p className="font-mono mt-5 uppercase" style={{ fontSize: '8px', letterSpacing: '0.22em', color: P.forest, opacity: 0.9 }}>
                    Portrait
                  </p>
                </div>

                {/* Bottom label strip */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3"
                  style={{ borderTop: '1px solid rgba(44,82,81,0.2)', backgroundColor: 'rgba(245,247,251,0.85)' }}>
                  <p className="font-mono uppercase" style={{ fontSize: '8.5px', letterSpacing: '0.16em', color: P.forest }}>
                    Dr. Karim S. Karam
                  </p>
                  <p className="font-mono mt-1" style={{ fontSize: '7.5px', letterSpacing: '0.12em', color: '#5F6884' }}>
                    /public/karim.jpg
                  </p>
                </div>
              </div>

              {/* Role */}
              <p className="mt-6 font-mono font-semibold text-forest uppercase" style={{ fontSize: '9.5px', letterSpacing: '0.18em' }}>
                Founder & Principal · Travo Risk Advisory
              </p>

              {/* Institutions */}
              <div className="mt-6 border-t border-rule-l pt-6">
                <span className="font-mono uppercase font-semibold block mb-5" style={{ fontSize: '10px', letterSpacing: '0.16em', color: P.forest }}>
                  Institutions
                </span>
                <dl aria-label="Principal institutions" className="flex flex-col gap-5">
                  {INSTITUTIONS.map((inst) => (
                    <div key={inst.role}>
                      <dt className="font-mono uppercase font-semibold" style={{ fontSize: '9px', letterSpacing: '0.14em', color: P.forest }}>
                        {inst.role}
                      </dt>
                      <dd className="mt-1 font-display font-bold text-ink tracking-display" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}>
                        {inst.name}
                      </dd>
                      {inst.detail && (
                        <dd className="mt-1 font-sans text-ink-2" style={{ fontSize: '13px' }}>
                          {inst.detail}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
                <p className="mt-6 font-sans text-ink-3 leading-[1.65] pretty" style={{ fontSize: '12px' }}>
                  General context on institutions named above, from their official sites and clearly separate from TRAVO-specific claims (no endorsement or affiliation with TRAVO is implied): Imperial College London is a science-focused university in London; MIT is a research university in Cambridge, Massachusetts; Stevens Institute of Technology is a technological research university in Hoboken, New Jersey; Sarooj Construction Company is an Omani contractor.
                </p>
              </div>
            </div>

            {/* Bio column */}
            <div>
              <div className="max-w-[68ch]" style={fade(principalActive, 0)}>
                <KickerLight>The Principal</KickerLight>
                <h2
                  id="principal-h"
                  className="font-display font-extrabold leading-[0.95] tracking-display mt-4"
                  style={{ fontSize: 'clamp(2.4rem, 4.4vw, 4rem)' }}
                >
                  <span className="text-ink">Dr. Karim S. Karam</span>
                </h2>
                <p className="mt-5 font-sans text-ink-2 leading-[1.78] pretty" style={{ fontSize: '16.5px' }}>
                  TRAVO is founded and led by Dr. Karim S. Karam, who brings together three capabilities the regional construction-advisory market rarely combines: graduate-level risk methodology, operator credibility at scale, and an active academic platform.
                </p>
              </div>

              {/* Biographical three-part layout */}
              <div className="mt-9 border-t border-rule-l pt-8 space-y-10">

                <div style={{ ...fade(principalActive, 200) }}>
                  <h3
                    className="font-display font-bold text-forest tracking-display mb-4"
                    style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}
                  >
                    Academic formation
                  </h3>
                  <div className="space-y-4">
                    <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15px' }}>
                      Dr. Karam studied Civil and Environmental Engineering at Imperial College of Science, Technology and Medicine in London, where he worked under Professor John Burland, among the engineers behind the stabilization of the Leaning Tower of Pisa, before earning his Master’s and Ph.D. at MIT. His doctoral research, supervised by Professors Herbert Einstein and Daniele Veneziano, applied decision analysis and the quantification of risk to geotechnical engineering, specifically tunnels and landslides, problems defined by what cannot be seen.
                    </p>
                    <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15px' }}>
                      Central to his approach is the observational method, which in construction translates to an information-gathering phase in which plans are updated as uncertainty resolves.
                    </p>
                  </div>
                </div>

                <div style={{ ...fade(principalActive, 280) }}>
                  <h3
                    className="font-display font-bold text-forest tracking-display mb-4"
                    style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}
                  >
                    Operating experience at scale
                  </h3>
                  <div className="space-y-4">
                    <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15px' }}>
                      He returned to Oman as part of the founding family of Travo SARL, and later Sarooj Construction Company (www.sarooj.com), where he helped build and grow the business through its 2005–2006 expansion. By applying systematic risk assessment to the projects Sarooj bid and delivered, the firm became one of Oman’s leading contractors, today a portfolio exceeding $1.3 billion and more than 4,000 professionals across infrastructure sectors including transportation, marine construction, energy, and utilities, serving clients both local and international.
                    </p>
                    <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15px' }}>
                      On several projects, Dr. Karam built stochastic multi-attribute decision models to select the construction strategy that optimized cost, time, safety, and environmental performance, quantitative risk methodology applied in the field. He went on to co-found Synergy Petroleum International, whose Nimr produced-water treatment system, among the largest of its kind in the world, earned a United Nations Award of Excellence in Climate Action in 2015.
                    </p>
                  </div>
                </div>

                <div style={{ ...fade(principalActive, 360) }}>
                  <h3
                    className="font-display font-bold text-forest tracking-display mb-4"
                    style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}
                  >
                    Academic platform & philosophy
                  </h3>
                  <div className="space-y-4">
                    <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15px' }}>
                      Today Dr. Karam is Teaching Associate Professor of Civil, Environmental and Ocean Engineering at Stevens Institute of Technology in New Jersey, where he develops risk and decision-analysis methods with graduate students and applies them on capital projects.
                    </p>
                    <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '15px' }}>
                      His specialty is risk assessment, and the conviction is consistent across academic and operating experience: the only reliable path to sustainable outcomes is proactive risk management, identifying threats early in planning, monitoring them throughout construction, and handing over assets prepared for long-term performance. That philosophy fuses field-tested practicality with world-class technical capability, anchored in the values he formed building real things, integrity, quality, safety, and respect for people, and translated into TRAVO’s operating principles: methodological rigor, independence, accountable authorship, sustained publication, and disciplined engagement selection. Risk assessment is the discipline; better decisions under uncertainty are the result, thereby optimizing value.
                    </p>
                  </div>
                </div>

              </div>

              {/* Founder's Letter button */}
              <div className="mt-9" style={fade(principalActive, 440)}>
                <a
                  href="/founders-letter"
                  className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] inline-block hover:border-forest hover:bg-forest/[0.06] transition-all duration-200"
                >
                  Read the Founder’s Letter
                </a>
              </div>

              {/* Card: TRAVO & Sarooj — independence */}
              <div
                className="mt-10 border border-rule-l p-7 lg:p-8"
                style={{ backgroundColor: '#EBEFF8', ...fade(principalActive, 560) }}
              >
                <span className="font-mono uppercase font-semibold block mb-3" style={{ fontSize: '9.5px', letterSpacing: '0.16em', color: P.forest }}>
                  TRAVO & Sarooj: Independence
                </span>
                <p className="font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '14.5px' }}>
                  TRAVO is an independent advisory practice; Sarooj is the proving ground where the methodology was tested in the field, not TRAVO’s parent or commercial affiliate. That base of real-world delivery is what separates risk analysis that is academically sound from risk analysis that has survived contact with a live project. Because that record was built abroad and at an affiliated firm, TRAVO treats it as something to be demonstrated rather than asserted: the documented prior case study, the published methodology, and the outcomes of early NJ/NY engagements are the verification a regional buyer is entitled to expect.
                </p>
              </div>

              {/* Closing CTA */}
              <div className="mt-10" style={fade(principalActive, 620)}>
                <a
                  href="/contact"
                  className="font-mono text-[11px] tracking-label uppercase bg-forest text-canvas px-7 py-[14px] inline-block hover:bg-forest-2 transition-colors duration-200"
                >
                  Discuss a Project
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
