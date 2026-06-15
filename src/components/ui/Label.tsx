import { type ReactNode } from 'react';
import clsx from 'clsx';

interface LabelProps {
  children: ReactNode;
  /** 'dark' = teal on navy bg, 'light' = forest-green on canvas bg */
  theme?: 'dark' | 'light';
  className?: string;
}

export function Label({ children, theme = 'dark', className }: LabelProps) {
  return (
    <span
      className={clsx(
        'font-mono text-[10.5px] font-medium tracking-label uppercase',
        theme === 'dark' ? 'text-teal' : 'text-forest',
        className
      )}
    >
      {children}
    </span>
  );
}
