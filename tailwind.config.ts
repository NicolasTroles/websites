import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * Paleta "lumberjack": floresta e madeira queimada, não o marrom de
         * couro/alfaiataria nem o dourado de chopp já usados em outros
         * projetos. Base escura puxa pro verde-preto (mata fechada à noite),
         * não pro marrom neutro.
         */
        bark: '#12160F', // fundo escuro principal
        pine: '#1C2216', // cards/elevação sobre o escuro
        barkLine: '#2A3320', // divisores no escuro
        paper: '#F3ECD9', // texto principal no escuro (papel/pergaminho, não branco)
        fern: '#A9B78E', // texto secundário no escuro (8.6:1 sobre bark)

        /* Família clara: papel de barbearia antiga, usado com parcimônia. */
        cream: '#F4EEE1', // fundo claro
        creamDeep: '#E9E0CB', // cards sobre o claro
        creamLine: '#D8CCA9', // divisores no claro
        ink: '#12160F', // texto principal no claro (mesmo tom do fundo escuro)
        inkSoft: '#55503F', // texto secundário no claro (6.9:1 sobre cream)

        /*
         * Acento duplo: ferrugem/couro de machado (uso principal, CTAs) +
         * verde-pinheiro (uso pontual, tags e ícones decorativos).
         * rust só sobre fundo escuro (4.9:1). Texto corrido sobre cream usa
         * obrigatoriamente rustDeep (6.3:1).
         */
        rust: '#CB6A2E',
        rustDeep: '#8A431A',
        spruce: '#5C7A4E',
      },
      fontFamily: {
        // Slab serif robusta — crachá/etiqueta de barbearia vintage, o
        // oposto da condensada em caixa-alta usada no projeto de chopp e da
        // serifada fina do projeto de alfaiataria.
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wide2: '0.16em',
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
