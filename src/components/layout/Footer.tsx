'use client';

import { useInView } from '../../hooks/useInView';

const NAV_COLS = [
  {
    title: 'Practice',
    links: [
      { label: 'Services',    href: '/services' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Insights',    href: '/insights' },
    ],
  },
  {
    title: 'Firm',
    links: [
      { label: 'Risk Index',  href: '/risk-index' },
      { label: 'Engagements', href: '/engagements' },
      { label: 'About',       href: '/about' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.08 });

  return (
    <footer ref={ref} className="bg-navy text-snow relative overflow-hidden pt-[72px] pb-10">
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
              TRAVO
            </a>
            <p className="mt-4 text-[14.5px] text-slate max-w-[34ch] leading-[1.7] font-sans">
              Quantitative construction risk advisory for the capital projects
              that cannot afford to be wrong.
            </p>
            <div className="mt-5 pt-5 border-t border-rule-d">
              <p className="font-mono text-[9px] uppercase tracking-label text-haze">
                New Jersey · New York Metropolitan Region
              </p>
            </div>
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
              <h4 className="font-mono text-[9.5px] uppercase tracking-label text-teal mb-5">
                {title}
              </h4>
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
            <h4 className="font-mono text-[9.5px] uppercase tracking-label text-teal mb-5">
              Contact
            </h4>
            <a
              href="mailto:contact@travo.com"
              className="block font-sans text-[14px] text-slate hover:text-snow transition-colors duration-200"
            >
              contact@travo.com
            </a>
            <div className="mt-5">
              <a
                href="/contact"
                className="font-mono text-[10px] uppercase tracking-label text-teal border border-teal/50 px-4 py-[9px] hover:bg-teal hover:text-navy hover:border-teal transition-all duration-200 inline-block"
              >
                Start a Conversation
              </a>
            </div>
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
          <span>Travo · Total Risk Analysis and Value Optimization</span>
          <span>© {year} · Independent by design</span>
        </div>
      </div>
    </footer>
  );
}
