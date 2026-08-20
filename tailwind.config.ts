import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * Site majoritariamente branco: parede recém-pintada, não uma lata
         * fechada. O escuro vira acento pontual, não mais fundo padrão.
         */
        ink: '#1C1B19', // texto principal e títulos (quase preto, com calor)
        slate: '#5C594F', // texto secundário (7:1 sobre branco)
        muted: '#8C887C', // texto terciário — só para texto grande/decorativo (3.5:1)
        line: '#E8E6DF', // divisores e bordas sobre branco
        offwhite: '#F7F6F2', // fundo alternado, branco levemente quente

        /*
         * Cor única da marca: azul petróleo — nome real de cor de tinta no
         * Brasil. Mais saturada que antes porque agora carrega o site
         * (botões, ícones, a faixa cheia do "Como funciona"), não só um
         * detalhe sobre fundo escuro. Passa 4.5:1 nos dois sentidos sobre
         * branco (texto sobre branco e texto branco sobre ela).
         */
        petroleo: '#0B7285',
        petroleoDeep: '#084F5C', // hover, texto pequeno, faixa de destaque
        petroleoTint: '#E4F1F2', // fundo clarinho para badges e cards da marca
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
