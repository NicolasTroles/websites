import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * Palette handed down by the client's brand guide — four fixed
         * values, not a free choice:
         *   Azul petróleo #0B2B3A — symbol, "ACTIVA" wordmark, institutional text
         *   Amarelo energia #F4B41A — activation point, accents, highlights
         *   Branco #FFFFFF — primary background, breathing room
         *   Preto #000000 — monochrome / high-contrast applications
         *
         * The real logo (public/logo.png) is petrol + amber on a transparent/
         * light ground, so it only reads on light backgrounds — that fixes
         * white as the dominant field, not petrol. Petrol is reserved for
         * text-on-white (matches "textos institucionais" in the brand table)
         * and for the one or two darker, moodier sections (the technical-
         * authority band, the mobile bar); pure black is kept for exactly one
         * section — the closing CTA — as the deliberate "alto contraste"
         * moment the brand table calls out, distinct from the everyday petrol
         * dark tone.
         *
         * `charcoal`/`steel`/`chalk`/`mist` etc. keep the same names used
         * across Photo/Reveal/Actions so those shared components need no
         * changes — only the hex values move to this palette.
         */

        // Light family — carries most of the page.
        floor: '#FFFFFF', // primary background (branco)
        floorDeep: '#EEF3F5', // cards / alternate panels on white
        floorLine: '#DCE6EA', // dividers on white
        ink: '#0B2B3A', // primary text on white — azul petróleo, as specified
        inkSoft: '#3F5D69', // secondary text on white (7.2:1)

        // Dark family — petrol, used sparingly (authority section, mobile bar, header-on-scroll never needed since header sits on white).
        charcoal: '#0B2B3A', // azul petróleo — dark section background
        steel: '#123244', // cards / elevation on petrol
        steelLine: '#28536A', // dividers on petrol
        chalk: '#FFFFFF', // primary text on petrol / on black (branco)
        mist: '#A9C0C9', // secondary text on petrol (7.6:1)

        // Single accent — amarelo energia. safetyDeep is the AA-on-white
        // text variant (F4B41A fails contrast on white at ~1.9:1).
        safety: '#F4B41A',
        safetyDeep: '#7A5A0D',

        // Preto — reserved for the one high-contrast section (final CTA).
        void: '#000000',
      },
      fontFamily: {
        // Archivo: a bold, technical grotesk — engineering nameplate energy
        // without the construction-signage cliché of a condensed face.
        // Manrope: a clean geometric sans for body copy, legible and
        // unfussy. Neither pairing has been used on a prior client site
        // (Inter, Playfair Display, Space Grotesk, Oswald, DM Sans, IBM
        // Plex Mono all already spoken for).
        display: ['var(--font-display)', 'Arial', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wide2: '0.14em',
      },
      maxWidth: {
        prose: '62ch',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'draw-line': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'draw-line': 'draw-line 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 26s linear infinite',
        'pulse-slow': 'pulse 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
