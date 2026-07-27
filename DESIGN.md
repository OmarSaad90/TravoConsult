---
name: Travo
description: Quantitative construction risk advisory for the NJ/NY metropolitan capital project market.
colors:
  midnight-ink: "#1E1E2E"
  midnight-ink-surface: "#252538"
  indigo-current: "#2C2D52"
  canvas: "#F5F7FB"
  canvas-elevated: "#EBEFF8"
  snow: "#E6EAF4"
  slate: "#8A95B2"
  haze: "#828DA6"
  ink-secondary: "#323B5B"
  ink-muted: "#5F6884"
  tidal-aqua: "#71D2CF"
  tidal-aqua-deep: "#3EA6A3"
  harbor-teal: "#2C5251"
  harbor-teal-deep: "#1C3A39"
  coral-ember: "#FF5B5E"
  blush-rose: "#FFB9BB"
  glacier-sky: "#C5ECFE"
  rule-dark: "#28283E"
  rule-light: "#D5D9E8"
typography:
  display:
    fontFamily: '"Barlow Condensed", system-ui, sans-serif'
    fontSize: "clamp(2.6rem, 4.8vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: '"Barlow Condensed", system-ui, sans-serif'
    fontSize: "clamp(2rem, 3.8vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 0.97
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Barlow Condensed", system-ui, sans-serif'
    fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "-0.015em"
  body:
    fontFamily: '"Barlow", system-ui, sans-serif'
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.78
  label:
    fontFamily: '"JetBrains Mono", Menlo, monospace'
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  none: "0px"
spacing:
  section-sm: "72px"
  section-md: "96px"
  section-lg: "120px"
  section-xl: "152px"
  card-inner: "28px"
  card-inner-lg: "40px"
components:
  button-primary:
    backgroundColor: "{colors.tidal-aqua}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.tidal-aqua-deep}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.tidal-aqua}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-cta-risk:
    backgroundColor: "{colors.coral-ember}"
    textColor: "{colors.snow}"
    rounded: "{rounded.none}"
    padding: "15px 32px"
  button-contact:
    backgroundColor: "{colors.harbor-teal}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
---

# Design System: Travo

## 1. Overview

**Creative North Star: "The Precision Instrument"**

Travo's visual language belongs to a specific lineage: precision instruments, trading terminals, federal infrastructure specifications, and engineering reports. These environments run dark not for aesthetic preference but because darkness signals that the work inside is serious. The design makes the same argument. A Midnight Ink (#1E1E2E) surface greets the user on arrival and establishes conviction immediately. A cool near-white (canvas, #F5F7FB) carries the dense analytical content that follows. The split is not decorative; it is structural positioning: dark = "who we are and why it matters," light = "here is the methodology in detail."

Every element earns its place by demonstrating methodology rather than claiming it. The Gaussian distribution curve is the firm's organizing symbol — the visual proof that Travo works with probability distributions rather than point estimates. Charts, probability ranges, and structured data catalogs carry this argument throughout. Where a generic consultancy would use a photo of a handshake, Travo shows a Monte Carlo simulation. The design is the credential.

The palette originates directly from the client's official brand deliverable: seven named color families on a continuous Dark Teal to Coral Alert spectrum. Teal is the north of the system — Travo's affirmative state, managed risk, precision. Coral is the south — overrun, critical, urgency. Every data element uses this spectrum semantically. Color here is never decorative; it is diagnostic.

**Key Characteristics:**
- Sharp corners throughout. Zero border-radius on all interactive elements, cards, and panels. Geometry signals that precision matters.
- No box-shadows. Depth is achieved entirely through tonal contrast between surface layers.
- Two font families: Barlow Condensed + Barlow (one family, two widths) as the single voice, with JetBrains Mono as the technical counterpart for all data, labels, and codes.
- Uppercase mono labels function as the system's structural markers — never decorative eyebrows, always functional identifiers.
- Motion is expo-out (`cubic-bezier(0.16,1,0.3,1)`) throughout: decisive entry, graceful landing. Elements arrive fast and settle; nothing floats in slowly.

