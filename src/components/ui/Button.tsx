import { type ReactNode, type MouseEvent } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'secondary-dark' | 'ghost-light';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  type?: 'button' | 'submit';
}

const base =
  'inline-block font-mono text-[11px] font-medium tracking-label uppercase px-6 py-[13px] cursor-pointer transition-all duration-[180ms] ease-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap';

const variants: Record<Variant, string> = {
  // Teal fill — primary CTA on dark sections
  primary:
    'bg-teal text-navy border border-teal hover:bg-teal-deep hover:border-teal-deep focus-visible:outline-teal',

  // Teal outline — secondary on dark sections
  secondary:
    'bg-transparent text-teal border border-teal hover:bg-teal/10 focus-visible:outline-teal',

  // Forest fill — primary CTA on light sections
  'secondary-dark':
    'bg-forest text-canvas border border-forest hover:bg-forest-2 hover:border-forest-2 focus-visible:outline-forest',

  // Forest outline — secondary on light sections
  'ghost-light':
    'bg-transparent text-forest border border-forest hover:bg-forest/8 focus-visible:outline-forest',
};

export function Button({
  children,
  variant = 'primary',
  href,
  className,
  onClick,
  type = 'button',
}: ButtonProps) {
  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
