import { useInView } from '../../hooks/useInView';

export function ClosingCTA() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section
      ref={ref}
      className="relative bg-navy text-snow overflow-hidden py-[64px] md:py-[80px]"
      aria-label="Contact call to action"
    >
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          style={{
            opacity:    inView ? 1 : 0,
            transform:  inView ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.2,0.7,0.2,1), transform 0.8s cubic-bezier(0.2,0.7,0.2,1)',
          }}
        >
          {/* Heading */}
          <h2
            className="font-display font-extrabold leading-[0.97] tracking-display balance"
            style={{ fontSize: 'clamp(1.8rem, 3.4vw, 3rem)', maxWidth: '22ch' }}
          >
            <span className="text-snow">Have a decision too consequential</span>
            <br />
            <span className="text-coral">to leave to intuition?</span>
          </h2>

          {/* CTA */}
          <a
            href="/contact"
            className="font-mono text-[11px] tracking-label uppercase bg-coral text-snow px-8 py-[15px] hover:bg-coral/90 transition-colors duration-200 shrink-0"
          >
            Schedule a Conversation
          </a>
        </div>
      </div>
    </section>
  );
}
