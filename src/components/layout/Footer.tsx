'use client';

import { useInView } from '../../hooks/useInView';

const NAV_COLS = [
  {
    title: 'Practice',
    links: [
      { label: 'Services',          href: '/services' },
      { label: 'Methodology',       href: '/methodology' },
      { label: 'Engagements',       href: '/engagements' },
      { label: 'Discuss a Project', href: '/contact' },
    ],
  },
  {
    title: 'Research',
    links: [
      { label: 'Insights',         href: '/insights' },
      { label: 'NJ/NY Risk Index', href: '/risk-index' },
      { label: 'About',            href: '/about' },
      { label: "Founder's Letter", href: '/founders-letter' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.08 });

  return (
    <footer ref={ref} className="bg-navy text-snow relative overflow-hidden pt-16 pb-10">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 pb-12 border-b border-rule-d">

          {/* Brand column */}
          <div
            className="col-span-2 md:col-span-1"
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? 'none' : 'translateY(26px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <a
              href="/"
              aria-label="Travo — home"
              className="font-display text-[20px] font-bold tracking-[0.06em] text-snow hover:text-teal transition-colors duration-200"
            >
              TRAVO<span className="text-teal">.</span>
            </a>
            <p className="mt-4 font-mono uppercase text-teal" style={{ fontSize: '9px', letterSpacing: '0.14em' }}>
              Total Risk Analysis and Value Optimization
            </p>
            <p className="mt-3 text-[13.5px] text-slate max-w-[36ch] leading-[1.7] font-sans">
              Quantified Risk. Disciplined Decisions. New Jersey primary,
              New York metropolitan secondary.
            </p>
            <p className="mt-4 text-[13.5px] text-snow max-w-[38ch] leading-[1.6] font-sans italic">
              Independent by design, of contractors, owners, and technology
              vendors. The principal personally signs every report.
            </p>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(({ title, links }, ci) => (
            <div
              key={title}
              style={{
                opacity:    inView ? 1 : 0,
                transform:  inView ? 'none' : 'translateY(26px)',
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${80 + ci * 70}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${80 + ci * 70}ms`,
              }}
            >
              <h3 className="font-mono text-[9.5px] uppercase tracking-label text-teal mb-5">
                {title}
              </h3>
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block font-sans text-[14px] text-slate hover:text-snow py-[5px] transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          ))}

          {/* Contact */}
          <div
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? 'none' : 'translateY(26px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 220ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 220ms',
            }}
          >
            <h3 className="font-mono text-[9.5px] uppercase tracking-label text-teal mb-5">
              Contact
            </h3>
            <p className="font-sans text-[14px] text-slate leading-[1.9]">
              <span className="block">Email: [to be confirmed]</span>
              <span className="block">Phone: [to be confirmed]</span>
              <span className="block">New Jersey · New York metropolitan region</span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap justify-between items-center gap-4 pt-7 font-mono text-[9.5px] tracking-data uppercase text-haze"
          style={{
            opacity:    inView ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 320ms',
          }}
        >
          <span>© {year} TRAVO. All rights reserved.</span>
          <span className="flex gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-snow transition-colors duration-200">Privacy [placeholder]</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-snow transition-colors duration-200">Terms [placeholder]</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
