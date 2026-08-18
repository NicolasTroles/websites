/**
 * Marcas do site, redesenhadas em SVG a partir dos símbolos da fachada da loja
 * (cartola e silhueta de terno com gravata). Vetor próprio, não traçado da foto:
 * escala limpo do favicon 32px até a marca d'água de 800px do parallax.
 */

type IconProps = {
  className?: string;
};

/** Cartola — logo principal, usada no header e no favicon. */
export function TopHat({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* copa */}
      <path
        d="M20 8h24l2.5 34H17.5L20 8Z"
        fill="currentColor"
      />
      {/* faixa da copa. currentColor + opacidade funciona sobre qualquer fundo,
          diferente de um preto cravado, que sumiria no bege. */}
      <path d="M18.4 33h27.2l.5 7H17.9l.5-7Z" fill="currentColor" opacity="0.35" />
      {/* aba */}
      <ellipse cx="32" cy="45" rx="27" ry="6.5" fill="currentColor" />
    </svg>
  );
}

/** Silhueta de terno com gravata — elemento decorativo do parallax. */
export function SuitSilhouette({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* lapela esquerda */}
      <path d="M26 4 8 16v60h12l4-46 2-26Z" fill="currentColor" />
      {/* lapela direita */}
      <path d="M38 4l18 12v60H44l-4-46-2-26Z" fill="currentColor" />
      {/* gravata */}
      <path d="M32 6l5 6-3 6 4 26-6 8-6-8 4-26-3-6 5-6Z" fill="currentColor" />
    </svg>
  );
}

/** Divisor de seção: fio + cartola centralizada, no lugar de uma linha reta. */
export function SectionDivider({
  className,
  tom = 'escuro',
}: IconProps & { tom?: 'claro' | 'escuro' }) {
  const claro = tom === 'claro';
  return (
    <div
      className={`flex items-center justify-center gap-5 ${className ?? ''}`}
      aria-hidden="true"
    >
      <span
        className={`h-px w-16 bg-gradient-to-r from-transparent sm:w-24 ${claro ? 'to-sandLine' : 'to-line'}`}
      />
      <TopHat className={`h-5 w-5 ${claro ? 'text-brassDeep' : 'text-brass'}`} />
      <span
        className={`h-px w-16 bg-gradient-to-l from-transparent sm:w-24 ${claro ? 'to-sandLine' : 'to-line'}`}
      />
    </div>
  );
}
