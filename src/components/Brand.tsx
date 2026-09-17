/*
 * The mark, drawn in code.
 *
 * It reproduces the client's lockup: two overlapping angular "R"s, the back one
 * emerald and the front one light, next to a wide-tracked wordmark. Keeping it
 * as SVG means it stays crisp at every size, inherits the section's colours and
 * costs no image request — which matters because it sits in the header on every
 * screen.
 *
 * When the client's own artwork is approved, drop the file at public/logo.png
 * and swap `<Monogram />` for a next/image — the surrounding layout already
 * reserves the same square.
 */

/** One angular R. `evenodd` cuts the bowl's counter out of the solid shape. */
function Letter({ className }: { className?: string }) {
  return (
    <path
      className={className}
      fillRule="evenodd"
      d="M0 0 H23 A13 13 0 0 1 23 26 H14 L38 52 H24 L9 33 V52 H0 Z M9 8 H21 A5 5 0 0 1 21 18 H9 Z"
    />
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 60"
      role="img"
      aria-label="Rodrigues Rangel Consultoria"
      className={className}
    >
      {/* Back letter: the emerald half of the mark. */}
      <g transform="translate(24 8) scale(0.78)">
        <Letter className="fill-emerald" />
      </g>
      {/* Front letter, in the current text colour so it works on navy and on
          paper without a second component. */}
      <g transform="translate(0 4)">
        <Letter className="fill-current" />
      </g>
    </svg>
  );
}

type BrandProps = {
  /** `full` adds the wordmark; `mark` is the monogram alone (mobile bar, icons). */
  variant?: 'full' | 'mark';
  /** Renders the "Consultoria" line under the name. Off in the tight header. */
  withSubtitle?: boolean;
  className?: string;
};

export function Brand({ variant = 'full', withSubtitle = false, className }: BrandProps) {
  if (variant === 'mark') {
    return <Monogram className={className ?? 'h-8 w-8'} />;
  }

  return (
    <span className={`flex items-center gap-3 ${className ?? ''}`}>
      <Monogram className="h-9 w-9 shrink-0" />
      {/* The divider rule is part of the client's own lockup. */}
      <span aria-hidden="true" className="h-8 w-px bg-current opacity-25" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold uppercase tracking-[0.12em] sm:text-base">
          Rodrigues Rangel
        </span>
        {withSubtitle && (
          <span className="mt-1.5 font-display text-[10px] uppercase tracking-label opacity-70">
            Consultoria
          </span>
        )}
      </span>
    </span>
  );
}
