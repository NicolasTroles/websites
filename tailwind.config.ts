import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * Duas famílias que se alternam ao longo da página.
         *
         * O escuro é preto-amarronzado, nunca preto neutro: preto puro lê como
         * tecnologia, e alfaiataria precisa de calor. Referência tirada do CSS
         * da Alfaiataria Estravagância (#0F0D0D) e do LV Alfaiataria.
         */
        ink: '#12100E', // fundo escuro, quente
        surface: '#1B1815', // cards sobre o escuro
        elevated: '#242019',
        line: '#332E28', // divisores no escuro
        silver: '#BFB6A8', // texto secundário no escuro
        muted: '#8C8377',
        bone: '#F7F3EC', // texto principal no escuro (creme, não branco)

        /* Família clara: carrega a maior parte do site. */
        sand: '#F2EDE4', // fundo claro
        sandDeep: '#E7DFD2', // cards sobre o claro
        sandLine: '#D6CCBB', // divisores no claro
        cocoa: '#2A2320', // texto principal no claro
        cocoaSoft: '#5C5147', // texto secundário no claro

        /* Acento único, usado com parcimônia em ambos os fundos. */
        // platinum só sobre fundo escuro (8.8:1). Sobre o bege ele cai para 1.9:1,
        // então texto prateado no claro usa obrigatoriamente platinumDeep (5.7:1).
        platinum: '#ABB1B8',
        platinumDeep: '#585D62',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.32em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        // Curva única para todo o site: entradas suaves, sem elástico.
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
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'draw-line': 'draw-line 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
