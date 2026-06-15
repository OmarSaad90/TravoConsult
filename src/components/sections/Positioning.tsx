import { useInView } from '../../hooks/useInView';

export function Positioning() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-canvas text-ink overflow-hidden py-[80px] md:py-[104px]"
      aria-labelledby="pos-heading"
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      <div
        className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16"
        style={{ zIndex: 1 }}
      >
        {/* Top rule */}
        <div
          className="w-full h-px bg-rule-l mb-12 origin-left"
          style={{
            transform: inView ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)',
          }}
          aria-hidden
        />

        <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-24">

          {/* Left — label + sidebar copy */}
          <aside style={fade(inView, 0)}>
            <span className="font-mono text-[10px] uppercase tracking-label text-forest">
              The Practice
            </span>
            <p className="mt-4 font-sans text-[13.5px] text-ink-3 leading-relaxed">
              A specialist firm,
              <br />deliberately bounded.
            </p>

            <div style={fade(inView, 140)} className="mt-8 flex flex-col gap-2">
              {[
                'Monte Carlo',
                'P10 / P50 / P80',
                'NJ/NY Regional',
                'Independent',
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9.5px] uppercase tracking-data text-ink-3 border border-rule-l px-3 py-[6px] w-fit"
                >
                  {tag}
                </span>
              ))}
            </div>
          </aside>

          {/* Right — heading, body, comparison visualization */}
          <div style={fade(inView, 80)}>
            <h2
              id="pos-heading"
              className="font-display font-extrabold leading-[0.97] tracking-display balance"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}
            >
              <span className="text-ink">A specialist practice, </span>
              <span className="text-forest">not</span>
              <span className="text-ink"> a generalist consultancy.</span>
            </h2>

            <div className="mt-9 space-y-5 max-w-[64ch]">
              <p className="font-sans text-ink-2 leading-[1.75] pretty" style={{ fontSize: '17px' }}>
                Travo works on a deliberately narrow problem: the risks that
                turn capital projects into cost overruns, schedule delays, and
                disputes. We identify those risks, quantify them with rigorous
                probabilistic methodology, and translate the analysis into
                decisions our clients can defend.
              </p>
              <p className="font-sans text-ink-2 leading-[1.75] pretty" style={{ fontSize: '17px' }}>
                Every engagement has quantitative risk analysis at its core.
                Work that falls outside that focus, we decline.
              </p>
            </div>

            {/* Methodology comparison — single estimate vs probability distribution */}
            <div
              className="mt-10 pt-8 border-t border-rule-l"
              style={fade(inView, 220)}
            >
              {/* SVG: pure graphics, no text inside — labels below */}
              <svg
                viewBox="0 0 360 68"
                aria-label="Comparison of single-point estimate vs probability distribution"
                className="w-full"
                style={{ maxWidth: '420px' }}
                fill="none"
              >
                {/* ── LEFT PANEL: single point estimate (x 10–148) ── */}
                <line x1="10" y1="58" x2="148" y2="58" stroke="#D5D9E8" strokeWidth="1" />
                <circle cx="79" cy="58" r="3.5" fill="#71D2CF" />
                <line x1="79" y1="58" x2="79" y2="22" stroke="#71D2CF" strokeWidth="1.5" />
                <circle cx="79" cy="22" r="2" fill="#71D2CF" opacity="0.35" />

                {/* ── CENTER DIVIDER ── */}
                <line x1="180" y1="12" x2="180" y2="58" stroke="#D5D9E8" strokeWidth="1" strokeDasharray="2,4" />

                {/* ── RIGHT PANEL: gaussian distribution (x 200–350) ── */}
                <path
                  d="M200,57.5 L215,55.6 L230,49.5 L237.5,44 L245,37.1 L252.5,29.3 L260,22.1 L267.5,16.9 L275,15 L282.5,16.9 L290,22.1 L297.5,29.3 L305,37.1 L312.5,44 L320,49.5 L335,55.6 L350,57.5 L350,58 L200,58 Z"
                  fill="#71D2CF"
                  opacity="0.06"
                />
                {/* P10–P80 confidence band shading */}
                <path
                  d="M244,39 L252.5,29.3 L260,22.1 L267.5,16.9 L275,15 L282.5,16.9 L290,22.1 L297.5,29.3 L305,37 L305,58 L244,58 Z"
                  fill="#71D2CF"
                  opacity="0.06"
                />
                <path
                  d="M200,57.5 L215,55.6 L230,49.5 L237.5,44 L245,37.1 L252.5,29.3 L260,22.1 L267.5,16.9 L275,15 L282.5,16.9 L290,22.1 L297.5,29.3 L305,37.1 L312.5,44 L320,49.5 L335,55.6 L350,57.5"
                  stroke="#71D2CF"
                  strokeWidth="1.5"
                />
                <line x1="200" y1="58" x2="350" y2="58" stroke="#D5D9E8" strokeWidth="1" />

                {/* P10 */}
                <line x1="244" y1="58" x2="244" y2="39" stroke="#3EA6A3" strokeWidth="0.75" strokeDasharray="2,3" opacity="0.8" />
                {/* P50 */}
                <line x1="275" y1="58" x2="275" y2="15" stroke="#71D2CF" strokeWidth="0.75" strokeDasharray="2,3" opacity="0.8" />
                {/* P80 */}
                <line x1="305" y1="58" x2="305" y2="37" stroke="#E88060" strokeWidth="0.75" strokeDasharray="2,3" opacity="0.8" />
              </svg>

              {/* Labels beneath SVG — 3 zones matching the SVG proportions */}
              <div className="flex" style={{ maxWidth: '420px' }}>
                {/* Left zone: 148/360 ≈ 41% */}
                <div style={{ flex: 148 }}>
                  <span className="font-mono text-[8px] uppercase tracking-data text-ink-3">
                    Single estimate
                  </span>
                  <span className="font-mono text-[7.5px] block text-ink-3/60 mt-[2px]">
                    Industry default
                  </span>
                </div>
                {/* Center gap: 52/360 ≈ 14% */}
                <div style={{ flex: 52 }} />
                {/* Right zone: 150/360 ≈ 42% */}
                <div style={{ flex: 150 }} className="flex justify-between">
                  <span className="font-mono text-[8px] uppercase" style={{ color: '#3EA6A3' }}>P10</span>
                  <span className="font-mono text-[8px] uppercase" style={{ color: '#71D2CF' }}>P50</span>
                  <span className="font-mono text-[8px] uppercase" style={{ color: '#E88060' }}>P80</span>
                </div>
              </div>
              <div className="flex" style={{ maxWidth: '420px' }}>
                <div style={{ flex: 148 }} />
                <div style={{ flex: 52 }} />
                <div style={{ flex: 150 }}>
                  <span className="font-mono text-[7.5px] text-forest/80 mt-[2px] block">
                    Travo methodology
                  </span>
                </div>
              </div>
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
