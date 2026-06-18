'use client';

import React, { useState, type FormEvent } from 'react';
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

const PROJECT_TYPES = [
  'Pre-project risk & contingency analysis',
  'Bid leveling & procurement support',
  'During-project risk management',
  'Trend analysis / cost-at-completion',
  'Pre-claim & dispute readiness',
  'Portfolio benchmarking',
  'Methodology implementation & training',
  'Other',
];

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

/* ── Sub-components ───────────────────────────────────────────────────────── */

function Field({
  label,
  required,
  fullWidth,
  children,
}: {
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-[6px]${fullWidth ? ' sm:col-span-2' : ''}`}>
      <label className="font-mono text-[9.5px] tracking-label uppercase text-ink-3">
        {label}
        {required && (
          <span className="text-coral ml-1" aria-label="required">*</span>
        )}
      </label>
      {children}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */

function ContactHero() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.08 });

  return (
    <section ref={ref} className="bg-navy text-snow pt-[96px] pb-[88px] overflow-hidden">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-20 items-end">

          {/* Heading + lead */}
          <div>
            <h1
              className="font-display font-extrabold leading-[0.95] tracking-display balance"
              style={{
                fontSize: 'clamp(2.8rem, 5.8vw, 5.2rem)',
                ...fade(inView, 0),
              }}
            >
              <span className="text-snow">Start a</span>
              <br />
              <span className="text-teal">conversation.</span>
            </h1>
            <p
              className="mt-8 font-sans text-slate leading-[1.78] pretty"
              style={{ fontSize: '17px', maxWidth: '54ch', ...fade(inView, 110) }}
            >
              If you are approaching a decision where uncertainty carries real
              financial weight, an early conversation is the lowest-cost step
              you can take.
            </p>
          </div>

          {/* Contact card */}
          <div
            className="border border-rule-d p-7"
            style={fade(inView, 200)}
          >
            <p className="font-mono text-[9.5px] uppercase tracking-label text-teal mb-4">
              Direct contact
            </p>
            <address className="not-italic font-sans text-snow leading-[1.95]" style={{ fontSize: '14.5px' }}>
              Travo Risk Advisory
              <br />
              New Jersey &amp; New York Metro
              <br />
              <a
                href="mailto:contact@travo.com"
                className="text-teal hover:text-snow transition-colors duration-200"
              >
                contact@travo.com
              </a>
            </address>
            <div className="mt-5 pt-5 border-t border-rule-d">
              <p className="font-mono text-[9px] uppercase tracking-label text-slate mb-1">
                Response time
              </p>
              <p className="font-sans text-snow" style={{ fontSize: '14px' }}>
                Within one business day
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Form section ─────────────────────────────────────────────────────────── */

function ContactFormSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.04 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="bg-canvas text-ink py-[88px] md:py-[112px]">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[272px_1fr] gap-12 lg:gap-20">

          {/* Sidebar */}
          <aside style={fade(inView, 0)}>

            <div className="mb-10">
              <p className="font-mono text-[9.5px] uppercase tracking-label text-forest mb-7">
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
              <p className="font-mono text-[9.5px] uppercase tracking-label text-forest mb-3">
                Or reach us directly
              </p>
              <a
                href="mailto:contact@travo.com"
                className="font-sans text-ink-2 hover:text-forest transition-colors duration-200"
                style={{ fontSize: '14px' }}
              >
                contact@travo.com
              </a>
            </div>

          </aside>

          {/* Form */}
          <div style={fade(inView, 110)}>
            {!submitted ? (
              <>
                <p
                  className="font-sans text-ink-2 leading-[1.74] mb-9 pretty"
                  style={{ fontSize: '16px', maxWidth: '62ch' }}
                >
                  Tell us briefly about the project and the decision in front of
                  you. We will tell you candidly whether quantitative risk
                  analysis can help; if it cannot, we will say so.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <Field label="Name" required>
                      <input type="text" required className="field-input" autoComplete="name" />
                    </Field>

                    <Field label="Organization">
                      <input type="text" className="field-input" autoComplete="organization" />
                    </Field>

                    <Field label="Role">
                      <input type="text" className="field-input" />
                    </Field>

                    <Field label="Email" required>
                      <input type="email" required className="field-input" autoComplete="email" />
                    </Field>

                    <Field label="Project type" fullWidth>
                      <div className="relative">
                        <select
                          className="field-input appearance-none cursor-pointer"
                          style={{ paddingRight: '36px' }}
                        >
                          <option value="">Select one</option>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
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
                      </div>
                    </Field>

                    <Field label="Project description" fullWidth>
                      <textarea
                        rows={5}
                        placeholder="The project and the decision in front of you"
                        className="field-input resize-y"
                      />
                    </Field>

                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      className="font-mono text-[11px] tracking-label uppercase bg-forest text-canvas px-8 py-[15px] hover:bg-forest-2 transition-colors duration-200 cursor-pointer"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="border border-rule-l p-10 md:p-12">
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
      <ContactFormSection />
    </>
  );
}
