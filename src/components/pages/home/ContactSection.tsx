'use client';

import { useState, type FormEvent } from 'react';
import { useInView } from '../../../hooks/useInView';

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

export function ContactSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-canvas text-ink py-[96px] md:py-[120px]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div style={fade(inView, 0)} className="pb-10 border-b border-rule-l mb-12">
          <h2
            id="contact-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
          >
            <span className="text-ink">Start a conversation.</span>
          </h2>
          <p className="mt-5 font-sans text-ink-2 leading-[1.72] pretty" style={{ fontSize: '17px', maxWidth: '58ch' }}>
            If you are approaching a decision where uncertainty carries real
            financial weight, an early conversation is the lowest-cost step
            you can take.
          </p>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-12 md:gap-20">

          {/* Sidebar */}
          <aside style={fade(inView, 80)}>
            <span className="font-mono text-[10px] uppercase tracking-label text-forest block mb-4">
              Direct
            </span>
            <address className="not-italic font-sans text-ink-2 leading-[1.9]" style={{ fontSize: '14px' }}>
              Travo Risk Advisory
              <br />
              New Jersey &amp; New York Metro
              <br />
              <a
                href="mailto:contact@travo.com"
                className="text-forest hover:text-forest-2 transition-colors"
              >
                contact@travo.com
              </a>
            </address>
            <div className="mt-8 pt-6 border-t border-rule-l">
              <p className="font-mono text-[9.5px] uppercase tracking-label text-ink-3 mb-2">
                Response time
              </p>
              <p className="font-sans text-ink-2" style={{ fontSize: '14px' }}>
                Within one business day
              </p>
            </div>
          </aside>

          {/* Form */}
          <div style={fade(inView, 140)}>
            {!submitted ? (
              <>
                <p className="font-sans text-ink-2 leading-[1.72] mb-8 pretty" style={{ fontSize: '16px', maxWidth: '60ch' }}>
                  Tell us briefly about the project and the decision in front of
                  you. We will tell you candidly whether quantitative risk
                  analysis can help.
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
                    <Field label="Project Type" fullWidth>
                      <select className="field-input">
                        <option value="">Select one</option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Project Description" fullWidth>
                      <textarea
                        rows={5}
                        placeholder="The project and the decision in front of you"
                        className="field-input resize-y"
                      />
                    </Field>
                  </div>
                  <div className="mt-7">
                    <button
                      type="submit"
                      className="font-mono text-[11px] tracking-label uppercase bg-forest text-canvas px-7 py-[14px] hover:bg-forest-2 transition-colors duration-200 cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="border-t border-rule-l pt-8">
                <p
                  className="font-display font-extrabold text-forest leading-[1.1] tracking-display"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                >
                  Thank you.
                </p>
                <p className="mt-3 font-sans text-ink-2" style={{ fontSize: '16px' }}>
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
    <div className={`flex flex-col gap-[6px] ${fullWidth ? 'sm:col-span-2' : ''}`}>
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

function fade(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(26px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}
