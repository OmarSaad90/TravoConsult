'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Compass, FileText, BarChart3, Stamp } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

// ── Tokens ────────────────────────────────────────────────────────────────────
const P = {
  navy:   '#1E1E2E',
  navy1:  '#252538',
  ruleD:  '#28283E',
  ruleL:  '#D5D9E8',
  teal:   '#71D2CF',
  tealDp: '#3EA6A3',
  forest: '#2C5251',
  coral:  '#FF5B5E',
  snow:   '#E6EAF4',
  slate:  '#8A95B2',
  haze:   '#828DA6',
  ink2:   '#323B5B',
  ink3:   '#5F6884',
} as const;

function fade(active: boolean, delay = 0): CSSProperties {
  return {
    opacity:    active ? 1 : 0,
    transform:  active ? 'none' : 'translateY(24px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

/* ── §1 Hero ──────────────────────────────────────────────────────────────── */

function EngagementsHero() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden"
      aria-labelledby="e-hero"
      style={{ paddingTop: '64px', paddingBottom: '44px' }}
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div style={fade(inView, 0)}>
          <span
            className="font-mono font-semibold text-forest uppercase"
            style={{ fontSize: '11.5px', letterSpacing: '0.16em' }}
          >
            Engagements
          </span>
        </div>

        <h1
          id="e-hero"
          className="font-display font-extrabold tracking-display balance mt-5"
          style={{ fontSize: 'clamp(2.6rem, 4.8vw, 4.4rem)', lineHeight: 0.95, maxWidth: '20ch' }}
        >
          <span className="block text-ink" style={fade(inView, 80)}>
            Analysis that attaches
          </span>
          <span className="block text-ink" style={fade(inView, 160)}>
            to a decision.
          </span>
        </h1>

        <p
          className="mt-7 font-sans text-ink-2 leading-[1.78] pretty"
          style={{ fontSize: '17px', maxWidth: '66ch', ...fade(inView, 260) }}
        >
          TRAVO engagements inform the specific decisions where uncertainty is
          financially consequential: underwriting and monitoring, trend
          reassessment when projects begin to drift, pre-claim positioning,
          contingency derivation, schedule baselines, and procurement. Every
          engagement is scoped around the decision it informs. Every report is
          reviewed and signed personally by the principal.
        </p>
      </div>
    </section>
  );
}

/* ── §2 The Shape of an Engagement ───────────────────────────────────────── */

const SHAPE_ITEMS = [
  {
    n: '01',
    title: 'A decision to inform',
    body:
      'Underwriting or monitoring a bonded or financed project, reassessing a drifting project, forecasting cost or schedule at completion, preparing for a potential claim, setting a contingency, leveling bids, comparing strategic alternatives, commissioning an independent review of a major project proposal, capturing lessons learned, benchmarking a portfolio, or implementing a methodology.',
    icon: Compass,
  },
  {
    n: '02',
    title: 'A documented methodology',
    body:
      'Monte Carlo–based simulation, sensitivity and tornado analysis, structured scenario methods, grounded in AACE Recommended Practices, with traceable inputs and documented assumptions.',
    link: { href: '/methodology', label: 'Methodology' },
    icon: FileText,
  },
  {
    n: '03',
    title: 'A quantified result',
    body:
      'P10/P50/P80 distributions, a derived contingency, a risk-adjusted ranking, or a structured comparison of alternatives, expressed so the capital implication of the decision is explicit.',
    icon: BarChart3,
  },
  {
    n: '04',
    title: 'Principal sign-off',
    body:
      'Every TRAVO deliverable carries the principal’s name and credentials. Client work is executed by the principal and professional analysts under NDA; graduate researchers work only on anonymized research, never on client-confidential material.',
    icon: Stamp,
  },
] as const;

function ShapeOfEngagementSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });

  return (
    <section ref={ref} className="bg-canvas text-ink border-t border-rule-l" style={{ paddingTop: '44px', paddingBottom: '56px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="mb-10" style={fade(inView, 0)}>
          <span
            className="font-mono uppercase font-semibold block mb-4"
            style={{ fontSize: '11.5px', letterSpacing: '0.14em', color: P.forest }}
          >
            The Shape of an Engagement
          </span>
          <h2
            className="font-display font-extrabold text-ink leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(2rem, 3.6vw, 3.3rem)', maxWidth: '26ch' }}
          >
            Defined decision. Documented method. Signed result.
          </h2>
        </div>

        {/* Animated rail — desktop only */}
        <div className="hidden lg:block" style={{ position: 'relative', height: '2px' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: P.ruleL }} />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              backgroundColor: P.forest,
              transformOrigin: 'left',
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 2s cubic-bezier(0.16,1,0.3,1) 300ms',
            }}
          />
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: '1px',
            backgroundColor: P.ruleL,
            borderTop: `1px solid ${P.ruleL}`,
            borderBottom: `1px solid ${P.ruleL}`,
          }}
        >
          {SHAPE_ITEMS.map((item, i) => (
            <div
              key={item.n}
              className="bg-canvas flex flex-col"
              style={{ padding: '32px 28px', ...fade(inView, 220 + i * 90) }}
            >
              <div className="flex items-center gap-2.5" style={{ marginBottom: '20px' }}>
                <item.icon size={20} strokeWidth={2} color={P.forest} aria-hidden />
                <span
                  className="font-mono"
                  style={{ fontSize: '11px', letterSpacing: '0.15em', color: P.ink3 }}
                >
                  {item.n}
                </span>
              </div>

              <h3
                className="font-display font-bold text-ink leading-snug tracking-tight"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.22rem)', marginBottom: '12px' }}
              >
                {item.title}
              </h3>

              <p className="font-sans text-ink-2 leading-[1.68] pretty" style={{ fontSize: '14.5px' }}>
                {item.body}
              </p>

              {'link' in item && item.link && (
                <Link
                  href={item.link.href}
                  className="font-mono uppercase inline-block mt-4"
                  style={{ fontSize: '10px', letterSpacing: '0.12em', color: P.tealDp }}
                >
                  {item.link.label} →
                </Link>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── §3 Representative Engagement ────────────────────────────────────────── */

const CASE_STUDY_FIELDS = [
  'Project type',
  'Project value',
  'Client type',
  'Decision informed',
  'Methodology applied',
  'P50 output',
  'P80 output',
  'Outcome at completion',
] as const;

function RepresentativeEngagementSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden border-t border-rule-l"
      aria-labelledby="e-rep"
      style={{ paddingTop: '44px', paddingBottom: '56px' }}
    >

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="mb-12 mx-auto text-center" style={{ ...fade(inView, 0), maxWidth: '58ch' }}>
          <span
            className="font-mono uppercase font-semibold block mb-4"
            style={{ fontSize: '11.5px', letterSpacing: '0.14em', color: P.forest }}
          >
            Case-Study Framework
          </span>
          <h2
            className="font-display font-extrabold text-ink leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(2rem, 3.6vw, 3.3rem)' }}
          >
            Case-study framework.
          </h2>
          <p
            className="mt-5 mx-auto font-sans text-ink-2 leading-[1.76] pretty"
            style={{ fontSize: '16px' }}
          >
            Each published TRAVO case study is anonymized and reported against
            the same framework, so readers can see the decision, the method,
            and the outcome side by side.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* Case study card — honest placeholder */}
          <div
            className="border"
            style={{ borderColor: P.ruleL, backgroundColor: '#EBEFF8', padding: '32px', ...fade(inView, 100) }}
          >
            <div
              className="flex items-center justify-between pb-5 mb-6 border-b"
              style={{ borderColor: P.ruleL }}
            >
              <span className="font-mono uppercase font-semibold" style={{ fontSize: '9.5px', letterSpacing: '0.18em', color: P.forest }}>
                Anonymized case study
              </span>
              <span className="font-mono uppercase font-semibold" style={{ fontSize: '9px', letterSpacing: '0.14em', color: P.ink3 }}>
                Representative engagement
              </span>
            </div>

            <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
              {CASE_STUDY_FIELDS.map((field) => (
                <div key={field}>
                  <dt
                    className="font-mono uppercase font-semibold"
                    style={{ fontSize: '9px', letterSpacing: '0.14em', color: P.forest, marginBottom: '5px' }}
                  >
                    {field}
                  </dt>
                  <dd className="font-sans" style={{ fontSize: '14.5px', color: P.ink2, fontStyle: 'italic' }}>
                    To be confirmed
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Placeholder notice */}
          <div
            className="border"
            style={{ borderColor: 'rgba(255,91,94,0.35)', backgroundColor: 'rgba(255,91,94,0.05)', padding: '28px', ...fade(inView, 200) }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: P.coral,
                  boxShadow: `0 0 8px ${P.coral}`,
                  animation: 'p50Live 2.4s ease-in-out infinite',
                }}
              />
              <span className="font-mono uppercase font-semibold" style={{ fontSize: '9.5px', letterSpacing: '0.16em', color: P.coral }}>
                Placeholder notice
              </span>
            </div>
            <p className="font-sans leading-[1.7] pretty" style={{ fontSize: '14.5px', color: P.navy }}>
              &ldquo;Representative engagement to be added before external use.&rdquo;
            </p>
            <p className="font-sans leading-[1.7] pretty mt-3" style={{ fontSize: '13.5px', color: P.ink2 }}>
              No client names, project names, values, percentiles, outcomes, or
              testimonials appear on this page until an anonymized case study
              from the principal&rsquo;s prior quantitative risk analysis
              engagements has been approved for publication.
            </p>
          </div>

        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-10" style={fade(inView, 320)}>
          <Link
            href="/contact"
            className="font-mono text-[11px] tracking-label uppercase bg-forest text-canvas px-7 py-[14px] hover:bg-forest-2 transition-colors duration-200"
          >
            Discuss a Project
          </Link>
          <Link
            href="/services"
            className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200"
          >
            Browse the Service Catalog
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ── §4 A Worked Risk ────────────────────────────────────────────────────── */

function WorkedRiskSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });

  return (
    <section ref={ref} className="bg-canvas text-ink border-t border-rule-l" aria-labelledby="e-worked" style={{ paddingTop: '44px', paddingBottom: '76px' }}>
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start" style={fade(inView, 0)}>
          <div>
            <span
              className="font-mono uppercase font-semibold block"
              style={{ fontSize: '11.5px', letterSpacing: '0.14em', color: P.forest }}
            >
              A Worked Risk
            </span>
          </div>
          <div>
            <h2
              id="e-worked"
              className="font-display font-extrabold text-ink leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.3rem)', maxWidth: '24ch' }}
            >
              One risk, followed from identification to residual.
            </h2>
            <p
              className="mt-5 font-sans text-ink-2 leading-[1.76] pretty"
              style={{ fontSize: '16px', maxWidth: '64ch' }}
            >
              Beneath the register sits the record of each individual risk: a
              documented record carrying it from identification through
              quantification, mitigation, and the residual level the owner
              consciously accepts, and a profile of that risk across the
              dimensions on which risks actually differ.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-16 mt-14 pt-10 border-t" style={{ borderColor: P.ruleL }}>

          <div style={fade(inView, 100)}>
            <h3
              className="font-display font-bold text-ink leading-tight tracking-display"
              style={{ fontSize: 'clamp(1.2rem, 1.9vw, 1.5rem)' }}
            >
              Why the profile matters
            </h3>
          </div>

          <div className="flex flex-col gap-8">
            <div style={fade(inView, 160)}>
              <p className="font-sans text-ink-2 leading-[1.76] pretty" style={{ fontSize: '16px', maxWidth: '62ch' }}>
                A headline score ranks risks. It does not tell an owner what
                kind of problem they have. Two risks scoring 4.6 may demand
                entirely different responses: one a procurement decision, the
                other a safety intervention.
              </p>
              <p
                className="font-mono uppercase mt-2"
                style={{ fontSize: '8.5px', letterSpacing: '0.1em', color: P.ink3, fontStyle: 'italic' }}
              >
                Illustrative example only, not tied to any real project.
              </p>
            </div>

            <div style={fade(inView, 220)}>
              <p className="font-sans text-ink-2 leading-[1.76] pretty" style={{ fontSize: '16px', maxWidth: '62ch' }}>
                Profiling each risk across cost, schedule, quality, safety,
                environmental, stakeholder, and regulatory dimensions is what
                allows mitigation spend to be directed at the dimension that is
                actually driving the exposure.
              </p>
            </div>

            <div className="flex flex-wrap gap-3" style={fade(inView, 280)}>
              <Link
                href="/methodology"
                className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200"
              >
                The Methodology
              </Link>
              <Link
                href="/services#a1"
                className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-7 py-[14px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200"
              >
                Quantitative Risk Analysis
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* ── Page root ────────────────────────────────────────────────────────────── */

export function EngagementsPage() {
  return (
    <>
      <EngagementsHero />
      <ShapeOfEngagementSection />
      <RepresentativeEngagementSection />
      <WorkedRiskSection />
    </>
  );
}
