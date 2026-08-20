/**
 * Marcas do site: um monograma "M" em forma de pincelada e uma gota de tinta,
 * desenhados em SVG próprio. Substituem a logo real da loja até ela ser
 * fornecida — ver FOTOS.md.
 */

type IconProps = {
  className?: string;
};

/** Gota de tinta — ícone principal, usado no header, rodapé e favicon. */
export function PaintDrop({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 6C32 6 14 30.5 14 42.5C14 53.27 22.06 60 32 60C41.94 60 50 53.27 50 42.5C50 30.5 32 6 32 6Z"
        fill="currentColor"
      />
      {/* brilho: sugere líquido, não um ícone genérico de "gota d'água" */}
      <path
        d="M23 40C23 34 27 28 30.5 25"
        stroke="var(--drop-highlight, #FFFFFF)"
        strokeOpacity="0.45"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Wordmark completo: gota + nome, para o header e o rodapé. */
export function Wordmark({ className }: IconProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <PaintDrop className="h-6 w-6 text-petroleo sm:h-7 sm:w-7" />
      <span className="brand-caps text-[15px] leading-none text-ink sm:text-base">
        Marciel <span className="text-petroleo">Tintas</span>
      </span>
    </span>
  );
}

/** Rolo de pintura — elemento decorativo do parallax, marca d'água nas seções. */
export function RollerSilhouette({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* cabo */}
      <rect x="29" y="30" width="6" height="46" rx="2" fill="currentColor" />
      {/* suporte em L */}
      <path d="M32 30V14h14" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      {/* rolo */}
      <rect x="38" y="4" width="20" height="20" rx="10" fill="currentColor" />
    </svg>
  );
}
