/**
 * Brand marks drawn for this project: a bearded-face mark (logo icon), a
 * hair-clipper silhouette (decorative watermark/parallax layer), and a
 * comb-tooth edge used as the section divider in place of a straight line
 * or a wave — grooming-forward, not axe/pine lumberjack imagery.
 */

type IconProps = {
  className?: string;
};

/** Bearded face — logo icon, used in the header and footer. */
export function BeardMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true" focusable="false">
      <circle cx="32" cy="20" r="11" fill="currentColor" />
      <path
        d="M14 27c0 3 2 6 4 8-5 4-8 10-8 17 0 13 10 20 22 20s22-7 22-20c0-7-3-13-8-17 2-2 4-5 4-8-4 4-9 5-13 5H27c-4 0-9-1-13-5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Hair clipper silhouette — decorative background element for parallax layers. */
export function ClipperSilhouette({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 120"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* teeth */}
      <path d="M14 14V4h4v6h4V4h4v6h4V4h4v6h4V4h4v6h4V4h4v10Z" fill="currentColor" />
      {/* blade guard */}
      <rect x="12" y="14" width="40" height="15" rx="2" fill="currentColor" />
      {/* body */}
      <rect x="16" y="29" width="32" height="82" rx="11" fill="currentColor" />
      {/* switch detail */}
      <rect x="26" y="50" width="12" height="20" rx="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

/**
 * Comb-tooth block divider between light/dark sections — even, regular teeth
 * instead of a straight line or an organic wave. `flip` mirrors it for use
 * at the top of a block instead of the bottom.
 */
export function CombEdge({ className, flip = false }: IconProps & { flip?: boolean }) {
  const width = 1200;
  const height = 44;
  const barHeight = 14;
  const toothHeight = 24;
  const toothWidth = 16;
  const count = 30;
  const gap = width / count;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`${flip ? 'rotate-180' : ''} ${className ?? ''}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y={height - barHeight} width={width} height={barHeight} fill="currentColor" />
      {Array.from({ length: count }).map((_, i) => (
        <rect
          key={i}
          x={i * gap + (gap - toothWidth) / 2}
          y={height - barHeight - toothHeight}
          width={toothWidth}
          height={toothHeight + barHeight}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

/** Short divider: rule + centered bearded mark. */
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
      <BeardMark className={`h-5 w-5 ${light ? 'text-rustDeep' : 'text-rust'}`} />
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
