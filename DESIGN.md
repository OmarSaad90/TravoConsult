# Design

## Theme

**Split Authority.** Dark navy hero and accent bands establish precision-instrument conviction on arrival. A clean near-white (cool-tinted, never cream) body carries the dense content catalog for reading clarity. The split reads as: "Here is who we are. Here is how we work." Each zone is fully committed — no hedging in either direction.

The warm cream/paper palette from the reference HTML is explicitly rejected. The near-white body is `#F5F7FB` (barely-cool tinted toward the navy hue), not sand, parchment, or any warm-neutral band.

## Color

All values in OKLCH for perceptual uniformity and safe interpolation.

### Palette

| Token | Hex | Role |
|---|---|---|
| `--navy` | `#09111F` | Dark section background |
| `--navy-1` | `#0E1A2E` | Elevated card on dark |
| `--navy-2` | `#152035` | Hover/selected on dark |
| `--canvas` | `#F5F7FB` | Light section background (cool-tinted near-white) |
| `--canvas-1` | `#EBEFF8` | Elevated surface on light |
| `--snow` | `#E6EAF4` | Primary text on dark |
| `--slate` | `#8A95B2` | Secondary text on dark |
| `--haze` | `#4D5878` | Muted / metadata on dark |
| `--ink` | `#0C1222` | Primary text on light |
| `--ink-2` | `#323B5B` | Secondary text on light |
| `--ink-3` | `#5F6884` | Muted / metadata on light |
| `--teal` | `#71D2CF` | Brand accent — dark sections + data elements |
| `--teal-deep` | `#3EA6A3` | Hover/active teal |
| `--teal-dim` | `#0B2726` | Teal surface tint on dark |
| `--forest` | `#1C4A42` | Primary accent on light sections |
| `--forest-2` | `#143630` | Deeper forest hover |
| `--coral` | `#FF5B5E` | Risk indicator, primary CTA |
| `--coral-dim` | `#29090B` | Coral surface tint |
| `--elevated` | `#E88060` | Mid-spectrum risk state (between teal and coral) |
| `--air-blue` | `#C5ECFE` | Lightest spectrum stop; confidence bands on light bg |
| `--rule-d` | `#162030` | Divider on dark |
| `--rule-l` | `#D5D9E8` | Divider on light |

### Color strategy

**Split committed.** Dark zones: navy surface with teal accent and snow text. Light zones: canvas surface with forest-green accent and ink text. Teal appears in both zones for data/risk elements (risk spectrum, service codes). Coral is reserved for risk states and the single primary CTA.

## Typography

### Families

- **Display/Headings:** Barlow Condensed — engineered authority, the feel of a federal infrastructure specification. 700–800 weight only at display sizes.
- **Body:** Barlow — clean, technical reading weight. 400 prose, 500 emphasis, 600 sub-heads.
- **Mono:** JetBrains Mono — all labels, service codes, metric values, data fields. 400–500 weight.

One type family (Barlow/Barlow Condensed) for all prose + headings, with JetBrains Mono as the technical counterpart. Two families total.

### Google Fonts import

```
Barlow+Condensed:wght@700;800
Barlow:wght@400;500;600
JetBrains+Mono:wght@400;500
```

### Type scale

| Step | Size | Font / Weight | Usage |
|---|---|---|---|
| Display | `clamp(2.8rem, 5.8vw, 5.2rem)` | Syne 800 | Hero heading |
| H1 | `clamp(2.1rem, 4.2vw, 3.6rem)` | Syne 700 | Page headers |
| H2 | `clamp(1.6rem, 2.6vw, 2.4rem)` | Syne 700 | Section headings |
| H3 | `clamp(1.15rem, 1.6vw, 1.45rem)` | Plus Jakarta 600 | Card/list headings |
| Body-lg | `19px` | Plus Jakarta 400 | Lead/intro copy |
| Body | `16px` | Plus Jakarta 400 | Body prose |
| Label | `11px` | JetBrains Mono 500 | Uppercase labels, eyebrows |
| Data | `12–13px` | JetBrains Mono 400 | Metric values, service codes |

Letter-spacing: Display/H1 at `-0.025em`; H2 at `-0.02em`; Label at `+0.16em`.
Line-height: headings `1.06–1.12`; body `1.62`; mono labels `1.4`.

