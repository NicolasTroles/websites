/**
 * Brand marks drawn for this project: a single-bit axe (logo icon), a pine
 * silhouette (decorative watermark), and a jagged "axe-cut" edge used as the
 * section divider in place of a straight line or a wave.
 */

type IconProps = {
  className?: string;
};

/** Axe head + handle — logo icon, used in the header and footer. */
export function AxeMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true" focusable="false">
      {/* handle */}
      <path d="M30 8c-1 14-1 34 0 52" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      {/* axe head */}
      <path
        d="M30 12c8-8 20-9 26-4-1 9-9 17-19 18-3 3-5 4-7 2s-1-4 2-7c-3-3-4-6-2-9Z"
        fill="currentColor"
      />
      {/* edge highlight */}
      <path d="M54 8c-1 9-9 17-19 18" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

/** Pine tree silhouette — decorative background element for parallax sections. */
export function PineSilhouette({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 80" fill="none" className={className} aria-hidden="true" focusable="false">
      <path d="M32 4 18 26h6L10 46h8L6 68h52l-12-22h8L42 26h6L32 4Z" fill="currentColor" />
      <rect x="28" y="68" width="8" height="10" fill="currentColor" />
    </svg>
  );
}

/**
 * Jagged block divider between light/dark sections — an axe-cut edge instead
 * of a straight line or a wave. `flip` mirrors it for use at the top of a
 * block instead of the bottom.
 */
export function AxeCutEdge({ className, flip = false }: IconProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 44"
      preserveAspectRatio="none"
      className={`${flip ? 'rotate-180' : ''} ${className ?? ''}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 44V6l40 14 42-18 44 20 40-16 46 22 40-18 44 16 42-20 40 18 44-14 40 20 44-16 42 18 40-14 44 20 40-16 42 14 46-18 20 8v54H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Short divider: rule + centered axe mark. */
export function SectionDivider({
  className,
  tone = 'dark',
}: IconProps & { tone?: 'light' | 'dark' }) {
  const light = tone === 'light';
  return (
    <div className={`flex items-center justify-center gap-5 ${className ?? ''}`} aria-hidden="true">
      <span
        className={`h-px w-16 bg-gradient-to-r from-transparent sm:w-24 ${light ? 'to-creamLine' : 'to-barkLine'}`}
      />
      <AxeMark className={`h-5 w-5 ${light ? 'text-rustDeep' : 'text-rust'}`} />
      <span
        className={`h-px w-16 bg-gradient-to-l from-transparent sm:w-24 ${light ? 'to-creamLine' : 'to-barkLine'}`}
      />
    </div>
  );
}

/**
 * Minimal outline glyphs for social links, drawn directly rather than
 * pulling in an icon-set dependency for two brand marks.
 */
export function InstagramGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" focusable="false">
      <path
        d="M14.5 21v-7.5h2.5l.4-3H14.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.3c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.88 1.4-3.88 3.98V10.5H9v3h2.4V21h3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Service icons lucide-react doesn't carry (razor, mustache, eyebrow), drawn
 * in the same 24x24 stroke style as the lucide icons they sit next to, so
 * the service list reads as one consistent set.
 */
export function RazorGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      strokeWidth={1.5}
    >
      <path d="M5 4v9.5" stroke="currentColor" strokeLinecap="round" />
      <path d="M5 13.5 17 20l2-3.5-11-6.3" stroke="currentColor" strokeLinejoin="round" />
      <path
        d="M5 4c-1.4 0-2.4 1-2.4 2.2S3.6 8.4 5 8.4"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MustacheGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" focusable="false">
      <path
        d="M2 13c1.5-3.5 4-5 6-5 2.5 0 3 2 4 2s1.5-2 4-2c2 0 4.5 1.5 6 5-2 1.5-4 0-5-1-1 1.5-2.5 2-5 2s-4-.5-5-2c-1 1-3 2.5-5 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function EyebrowGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      strokeWidth={1.6}
    >
      <path d="M3 15c2.5-7 8-9.5 11-9.5S21 8 21 11.5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}
