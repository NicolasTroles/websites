import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * Paleta "canteiro de obra": grafite/asfalto + amarelo de segurança,
         * não o marrom de barbearia/alfaiataria, o âmbar de chopp, nem o
         * verde/azul-petróleo já usados em outros projetos. A base escura
         * puxa pro cinza-chumbo neutro (ferramenta, metal), não pro
         * verde-preto ou marrom quente.
         */
        charcoal: '#181B1D', // fundo escuro principal (asfalto)
        steel: '#232830', // cards/elevação sobre o escuro (caixa de ferramentas)
        steelLine: '#333A44', // divisores no escuro
        chalk: '#F3EFE4', // texto principal no escuro (giz de obra, não branco)
        mist: '#AFB6B8', // texto secundário no escuro (7.1:1 sobre charcoal)

        /* Família clara: piso de concreto claro / papel de projeto. */
        floor: '#F1ECDF', // fundo claro
        floorDeep: '#E4DCC7', // cards sobre o claro
        floorLine: '#D3C7A9', // divisores no claro
        ink: '#1B1D1A', // texto principal no claro
        inkSoft: '#5A5648', // texto secundário no claro (5.3:1 sobre floor)

        /*
         * Acento duplo: amarelo de segurança (uso principal, CTAs, fita
         * zebrada) + azul-aço (uso pontual, tags e ícones decorativos, cor
         * de macacão/caixa de ferramentas). safety só com texto escuro em
         * cima (8.6:1). Texto corrido sobre floor usa obrigatoriamente
         * safetyDeep (6.1:1) ou steelBlueDeep.
         */
        safety: '#F4B400',
        safetyDeep: '#8A5E00',
        steelBlue: '#3E6B85',
        steelBlueDeep: '#254A5C',
      },
      fontFamily: {
        // Display condensado tipo placa de obra/estêncil — o oposto da slab
        // serif de barbearia, da serifada de alfaiataria e da mono técnica
        // de geo. Corpo em uma sans humanista neutra, ainda não usada nos
        // outros projetos (Inter, Work Sans, Manrope e Space Grotesk já
        // foram usadas).
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
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
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'draw-line': 'draw-line 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 22s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
