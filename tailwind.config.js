/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Dark surfaces (Midnight Ink family) ────────
        navy:      '#1E1E2E',   // Midnight Ink 100 — dark section background
        'navy-1':  '#252538',   // Midnight Ink derived surface — card on dark
        'navy-2':  '#2C2D52',   // Indigo Current 100 — hover / elevated on dark

        // ── Light surfaces ─────────────────────────────
        canvas:    '#F5F7FB',   // light section background (cool near-white)
        'canvas-1':'#EBEFF8',   // elevated on light

        // ── Text on dark ───────────────────────────────
        snow:      '#E6EAF4',   // primary text on dark
        slate:     '#8A95B2',   // secondary text on dark
        haze:      '#828DA6',   // muted / metadata on dark (≥4.5:1 on navy)

        // ── Text on light ──────────────────────────────
        ink:       '#1E1E2E',   // Midnight Ink 100 — primary text on light
        'ink-2':   '#323B5B',   // secondary text on light
        'ink-3':   '#5F6884',   // muted / metadata on light

        // ── Accents ────────────────────────────────────
        teal:        '#71D2CF', // Tidal Aqua 100 — brand accent
        'teal-deep': '#3EA6A3', // Tidal Aqua 80 — hover / active teal
        'teal-dim':  '#111B1B', // Harbor Teal very dark tint

        forest:      '#2C5251', // Harbor Teal 100 — structural accent on light
        'forest-2':  '#1C3A39', // Harbor Teal dark — deeper hover

        coral:        '#FF5B5E', // Coral Ember 100 — risk indicator / primary CTA
        'coral-dim':  '#2A1010', // Coral Ember very dark tint
        'coral-warm': '#FF8B8D', // ~85% on the client gradient — Elevated zone, between blush and coral
        elevated:     '#FFB9BB', // Blush Rose 100 — 75% gradient anchor (Monitor zone)
        'air-blue':   '#C5ECFE', // Glacier Sky 100 — 50% gradient anchor

        // ── Rules ──────────────────────────────────────
        'rule-d':  '#28283E',   // divider on dark (just lighter than Midnight Ink)
        'rule-l':  '#D5D9E8',   // divider on light
      },

      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'Menlo', 'monospace'],
      },

      letterSpacing: {
        'display': '-0.025em',
        'tight':   '-0.015em',
        'label':   '0.16em',
        'data':    '0.10em',
      },

      maxWidth: {
        site: '1280px',
      },

      backgroundImage: {
        'grid-dark':  'repeating-linear-gradient(90deg, rgba(255,255,255,0.028) 0 1px, transparent 1px 96px)',
        'grid-light': 'repeating-linear-gradient(90deg, rgba(12,18,34,0.06) 0 1px, transparent 1px 96px)',
      },

      keyframes: {
        barGrow: {
          '0%':   { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'bar-grow': 'barGrow 1.1s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-up':  'fadeUp 0.7s cubic-bezier(0.2,0.7,0.2,1) forwards',
      },
    },
  },
  plugins: [],
};
