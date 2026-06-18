import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Barlow_Condensed, Barlow, JetBrains_Mono } from 'next/font/google';
import '@/index.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Travo — Quantitative Construction Risk Advisory | New Jersey & New York',
  description:
    'Independent quantitative construction risk analysis for capital projects across the NJ/NY metropolitan region. Travo quantifies cost, schedule, and disputed risk before it costs.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
