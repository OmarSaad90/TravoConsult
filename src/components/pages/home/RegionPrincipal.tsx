'use client';

import { useInView } from '../../../hooks/useInView';

export function RegionPrincipal() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="principal"
      ref={ref}
      className="relative bg-navy text-snow overflow-hidden py-[64px] md:py-[88px]"
      aria-labelledby="region-heading"
    >
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16" style={{ zIndex: 1 }}>

        <div className="grid lg:grid-cols-[1fr_300px] gap-14 lg:gap-20 items-start">

          <div>
            {/* Kicker */}
            <div style={fade(inView, 0)}>
              <span className="font-mono text-teal uppercase font-semibold" style={{ fontSize: '11.5px', letterSpacing: '0.14em' }}>
                Region &amp; Principal
              </span>
            </div>

            {/* Heading */}
            <div style={fade(inView, 40)} className="mt-4 max-w-[780px]">
              <h2
                id="region-heading"
                className="font-display font-extrabold leading-[0.97] tracking-display balance"
                style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
              >
                <span className="text-snow">Regionally focused. Personally accountable.</span>
              </h2>
            </div>

            <div style={fade(inView, 90)} className="mt-8 max-w-[68ch] space-y-5">
              <p className="font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '17px' }}>
                TRAVO operates within the relationships, regulatory environment,
                and capital project ecosystem of the NJ/NY metropolitan region:
                New Jersey primary, New York metropolitan secondary. The practice
                serves sureties, construction lenders, construction-litigation
                counsel, institutional owners, public agencies and
                municipalities, and mid-sized general contractors.
              </p>
              <p className="font-sans text-slate leading-[1.78] pretty" style={{ fontSize: '17px' }}>
                TRAVO is founded and led by{' '}
                <span className="text-snow font-semibold">Dr. Karim S. Karam</span>,
                who brings together three capabilities the regional
                construction-advisory market rarely combines: graduate-level risk
                methodology (Imperial College London; Master&rsquo;s and Ph.D. at
                MIT), operator credibility at scale as part of the founding
                family of Sarooj Construction Company in Oman, and an active
                academic platform as Teaching Associate Professor of Civil,
                Environmental and Ocean Engineering at Stevens Institute of
                Technology in New Jersey.
              </p>
            </div>

            <div style={fade(inView, 160)} className="mt-9 flex flex-wrap gap-3">
              <a
                href="/about"
                className="font-mono text-[11px] tracking-label uppercase text-teal border border-teal/50 px-7 py-[14px] hover:border-teal hover:bg-teal/[0.08] transition-all duration-200"
              >
                About TRAVO &amp; the Principal
              </a>
              <a
                href="/founders-letter"
                className="font-mono text-[11px] tracking-label uppercase text-teal border border-teal/50 px-7 py-[14px] hover:border-teal hover:bg-teal/[0.08] transition-all duration-200"
              >
                Founder&rsquo;s Letter
              </a>
            </div>
          </div>

          {/* Region mark + credential instrument */}
          <div style={fade(inView, 120)} className="hidden lg:block">
            <div
              className="font-display font-extrabold leading-[0.85] tracking-display text-teal select-none"
              style={{ fontSize: 'clamp(2.6rem, 4.5vw, 3.8rem)', opacity: 0.85 }}
            >
              NJ
              <br />
              NY
            </div>
            <div className="mt-2 font-mono uppercase font-semibold text-teal" style={{ fontSize: '9.5px', letterSpacing: '0.14em' }}>
              Metropolitan Region
            </div>

            <div className="mt-8 pt-8 border-t border-rule-d flex flex-col gap-5">
              {[
                { label: 'Imperial College London', sub: 'Graduate Formation' },
                { label: 'MIT', sub: 'Master’s & Ph.D.' },
                { label: 'Stevens Institute of Technology', sub: 'Teaching Associate Professor' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="font-mono uppercase font-semibold text-teal" style={{ fontSize: '9px', letterSpacing: '0.12em' }}>
                    {item.sub}
                  </div>
                  <div className="mt-1 font-display font-bold text-snow leading-tight" style={{ fontSize: '15px' }}>
                    {item.label}
                  </div>
                </div>
              ))}
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
    transform:  inView ? 'none' : 'translateY(24px)',
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}
