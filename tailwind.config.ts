import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * Site majoritariamente escuro (tendência 2026 para marcas de
         * bebida/craft: acento saturado só "estoura" sobre fundo escuro).
         * Base marrom-quase-preto, como o fundo de um copo de chopp escuro
         * contra a luz, nunca preto neutro.
         */
        stout: '#14100C', // fundo escuro principal
        cask: '#201709', // cards/elevação sobre o escuro
        caskLine: '#362510', // divisores no escuro
        foam: '#FBF3E2', // texto principal no escuro (cor da espuma, não branco)
        barley: '#C9B48C', // texto secundário no escuro

        /* Família clara: usada com parcimônia, para respirar entre os blocos escuros. */
        wheat: '#F3E6C8', // fundo claro
        wheatDeep: '#E8D7AE', // cards sobre o claro
        wheatLine: '#D9C494', // divisores no claro
        copperDeep: '#7A4413', // texto secundário no claro (contraste 6.4:1 sobre wheat)

        /*
         * Acento duplo: dourado do chopp servido (uso principal, CTAs e
         * destaques) + verde-lúpulo (uso pontual, tags e detalhes de craft).
         * amber só sobre fundo escuro (9.5:1). Nenhum texto corrido usa amber
         * sobre wheat — cai para ~3.9:1, abaixo de AA.
         */
        amber: '#F2A93B',
        hop: '#8FA644',
      },
      fontFamily: {
        // Display bem expressiva, condensada, maiúscula — rótulo de chopp,
        // não alfaiataria: o oposto da serifada usada nos outros projetos.
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.28em',
      },
      maxWidth: {
        prose: '65ch',
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
        rise: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '0.6' },
          '100%': { transform: 'translate3d(0, -140%, 0)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'draw-line': 'draw-line 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
        // Ticker de marcas: 50% porque a faixa duplica o conteúdo (ver Marquee.tsx).
        marquee: 'marquee 28s linear infinite',
        // Bolhas subindo no fundo do hero — sutil, decorativo, `aria-hidden`.
        rise: 'rise 4.5s ease-in infinite',
      },
    },
  },
  plugins: [],
};

export default config;