## Components

### Buttons

- **Primary (CTA):** teal background, surface-0 text. `border-radius: 0`. Padding: 14px 28px. Uppercase JetBrains Mono label, 11px, tracking 0.12em. Hover: teal-deep. Used for "Start a Conversation."
- **Secondary:** transparent bg, 1px teal border, teal text. Hover: teal/8 fill. Used for "Explore services."
- **Ghost:** 1px rule-bright border, ink-soft text. Hover: surface-2. Used in navigation, sub-actions.

No border-radius on any button. Sharp geometry throughout.

### Cards

`border-radius: 0`. 1px `rule` border. Background: surface-1. Padding: 32–40px. No box-shadow. Elevation solely through color contrast. Internal dividers: 1px rule.

Service cards use the service code (A1, B2, C3) in JetBrains Mono + teal as the primary identifier — no icons.

### Labels / Eyebrows

JetBrains Mono, 10.5–11px, `text-transform: uppercase`, `letter-spacing: 0.16em`. Color: teal on dark surfaces, ink-mute for secondary metadata. **One eyebrow per section at most.** Not every section gets one.

### Risk Spectrum Device

Five segments: Managed(teal-dim→teal) → Baseline(teal) → Monitor(ink-soft) → Elevated(coral-dim) → Critical(coral). 2px gaps between segments. `border-radius: 0`. Animates `scaleX(0→1)` staggered at 90ms per segment on mount, 1100ms duration, `cubic-bezier(0.16,1,0.3,1)`.

The five-stop client palette (from brand deliverable, May 2026):
`#2C5251` Dark Teal → `#71D2CF` Tidal Aqua → `#C5ECFE` Glacier Sky → `#FFB9BB` Blush Rose → `#FF5B5E` Coral Ember.
Secondary: `#2C2D52` Indigo Current, `#1E1E2E` Midnight Ink.

In data visualizations, color encodes severity semantically: teal = managed/positive, `#E88060` elevated = warning, coral = critical/overrun. Never decorative — always diagnostic.

### Outcome Distribution Chart (CoreBelief section)

Stacked horizontal bar, 4 segments proportional to the 8/22/28/42 breakdown. Each segment `scaleX(0→1)` from left edge, staggered 90ms per segment. Percentage label + descriptor above each segment in matching color, `overflow-visible` to handle the narrow 8% segment. Source line below in JetBrains Mono 8.5px haze.

### Data/Metadata Rows

Service metadata (timeline, fee range): JetBrains Mono, 10px, uppercase, ink-mute key + ink-soft value. Horizontal flex, 28–36px gap. Always below the service description.

### Grid Texture

Repeating vertical rule lines: `repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 96px)`. Applied as `background-image` on dark sections. Pure `pointer-events: none`, `position: absolute, inset: 0`.

## Layout

- Max-width: 1280px (`max-w-site`)
- Horizontal padding: `clamp(24px, 5vw, 64px)`
- Section padding: `clamp(80px, 10vw, 128px)` vertical
- Grid: CSS Grid for 2D, Flexbox for 1D
- Responsive without named breakpoints where possible: `repeat(auto-fit, minmax(280px, 1fr))`

Z-index scale: dropdown(10) → sticky(20) → modal-backdrop(30) → modal(40) → toast(50) → tooltip(60).

## Motion

**Philosophy:** Intentional and restrained. Motion reveals hierarchy; it does not perform.

- **Entry reveals:** opacity `0→1` + `translateY(20px→0)` via IntersectionObserver. Duration: 700ms, `cubic-bezier(0.2,0.7,0.2,1)`. Default initial state is visible (not hidden) — the class triggers a transition, not a gate.
- **List stagger:** 80ms delay per item within a group.
- **Hero sequence:** staggered delays 0ms / 100ms / 200ms / 300ms / 440ms across elements.
- **Risk spectrum:** `scaleX(0→1)`, 90ms per-segment stagger, 1100ms, `cubic-bezier(0.16,1,0.3,1)`.
- **Hover:** 180ms ease-out. Transform + color only.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` collapses all transforms to opacity-only, 150ms.

## Iconography

No decorative icons. Service codes (A1, B1, C3) in JetBrains Mono replace icons. Risk states use color, not icons. Directional cues use `→` in JetBrains Mono.
