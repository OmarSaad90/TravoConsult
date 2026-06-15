import { useInView } from '../../hooks/useInView';

const SPECTRUM = [
  { label: 'Managed',  color: '#1C4A42' },
  { label: 'Baseline', color: '#3EA6A3' },
  { label: 'Monitor',  color: '#8A95B2' },
  { label: 'Elevated', color: '#E88060' },
  { label: 'Critical', color: '#FF5B5E' },
] as const;

export function VisionStatement() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section
      id="vision"
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden py-[96px] md:py-[120px]"
      aria-labelledby="vision-stmt"
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-[1fr_200px] gap-12 md:gap-16 items-center">

          {/* Vision statement — left */}
          <div
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.85s cubic-bezier(0.2,0.7,0.2,1), transform 0.85s cubic-bezier(0.2,0.7,0.2,1)',
            }}
          >
            <div className="border-t-2 pt-10" style={{ borderColor: '#1C4A42' }}>
              <p
                id="vision-stmt"
                className="font-display font-extrabold leading-[1.0] tracking-display balance"
                style={{ fontSize: 'clamp(2rem, 4.2vw, 3.8rem)' }}
              >
                <span className="text-ink">To establish quantitative risk analysis as
                {' '}the standard discipline behind how capital
                {' '}projects are </span>
                <span className="text-forest">planned, priced,</span>
                <span className="text-ink"> and </span>
                <span className="text-forest">delivered</span>
                <span className="text-ink"> across the New Jersey and New York metropolitan market.</span>
              </p>
            </div>
          </div>

          {/* Risk spectrum bars — right (desktop only) */}
          <div
            className="hidden md:flex flex-col gap-[3px]"
            aria-hidden
          >
            {SPECTRUM.map((seg, i) => (
              <div
                key={seg.label}
                className="flex items-center px-3 origin-left"
                style={{
                  height: '52px',
                  backgroundColor: seg.color,
                  transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                  transition: `transform 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                }}
              >
                <span
                  className="font-mono uppercase leading-none"
                  style={{ fontSize: '8px', letterSpacing: '0.12em', color: '#fff', opacity: 0.85 }}
                >
                  {seg.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