## 2. Colors: The Travo Spectrum

The palette is a continuous diagnostic spectrum — managing to critical — with a structural neutral family underneath.

### Primary
- **Tidal Aqua** (`#71D2CF`): The brand accent. Applied on dark surfaces for highlights, headings, active states, links, and the positive end of the risk spectrum. Used sparingly — its rarity is intentional.
- **Tidal Aqua Deep** (`#3EA6A3`): Hover/active state of Tidal Aqua. Also used as a secondary data element color in charts (P10 markers, map dots).

### Secondary
- **Coral Ember** (`#FF5B5E`): Risk indicator and the single primary CTA color (ClosingCTA). Applied to the critical/overrun end of all data visualizations. Semantically: something requires action.
- **Blush Rose** (`#FFB9BB`): Mid-high spectrum — between managed and critical. Used for the "Monitor/Elevated" band in the risk gauge and as the P80 (conservative) marker in distributions. Softer than coral; still a warning tone.
- **Glacier Sky** (`#C5ECFE`): Lightest spectrum stop. Confidence bands, second-highest percentile bands, the managed/baseline zone. Used for light chart fills and the "Baseline" gauge segment.

### Tertiary
- **Harbor Teal** (`#2C5251`): The structural accent on light (canvas) sections. Used for section headings in teal-like roles, the contact submit button, decorative accent rules, and all chart text labels on canvas backgrounds (7.88:1 contrast ratio). The "forest green" face of Travo's teal identity.
- **Indigo Current** (`#2C2D52`): Hover/elevated surface on dark — the tertiary dark layer above Midnight Ink surface.

### Neutral
- **Midnight Ink** (`#1E1E2E`): Dark section background. Body background. Hero, ServicesOverview, IndexTeaser, ClosingCTA, Footer.
- **Midnight Ink Surface** (`#252538`): Elevated card background on dark. The panel surface in Hero, service cards on hover.
- **Canvas** (`#F5F7FB`): Light section background. Cool-tinted near-white, tinted toward the teal/navy hue — never cream or sand.
- **Canvas Elevated** (`#EBEFF8`): Elevated surface on light sections. Form field backgrounds.
- **Snow** (`#E6EAF4`): Primary text on dark surfaces.
- **Slate** (`#8A95B2`): Secondary text and body copy on dark surfaces.
- **Haze** (`#828DA6`): Metadata, labels, mono captions on dark surfaces.
- **Ink Secondary** (`#323B5B`): Secondary body text on light surfaces.
- **Ink Muted** (`#5F6884`): Metadata and captions on light surfaces.
- **Rule Dark** (`#28283E`): Dividers and borders on dark surfaces.
- **Rule Light** (`#D5D9E8`): Dividers and borders on light surfaces.

### Named Rules
**The Semantic Spectrum Rule.** Teal is always managed/positive. Coral is always critical/overrun. Blush Rose and Glacier Sky occupy the middle ground. These colors encode risk state diagnostically — they are never reassigned for aesthetic variety. An accent that means "critical" in one chart and "primary action" in another creates ambiguity the firm cannot afford.

**The No-Warmth Rule.** The canvas background is `#F5F7FB` — a cool near-white tilted toward the navy hue. The warm-neutral band (cream, sand, parchment) is prohibited. It signals "soft consultancy" rather than "analytical authority."

## 3. Typography

**Display Font:** Barlow Condensed (700, 800 weight) with system-ui fallback
**Body Font:** Barlow (400, 500, 600 weight) with system-ui fallback
**Label/Mono Font:** JetBrains Mono (400, 500 weight) with Menlo fallback

**Character:** Barlow Condensed at heavy weights reads like federal infrastructure signage — authority without ornament. Barlow Regular in body keeps the analytical prose legible at density. JetBrains Mono marks every technical element (service codes, metric values, labels, percentile markers) as data, not copy. Two families total — the constraint itself signals precision.

