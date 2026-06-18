'use client';

import { useEffect, useRef } from 'react';

const TEAL   = '#71D2CF';
const N_BARS = 30;

// Matches exactly the SVG buildCurvePath formula so bars align with the drawn curve
function gaussianY(t: number): number {
  const xn = t * 8 - 4;
  return Math.exp(-xn * xn / 2);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInCubic(t: number): number {
  return t * t * t;
}

const GROW_TICKS   = 140; // ~2.3s at 60fps
const HOLD_TICKS   = 70;  // ~1.2s
const SHRINK_TICKS = 50;  // ~0.8s

type Phase = 'grow' | 'hold' | 'shrink';

export function HistogramCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;

    function applySize() {
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width) return;
      W = rect.width;
      H = rect.height;
      canvas!.width  = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    applySize();

    // Precompute normalized bar heights [0..1] — matches gaussian curve shape
    const targets = Array.from({ length: N_BARS }, (_, i) =>
      gaussianY((i + 0.5) / N_BARS)
    );

    let phase: Phase = 'grow';
    let tick  = 0;
    let rafId = 0;

    function draw() {
      if (!W || !H) { rafId = requestAnimationFrame(draw); return; }

      ctx!.clearRect(0, 0, W, H);

      // Scale: 0→1 on grow, 1 on hold, 1→0 on shrink
      let scale = 0;
      if (phase === 'grow')   scale = easeInOutCubic(Math.min(1, tick / GROW_TICKS));
      if (phase === 'hold')   scale = 1;
      if (phase === 'shrink') scale = 1 - easeInCubic(Math.min(1, tick / SHRINK_TICKS));

      tick++;
      if (phase === 'grow'   && tick > GROW_TICKS)   { phase = 'hold';   tick = 0; }
      if (phase === 'hold'   && tick > HOLD_TICKS)   { phase = 'shrink'; tick = 0; }
      if (phase === 'shrink' && tick > SHRINK_TICKS) { phase = 'grow';   tick = 0; }

      const floor = H - 1.5;
      const maxBH = H * 0.84; // bars reach the SVG curve peak at scale=1
      const barW  = W / N_BARS;

      ctx!.fillStyle = TEAL;
      for (let i = 0; i < N_BARS; i++) {
        const bh = targets[i] * maxBH * scale;
        if (bh < 0.5) continue;
        const bx = i * barW;
        const by = floor - bh;

        // Subtle fill
        ctx!.globalAlpha = 0.11;
        ctx!.fillRect(bx + 0.5, by, barW - 1, bh);

        // Bright cap — traces the distribution shape as bars rise
        ctx!.globalAlpha = 0.48;
        ctx!.fillRect(bx + 0.5, by, barW - 1, 1.5);
      }

      // Floor hairline
      ctx!.globalAlpha = 0.08;
      ctx!.strokeStyle = TEAL;
      ctx!.lineWidth   = 0.5;
      ctx!.beginPath();
      ctx!.moveTo(0, floor);
      ctx!.lineTo(W, floor);
      ctx!.stroke();

      ctx!.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(applySize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        right: 0,
        top: '12%',
        width: '54%',
        height: 'auto',
        aspectRatio: '900 / 300',
        zIndex: 1,
      }}
    />
  );
}
