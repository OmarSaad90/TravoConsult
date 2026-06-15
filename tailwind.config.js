/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Dark surfaces ──────────────────────────────
        navy:      '#09111F',   // dark section background
        'navy-1':  '#0E1A2E',   // card on dark
        'navy-2':  '#152035',   // hover on dark

        // ── Light surfaces ─────────────────────────────
        canvas:    '#F5F7FB',   // light section background (cool near-white, NOT cream)
        'canvas-1':'#EBEFF8',   // elevated on light

        // ── Text on dark ───────────────────────────────
        snow:      '#E6EAF4',   // primary text on dark
        slate:     '#8A95B2',   // secondary text on dark
        haze:      '#828DA6',   // muted / metadata on dark (≥4.5:1 on navy)

        // ── Text on light ──────────────────────────────
        ink:       '#0C1222',   // primary text on light
        'ink-2':   '#323B5B',   // secondary text on light
        'ink-3':   '#5F6884',   // muted / metadata on light

        // ── Accents ────────────────────────────────────
        teal:        '#71D2CF', // brand accent — dark sections + data elements
        'teal-deep': '#3EA6A3', // hover / active teal
        'teal-dim':  '#0B2726', // teal tint on dark

        forest:      '#1C4A42', // primary accent on light sections
        'forest-2':  '#143630', // deeper forest hover

        coral:       '#FF5B5E', // risk indicator / primary CTA
        'coral-dim': '#29090B', // coral tint
        elevated:    '#E88060', // mid-spectrum / elevated risk state (between teal and coral)
        'air-blue':  '#C5ECFE', // lightest spectrum stop — confidence bands on light bg

        // ── Rules ──────────────────────────────────────
        'rule-d':  '#162030',   // divider on dark
        'rule-l':  '#D5D9E8',   // divider on light
      },

      fontFamily: {
        display: ['"Barlow Condensed"', 'system-ui', 'sans-serif'],
        sans:    ['Barlow', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'Menlo', 'monospace'],
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
