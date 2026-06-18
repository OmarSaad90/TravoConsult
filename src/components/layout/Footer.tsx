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

        {/* CTA zone */}
        <div className="pb-16 border-b border-rule-d">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <h2
              className="font-display font-extrabold leading-[0.97] tracking-display balance"
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                opacity:    inView ? 1 : 0,
                transform:  inView ? 'none' : 'translateY(26px)',
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <span className="text-snow">Have a decision too consequential</span>
              <br />
              <span className="text-coral">to leave to intuition?</span>
            </h2>
            <a
              href="/contact"
              className="font-mono text-[11px] tracking-label uppercase bg-coral text-snow px-8 py-[15px] hover:bg-coral/90 transition-colors duration-200 shrink-0"
              style={{
                opacity:    inView ? 1 : 0,
                transform:  inView ? 'none' : 'translateY(26px)',
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 120ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 120ms',
              }}
            >
              Schedule a Conversation
            </a>
          </div>
        </div>

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 pt-12 pb-12 border-b border-rule-d">

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
          <span className="hidden md:inline">New Jersey · New York Metropolitan Region</span>
          <span>© {year} · Independent by design</span>
        </div>
      </div>
    </footer>
  );
}