### Hierarchy
- **Display** (800, `clamp(2.6rem, 4.8vw, 4.4rem)`, line-height 0.95): Hero h1 only. Four distinct lines, individually stagger-revealed. This is the one moment in the page where the heading dominates the viewport.
- **Headline** (800, `clamp(2rem, 3.8vw, 3.4rem)`, line-height 0.97): Section h2 headings throughout. Single solid color (ink on light sections, snow on dark) — no per-word or per-line accent color. `text-wrap: balance` applied.
- **Large Headline** (800, `clamp(2.4rem, 4.8vw, 4.2rem)`, line-height 0.97): Used for CoreBelief and IndexTeaser — sections with longer headings that need more vertical impact.
- **Title** (700, `clamp(1.5rem, 2.4vw, 2.1rem)`, line-height 1.0): Sub-section headings, card group titles, differentiator headings (WhyTravo cards).
- **Card Heading** (700, `clamp(1rem, 1.5vw, 1.25rem)`, line-height 1.1): Service names, bento card headings. Still Barlow Condensed — the family does not switch to Barlow Regular for headings at any level.
- **Body** (400, 17px, line-height 1.78): Section prose. `text-wrap: pretty`. Max-width `64–72ch` enforced inline. On dark sections: Slate (`#8A95B2`). On light sections: Ink Secondary (`#323B5B`).
- **Body Small** (400, 13.5–15px, line-height 1.65): Secondary prose, card descriptions, service descriptions. Same color rules as body.
- **Label** (400, 9–10.5px, JetBrains Mono, uppercase, tracking 0.16em): Section kickers, service codes (A1, B3), metadata keys. Color: Tidal Aqua on dark, Harbor Teal or Haze on light. Reserved for structural identifiers, not decorative eyebrows.
- **Data** (400, 11–12.5px, JetBrains Mono, tracking 0.10em): Metric values, timeline/fee data rows, percentile markers (P10/P50/P80), chart axis labels.

### Named Rules
**The Barlow-Only Rule.** All headings at every level use Barlow Condensed, not Barlow Regular. The condensed width is load-bearing; it gives headings their distinctive vertical authority. Never substitute Barlow (regular width) for heading text at any scale.

**The No-Body-Caps Rule.** Uppercase is reserved for labels (≤4 words, JetBrains Mono), service codes, and ticker text. Sentence-case headings and body copy throughout — the analysis is already authoritative; it does not need to shout.

## 4. Elevation

This system is flat-by-default. No box-shadows exist on any component. Depth is achieved entirely through tonal contrast between surface layers: Midnight Ink (`#1E1E2E`) as the base, Midnight Ink Surface (`#252538`) as cards and panels on dark sections, Canvas Elevated (`#EBEFF8`) as form fields and elevated elements on light sections. A surface that is lighter than its container reads as raised; one that is darker reads as recessed.

The dark sections carry a grid texture overlay (`repeating-linear-gradient(90deg, rgba(255,255,255,0.028) 0 1px, transparent 1px 96px)`) applied as an absolute `pointer-events: none` layer. This adds structural depth without adding shadows. Light sections have an equivalent `rgba(12,18,34,0.06)` grid line. Both are decorative only — they do not define layout.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Elevation is tonal, not shadow-based. If you find yourself adding `box-shadow`, you are solving the wrong problem. Use a darker or lighter background instead.

## 5. Components

### Buttons
Buttons are the sharpest element in the system: zero border-radius, uppercase mono labels, no icons. The geometry signals analytical confidence.

