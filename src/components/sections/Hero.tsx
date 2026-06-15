import { useEffect, useMemo, useRef, useState } from 'react';

const RISK_SEGMENTS = [
  { label: 'Managed',  color: '#1C4A42' },
  { label: 'Baseline', color: '#3EA6A3' },
  { label: 'Monitor',  color: '#8A95B2' },
  { label: 'Elevated', color: '#E88060' },
  { label: 'Critical', color: '#FF5B5E' },
] as const;

const SIGMA_MARKS = [-2, -1, 0, 1, 2] as const;
const VW = 900, VH = 300;

// t-value [0..1] along the curve for each sigma marker
const SIGMA_TS = SIGMA_MARKS.map(s => (s + 4) / 8); // [0.25, 0.375, 0.5, 0.625, 0.75]

function buildCurvePath(w: number, h: number, n = 140): string {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t    = i / n;
    const xn   = t * 8 - 4;
    const yRaw = Math.exp(-xn * xn / 2);
    pts.push(`${i === 0 ? 'M' : 'L'}${(t * w).toFixed(1)},${(h - yRaw * h * 0.84).toFixed(1)}`);
  }
  return pts.join(' ');
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function Hero() {
  const [mounted, setMounted] = useState(false);

  const dotGroupRef    = useRef<SVGGElement>(null);
  const dotHaloRef     = useRef<SVGCircleElement>(null);
  const dotMidRef      = useRef<SVGCircleElement>(null);
  const dotCoreRef     = useRef<SVGCircleElement>(null);
  const dotLineRef     = useRef<SVGLineElement>(null);
  const trailSoftRef   = useRef<SVGPathElement>(null);
  const trailBrightRef = useRef<SVGPathElement>(null);
  const sigmaRefs      = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Probe animation — trail + sigma pulses share one rAF loop
  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const CYCLE      = 9000;   // ms per full loop
    const TRAVERSE   = 0.78;   // 78% traversing, 22% paused at right tail
    const FADE_BAND  = 0.035;  // fade in/out fraction at the loop seam
    const SIGMA_DIM  = 0.20;   // resting opacity for sigma markers
    const SIGMA_PEAK = 1.0;    // opacity when probe crosses a marker
    const SIGMA_DECAY = 0.012; // decay per frame (~1s back to dim at 60fps)

    const sigmaActivated = new Array(SIGMA_MARKS.length).fill(false);
    const sigmaOpacities = new Array(SIGMA_MARKS.length).fill(SIGMA_DIM) as number[];

    let start: number | null = null;
    let prevRawT = 0;
    let rafId = 0;

    const timer = window.setTimeout(() => {
      if (dotGroupRef.current) dotGroupRef.current.style.display = '';

      function tick(now: number) {
        if (start === null) start = now;
        const rawT = ((now - start) % CYCLE) / CYCLE;

        // Detect loop restart and reset sigma activation
        if (rawT < 0.05 && prevRawT > 0.85) {
          sigmaActivated.fill(false);
        }
        prevRawT = rawT;

        // Probe position (0→1 along curve)
        const posT = rawT <= TRAVERSE
          ? easeInOutCubic(rawT / TRAVERSE)
          : 1;

        // Fade envelope at seam
        let opacity = 1;
        if (rawT < FADE_BAND)          opacity = rawT / FADE_BAND;
        else if (rawT > 1 - FADE_BAND) opacity = (1 - rawT) / FADE_BAND;

        // SVG coordinates for current probe position
        const xn   = posT * 8 - 4;
        const yRaw = Math.exp(-xn * xn / 2);
        const cx   = posT * VW;
        const cy   = VH - yRaw * VH * 0.84;

        // Update probe dot
        dotGroupRef.current?.setAttribute('opacity', opacity.toFixed(3));
        for (const r of [dotCoreRef, dotMidRef, dotHaloRef]) {
          r.current?.setAttribute('cx', cx.toFixed(2));
          r.current?.setAttribute('cy', cy.toFixed(2));
        }
        if (dotLineRef.current) {
          dotLineRef.current.setAttribute('x1', cx.toFixed(2));
          dotLineRef.current.setAttribute('y1', (cy + 4).toFixed(2));
          dotLineRef.current.setAttribute('x2', cx.toFixed(2));
          dotLineRef.current.setAttribute('y2', String(VH));
        }

        // Update trail — show traversed portion of curve
        const dash = `${posT.toFixed(4)} 2`;
        trailSoftRef.current?.setAttribute('stroke-dasharray', dash);
        trailBrightRef.current?.setAttribute('stroke-dasharray', dash);

        // Sigma marker pulses — flash on crossing, decay back to dim
        for (let i = 0; i < SIGMA_TS.length; i++) {
          if (!sigmaActivated[i] && posT >= SIGMA_TS[i]) {
            sigmaActivated[i] = true;
            sigmaOpacities[i] = SIGMA_PEAK;
          }
          if (sigmaOpacities[i] > SIGMA_DIM) {
            sigmaOpacities[i] = Math.max(SIGMA_DIM, sigmaOpacities[i] - SIGMA_DECAY);
          }
          sigmaRefs.current[i]?.setAttribute('opacity', sigmaOpacities[i].toFixed(3));
        }

        rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);
    }, 800);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  const curvePath = useMemo(() => buildCurvePath(VW, VH), []);
  const fillPath  = useMemo(() => `${curvePath} L${VW},${VH} L0,${VH} Z`, [curvePath]);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? 'none' : 'translateY(24px)',
    transition: `opacity 0.9s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms, transform 0.9s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
  });

  return (
    <section
      id="home"
      className="relative bg-navy overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Introduction"
    >
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="absolute pointer-events-none"
        style={{
          right: 0,
          top: '12%',
          width: '54%',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.5s ease 700ms',
          zIndex: 1,
          overflow: 'visible',
        }}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="gaussFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#71D2CF" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#71D2CF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={fillPath} fill="url(#gaussFill)" />

        {/* σ markers — dim at rest, flash bright when probe crosses */}
        {SIGMA_MARKS.map((s, idx) => {
          const t  = (s + 4) / 8;
          const x  = t * VW;
          const yr = Math.exp(-s * s / 2);
          const y  = VH - yr * VH * 0.84;
          return (
            <g
              key={s}
              ref={(el: SVGGElement | null) => { sigmaRefs.current[idx] = el; }}
              opacity={0.20}
            >
              <line
                x1={x} y1={y} x2={x} y2={VH}
                stroke="#71D2CF" strokeWidth="0.5" strokeDasharray="3,5"
              />
              <text
                x={x + 4} y={VH - 5}
                fill="#71D2CF" fontSize="8"
                fontFamily="'JetBrains Mono',monospace"
                letterSpacing="0.04em"
              >
                {s === 0 ? 'μ' : `${s > 0 ? '+' : ''}${s}σ`}
              </text>
            </g>
          );
        })}

        {/* Base curve — draws itself left to right on load */}
        <path
          d={curvePath}
          stroke="#71D2CF"
          strokeWidth="1.8"
          fill="none"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: mounted ? 0 : 1,
            transition: 'stroke-dashoffset 3.2s cubic-bezier(0.16,1,0.3,1) 400ms',
          }}
        />

        {/* Trail — two layers over the traversed portion: wide soft glow + tight bright line */}
        <path
          ref={trailSoftRef}
          d={curvePath}
          stroke="#71D2CF"
          strokeWidth="7"
          fill="none"
          pathLength="1"
          strokeDasharray="0 2"
          strokeDashoffset="0"
          opacity="0.10"
        />
        <path
          ref={trailBrightRef}
          d={curvePath}
          stroke="#71D2CF"
          strokeWidth="2.5"
          fill="none"
          pathLength="1"
          strokeDasharray="0 2"
          strokeDashoffset="0"
          opacity="0.55"
        />

        {/* Probe dot — traverses the curve after it finishes drawing */}
        <g ref={dotGroupRef} style={{ display: 'none' }}>
          <circle ref={dotHaloRef}  cx="0" cy="0" r="16"  fill="#71D2CF" opacity="0.05" />
          <circle ref={dotMidRef}   cx="0" cy="0" r="6"   fill="#71D2CF" opacity="0.20" />
          <circle ref={dotCoreRef}  cx="0" cy="0" r="2.5" fill="#E6EAF4" opacity="0.92" />
          <line
            ref={dotLineRef}
            x1="0" y1="0" x2="0" y2={VH}
            stroke="#71D2CF"
            strokeWidth="0.5"
            strokeDasharray="2,5"
            opacity="0.22"
          />
        </g>
      </svg>

      {/* Main content */}
      <div className="relative flex flex-col" style={{ minHeight: '100svh', zIndex: 2 }}>

        <div className="flex-1 max-w-site mx-auto w-full px-6 md:px-12 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-20">

          <div style={reveal(80)}>
            <span className="font-mono text-[10px] font-medium tracking-label uppercase text-teal">
              Quantitative Construction Risk Advisory
              <span className="mx-[10px]" style={{ opacity: 0.35 }}>·</span>
              New Jersey &amp; New York Metro
            </span>
          </div>

          <div style={reveal(200)} className="mt-9">
            <h1
              className="font-display font-extrabold tracking-display"
              style={{ fontSize: 'clamp(3rem, 7.2vw, 5.6rem)', lineHeight: 0.95, maxWidth: '14ch' }}
            >
              <span className="block text-snow">Most construction</span>
              <span className="block text-snow">failures are</span>
              <span className="block text-teal">quantifiable</span>
              <span className="block text-snow">in advance.</span>
            </h1>
          </div>

          <div style={reveal(360)} className="mt-9">
            <p
              className="font-sans text-slate leading-[1.78] pretty"
              style={{ fontSize: '17px', maxWidth: '50ch' }}
            >
              A specialty advisory practice that replaces intuition-driven
              contingency with Monte Carlo probabilistic analysis, serving owners,
              agencies, and contractors delivering capital projects across the region.
            </p>
          </div>

          <div style={reveal(480)} className="mt-10 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="font-mono text-[11px] tracking-label uppercase bg-teal text-navy px-7 py-[14px] hover:bg-teal-deep transition-colors duration-200"
            >
              Start a Conversation
            </a>
            <a
              href="#services"
              className="font-mono text-[11px] tracking-label uppercase text-teal border border-teal/50 px-7 py-[14px] hover:border-teal hover:bg-teal/[0.08] transition-all duration-200"
            >
              View Service Catalog
            </a>
          </div>
        </div>

        {/* Full-bleed risk spectrum at section bottom */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.6s ease 1000ms',
          }}
        >
          <div className="flex gap-[2px] mb-[5px] px-1">
            {RISK_SEGMENTS.map((seg) => (
              <div key={seg.label} className="flex-1 pl-2">
                <span className="font-mono text-[8px] uppercase tracking-data text-haze">
                  {seg.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-[2px]">
            {RISK_SEGMENTS.map((seg, i) => (
              <div
                key={seg.label}
                className="flex-1 origin-left"
                style={{
                  height: '48px',
                  backgroundColor: seg.color,
                  transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
                  transition: `transform 1.4s cubic-bezier(0.16,1,0.3,1) ${900 + i * 90}ms`,
                }}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
