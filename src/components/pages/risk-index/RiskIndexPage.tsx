'use client';

import React, { useState, useEffect, type FormEvent } from 'react';
import { useInView } from '@/hooks/useInView';

// ── Tokens ────────────────────────────────────────────────────────────────────
const P = {
  navy:    '#1E1E2E',
  navy1:   '#252538',
  ruleD:   '#28283E',
  ruleL:   '#D5D9E8',
  canvas1: '#EBEFF8',
  teal:    '#71D2CF',
  tealDp:  '#3EA6A3',
  forest:  '#2C5251',
  sky:     '#C5ECFE',
  coral:   '#FF5B5E',
  blush:   '#FFB9BB',
  snow:    '#E6EAF4',
  slate:   '#8A95B2',
  haze:    '#828DA6',
  ink2:    '#323B5B',
  ink3:    '#5F6884',
} as const;

function fade(active: boolean, delay: number): React.CSSProperties {
  return {
    opacity:    active ? 1 : 0,
    transform:  active ? 'none' : 'translateY(22px)',
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

// ── Orbit constellation (hero viz) ───────────────────────────────────────────
// 10 template nodes on an ellipse: CX=200 CY=125 RX=155 RY=95
// angle = -90 + k*36 degrees for k=0..9
const ORBIT_NODES = [
  { x: 200, y:  30, c: P.coral,  n: '01', delay:  200 },
  { x: 291, y:  48, c: P.coral,  n: '02', delay:  350 },
  { x: 347, y:  96, c: P.blush,  n: '03', delay:  500 },
  { x: 347, y: 154, c: P.teal,   n: '04', delay:  650 },
  { x: 291, y: 202, c: P.teal,   n: '05', delay:  800 },
  { x: 200, y: 220, c: P.blush,  n: '06', delay:  950 },
  { x: 109, y: 202, c: P.slate,  n: '07', delay: 1100 },
  { x:  53, y: 154, c: P.coral,  n: '08', delay: 1250 },
  { x:  53, y:  96, c: P.slate,  n: '09', delay: 1400 },
  { x: 109, y:  48, c: P.sky,    n: '10', delay: 1550 },
] as const;

// Ellipse path approximation for pathLength draw-in
// M cx,cy-ry → 4 cubic bezier arcs
const ORBIT_PATH = 'M 200,30 C 286,30 355,72.5 355,125 C 355,177.5 286,220 200,220 C 114,220 45,177.5 45,125 C 45,72.5 114,30 200,30';

function OrbitConstellation({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 400 250" aria-hidden fill="none"
      style={{ width: '100%', maxWidth: '420px', display: 'block', overflow: 'visible' }}>

      {/* Outer glow ellipse */}
      <ellipse cx="200" cy="125" rx="155" ry="95"
        stroke={P.teal} strokeOpacity="0.06" strokeWidth="28" fill="none" />

      {/* Orbit path draw-in */}
      <path d={ORBIT_PATH} stroke={P.teal} strokeOpacity="0.25" strokeWidth="0.8"
        strokeDasharray="3 5" pathLength="1"
        style={{
          strokeDashoffset: active ? 0 : 1,
          transition: 'stroke-dashoffset 2.2s cubic-bezier(0.16,1,0.3,1) 0ms',
        }} />

      {/* 10 template nodes */}
      {ORBIT_NODES.map((n) => (
        <g key={n.n} opacity={active ? 1 : 0}
          style={{ transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${n.delay}ms` }}>

          {/* Glow halo */}
          <circle cx={n.x} cy={n.y} r="14" fill={n.c} opacity="0.08" />
          {/* Dot */}
          <circle cx={n.x} cy={n.y} r="5.5" fill={n.c}
            style={{ filter: `drop-shadow(0 0 6px ${n.c}88)` }} />
          {/* Number */}
          <text x={n.x} y={n.y + 3} textAnchor="middle"
            fill={P.navy} fontSize="4.5" fontFamily="JetBrains Mono, monospace"
            fontWeight="700" letterSpacing="0">
            {n.n}
          </text>
        </g>
      ))}

      {/* Center label */}
      <text x="200" y="121" textAnchor="middle"
        fill={P.teal} fontSize="7.5" fontFamily="JetBrains Mono, monospace"
        opacity={active ? 0.5 : 0}
        style={{ transition: 'opacity 0.6s 1800ms' }} letterSpacing="0.14em">
        10 TEMPLATES
      </text>
      <text x="200" y="133" textAnchor="middle"
        fill={P.slate} fontSize="6.5" fontFamily="JetBrains Mono, monospace"
        opacity={active ? 0.35 : 0}
        style={{ transition: 'opacity 0.6s 1900ms' }} letterSpacing="0.1em">
        ONE SYSTEM
      </text>
    </svg>
  );
}

// ── P×I Matrix (Template 02) ─────────────────────────────────────────────────
// 5×5 grid — dots at (fracX, fracY) where 0=low 1=high
// Grid area: x 55–345 (290px), y 255–15 (240px, inverted — high prob = low y)
const PXI_DOTS = [
  { fx: 0.86, fy: 0.84, r: 7.5, c: P.coral, delay:   0 },
  { fx: 0.94, fy: 0.76, r: 5,   c: P.coral, delay:  55 },
  { fx: 0.72, fy: 0.92, r: 9,   c: P.coral, delay: 110 },
  { fx: 0.98, fy: 0.96, r: 6,   c: P.coral, delay:  28 },
  { fx: 0.60, fy: 0.80, r: 6,   c: P.blush, delay: 175 },
  { fx: 0.78, fy: 0.64, r: 5,   c: P.blush, delay: 220 },
  { fx: 0.52, fy: 0.52, r: 7,   c: P.blush, delay: 265 },
  { fx: 0.88, fy: 0.46, r: 4,   c: P.blush, delay: 310 },
  { fx: 0.46, fy: 0.70, r: 5,   c: P.blush, delay: 355 },
  { fx: 0.30, fy: 0.76, r: 4,   c: P.tealDp,delay: 400 },
  { fx: 0.40, fy: 0.38, r: 7,   c: P.teal,  delay: 445 },
  { fx: 0.22, fy: 0.30, r: 5,   c: P.teal,  delay: 490 },
  { fx: 0.14, fy: 0.62, r: 4,   c: P.teal,  delay: 535 },
  { fx: 0.08, fy: 0.26, r: 5,   c: P.teal,  delay: 580 },
  { fx: 0.50, fy: 0.18, r: 3.5, c: P.teal,  delay: 620 },
  { fx: 0.34, fy: 0.12, r: 4,   c: P.tealDp,delay: 660 },
  { fx: 0.68, fy: 0.28, r: 4,   c: P.blush, delay: 700 },
  { fx: 0.10, fy: 0.10, r: 3,   c: P.teal,  delay: 740 },
] as const;

function PxIMatrix({ active }: { active: boolean }) {
  // Grid: x0=55, y0=255 (bottom), width=290, height=240
  const x0 = 55, y0 = 255, w = 290, h = 240;
  const cx = (fx: number) => x0 + fx * w;
  const cy = (fy: number) => y0 - fy * h;

  const cols = [1, 2, 3, 4, 5];
  const rows = [1, 2, 3, 4, 5];
  const cellW = w / 5;
  const cellH = h / 5;

  return (
    <svg viewBox="0 0 360 280" aria-hidden fill="none"
      style={{ width: '100%', display: 'block' }}>

      {/* Severity zone tinting */}
      {/* Critical top-right */}
      <rect x={x0 + 3 * cellW} y={y0 - 5 * cellH} width={2 * cellW} height={2 * cellH}
        fill={P.coral} opacity="0.05" />
      {/* Watch mid */}
      <rect x={x0 + 2 * cellW} y={y0 - 4 * cellH} width={2 * cellW} height={2 * cellH}
        fill={P.blush} opacity="0.06" />

      {/* Grid lines */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <React.Fragment key={i}>
          <line x1={x0 + i * cellW} y1={y0 - h} x2={x0 + i * cellW} y2={y0}
            stroke={P.slate} strokeOpacity="0.14" strokeWidth="0.75" />
          <line x1={x0} y1={y0 - i * cellH} x2={x0 + w} y2={y0 - i * cellH}
            stroke={P.slate} strokeOpacity="0.14" strokeWidth="0.75" />
        </React.Fragment>
      ))}

      {/* Axis labels */}
      {cols.map(c => (
        <text key={c} x={x0 + (c - 0.5) * cellW} y={y0 + 14}
          textAnchor="middle" fill={P.slate} fontSize="7.5"
          fontFamily="JetBrains Mono, monospace">{c}</text>
      ))}
      {rows.map(r => (
        <text key={r} x={x0 - 8} y={y0 - (r - 0.5) * cellH + 3}
          textAnchor="end" fill={P.slate} fontSize="7.5"
          fontFamily="JetBrains Mono, monospace">{r}</text>
      ))}

      {/* Axis direction labels */}
      <text x={x0 + w / 2} y={y0 + 26} textAnchor="middle"
        fill={P.haze} fontSize="6.5" fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.14em">IMPACT →</text>
      <text x="16" y={y0 - h / 2} textAnchor="middle"
        fill={P.haze} fontSize="6.5" fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.14em"
        style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', transformOrigin: '16px 135px' }}>
        PROBABILITY ↑
      </text>

      {/* Risk dots */}
      {PXI_DOTS.map((d, i) => (
        <g key={i}>
          <circle cx={cx(d.fx)} cy={cy(d.fy)} r={d.r * 1.8}
            fill={d.c} opacity={active ? 0.10 : 0}
            style={{ transition: `opacity 0.4s ${d.delay}ms` }} />
          <circle cx={cx(d.fx)} cy={cy(d.fy)} r={d.r}
            fill={d.c} opacity={active ? 0.88 : 0}
            style={{
              transition: `opacity 0.35s cubic-bezier(0.16,1,0.3,1) ${d.delay}ms`,
              filter: `drop-shadow(0 0 5px ${d.c}66)`,
            }} />
        </g>
      ))}

      {/* Legend */}
      {[
        { c: P.coral, label: 'Critical' },
        { c: P.blush, label: 'Watch' },
        { c: P.teal,  label: 'Managed' },
      ].map((l, i) => (
        <g key={l.label}
          opacity={active ? 1 : 0}
          style={{ transition: `opacity 0.5s ${900 + i * 60}ms` }}>
          <circle cx={x0 + i * 80 + 8} cy={y0 + 38} r="4" fill={l.c} />
          <text x={x0 + i * 80 + 17} y={y0 + 41.5}
            fill={P.slate} fontSize="7" fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.06em">{l.label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Mitigation Cascade (Template 04) ────────────────────────────────────────
const CASCADE_BARS = [
  { label: 'INHERENT',  pct: 1.00, c: P.coral,  value: '4.8' },
  { label: 'MITIGATED', pct: 0.62, c: P.blush,  value: '3.0' },
  { label: 'RESIDUAL',  pct: 0.26, c: P.teal,   value: '1.3' },
] as const;

function MitigationCascade({ active }: { active: boolean }) {
  const trackW = 230, x0 = 10, rowH = 30, y0 = 18;

  return (
    <svg viewBox="0 0 300 110" aria-hidden fill="none"
      style={{ width: '100%', display: 'block' }}>

      {/* Track backgrounds */}
      {CASCADE_BARS.map((b, i) => (
        <rect key={i} x={x0} y={y0 + i * rowH} width={trackW} height={12}
          fill={P.ruleD} rx="0" />
      ))}

      {/* Bars */}
      {CASCADE_BARS.map((b, i) => (
        <rect key={i} x={x0} y={y0 + i * rowH} width={trackW * b.pct} height={12}
          fill={b.c} opacity="0.9"
          style={{
            transformOrigin: `${x0}px ${y0 + i * rowH + 6}px`,
            transform: active ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${160 + i * 130}ms`,
          }} />
      ))}

      {/* Labels */}
      {CASCADE_BARS.map((b, i) => (
        <React.Fragment key={i}>
          <text x={x0} y={y0 + i * rowH - 4}
            fill={P.slate} fontSize="7" fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.12em">{b.label}</text>
          <text x={x0 + trackW + 8} y={y0 + i * rowH + 9}
            fill={b.c} fontSize="8.5" fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
            opacity={active ? 1 : 0}
            style={{ transition: `opacity 0.4s ${500 + i * 130}ms` }}>{b.value}</text>
        </React.Fragment>
      ))}

      {/* Arrow indicating reduction */}
      <text x={x0 + trackW / 2} y="102" textAnchor="middle"
        fill={P.tealDp} fontSize="6.5" fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.12em"
        opacity={active ? 0.7 : 0}
        style={{ transition: 'opacity 0.5s 800ms' }}>
        RISK REDUCTION: −73%
      </text>
    </svg>
  );
}

// ── Confidence Band (Template 10) ────────────────────────────────────────────
function ConfidenceBand({ active }: { active: boolean }) {
  const baseY = 74, x0 = 24, x1 = 296;
  const p80H = 28, p50H = 14;

  return (
    <svg viewBox="0 0 320 148" aria-hidden fill="none"
      style={{ width: '100%', display: 'block' }}>

      {/* P80 band */}
      <rect x={x0} y={baseY - p80H} width={x1 - x0} height={p80H * 2}
        fill={P.blush} opacity="0.10"
        style={{
          transformOrigin: `${x0}px ${baseY}px`,
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1) 100ms',
        }} />

      {/* P50 band */}
      <rect x={x0} y={baseY - p50H} width={x1 - x0} height={p50H * 2}
        fill={P.teal} opacity="0.16"
        style={{
          transformOrigin: `${x0}px ${baseY}px`,
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.95s cubic-bezier(0.16,1,0.3,1) 200ms',
        }} />

      {/* Baseline */}
      <path d={`M ${x0} ${baseY} L ${x1} ${baseY}`}
        stroke={P.tealDp} strokeWidth="1.5" pathLength="1"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: active ? 0 : 1,
          transition: 'stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1) 300ms',
        }} />

      {/* Risk markers */}
      {[88, 148, 204, 252].map((rx, i) => (
        <g key={i} opacity={active ? 1 : 0}
          style={{ transition: `opacity 0.4s ${700 + i * 80}ms` }}>
          <line x1={rx} y1={baseY - p80H - 4} x2={rx} y2={baseY + p80H + 4}
            stroke={P.coral} strokeWidth="1.2" strokeOpacity="0.7" />
          <circle cx={rx} cy={baseY - p80H - 8} r="3" fill={P.coral} opacity="0.8" />
        </g>
      ))}

      {/* Today marker */}
      <line x1="168" y1={baseY - p80H - 10} x2="168" y2={baseY + p80H + 10}
        stroke={P.snow} strokeWidth="0.8" strokeDasharray="3 3"
        opacity={active ? 0.3 : 0}
        style={{ transition: 'opacity 0.4s 1100ms' }} />
      <text x="170" y={baseY - p80H - 14}
        fill={P.haze} fontSize="6.5" fontFamily="JetBrains Mono, monospace"
        opacity={active ? 0.5 : 0}
        style={{ transition: 'opacity 0.4s 1200ms' }}>TODAY</text>

      {/* Band labels */}
      <text x={x1 + 6} y={baseY - p80H + 4}
        fill={P.blush} fontSize="6.5" fontFamily="JetBrains Mono, monospace"
        opacity={active ? 0.8 : 0}
        style={{ transition: 'opacity 0.4s 900ms' }}>P80</text>
      <text x={x1 + 6} y={baseY - p50H + 4}
        fill={P.teal} fontSize="6.5" fontFamily="JetBrains Mono, monospace"
        opacity={active ? 0.8 : 0}
        style={{ transition: 'opacity 0.4s 950ms' }}>P50</text>

      {/* Axis label */}
      <text x={x0} y="138" fill={P.haze} fontSize="6.5"
        fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em"
        opacity={active ? 0.55 : 0}
        style={{ transition: 'opacity 0.4s 1000ms' }}>
        SCHEDULE →
      </text>
      <text x={x1} y="138" textAnchor="end" fill={P.haze} fontSize="6.5"
        fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em"
        opacity={active ? 0.55 : 0}
        style={{ transition: 'opacity 0.4s 1000ms' }}>
        ▲ RISK EVENTS
      </text>
    </svg>
  );
}

