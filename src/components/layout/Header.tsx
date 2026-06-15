import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Research', href: '#research' },
  { label: 'Values',   href: '#values' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 transition-all duration-300 ${
        scrolled
          ? 'bg-navy/95 backdrop-blur-md border-b border-rule-d'
          : 'bg-transparent border-b border-rule-d/60'
      }`}
    >
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-[68px]">

          {/* Wordmark */}
          <a
            href="#"
            aria-label="Travo — home"
            className="font-display text-[22px] font-bold tracking-[0.06em] text-snow hover:text-teal transition-colors duration-200"
          >
            TRAVO
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-mono text-[10.5px] tracking-label uppercase text-haze hover:text-slate transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/contact"
              className="font-mono text-[10.5px] tracking-label uppercase text-teal border border-teal px-5 py-[10px] hover:bg-teal hover:text-navy transition-all duration-200"
            >
              Start a Conversation
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-slate hover:text-snow transition-colors cursor-pointer"
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
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out bg-navy border-t border-rule-d ${
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-2 pb-6">
          {[...NAV_LINKS, { label: 'Contact', href: '/contact' }].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="font-mono text-[11.5px] tracking-data uppercase text-slate py-[15px] border-b border-rule-d last:border-0 hover:text-snow transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