- **Shape:** No radius (0px) on all variants.
- **Primary (dark sections):** Tidal Aqua background (`#71D2CF`), Midnight Ink text (`#1E1E2E`). Padding: 14px 28px. Label: JetBrains Mono 11px, tracking 0.12em, uppercase. Hover: Tidal Aqua Deep (`#3EA6A3`). Used for "Start a Conversation" on dark sections.
- **Secondary (dark sections):** Transparent background, 1px Tidal Aqua border at 50% opacity, Tidal Aqua text. Hover: border fully opaque, Tidal Aqua at 8% fill. Used for "View Service Catalog."
- **Risk CTA:** Coral Ember background (`#FF5B5E`), Snow text. Padding: 15px 32px. Hover: 90% opacity. Used for the ClosingCTA section — one per page, never repeated.
- **Contact/Submit (light sections):** Harbor Teal background (`#2C5251`), Canvas text. Hover: Harbor Teal Deep (`#1C3A39`). Used in Contact form and footer.
- **Index Teaser CTA (dark, outline):** Transparent background, 1px Tidal Aqua border at 60% opacity, Tidal Aqua text. Hover: Tidal Aqua background with Midnight Ink text (full fill). Used for lower-commitment newsletter/index actions.

### Tabs
Used in ServicesOverview for the A/B/C service category selector.
- **Container:** Border-bottom `rule-dark`. No background.
- **Tab:** JetBrains Mono 10px uppercase label + Barlow Condensed extrabold category letter (A/B/C) at `clamp(1.4rem, 2vw, 1.8rem)`. Padding: 16px 24px.
- **Active state:** Category accent color text + 2px bottom indicator line in the same color.
- **Inactive state:** Slate text (`#8A95B2`). Hover: category color text.
- **Category accent colors:** A = Tidal Aqua, B = Blush Rose, C = Coral Ember.

### Cards / Panels
- **Corner Style:** No radius (0px) on all card variants.
- **Dark cards (Service cards):** Midnight Ink background, 1px gap separation (no explicit border, gap is `rule-dark` between items). Padding: 24px. Hover: Midnight Ink Surface (`#252538`).
- **Light cards (Bento/WhatWeDo):** Canvas background, 1px `#DDE2EE` gap as grid separator. Padding: 28px. No border on individual cards — the grid gap defines them.
- **Hero panel:** Midnight Ink Surface background (`#252538`), 1px `rule-dark` border. Padding: 24px. Contains the Monte Carlo distribution visualization.
- **Shadow Strategy:** None. See Elevation section.

### Inputs / Fields
Used in ContactSection.
- **Style:** Canvas Elevated background (`#EBEFF8`), 1px `rule-light` border. No radius. Padding: 12px 14px.
- **Typography:** Barlow 15px, Ink color. Placeholder: Ink Muted (`#5F6884`).
- **Focus:** Border color shifts to Harbor Teal (`#2C5251`). No glow or shadow.
- **Label:** JetBrains Mono 9.5px, uppercase, tracking 0.16em, Ink Muted.

### Navigation (Header)
- **Style:** Sticky top. Initial: transparent with faint `rule-dark/60` bottom border. Scrolled (>24px): `midnight-ink/95` with `backdrop-blur-md` and `rule-dark` border.
- **Height:** 68px.
- **Wordmark:** Barlow Condensed bold 22px, tracking 0.06em, Snow. Hover: Tidal Aqua.
- **Nav links:** JetBrains Mono 10.5px, uppercase, tracking 0.16em, Haze. Hover: Slate.
- **CTA pill:** JetBrains Mono 10.5px, Tidal Aqua text, 1px Tidal Aqua border. Hover: Tidal Aqua background, Midnight Ink text.
- **Mobile:** Collapsed max-height accordion with opacity transition. Full-width links at 11.5px mono, 15px vertical padding, border-bottom separators.
- **Entrance:** Slides in from translateY(-10px) + opacity 0 on page load. Duration: 0.65s expo-out, 80ms delay.

### Signature Component: The Risk Spectrum
The five-segment horizontal bar appears in the Hero as the "Risk Posture" gauge and echoes through all data visualizations. It is the firm's central diagnostic device.
- Five segments: Managed (Tidal Aqua), Baseline (Glacier Sky), Monitor (Blush Rose), Elevated (Coral Ember at ~75%), Critical (Coral Ember full).
- 2px gaps between segments. Zero border-radius. Height 38px in hero gauge.
- Each segment `scaleX(0→1)` from left, 950ms cycle per position, `cubic-bezier(0.16,1,0.3,1)`.
- The label row beneath uses matching color text with a live-updating active weight.