// ── Aging Chart (Template 09) ────────────────────────────────────────────────
const AGING_DATA = [
  { id: 'R-021', label: 'Piping fab lead time',  days: 142, c: P.coral  },
  { id: 'R-007', label: 'Procurement window',     days:  98, c: P.coral  },
  { id: 'R-014', label: 'Concrete pour schedule', days:  76, c: P.blush  },
  { id: 'R-033', label: 'Soil boring variance',   days:  55, c: P.blush  },
  { id: 'R-018', label: 'Regulatory approval',    days:  34, c: P.teal   },
  { id: 'R-045', label: 'Stakeholder alignment',  days:  21, c: P.teal   },
  { id: 'R-052', label: 'Shop drawings review',   days:   9, c: P.tealDp },
] as const;

function AgingChart({ active }: { active: boolean }) {
  const maxDays = 142, trackW = 180, x0 = 10, rowH = 16, y0 = 10;

  return (
    <svg viewBox="0 0 260 130" aria-hidden fill="none"
      style={{ width: '100%', display: 'block' }}>

      {AGING_DATA.map((d, i) => (
        <g key={d.id}>
          {/* Track */}
          <rect x={x0} y={y0 + i * rowH} width={trackW} height={8}
            fill={P.ruleD} />
          {/* Bar */}
          <rect x={x0} y={y0 + i * rowH} width={(d.days / maxDays) * trackW} height={8}
            fill={d.c} opacity="0.82"
            style={{
              transformOrigin: `${x0}px ${y0 + i * rowH + 4}px`,
              transform: active ? 'scaleX(1)' : 'scaleX(0)',
              transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${80 + i * 70}ms`,
            }} />
          {/* ID */}
          <text x={x0 + trackW + 8} y={y0 + i * rowH + 6.5}
            fill={P.slate} fontSize="6.5" fontFamily="JetBrains Mono, monospace"
            opacity={active ? 1 : 0}
            style={{ transition: `opacity 0.35s ${350 + i * 70}ms` }}>
            {d.days}d
          </text>
        </g>
      ))}

      {/* Threshold lines */}
      {[{ d: 90, label: '90d' }, { d: 45, label: '45d' }].map(t => (
        <g key={t.d}>
          <line x1={x0 + (t.d / maxDays) * trackW} y1={y0 - 4}
            x2={x0 + (t.d / maxDays) * trackW} y2={y0 + AGING_DATA.length * rowH}
            stroke={P.slate} strokeOpacity="0.18" strokeWidth="0.75" strokeDasharray="2 3" />
          <text x={x0 + (t.d / maxDays) * trackW} y={y0 - 7}
            textAnchor="middle" fill={P.haze} fontSize="5.5"
            fontFamily="JetBrains Mono, monospace">{t.label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Velocity Strip (Template 06) ─────────────────────────────────────────────
const VELOCITY_DATA = [
  { id: 'R-021', label: 'Piping fab lead time',   delta: +0.8, c: P.coral  },
  { id: 'R-007', label: 'Procurement window',      delta: +0.3, c: P.blush  },
  { id: 'R-014', label: 'Concrete pour schedule',  delta:  0.0, c: P.slate  },
  { id: 'R-033', label: 'Soil boring variance',    delta: -0.4, c: P.teal   },
  { id: 'R-018', label: 'Regulatory approval',     delta: -0.7, c: P.tealDp },
  { id: 'R-045', label: 'Stakeholder alignment',   delta: +0.1, c: P.blush  },
] as const;

function VelocityStrip({ active }: { active: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {VELOCITY_DATA.map((v, i) => {
        const arrow = v.delta > 0.05 ? '▲' : v.delta < -0.05 ? '▼' : '—';
        const sign  = v.delta > 0.05 ? '+' : '';
        return (
          <div key={v.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '44px 1fr 48px',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 0',
              borderBottom: `1px solid ${P.ruleD}`,
              opacity: active ? 1 : 0,
              transform: active ? 'none' : 'translateX(-12px)',
              transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${80 + i * 65}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${80 + i * 65}ms`,
            }}>

            {/* Risk ID */}
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px',
              letterSpacing: '0.1em', color: P.haze }}>
              {v.id}
            </span>

            {/* Label */}
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px',
              color: P.slate, letterSpacing: '0.04em', overflow: 'hidden',
              textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {v.label}
            </span>

            {/* Delta */}
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
              color: v.c, textAlign: 'right', letterSpacing: '0.04em', fontWeight: 600 }}>
              {arrow} {sign}{v.delta !== 0 ? Math.abs(v.delta).toFixed(1) : '0.0'}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Template Index data ───────────────────────────────────────────────────────
const TEMPLATES = [
  { n: '01', name: 'The Risk Spine',               desc: 'Anatomy of a single risk event',                  use: 'Workshop · Brief',      c: P.coral  },
  { n: '02', name: 'Probability × Impact Field',   desc: 'Portfolio at a glance, 5×5 with population',     use: 'Executive · Monthly',   c: P.coral  },
  { n: '03', name: 'The Register Ledger',           desc: 'The risk register, disciplined',                  use: 'Controls · Weekly',     c: P.blush  },
  { n: '04', name: 'The Mitigation Cascade',        desc: 'Inherent → mitigated → residual',                use: 'Owner · Proposal',      c: P.teal   },
  { n: '05', name: 'The Risk Constellation',        desc: 'Portfolio across seven impact dimensions',        use: 'Executive · Cover',     c: P.teal   },
  { n: '06', name: 'The Velocity Strip',            desc: 'What changed since last cycle',                   use: 'Standup · Cycle',       c: P.blush  },
  { n: '07', name: 'The Trigger Cascade',           desc: 'Leading indicator → trigger → event',            use: 'Site · Daily',          c: P.slate  },
  { n: '08', name: 'The Impact Profile',            desc: "A single risk's seven-axis fingerprint",         use: 'Owner · Deep dive',     c: P.coral  },
  { n: '09', name: 'The Aging Chart',               desc: 'How long has each item been open',               use: 'PMO · Quarterly',       c: P.slate  },
  { n: '10', name: 'The Confidence Band',           desc: 'P50/P80 schedule with risk markers',             use: 'Executive · Dashboard', c: P.sky    },
] as const;

// ── Section: Hero ─────────────────────────────────────────────────────────────
function RiskIndexHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 180);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative bg-navy text-snow overflow-hidden pt-[88px] pb-[72px]">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      {/* Spectrum bar flush at top */}
      <div className="absolute top-0 left-0 right-0 h-[5px] flex">
        {[P.forest, P.tealDp, P.teal, P.blush, P.coral].map((c, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: c,
            transformOrigin: 'left center',
            transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
          }} />
        ))}
      </div>

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        {/* Publication masthead */}
        <div className="flex items-center justify-between border-b pb-4 mb-10"
          style={{ borderColor: P.ruleD, ...fade(mounted, 0) }}>
          <span className="font-mono uppercase text-teal"
            style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
            Travo Risk Advisory
          </span>
          <span className="font-mono uppercase text-haze"
            style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
            NJ/NY Construction Risk Index · Vol. I
          </span>
          <span className="font-mono uppercase text-haze hidden md:block"
            style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
            Inaugural Edition · 2026
          </span>
        </div>

        {/* Two-column: heading left, orbit right */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">

          {/* Left: heading + body */}
          <div>
            <h1 className="font-display font-extrabold leading-[0.93] tracking-display"
              style={{ fontSize: 'clamp(3.2rem, 6.5vw, 5.8rem)' }}>
              <span className="block text-snow" style={fade(mounted, 120)}>The NJ/NY</span>
              <span className="block text-teal" style={fade(mounted, 220)}>Construction</span>
              <span className="block text-snow" style={fade(mounted, 320)}>Risk Index.</span>
            </h1>

            <p className="mt-8 font-sans text-slate leading-[1.76] pretty"
              style={{ fontSize: '16.5px', maxWidth: '52ch', ...fade(mounted, 450) }}>
              The first probabilistic benchmark for capital project risk outcomes
              in the New Jersey and New York metropolitan region. Ten visualization
              templates. One analytical system. Published with full methodological disclosure.
            </p>

            <div className="mt-10 flex items-center gap-3" style={fade(mounted, 560)}>
              <span className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: P.coral,
                  boxShadow: `0 0 8px ${P.coral}`,
                  animation: 'p50Live 2.4s ease-in-out infinite' }} />
              <span className="font-mono uppercase text-haze"
                style={{ fontSize: '9px', letterSpacing: '0.16em' }}>
                Inaugural Edition · In Development
              </span>
            </div>
          </div>

          {/* Right: orbit constellation */}
          <div style={fade(mounted, 300)} className="hidden lg:flex justify-center">
            <OrbitConstellation active={mounted} />
          </div>
        </div>

        {/* Bottom fact strip */}
        <div className="mt-16 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ borderColor: P.ruleD, ...fade(mounted, 700) }}>
          {[
            { label: 'Region',    value: 'NJ / NY Metro'     },
            { label: 'Templates', value: '10 Types'          },
            { label: 'Cadence',   value: 'Annual Edition'    },
            { label: 'Status',    value: 'Vol. I — Pending'  },
          ].map(f => (
            <div key={f.label}>
              <p className="font-mono uppercase text-haze" style={{ fontSize: '8px', letterSpacing: '0.16em' }}>
                {f.label}
              </p>
              <p className="font-mono text-snow mt-1" style={{ fontSize: '13px', letterSpacing: '0.06em' }}>
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: Why a Benchmark ──────────────────────────────────────────────────
function WhyBenchmark() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });

  return (
    <section ref={ref} className="bg-canvas text-ink py-[88px] md:py-[112px] overflow-hidden">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-24 items-start">

          {/* Left: editorial heading */}
          <div>
            <h2 className="font-display font-extrabold leading-[0.95] tracking-display balance"
              style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.4rem)', ...fade(inView, 0) }}>
              <span className="text-ink">No one is</span>
              <br />
              <span className="text-ink">publishing</span>
              <br />
              <span className="text-forest">the data.</span>
            </h2>

            <p className="mt-8 font-sans text-ink-2 leading-[1.78] pretty"
              style={{ fontSize: '16.5px', maxWidth: '58ch', ...fade(inView, 120) }}>
              Every capital project in this region shares a common problem: there
              is no published benchmark for outcomes. Without regional data,
              contingency is intuition. P80 is a guess. The Index changes that
              by establishing what risk actually looks like across the NJ/NY project
              market and publishing it with full methodological disclosure.
            </p>

            <p className="mt-5 font-sans text-ink-2 leading-[1.78] pretty"
              style={{ fontSize: '16.5px', maxWidth: '58ch', ...fade(inView, 200) }}>
              Each edition captures cost overrun distributions, schedule recovery
              rates, and risk category profiles across project types, delivery methods,
              and procurement structures. The methodology follows AACE 41R-08 and
              57R-09 throughout.
            </p>
          </div>

          {/* Right: three fact blocks */}
          <div className="flex flex-col gap-0 border-t" style={{ borderColor: P.ruleL }}>
            {[
              { n: '01', heading: 'Regional Coverage',  body: 'NJ/NY metropolitan region, across public, institutional, and private capital project markets.' },
              { n: '02', heading: 'Annual Publication',  body: 'Each edition is dated, methodology-disclosed, and independently produced.' },
              { n: '03', heading: 'AACE Methodology',   body: '41R-08 risk identification. 57R-09 probabilistic cost estimating. Monte Carlo throughout.' },
            ].map((f, i) => (
              <div key={f.n} className="py-8 border-b"
                style={{ borderColor: P.ruleL, ...fade(inView, 80 + i * 100) }}>
                <span className="font-mono text-forest" style={{ fontSize: '8.5px', letterSpacing: '0.16em' }}>
                  {f.n} / 03
                </span>
                <h3 className="font-display font-bold text-ink mt-3 leading-[1.0] tracking-display"
                  style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)' }}>
                  {f.heading}
                </h3>
                <p className="mt-2 font-sans text-ink-3 leading-[1.68] pretty"
                  style={{ fontSize: '14.5px' }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Featured P×I Matrix ──────────────────────────────────────────────
function PxISection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section ref={ref} className="relative bg-navy text-snow overflow-hidden py-[88px] md:py-[112px]">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid lg:grid-cols-[360px_1fr] gap-14 lg:gap-20 items-start">

          {/* Left: description */}
          <div style={fade(inView, 0)}>
            <p className="font-mono text-teal uppercase" style={{ fontSize: '8.5px', letterSpacing: '0.18em' }}>
              Template 02 · Executive / Monthly
            </p>
            <h2 className="mt-5 font-display font-extrabold text-snow leading-[0.95] tracking-display"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)' }}>
              The Probability<br />
              <span className="text-teal">&times; Impact</span><br />
              Field.
            </h2>
            <div className="mt-5 h-px w-10" style={{ backgroundColor: P.teal, opacity: 0.45 }} />
            <p className="mt-6 font-sans text-slate leading-[1.76] pretty"
              style={{ fontSize: '15.5px' }}>
              The most-drawn and worst-drawn chart in construction risk. Most
              versions are color-only heatmaps with no risks visible. The Field
              puts each risk item into the matrix as a positioned dot, colored by
              category and sized by cost exposure, so a reader sees not just where
              the danger is, but who lives there.
            </p>

            {/* Specs */}
            <div className="mt-8 pt-6 border-t flex flex-col gap-3"
              style={{ borderColor: P.ruleD }}>
              {[
                { k: 'Encodes',    v: '4 dimensions' },
                { k: 'Reader',     v: 'Executive, owner' },
                { k: 'Cadence',    v: 'Monthly review' },
                { k: 'Lives in',   v: 'Cover, dashboard' },
              ].map(s => (
                <div key={s.k} className="flex gap-4">
                  <span className="font-mono text-haze w-20 shrink-0"
                    style={{ fontSize: '9px', letterSpacing: '0.12em' }}>{s.k}</span>
                  <span className="font-mono text-snow"
                    style={{ fontSize: '9.5px', letterSpacing: '0.06em' }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: large viz */}
          <div className="border p-6 md:p-8"
            style={{ borderColor: P.ruleD, backgroundColor: P.navy1, ...fade(inView, 160) }}>
            <p className="font-mono text-teal uppercase mb-4"
              style={{ fontSize: '8px', letterSpacing: '0.18em' }}>
              Risk Field · Jersey City Transit Hub · Phase 2
            </p>
            <PxIMatrix active={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Viz Gallery ──────────────────────────────────────────────────────
function VizGallery() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.04 });

  const vizzes = [
    {
      n: '04', name: 'The Mitigation Cascade',
      desc: 'Inherent, mitigated, and residual risk as three horizontal bars. Shows the full reduction story in one view.',
      use: 'Owner · Proposal',
      component: <MitigationCascade active={inView} />,
      canvasMeta: 'Hudson Yards Phase III · Piping Package',
    },
    {
      n: '10', name: 'The Confidence Band',
      desc: 'Schedule baseline with P50 and P80 confidence intervals overlaid with dated risk event markers.',
      use: 'Executive · Dashboard',
      component: <ConfidenceBand active={inView} />,
      canvasMeta: 'NJ Transit Gateway Program · Tunnel Package',
    },
    {
      n: '09', name: 'The Aging Chart',
      desc: 'Open risk items sorted by how long they have been active. Time is the diagnostic.',
      use: 'PMO · Quarterly',
      component: <AgingChart active={inView} />,
      canvasMeta: 'Port Authority PATH Extension',
    },
    {
      n: '06', name: 'The Velocity Strip',
      desc: 'Delta tracking from cycle to cycle. What escalated, what de-escalated, what moved.',
      use: 'Standup · Cycle',
      component: <VelocityStrip active={inView} />,
      canvasMeta: 'Newark Penn Station Redevelopment',
    },
  ] as const;

  return (
    <section ref={ref} className="bg-canvas-1 text-ink py-[88px] md:py-[112px]">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="mb-12" style={fade(inView, 0)}>
          <h2 className="font-display font-extrabold text-ink leading-[0.95] tracking-display"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)' }}>
            Four more templates<br />
            <span className="text-forest">from the system.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px border border-rule-l"
          style={{ backgroundColor: P.ruleL }}>
          {vizzes.map((v, i) => (
            <div key={v.n} className="bg-canvas p-7 md:p-8 flex flex-col gap-5"
              style={fade(inView, 60 + i * 80)}>

              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="font-mono text-forest uppercase"
                    style={{ fontSize: '8px', letterSpacing: '0.16em' }}>
                    Template {v.n}
                  </p>
                  <p className="font-mono text-ink-3"
                    style={{ fontSize: '8px', letterSpacing: '0.10em' }}>
                    {v.use}
                  </p>
                </div>
                <h3 className="font-display font-bold text-ink leading-[1.0] tracking-display"
                  style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)' }}>
                  {v.name}
                </h3>
                <p className="mt-2 font-sans text-ink-3 leading-[1.65] pretty"
                  style={{ fontSize: '13.5px' }}>
                  {v.desc}
                </p>
              </div>

              {/* Viz canvas */}
              <div className="flex-1 border p-5" style={{ borderColor: P.ruleL, backgroundColor: P.canvas1 }}>
                <p className="font-mono text-ink-3 uppercase mb-3"
                  style={{ fontSize: '7px', letterSpacing: '0.16em' }}>
                  {v.canvasMeta}
                </p>
                {v.component}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: Template Index ───────────────────────────────────────────────────
function TemplateIndex() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.04 });

  return (
    <section ref={ref} className="relative bg-navy text-snow overflow-hidden py-[88px] md:py-[112px]">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden />

      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid lg:grid-cols-[1fr_340px] gap-14 lg:gap-20">

          {/* Right on desktop: heading */}
          <div className="lg:col-start-2 lg:row-start-1" style={fade(inView, 0)}>
            <h2 className="font-display font-extrabold text-snow leading-[0.95] tracking-display"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)' }}>
              10 templates.<br />
              <span className="text-teal">One system.</span>
            </h2>
            <div className="mt-5 h-px w-10" style={{ backgroundColor: P.teal, opacity: 0.45 }} />
            <p className="mt-6 font-sans text-slate leading-[1.76] pretty"
              style={{ fontSize: '15px' }}>
              Each template is a job. A specific output for a specific decision
              context — a workshop brief, a monthly executive review, a weekly
              standup, a site-level daily. The system reads from the Risk Spine
              to the Confidence Band, covering every cadence and every audience.
            </p>
          </div>

          {/* Left on desktop: 10-item structured list */}
          <div className="border-t lg:col-start-1 lg:row-start-1" style={{ borderColor: P.ruleD }}>
            <div className="grid md:grid-cols-2">
              {TEMPLATES.map((t, i) => (
                <div key={t.n}
                  className="py-5 border-b"
                  style={{
                    borderColor: P.ruleD,
                    paddingRight: i % 2 === 0 ? '32px' : undefined,
                    paddingLeft: i % 2 === 1 ? '32px' : undefined,
                    borderRight: i % 2 === 0 ? `1px solid ${P.ruleD}` : undefined,
                    ...fade(inView, 60 + i * 45),
                  }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.14em', color: t.c }}>
                      {t.n}
                    </span>
                    <span className="font-mono text-haze" style={{ fontSize: '8px', letterSpacing: '0.10em' }}>
                      {t.use}
                    </span>
                  </div>
                  <p className="font-display font-bold text-snow leading-[1.0]"
                    style={{ fontSize: '15px', letterSpacing: '-0.01em' }}>
                    {t.name}
                  </p>
                  <p className="mt-1 font-sans text-slate leading-[1.55]"
                    style={{ fontSize: '12.5px' }}>
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Registration ─────────────────────────────────────────────────────
function Registration() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) return;
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="bg-canvas text-ink py-[88px] md:py-[108px]">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_480px] gap-14 lg:gap-20 items-center">

          {/* Left */}
          <div style={fade(inView, 0)}>
            <p className="font-mono uppercase mb-5"
              style={{ fontSize: '8.5px', letterSpacing: '0.18em', color: P.forest }}>
              Vol. I · Inaugural Edition
            </p>
            <h2 className="font-display font-extrabold leading-[0.95] tracking-display text-ink"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}>
              Be notified<br />
              <span style={{ color: P.forest }}>on publication.</span>
            </h2>
            <p className="mt-6 font-sans leading-[1.76] pretty"
              style={{ fontSize: '16px', color: P.ink2, maxWidth: '48ch' }}>
              Register to receive notification when Vol. I publishes, along with
              methodology notes and preview findings from the inaugural edition.
              No marketing. No frequency.
            </p>
          </div>

          {/* Right: form */}
          <div style={fade(inView, 140)}>
            {!submitted ? (
              <form onSubmit={handleSubmit} noValidate>
                <label className="block font-mono uppercase mb-2"
                  style={{ fontSize: '9px', letterSpacing: '0.16em', color: P.forest }}>
                  Email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: P.canvas1,
                    border: `1px solid ${P.ruleL}`,
                    color: P.navy,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    padding: '13px 14px',
                    outline: 'none',
                    borderRadius: 0,
                    marginBottom: '14px',
                  }}
                />
                <button type="submit"
                  className="font-mono uppercase cursor-pointer"
                  style={{
                    background: P.coral,
                    color: P.snow,
                    border: 'none',
                    padding: '14px 32px',
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  Register Interest
                </button>
                <p className="font-mono mt-5" style={{ fontSize: '9px', letterSpacing: '0.1em', color: P.ink3 }}>
                  Vol. I is the inaugural edition. Publication date is not yet confirmed.
                </p>
              </form>
            ) : (
              <div className="border p-10"
                style={{ borderColor: 'rgba(113,210,207,0.3)', animation: 'confirmIn 0.7s cubic-bezier(0.16,1,0.3,1) both' }}>
                <p className="font-display font-extrabold leading-[1.0] tracking-display"
                  style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: P.forest }}>
                  Registered.
                </p>
                <p className="mt-4 font-sans leading-[1.74] pretty"
                  style={{ fontSize: '15.5px', color: P.ink2, maxWidth: '44ch' }}>
                  We will notify you when Vol. I is published. Thank you for your interest.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────
export function RiskIndexPage() {
  return (
    <>
      <RiskIndexHero />
      <WhyBenchmark />
      <PxISection />
      <VizGallery />
      <TemplateIndex />
      <Registration />
    </>
  );
}
