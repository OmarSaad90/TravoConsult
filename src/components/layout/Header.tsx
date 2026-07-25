'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ChromaKeyVideo } from './ChromaKeyVideo';

const NAV_LINKS = [
  { label: 'Services',     href: '/services' },
  { label: 'Methodology',  href: '/methodology' },
  { label: 'Research',     href: '/research' },
  { label: 'Insights',     href: '/insights' },
  { label: 'Risk Index',   href: '/risk-index' },
  { label: 'About',        href: '/about' },
  { label: 'Engagements',  href: '/engagements' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrolledClass = scrolled
    ? 'bg-canvas/95 backdrop-blur-md border-b border-rule-l'
    : 'bg-transparent border-b border-rule-l/60';

  return (
    <div className="header-enter">
      {/* Topbar — scrolls away, sits above the sticky nav */}
      <div className="hidden md:block bg-canvas border-b border-rule-l/60">
        <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between h-8">
          <span className="font-mono uppercase text-ink-2" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>
            <strong className="text-ink font-semibold">TRAVO</strong> · Total Risk Analysis and Value Optimization
          </span>
          <span className="font-mono uppercase text-ink-2" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>
            Specialty Quantitative Risk Advisory
          </span>
          <span className="font-mono uppercase text-ink-2" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>
            New Jersey · New York Metropolitan Region
          </span>
        </div>
      </div>

      <header className={'sticky top-0 z-20 transition-all duration-300 ' + scrolledClass}>
        <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo lockup */}
            <a
              href="/"
              aria-label="Travo — home"
              className="flex items-center gap-2.5 group"
            >
              <ChromaKeyVideo src="/logovid.mp4" className="h-8 w-auto" />
              <span className="font-display text-[20px] font-bold tracking-[0.10em] text-ink group-hover:text-forest transition-colors duration-200">
                TRAVO
              </span>
            </a>

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-mono text-[10.5px] tracking-label uppercase font-semibold text-ink hover:text-forest transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="/contact"
                className="font-mono text-[10.5px] tracking-label uppercase bg-forest text-canvas px-5 py-[10px] hover:bg-forest-2 transition-colors duration-200"
              >
                Discuss a Project
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-3 -mr-3 text-ink-2 hover:text-ink transition-colors cursor-pointer"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          id="mobile-nav"
          className={'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out bg-canvas border-t border-rule-l ' + (open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0')}
        >
          <nav className="flex flex-col px-6 py-2 pb-6">
            {[...NAV_LINKS, { label: 'Discuss a Project', href: '/contact' }].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="font-mono text-[11.5px] tracking-data uppercase text-ink-2 py-[15px] border-b border-rule-l last:border-0 hover:text-ink transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}
