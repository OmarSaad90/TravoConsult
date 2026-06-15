import { useInView } from '../../hooks/useInView';

const SCOPE = [
  { label: 'Publication', value: 'Annual, with quarterly updates' },
  { label: 'Segmentation', value: 'Project type · Asset class · Method' },
  { label: 'Geographic scope', value: 'New Jersey · New York Metro' },
  { label: 'Use case', value: 'Owner benchmarking · Contractor calibration' },
] as const;

export function IndexTeaser() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id="research"
      ref={ref}
      className="relative bg-navy text-snow overflow-hidden py-[112px] md:py-[140px]"
      aria-labelledby="index-heading"
    >
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Publication masthead — full width */}
        <div
          style={fade(inView, 0)}
          className="flex items-center justify-between border-t border-b border-rule-d py-3 mb-14"
        >
          <span className="font-mono uppercase text-haze" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
            Flagship Research
          </span>
          <span className="font-mono uppercase text-haze" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
            Vol. 01 · Annual Benchmark · NJ / NY Metro
          </span>
        </div>

        {/* Main layout: volume number left, content right */}
        <div className="grid md:grid-cols-[260px_1fr] gap-12 md:gap-20 items-start">

          {/* Volume number column */}
          <div style={fade(inView, 80)}>
            <div
              className="font-display font-extrabold leading-none tracking-display text-teal"
              style={{ fontSize: 'clamp(6rem, 13vw, 10rem)' }}
              aria-hidden
            >
              01
            </div>
            <div
              className="mt-4 font-mono uppercase text-haze leading-relaxed"
              style={{ fontSize: '9px', letterSpacing: '0.14em' }}
            >
              NJ / NY<br />Construction<br />Risk Index
            </div>

            {/* Mini distribution output chart */}
            <div className="mt-8 pt-6 border-t border-rule-d">
              <p className="font-mono uppercase text-haze mb-4" style={{ fontSize: '7.5px', letterSpacing: '0.12em' }}>
                Sample output · cost distribution
              </p>
              <svg
                viewBox="0 0 220 68"
                aria-label="Sample probability distribution output"
                className="w-full"
                style={{ maxWidth: '220px', opacity: 0.85 }}
                fill="none"
              >
                {/* Full fill under curve */}
                <path
                  d="M5,63 L18,61.5 L30,58 L42,52 L53,43 L62,32 L70,21 L77,13 L85,8 L93,6 L100,8 L108,13 L116,21 L124,32 L133,43 L142,52 L154,58 L166,61.5 L178,63 L178,64 L5,64 Z"
                  fill="#71D2CF"
                  opacity="0.07"
                />
                {/* P10–P80 confidence band */}
                <path
                  d="M55,41 L62,32 L70,21 L77,13 L85,8 L93,6 L100,8 L108,13 L116,21 L124,32 L130,40 L130,64 L55,64 Z"
                  fill="#71D2CF"
                  opacity="0.07"
                />
                {/* Gaussian curve */}
                <path
                  d="M5,63 L18,61.5 L30,58 L42,52 L53,43 L62,32 L70,21 L77,13 L85,8 L93,6 L100,8 L108,13 L116,21 L124,32 L133,43 L142,52 L154,58 L166,61.5 L178,63"
                  stroke="#71D2CF"
                  strokeWidth="1.5"
                />
                {/* Baseline */}
                <line x1="5" y1="64" x2="178" y2="64" stroke="#162030" strokeWidth="1" />

                {/* P10 */}
                <line x1="55" y1="64" x2="55" y2="41" stroke="#3EA6A3" strokeWidth="0.75" strokeDasharray="2,3" opacity="0.7" />
                <text x="55" y="64" dominantBaseline="hanging" dy="3" textAnchor="middle" fill="#3EA6A3" fontSize="7" fontFamily="JetBrains Mono, monospace">P10</text>

                {/* P50 */}
                <line x1="93" y1="64" x2="93" y2="6" stroke="#71D2CF" strokeWidth="0.75" strokeDasharray="2,3" opacity="0.7" />
                <text x="93" y="64" dominantBaseline="hanging" dy="3" textAnchor="middle" fill="#71D2CF" fontSize="7" fontFamily="JetBrains Mono, monospace">P50</text>

                {/* P80 */}
                <line x1="130" y1="64" x2="130" y2="40" stroke="#E88060" strokeWidth="0.75" strokeDasharray="2,3" opacity="0.7" />
                <text x="130" y="64" dominantBaseline="hanging" dy="3" textAnchor="middle" fill="#E88060" fontSize="7" fontFamily="JetBrains Mono, monospace">P80</text>
              </svg>
            </div>
          </div>

          {/* Content */}
          <div>
            <div style={fade(inView, 120)}>
              <h2
                id="index-heading"
                className="font-display font-extrabold leading-[0.97] tracking-display balance"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}
              >
                <span className="text-snow">Regional construction risk,</span>
                <br />
                <span className="text-teal">quantified annually.</span>
              </h2>

              <p className="mt-7 font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '17px', maxWidth: '56ch' }}>
                An annual benchmark on regional construction outcomes, segmented by
                project type and asset class. The Index gives owners and contractors
                an empirical reference calibrated to the market they actually build
                in, rather than national averages.
              </p>
              <p className="mt-5 font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '17px', maxWidth: '56ch' }}>
                Travo's ambition: to make this the most-cited regional benchmark for
                construction risk in the New Jersey and New York market.
              </p>
            </div>

            {/* Scope metadata — 2-column grid */}
            <div
              style={fade(inView, 200)}
              className="mt-10 pt-8 border-t border-rule-d grid sm:grid-cols-2 gap-x-10 gap-y-6"
            >
              {SCOPE.map(({ label, value }, i) => (
                <div key={label} style={fade(inView, 220 + i * 40)}>
                  <p className="font-mono uppercase text-haze" style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
                    {label}
                  </p>
                  <p className="font-sans text-snow mt-[5px] leading-snug" style={{ fontSize: '14.5px' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div style={fade(inView, 360)} className="mt-9">
              <a
                href="/contact"
                className="font-mono uppercase text-teal border border-teal/60 px-6 py-[13px] hover:bg-teal hover:text-navy transition-all duration-200 inline-block"
                style={{ fontSize: '11px', letterSpacing: '0.16em' }}
              >
                Register Interest in the Index
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function fade(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(20px)',
    transition: `opacity 0.75s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms, transform 0.75s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
  };
}
