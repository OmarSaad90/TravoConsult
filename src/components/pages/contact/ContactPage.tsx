'use client';

import React, { useState } from 'react';
import { useInView } from '@/hooks/useInView';

/* ── Utility ──────────────────────────────────────────────────────────────── */

function fade(v: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: v ? 1 : 0,
    transform: v ? 'none' : 'translateY(26px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    n: '01',
    heading: 'Send this form',
    body: 'Describe the project and the decision in front of you. Two or three sentences is enough to start.',
  },
  {
    n: '02',
    heading: 'Candid assessment',
    body: 'We respond within one business day with a frank view on whether quantitative risk analysis applies and which engagement fits.',
  },
] as const;

type Trigger = {
  trigger: string;
  links: { label: string; href: string }[];
};

const TRIGGERS: Trigger[] = [
  {
    trigger: 'Underwriting or closing a construction loan',
    links: [{ label: 'Construction loan monitoring & draw review', href: '/services#b1' }],
  },
  {
    trigger: 'Forming a probabilistic underwriting view',
    links: [{ label: 'Underwriting risk opinion', href: '/services#b2' }],
  },
  {
    trigger: 'Monitoring contractor financial health',
    links: [{ label: 'Contractor financial-health & default-risk monitoring', href: '/services#b3' }],
  },
  {
    trigger: 'Reassessing a project beginning to drift',
    links: [{ label: 'Trend risk analysis & cost-at-completion forecasting', href: '/services#c2' }],
  },
  {
    trigger: 'Needing an answer in ten days',
    links: [{ label: 'Urgent triage, 10-business-day reassessment', href: '/services#c2' }],
  },
  {
    trigger: 'Preparing for a potential claim or dispute',
    links: [{ label: 'Pre-claim & dispute-readiness review', href: '/services#c3' }],
  },
  {
    trigger: 'Sustaining risk discipline through execution',
    links: [{ label: 'Risk register management retainer', href: '/services#c1' }],
  },
  {
    trigger: 'Reviewing a contractor risk submission',
    links: [{ label: 'Independent risk peer review', href: '/services#a2' }],
  },
  {
    trigger: 'Setting a project contingency',
    links: [{ label: 'Quantitative risk analysis & contingency derivation', href: '/services#a1' }],
  },
  {
    trigger: 'Leveling bids',
    links: [{ label: 'Risk-adjusted bid leveling & procurement support', href: '/services#a3' }],
  },
  {
    trigger: 'Comparing strategic alternatives',
    links: [{ label: 'Strategic alternatives & scenario analysis', href: '/services#a4' }],
  },
  {
    trigger: 'Reviewing a major project proposal independently',
    links: [{ label: 'Independent third-party review', href: '/services#d3' }],
  },
  {
    trigger: 'Capturing lessons learned or benchmarking a portfolio',
    links: [{ label: 'Lessons-learned & portfolio benchmarking', href: '/services#d1' }],
  },
  {
    trigger: 'Implementing a risk methodology',
    links: [{ label: 'Methodology implementation & training', href: '/services#e1' }],
  },
];

const CLIENT_TYPES = [
  'Surety',
  'Construction lender',
  'Construction-litigation counsel',
  'Municipality / state agency',
  'Institutional owner',
  'Public agency',
  'General contractor',
  'Other',
];

const PROJECT_VALUE_RANGES = [
  'Under $20M',
  '$20M – $50M',
  '$50M – $100M',
  '$100M – $150M',
  'Over $150M',
  'Portfolio / program',
  'Not applicable',
];

const PROJECT_STAGES = [
  'Concept / planning',
  'Design',
  'Procurement / bidding',
  'Construction, on plan',
  'Construction, trending negatively',
  'Pre-claim / dispute emerging',
  'Complete / post-project',
  'Portfolio-level',
];

const ANALYSIS_TYPES = [
  'Quantitative risk analysis & contingency derivation (A1)',
  'Independent risk peer review (A2)',
  'Risk-adjusted bid leveling / procurement support (A3)',
  'Strategic alternatives & scenario analysis (A4)',
  'Construction loan monitoring & draw review (B1)',
  'Underwriting risk opinion (B2)',
  'Contractor financial-health / default-risk monitoring (B3)',
  'Risk register management retainer (C1)',
  'Trend risk analysis / cost-at-completion forecasting (C2)',
  'Urgent triage, 10-day reassessment (C2)',
  'Pre-claim & dispute-readiness review (C3)',
  'Lessons-learned risk capture (D1)',
  'Portfolio risk benchmarking (D2)',
  'Independent third-party review (D3)',
  'Methodology implementation & training (E1)',
  'Not sure yet, describe below',
];

/* ── Sub-components ───────────────────────────────────────────────────────── */

