/**
 * Elementos de marca desenhados em SVG para este projeto: um copo de chopp
 * estilizado (logo) e uma borda de espuma (divisor entre blocos escuros e
 * claros), no lugar da linha reta comum a esse tipo de site.
 */

type IconProps = {
  className?: string;
};

/** Copo de chopp com espuma — logo principal, usado no header e no rodapé. */
export function BeerMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true" focusable="false">
      {/* corpo do copo */}
      <path d="M18 22h22l-2.4 34a4 4 0 0 1-4 3.6H24.4a4 4 0 0 1-4-3.6L18 22Z" fill="currentColor" />
      {/* alça */}
      <path
        d="M40 27h6a5 5 0 0 1 5 5v4a5 5 0 0 1-5 5h-7"
        stroke="currentColor"
        strokeWidth={3.4}
        strokeLinecap="round"
      />
      {/* espuma */}
      <path
        d="M15.5 20c-.6-3 1.3-5.5 3.8-5 .6-2.7 3.6-4 5.8-2.4 1.4-2.6 5.4-2.6 6.6.2 2-1.8 5.6-.4 5.8 2.4 2.6-1 5 1.6 3.9 4.8-.4 1.2-1.6 2-2.9 2H18.3c-1.3 0-2.4-.8-2.8-2Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

/**
 * Divisor de bloco: borda de espuma irregular, no lugar de uma linha reta.
 * `flip` inverte a curva para uso no topo ou na base de um bloco escuro.
 */
export function FoamEdge({ className, flip = false }: IconProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className={`${flip ? 'rotate-180' : ''} ${className ?? ''}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 40V18c40-12 90-16 140-8 55 10 95 22 150 20 60-2 100-22 160-22 65 0 100 20 165 20 60 0 95-18 155-20 60-2 100 14 155 20 55 6 105-4 145-14 45-11 95-15 130-4v30H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Divisor curto de seção: fio + copo centralizado. */
export function SectionDivider({
  className,
  tone = 'dark',
}: IconProps & { tone?: 'light' | 'dark' }) {
  const light = tone === 'light';
  return (
    <div className={`flex items-center justify-center gap-5 ${className ?? ''}`} aria-hidden="true">
      <span
        className={`h-px w-16 bg-gradient-to-r from-transparent sm:w-24 ${light ? 'to-wheatLine' : 'to-caskLine'}`}
      />
      <BeerMark className={`h-5 w-5 ${light ? 'text-copperDeep' : 'text-amber'}`} />
      <span
        className={`h-px w-16 bg-gradient-to-l from-transparent sm:w-24 ${light ? 'to-wheatLine' : 'to-caskLine'}`}
      />
    </div>
  );
}
