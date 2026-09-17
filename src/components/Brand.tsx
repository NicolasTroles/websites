import Image from 'next/image';

/*
 * The mark.
 *
 * `Brand` is the client's real artwork — the full lockup (monogram, wordmark
 * and "Consultoria"), light-on-dark, so it only ever sits on a navy surface.
 * The file is a 722x200 WebP with an alpha channel, 23kB; next/image resizes it
 * per breakpoint from there.
 *
 * `Monogram` is a hand-drawn SVG of the same two overlapping R's, kept for the
 * one place a bitmap cannot serve: the giant ghost layer in the hero, where it
 * inherits the section's text colour and scales to 36rem with no resampling.
 * The favicon and the share card use the real artwork. If the brand's
 * proportions ever change, the SVG has to follow.
 */

const LOGO = { src: '/logo.webp', width: 722, height: 200 } as const;

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
    <svg viewBox="0 0 64 60" aria-hidden="true" className={className}>
      {/* Back letter: the emerald half of the mark. */}
      <g transform="translate(24 8) scale(0.78)">
        <Letter className="fill-emerald" />
      </g>
      {/* Front letter, in the current text colour, so it works on navy and on
          paper without a second component. */}
      <g transform="translate(0 4)">
        <Letter className="fill-current" />
      </g>
    </svg>
  );
}

type BrandProps = {
  /**
   * Empty when an ancestor already names the destination (the header's logo
   * link carries an aria-label) — otherwise the logo would be announced twice.
   */
  alt?: string;
  /** Set on the header logo only: it is in the first viewport. */
  priority?: boolean;
  /** Controls the height; width stays auto so the 3.61 ratio is never squashed. */
  className?: string;
};

export function Brand({ alt = '', priority = false, className }: BrandProps) {
  return (
    <Image
      src={LOGO.src}
      width={LOGO.width}
      height={LOGO.height}
      alt={alt}
      priority={priority}
      // The lockup is 3.61:1 and the wordmark sits in a thin central band, so
      // it has to be rendered tall enough to stay legible: 36px of height is
      // already too small to read "Rodrigues Rangel".
      sizes="(max-width: 640px) 200px, 300px"
      className={className ?? 'h-9 w-auto'}
    />
  );
}
