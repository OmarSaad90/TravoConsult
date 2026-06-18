'use client';

import { useEffect, useRef } from 'react';

function gaussRand(mu: number, sigma: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mu + sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const TEAL    = '#71D2CF';
const N_BINS  = 30;
const N_DOTS  = 240;
const GRAVITY = 0.13;

interface Dot {
  x: number; y: number; vy: number;
  alpha: number; r: number; bin: number; settled: boolean;
}

type Phase = 'run' | 'drain' | 'hold' | 'fade';

export function MonteCarloCanvas() {
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

    const dots: Dot[] = [];
    const bins        = new Array<number>(N_BINS).fill(0);
    let emitted       = 0;
    let numSettled    = 0;
    let phase: Phase  = 'run';
    let gAlpha        = 1;
    let holdTick      = 0;
    let rafId         = 0;

    function spawn() {
      const mu  = W * 0.5;
      const sig = W * 0.165;
      const rx  = gaussRand(mu, sig);
      const x   = Math.max(2, Math.min(W - 2, rx));
      const bin = Math.max(0, Math.min(N_BINS - 1,
        Math.floor(((rx - (mu - 3 * sig)) / (6 * sig)) * N_BINS)
      ));
      dots.push({
        x,
        y: H * 0.01 + Math.random() * H * 0.03,
        vy: 0.8 + Math.random() * 1.6,
        alpha: 0.55 + Math.random() * 0.35,
        r: 1.2 + Math.random() * 0.9,
        bin,
        settled: false,
      });
      emitted++;
    }

    function draw() {
      if (!W || !H) { rafId = requestAnimationFrame(draw); return; }

      ctx!.clearRect(0, 0, W, H);

      const floor = H - 1.5;
      const binW  = W / N_BINS;
      const maxBH = H * 0.70;

      // Emit one dot per frame while in run phase
      if (phase === 'run' && emitted < N_DOTS) spawn();

      // Update dot positions
      for (const d of dots) {
        if (d.settled) continue;
        d.vy += GRAVITY;
        d.y  += d.vy;
        if (d.y >= floor) {
          d.y       = floor;
          d.settled = true;
          bins[d.bin]++;
          numSettled++;
        }
      }

      // Phase transitions
      if (phase === 'run'   && emitted >= N_DOTS)    phase = 'drain';
      if (phase === 'drain' && numSettled >= N_DOTS)  { phase = 'hold'; holdTick = 0; }
      if (phase === 'hold') { holdTick++; if (holdTick > 72) phase = 'fade'; }
      if (phase === 'fade') {
        gAlpha -= 0.014;
        if (gAlpha <= 0) {
          gAlpha = 1; bins.fill(0); dots.length = 0;
          emitted = 0; numSettled = 0; phase = 'run'; holdTick = 0;
        }
      }

      // Histogram bars
      const peak = Math.max(1, ...bins);
      ctx!.fillStyle = TEAL;
      for (let i = 0; i < N_BINS; i++) {
        if (!bins[i]) continue;
        const bh = (bins[i] / peak) * maxBH;
        const bx = i * binW;
        const by = floor - bh;
        // Subtle fill
        ctx!.globalAlpha = gAlpha * 0.12;
        ctx!.fillRect(bx + 0.5, by, binW - 1, bh);
        // Bright cap
        ctx!.globalAlpha = gAlpha * 0.50;
        ctx!.fillRect(bx + 0.5, by, binW - 1, 1.5);
      }

      // Floor hairline
      ctx!.globalAlpha = gAlpha * 0.09;
      ctx!.strokeStyle = TEAL;
      ctx!.lineWidth   = 0.5;
      ctx!.beginPath();
      ctx!.moveTo(0, floor);
      ctx!.lineTo(W, floor);
      ctx!.stroke();

      // Falling dots
      ctx!.fillStyle = TEAL;
      for (const d of dots) {
        if (d.settled) continue;
        ctx!.globalAlpha = d.alpha * gAlpha;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fill();
      }

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
