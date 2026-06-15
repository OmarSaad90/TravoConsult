import { useInView } from '../../hooks/useInView';

const DIFFERENTIATORS = [
  {
    id: '01',
    title: 'Academic Rigor',
    desc: 'Methodology grounded in peer-reviewed research and recognized quantitative standards, not the visually impressive but analytically empty deliverables the risk industry too often produces.',
    visual: 'curve' as const,
  },
  {
    id: '02',
    title: 'Senior Operator Experience',
    desc: 'Analysis informed by hands-on delivery of heavy civil construction at scale. We have lived the decisions we model, which keeps the work practical rather than theoretical.',
    visual: 'timeline' as const,
  },
  {
    id: '03',
    title: 'Regional Depth',
    desc: 'A working knowledge of the relationships, regulatory environment, and capital project ecosystem specific to the New Jersey and New York metropolitan region.',
    visual: 'coords' as const,
  },
] as const;

export function WhyTravo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.06 });

  return (
    <section
      id="about-detail"
      ref={ref}
      className="relative text-snow overflow-hidden py-[104px] md:py-[132px]"
      style={{ backgroundColor: '#0B2726' }}
      aria-labelledby="why-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(113,210,207,0.025) 0 1px, transparent 1px 96px)' }}
        aria-hidden
      />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div style={fade(inView, 0)} className="mb-14">
          <h2
            id="why-heading"
            className="font-display font-extrabold leading-[0.97] tracking-display"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
          >
            <span className="text-snow">Three things the broader market</span>
            <br />
            <span className="text-teal">rarely combines.</span>
          </h2>
        </div>

        {/* Three differentiators — horizontal on desktop, stacked on mobile */}
        <div
          className="grid md:grid-cols-3 border-t border-rule-d"
          role="list"
          aria-label="Differentiators"
        >
          {DIFFERENTIATORS.map((d, i) => (
            <article
              key={d.title}
              role="listitem"
              style={fade(inView, 80 + i * 100)}
              className={[
                'pt-10 pb-12',
                i < 2  ? 'md:pr-12 md:border-r md:border-rule-d' : '',
                i > 0  ? 'md:pl-12' : '',
                i > 0  ? 'border-t border-rule-d md:border-t-0' : '',
              ].join(' ')}
            >
              {/* Sequence indicator */}
              <div className="font-mono text-teal uppercase mb-5" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
                {d.id} / 03
              </div>

              {/* Title */}
              <h3
                className="font-display font-bold text-snow leading-[0.97] tracking-display"
                style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)' }}
              >
                {d.title}
              </h3>

              {/* Teal accent rule */}
              <div className="mt-4 h-px w-10" style={{ backgroundColor: '#71D2CF', opacity: 0.35 }} />

              {/* Description */}
              <p
                className="mt-5 font-sans text-snow leading-[1.72] pretty"
                style={{ fontSize: '15.5px', opacity: 0.75 }}
              >
                {d.desc}
              </p>

              {/* Bottom visual element */}
              <div className="mt-8 pt-5 border-t border-rule-d">
                {d.visual === 'curve' && (
                  /* Mini gaussian — represents quantitative distribution methodology */
                  <svg viewBox="0 0 100 44" aria-hidden style={{ width: '90px', height: '40px', opacity: 0.55 }} fill="none">
                    <path
                      d="M4,40 L12,39.5 L20,38 L28,34.5 L34,28 L40,19 L46,11 L50,8 L54,11 L60,19 L66,28 L72,34.5 L80,38 L88,39.5 L96,40"
                      stroke="#71D2CF"
                      strokeWidth="1.5"
                    />
                    <line x1="4" y1="40" x2="96" y2="40" stroke="#162030" strokeWidth="0.5" />
                    <line x1="35" y1="40" x2="35" y2="24" stroke="#3EA6A3" strokeWidth="0.5" strokeDasharray="1.5,2.5" opacity="0.6" />
                    <line x1="50" y1="40" x2="50" y2="8" stroke="#71D2CF" strokeWidth="0.5" strokeDasharray="1.5,2.5" opacity="0.7" />
                    <line x1="65" y1="40" x2="65" y2="24" stroke="#E88060" strokeWidth="0.5" strokeDasharray="1.5,2.5" opacity="0.6" />
                    <text x="35" y="42.5" textAnchor="middle" fill="#3EA6A3" fontSize="5.5" fontFamily="JetBrains Mono, monospace" dominantBaseline="hanging">P10</text>
                    <text x="65" y="42.5" textAnchor="middle" fill="#E88060" fontSize="5.5" fontFamily="JetBrains Mono, monospace" dominantBaseline="hanging">P80</text>
                  </svg>
                )}

                {d.visual === 'timeline' && (
                  /* Project lifecycle timeline — represents hands-on delivery */
                  <svg viewBox="0 0 130 36" aria-hidden style={{ width: '120px', height: '32px', opacity: 0.55 }} fill="none">
                    <line x1="10" y1="16" x2="120" y2="16" stroke="#162030" strokeWidth="1" />
                    <circle cx="10" cy="16" r="3.5" fill="#71D2CF" />
                    <circle cx="65" cy="16" r="3.5" fill="#71D2CF" />
                    <circle cx="120" cy="16" r="3.5" fill="#E88060" />
                    <line x1="10" y1="16" x2="65" y2="16" stroke="#71D2CF" strokeWidth="1" opacity="0.5" />
                    <line x1="65" y1="16" x2="120" y2="16" stroke="#E88060" strokeWidth="1" opacity="0.4" />
                    <text x="10" y="28" textAnchor="middle" fill="#4D5878" fontSize="5.5" fontFamily="JetBrains Mono, monospace">PRE</text>
                    <text x="65" y="28" textAnchor="middle" fill="#4D5878" fontSize="5.5" fontFamily="JetBrains Mono, monospace">EXEC</text>
                    <text x="120" y="28" textAnchor="middle" fill="#4D5878" fontSize="5.5" fontFamily="JetBrains Mono, monospace">POST</text>
                  </svg>
                )}

                {d.visual === 'coords' && (
                  /* Geographic coordinates — NJ/NY metro anchor */
                  <div
                    aria-hidden
                    className="font-mono leading-[1.7]"
                    style={{ fontSize: '10px', letterSpacing: '0.06em', color: '#71D2CF', opacity: 0.5 }}
                  >
                    40°44′ N · 74°00′ W
                    <br />
                    <span style={{ color: '#71D2CF', opacity: 1 }}>NJ / NY Metro Region</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

function fade(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(20px)',
    transition: `opacity 0.72s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms, transform 0.72s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
  };
}