### Data Labels / Mono Metadata Rows
Service metadata rows (Timeline, Fee): JetBrains Mono, label at 9px uppercase tracking 0.16em in Haze, value at 11.5px in Slate. Horizontal flex, 32px gap. Always below the prose description, separated by `rule-dark`/`rule-light` top border.

## 6. Do's and Don'ts

### Do:
- **Do** use Midnight Ink (`#1E1E2E`) as the dark section background — not any darker navy or blued-black that predates the official palette.
- **Do** use Harbor Teal (`#2C5251`) for all text labels and annotations on canvas (light) backgrounds — it achieves 7.88:1 contrast and is the right semantic choice for chart labels.
- **Do** use the full five-stop risk spectrum semantically: teal = managed/positive, glacier sky = baseline, blush rose = monitor/moderate, blush-coral = elevated, coral ember = critical. Never apply these colors decoratively outside of data contexts.
- **Do** keep all corners sharp. Zero border-radius on buttons, cards, panels, inputs, and dividers. The geometry is load-bearing.
- **Do** use JetBrains Mono for all data: service codes (A1, B2), percentile markers (P10/P50/P80), metric values, chart labels, form labels. Barlow for all prose and headings. Never swap these roles.
- **Do** apply `text-wrap: balance` on all h1–h3 and `text-wrap: pretty` on all body prose.
- **Do** use `cubic-bezier(0.16,1,0.3,1)` (expo-out) for all transitions and reveals. This easing is the motion signature of the system.
- **Do** stagger list reveals at 40–80ms per item; cap total stagger at ~500ms for any single group.
- **Do** include a `prefers-reduced-motion` override that collapses all animation-duration and transition-duration to 0.01ms.
- **Do** restrict Coral Ember CTAs to one per page maximum. The ClosingCTA section owns this color; secondary actions use Tidal Aqua or Harbor Teal.

### Don't:
- **Don't** use the old palette: `#09111F` (old navy), `#0E1A2E` (old navy-1), `#E88060` (off-palette orange), `#1C4A42` (old forest). These were replaced with the official client palette. Any value not in the `colors` frontmatter above is a violation.
- **Don't** use generic management consultancy aesthetics: corporate navy stock-photo designs, KPMG-style navy-and-white grids, or anything that reads as "one of many." Travo is the regional standard, not a firm pitching to join the market.
- **Don't** use warm artisan aesthetics: cream, sand, parchment, or any near-white with warm tinting. Canvas (`#F5F7FB`) is cool-tinted. Any background that reads as "cozy" or "soft" undermines the analytical authority.
- **Don't** use startup SaaS or risk-tech aesthetics: gradient hero dashboards, animated metric counters as primary hero content, purple UI, neon glows, glassmorphism panels. Travo is an advisory practice, not a software vendor.
- **Don't** use finance-luxury aesthetics: black with gold accents, wealth-management energy. Flash over substance conflicts directly with the firm's "demonstrated methodology over claimed credentials" positioning.
- **Don't** add box-shadows to any component. Elevation is tonal only; shadows signal a UI library aesthetic rather than an engineered one.
- **Don't** use border-left or border-right greater than 1px as a colored accent stripe on cards or list items.
- **Don't** use gradient text (`background-clip: text`). Emphasis is via weight and size, not color gradients.
- **Don't** apply Barlow Regular (non-condensed) to headings at any level. Barlow Condensed is the heading voice at all scales.
- **Don't** re-use Coral Ember for non-risk contexts. It reads as "critical/overrun" throughout the system; using it as a decorative accent outside of data contexts creates ambiguity.
- **Don't** write aphoristic copy cadence: the pattern of "Serious statement. Then a short punchy negation." If three or more copy blocks across the page land on a one-sentence rebuttal, rewrite toward specific methodology language.
