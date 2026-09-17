import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * Dark family — lifted from the client's banner: a deep, slightly
         * desaturated petroleum navy. It is the "documento arquivado" mood
         * (dossier, capa dura), not a tech-startup blue-black. Sections that
         * carry authority (hero, SG3, the compliance field) sit on it.
         */
        navy: '#0A1E2C',
        navySoft: '#12293A', // cards / panels on navy
        navyLift: '#1A3548', // hover state of those panels
        navyLine: '#20394C', // hairlines on navy
        slate: '#93A8B8', // secondary text on navy — 6.9:1
        dim: '#7B8FA1', // fine print on navy — 5.1:1, do not darken
        mist: '#E8EEF3', // primary text on navy — 14.5:1

        /*
         * Light family — carries most of the page, because the brief asked for
         * more white space than the banner has. Cool paper, never warm cream.
         */
        paper: '#F5F7F9',
        paperDeep: '#EAEFF3', // cards on paper
        paperLine: '#D6DFE6', // hairlines on paper
        ink: '#0C1822', // primary text on paper — 16.6:1
        inkSoft: '#46586A', // secondary text on paper — 6.8:1

        /*
         * Accent — the green of the "RR" monogram. Two values because the
         * bright one reads at 5.9:1 on navy but fails on paper; any green text
         * or icon on a light background uses the Deep variant (5.4:1).
         */
        emerald: '#3FA98A',
        emeraldDeep: '#1E7358',

        /*
         * Status pair, used only where the site talks about document state
         * (pending vs. regular): the WebGL compliance field, the diagnostic
         * list, the status chips. Never decorative — amber on this site always
         * means "pendência".
         */
        amber: '#E0A340', // 7.7:1 on navy
        amberDeep: '#8F5F10', // 5.1:1 on paper
      },
      fontFamily: {
        // Wide grotesque, echoing the squared wordmark of the logo.
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        // Public Sans was drawn for US federal documents — a regulatory voice
        // for a site about regulatory paperwork.
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        // Document codes: NR-35, ASO, PGR, prazos.
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.22em',
      },
      maxWidth: {
        prose: '66ch',
      },
      transitionTimingFunction: {
        // One curve for the whole site. No bounce: this is a compliance site.
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'sweep-x': {
          from: { transform: 'translate3d(-100%, 0, 0)' },
          to: { transform: 'translate3d(100%, 0, 0)' },
        },
        'marquee': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        'sweep-x': 'sweep-x 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
