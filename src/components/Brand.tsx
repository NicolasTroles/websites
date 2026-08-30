/**
 * Brand marks drawn for this project: no artwork exists for Isaias's
 * business (only the Google Business listing), so the wordmark, the tool
 * emblem and the section divider are all code-drawn — construction-forward
 * (wrench/screwdriver, hazard stripe), not the comb/clipper of the barbershop
 * project or the paint-roller of Marciel Tintas.
 */

type IconProps = {
  className?: string;
};

/** Crossed wrench + screwdriver — the icon mark, used standalone and inside Wordmark. */
export function ToolMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true" focusable="false">
      {/* screwdriver, back to front */}
      <path
        d="M10 10 26 26 23 29 7 13Z M23 29 29 23 33 27 27 33Z M33 27 50 44 47.5 51 40 53.5 22.5 36"
        fill="currentColor"
      />
      {/* wrench, front to back */}
      <path
        d="M46 8c-6 0-11 5-11 11 0 1.6.3 3.1.9 4.5L13 46.4l4.6 4.6L40.5 28c1.4.6 2.9.9 4.5.9 6 0 11-5 11-11 0-1.7-.4-3.3-1.1-4.7l-6.2 6.2-5-5 6.2-6.2C48.7 8.4 47.4 8 46 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Full lockup: icon mark + two-line wordmark, used in the header and footer. */
export function Wordmark({ className, dark = false }: IconProps & { dark?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`}>
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-sm ${dark ? 'bg-charcoal' : 'bg-safety'}`}
      >
        <ToolMark className={`h-6 w-6 ${dark ? 'text-safety' : 'text-charcoal'}`} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`label-caps text-[9px] ${dark ? 'text-mist' : 'text-inkSoft'}`}
          style={{ letterSpacing: '0.18em' }}
        >
          Marido de aluguel
        </span>
        <span
          className={`font-display text-2xl tracking-wide ${dark ? 'text-chalk' : 'text-ink'}`}
        >
          OLIVEIRA
        </span>
      </span>
    </div>
  );
}

/** Giant faint watermark version of the tool mark, for parallax backgrounds. */
export function ToolWatermark({ className }: IconProps) {
  return <ToolMark className={className} />;
}

/**
 * Diagonal hazard-stripe band — the section divider, in place of a straight
 * line or a wave. Reads as warning tape from a job site, not a comb or a
 * wave crest.
 */
export function HazardStripe({ className, flip = false }: IconProps & { flip?: boolean }) {
  return (
    <div
      className={`h-3 w-full sm:h-4 ${flip ? 'rotate-180' : ''} ${className ?? ''}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(-45deg, #181B1D 0, #181B1D 14px, #F4B400 14px, #F4B400 28px)',
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Continuous horizontal marquee — services + a call-to-action, looping
 * forever like a strip of tape running across the page. The content array
 * is duplicated so the loop is seamless; the animation freezes under
 * prefers-reduced-motion (handled globally in globals.css).
 */
export function ServiceMarquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-charcoal py-3" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="label-caps flex items-center gap-10 whitespace-nowrap text-[13px] text-safety"
          >
            {item}
            <span className="text-mist">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

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
