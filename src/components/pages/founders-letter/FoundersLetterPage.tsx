'use client';

import type { CSSProperties } from 'react';
import { useInView } from '@/hooks/useInView';

/* ── Animation helpers ────────────────────────────────────────────────────── */

function fade(v: boolean, delay = 0): CSSProperties {
  return {
    opacity: v ? 1 : 0,
    transform: v ? 'none' : 'translateY(22px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

function slideUp(v: boolean, delay = 0): CSSProperties {
  return {
    transform: v ? 'translateY(0)' : 'translateY(112%)',
    transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

/* ── Letter text (verbatim in meaning, em dashes stripped, apostrophes curled) ── */

const PARAGRAPHS = [
  `I grew up in this industry, literally. My father’s idea of a weekend was climbing into his un-air-conditioned Toyota Land Cruiser and driving out to job sites. On those trips I learned construction from the ground up: the craft, the problem-solving, and, most of all, the relationships that hold a project together. That early education shaped everything that followed.`,
  `I studied civil and environmental engineering at Imperial College London, where I worked under Professor John Burland, one of the engineers behind the effort to stabilize the Leaning Tower of Pisa. I then earned my master’s and PhD at MIT, specializing in risk assessment applied to geotechnical engineering. My doctoral work, supervised by Professors Herbert Einstein and Daniele Veneziano, focused on landslide and tunnel risk: decisions made underground, where the ground cannot be seen and uncertainty is the defining condition.`,
  `There, I learned to make decisions by quantifying risk rather than relying on intuition, a structured, systematic discipline. Central to it is the observational approach: treating construction itself as an information-gathering phase, updating the plan as new data arrives. That is what real project management looks like, and it has shaped how I have practiced ever since.`,
  `I returned to Oman to help build our family’s construction business, Sarooj. What I brought back from MIT wasn’t only a disciplined approach to engineering decisions: it was a discipline of inquiry and rigor. We grew Sarooj by applying systematic risk assessment to the projects we bid and delivered, and it worked: today Sarooj is one of Oman’s leading contractors, with a portfolio of more than $1.3 billion across roads, marine, energy, and civil works. On our design-and-build projects, we treated risk management as the foundation of systems built to adapt to a changing future. TRAVO isn’t an arm of Sarooj. It’s independent by design. But everything I learned building at that scale is what makes the analysis real, not just rigorous.`,
  `My specialty is risk assessment, and my conviction is simple: the only reliable path to sustainable outcomes is proactive risk management, identifying and mitigating threats early in planning, monitoring them throughout construction, and handing over assets prepared for long-term performance. My leadership philosophy fuses field-tested practicality with world-class technical capability, anchored in values I learned building real things: integrity, quality, safety, and respect for people.`,
  `Today, as Teaching Associate Professor at Stevens Institute of Technology in New Jersey, I work on both sides of the line between the classroom and the field, building new methods with my students and applying them on real projects. TRAVO is the formal expression of that work: rigorous, independent risk analysis for the sureties, lenders, counsel, owners, agencies, and contractors making consequential capital decisions across our region. If you are underwriting a bond or a loan, watching a project begin to drift, preparing for a claim before it fully materializes, setting a contingency, leveling a bid, or weighing a strategic alternative, I would welcome the conversation.`,
  `Thank you for your trust. I look forward to helping you make better decisions under uncertainty, and to building infrastructure that stands the test of time, and of change.`,
] as const;

/* ── Hero — title only, no lede ───────────────────────────────────────────── */

function LetterHero() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.08 });

  return (
    <section
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden pt-[76px] pb-[56px] md:pt-[92px] md:pb-[72px]"
      aria-labelledby="letter-h1"
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div style={{ overflow: 'hidden' }}>
          <span
            className="block font-mono text-[11.5px] font-semibold tracking-label uppercase text-forest"
            style={slideUp(inView, 0)}
          >
            Founder’s Letter
          </span>
        </div>

        <h1
          id="letter-h1"
          className="font-display font-extrabold leading-[0.95] tracking-display mt-5"
          style={{ fontSize: 'clamp(2.6rem, 4.8vw, 4.4rem)', ...fade(inView, 130) }}
        >
          <span className="text-ink">From the </span>
          <span className="text-forest">principal.</span>
        </h1>
      </div>
    </section>
  );
}

/* ── Letter body — quiet, generous, long-form reading ─────────────────────── */

function LetterBody() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.04 });

  return (
    <section
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden py-[56px] md:py-[76px]"
      aria-label="Founder’s letter text"
    >
      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <article className="max-w-[42rem] mx-auto letter">
          {PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              className="font-sans text-ink-2 pretty"
              style={{
                fontSize: 'clamp(1.06rem, 1.5vw, 1.3rem)',
                lineHeight: 1.72,
                marginTop: i === 0 ? 0 : '1.9em',
                ...fade(inView, 60 + i * 70),
              }}
            >
              {p}
            </p>
          ))}

          {/* Sign-off */}
          <div
            className="mt-16 pt-8 border-t border-rule-l"
            style={fade(inView, 60 + PARAGRAPHS.length * 70 + 80)}
          >
            <p
              className="font-sans text-ink italic"
              style={{ fontSize: 'clamp(1.06rem, 1.5vw, 1.3rem)', lineHeight: 1.5 }}
            >
              Dr. Karim S. Karam
            </p>
            <p className="font-mono font-semibold text-forest uppercase mt-3" style={{ fontSize: '9.5px', letterSpacing: '0.14em' }}>
              Principal, TRAVO <span style={{ opacity: 0.5 }}>·</span> Teaching Associate Professor, Stevens Institute of Technology
            </p>
          </div>

          {/* Closing CTA — folded into the letter's end rather than a standalone dark bar */}
          <div
            className="mt-16 pt-10 border-t border-rule-l"
            style={fade(inView, 60 + PARAGRAPHS.length * 70 + 160)}
          >
            <h2
              className="font-display font-extrabold leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', maxWidth: '22ch' }}
            >
              <span className="text-ink">Have a decision this letter</span>{' '}
              <span className="text-forest">speaks to?</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mt-7">
              <a
                href="/contact"
                className="font-mono text-[11px] tracking-label uppercase bg-coral text-navy px-8 py-[15px] hover:bg-coral/90 transition-colors duration-200 text-center"
              >
                Discuss a Project
              </a>
              <a
                href="/about"
                className="font-mono text-[11px] tracking-label uppercase text-forest border border-forest/50 px-8 py-[15px] hover:border-forest hover:bg-forest/[0.06] transition-all duration-200 text-center"
              >
                About TRAVO &amp; the Principal
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

export function FoundersLetterPage() {
  return (
    <>
      <LetterHero />
      <LetterBody />
    </>
  );
}