function Field({
  id,
  label,
  required,
  fullWidth,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-[6px]${fullWidth ? ' sm:col-span-2' : ''}`}>
      <label htmlFor={id} className="font-mono text-[9.5px] tracking-label uppercase font-semibold text-forest">
        {label}
        {required && (
          <span className="text-coral ml-1" aria-label="required">*</span>
        )}
      </label>
      {children}
    </div>
  );
}

function ChevronDown() {
  return (
    <span
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-3"
      aria-hidden
    >
      <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
        <path
          d="M1 1l5 5 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function SelectField({
  label,
  required,
  fullWidth,
  options,
  name,
}: {
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  options: string[];
  name: string;
}) {
  return (
    <Field id={`f-${name}`} label={label} required={required} fullWidth={fullWidth}>
      <div className="relative">
        <select
          id={`f-${name}`}
          name={name}
          required={required}
          defaultValue=""
          className="field-input appearance-none cursor-pointer"
          style={{ paddingRight: '36px' }}
        >
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown />
      </div>
    </Field>
  );
}

function ConsentCheckbox() {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none sm:col-span-2">
      <span className="relative shrink-0" style={{ width: '18px', height: '18px', marginTop: '2px' }}>
        <input
          type="checkbox"
          required
          name="consent"
          className="peer absolute inset-0 z-10 m-0 cursor-pointer opacity-0"
        />
        <span
          className="absolute inset-0 border border-rule-l bg-canvas-1 transition-colors duration-150 peer-checked:bg-forest peer-checked:border-forest"
          aria-hidden
        />
        <svg
          className="absolute inset-0 opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden
        >
          <path d="M4.5 9.2l3 3 6-6.4" stroke="#F5F7FB" strokeWidth="1.6" strokeLinecap="square" />
        </svg>
      </span>
      <span className="font-sans text-ink-2 leading-[1.6]" style={{ fontSize: '13.5px' }}>
        I consent to TRAVO storing the information above for the purpose of responding to this inquiry.
        <span className="text-coral ml-1" aria-label="required">*</span>
      </span>
    </label>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */

function ContactHero() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.08 });

  return (
    <section ref={ref} className="bg-canvas text-ink pt-[64px] pb-[60px] overflow-hidden">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <h1
          className="font-display font-extrabold leading-[0.95] tracking-display balance"
          style={{
            fontSize: 'clamp(2.8rem, 5.8vw, 5.2rem)',
            ...fade(inView, 0),
          }}
        >
          <span className="text-ink">Discuss a</span>
          <br />
          <span className="text-forest">project.</span>
        </h1>
        <p
          className="mt-8 font-sans text-ink-2 leading-[1.78] pretty"
          style={{ fontSize: '17px', maxWidth: '54ch', ...fade(inView, 110) }}
        >
          TRAVO engagements begin at a decision. If your project is at one
          of the decision points below, or approaching one, describe it
          using the form, and the principal will respond directly.
        </p>
      </div>
    </section>
  );
}

/* ── Engagement triggers ──────────────────────────────────────────────────── */

function EngagementTriggers() {
  const { ref: headerRef, inView: headerVisible } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const { ref: listRef, inView: listVisible } = useInView<HTMLDivElement>({ threshold: 0.03 });

  return (
    <section className="bg-canvas border-t border-rule-l">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16 pt-[56px] md:pt-[64px]">
        <div ref={headerRef} style={fade(headerVisible, 0)}>
          <h2
            className="font-display font-extrabold text-ink tracking-display leading-[0.97] balance"
            style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)', maxWidth: '20ch' }}
          >
            Fourteen reasons sureties, lenders, counsel, owners, agencies,
            municipalities, and contractors call TRAVO.
          </h2>
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div
          ref={listRef}
          className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule-l border border-rule-l"
        >
          {TRIGGERS.map((t, i) => (
            <div
              key={t.trigger}
              className="bg-canvas flex flex-col p-7 lg:p-8"
              style={fade(listVisible, 40 + i * 45)}
            >
              <span className="font-mono text-[10px] tracking-data text-ink-3">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                className="mt-2 font-display font-bold text-ink tracking-tight leading-tight balance"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
              >
                {t.trigger}
              </h3>
              <div className="mt-auto pt-4 flex flex-col gap-2">
                {t.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="font-mono uppercase text-forest hover:text-forest-2 transition-colors duration-200"
                    style={{ fontSize: '10.5px', letterSpacing: '0.06em' }}
                  >
                    {l.label} →
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[56px] md:h-[64px]" aria-hidden />
    </section>
  );
}

/* ── Form section ─────────────────────────────────────────────────────────── */

function ContactFormSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.04 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="bg-canvas text-ink py-[56px] md:py-[72px] border-t border-rule-l">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[272px_1fr] gap-12 lg:gap-20">

          {/* Sidebar */}
          <aside style={fade(inView, 0)}>

            <div className="mb-10">
              <p className="font-mono text-[10px] uppercase font-semibold tracking-label text-forest mb-7">
                What to expect
              </p>
              <div className="flex flex-col gap-8">
                {STEPS.map(({ n, heading, body }) => (
                  <div key={n} className="grid grid-cols-[28px_1fr] gap-3">
                    <span
                      className="font-mono text-[9px] tracking-data text-ink-3"
                      style={{ paddingTop: '2px' }}
                    >
                      {n}
                    </span>
                    <div>
                      <p className="font-sans font-semibold text-ink" style={{ fontSize: '14px' }}>
                        {heading}
                      </p>
                      <p
                        className="font-sans text-ink-3 leading-[1.72] mt-[5px] pretty"
                        style={{ fontSize: '13.5px' }}
                      >
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-rule-l">
              <p className="font-mono text-[10px] uppercase font-semibold tracking-label text-forest mb-4">
                Direct contact
              </p>
              <address className="not-italic font-sans text-ink-2 leading-[1.8]" style={{ fontSize: '14px' }}>
                Travo Risk Advisory
                <br />
                New Jersey &amp; New York Metro
                <br />
                <a
                  href="mailto:contact@travo.com"
                  className="text-forest hover:text-forest-2 transition-colors duration-200"
                >
                  contact@travo.com
                </a>
              </address>
              <div className="mt-5 pt-5 border-t border-rule-l">
                <p className="font-mono text-[10px] uppercase font-semibold tracking-label text-forest mb-1">
                  Response time
                </p>
                <p className="font-sans text-ink-2" style={{ fontSize: '14px' }}>
                  Within one business day
                </p>
              </div>
            </div>

          </aside>

          {/* Form */}
          <div style={fade(inView, 110)}>
            {!submitted ? (
              <>
                <h2
                  className="font-display font-extrabold text-ink tracking-display leading-[0.97] balance"
                  style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)' }}
                >
                  Professional inquiry form.
                </h2>
                <p
                  className="mt-4 font-sans text-ink-2 leading-[1.74] pretty"
                  style={{ fontSize: '16px', maxWidth: '62ch' }}
                >
                  Tell us briefly about the project and the decision in front of
                  you. We will tell you candidly whether quantitative risk
                  analysis can help; if it cannot, we will say so.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-9">
                  <p className="font-mono text-[9.5px] uppercase tracking-label text-ink-3 mb-6">
                    Fields marked * are required.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <Field id="f-name" label="Full name" required>
                      <input id="f-name" name="name" type="text" required className="field-input" autoComplete="name" />
                    </Field>

                    <Field id="f-organization" label="Organization" required>
                      <input id="f-organization" name="organization" type="text" required className="field-input" autoComplete="organization" />
                    </Field>

                    <Field id="f-email" label="Email" required>
                      <input id="f-email" name="email" type="email" required className="field-input" autoComplete="email" />
                    </Field>

                    <Field id="f-phone" label="Phone">
                      <input id="f-phone" name="phone" type="tel" className="field-input" autoComplete="tel" />
                    </Field>

                    <SelectField label="Client type" required name="client-type" options={CLIENT_TYPES} />

                    <Field id="f-project-location" label="Project location" required>
                      <input
                        id="f-project-location"
                        name="project-location"
                        type="text"
                        required
                        className="field-input"
                        placeholder="City / county. NJ primary, NY metropolitan secondary"
                      />
                    </Field>

                    <SelectField label="Project value range" required name="project-value" options={PROJECT_VALUE_RANGES} />

                    <SelectField label="Project stage" required name="project-stage" options={PROJECT_STAGES} />

                    <SelectField
                      label="Type of analysis required"
                      required
                      fullWidth
                      name="analysis-type"
                      options={ANALYSIS_TYPES}
                    />

                    <Field id="f-message" label="Message" required fullWidth>
                      <textarea
                        id="f-message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Describe the decision your project is facing and its timing."
                        className="field-input resize-y"
                      />
                    </Field>

                    <ConsentCheckbox />

                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      className="font-mono text-[11px] tracking-label uppercase bg-forest text-canvas px-8 py-[15px] hover:bg-forest-2 transition-colors duration-200 cursor-pointer"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div
                className="border border-rule-l p-10 md:p-12"
                style={{ animation: 'confirmIn 0.7s cubic-bezier(0.16,1,0.3,1) both' }}
              >
                <p
                  className="font-display font-extrabold text-forest leading-[1.0] tracking-display"
                  style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}
                >
                  Thank you.
                </p>
                <p
                  className="mt-4 font-sans text-ink-2 leading-[1.74] pretty"
                  style={{ fontSize: '16px', maxWidth: '48ch' }}
                >
                  We have received your message and will respond within one
                  business day.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Page root ────────────────────────────────────────────────────────────── */

export function ContactPage() {
  return (
    <>
      <ContactHero />
      <EngagementTriggers />
      <ContactFormSection />
    </>
  );
}
