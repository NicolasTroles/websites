/**
 * Decorative technical marks for this project — a hexagon + waveform motif
 * echoing the diagnostic "pulse" in the real logo (public/logo.png), redrawn
 * from scratch as an abstract watermark/divider, not a copy of the logo
 * artwork itself. Deliberately not the wrench/screwdriver of the handyman
 * project, the comb of the barbershop, or the paint-roller of Marciel Tintas.
 */

type IconProps = {
  className?: string;
};

/** Giant, near-invisible parallax watermark: hexagon outline + a single waveform trace. */
export function CircuitWatermark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true" focusable="false">
      <path
        d="M40 12h40l30 30v36l-30 30H40l-30-30V42Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 60h22l8-18 10 34 9-22 6 6h57"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="60" r="3.5" fill="currentColor" />
      <circle cx="112" cy="60" r="3.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Thin technical divider — a hairline with a solder-point at center and two
 * short ticks either side, standing in for a section break the way a PCB
 * trace would, in place of a straight rule, a wave, or hazard tape.
 */
export function CircuitDivider({ className, tone = 'light' }: IconProps & { tone?: 'light' | 'dark' }) {
  const color = tone === 'light' ? 'text-floorLine' : 'text-steelLine';
  return (
    <div className={`flex items-center justify-center gap-3 ${className ?? ''}`} aria-hidden="true">
      <span className={`h-px w-16 sm:w-28 ${tone === 'light' ? 'bg-floorLine' : 'bg-steelLine'}`} />
      <span className={`h-1.5 w-1.5 rounded-full bg-safety ${color}`} />
      <span className={`h-px w-16 sm:w-28 ${tone === 'light' ? 'bg-floorLine' : 'bg-steelLine'}`} />
    </div>
  );
}

/**
 * Continuous horizontal marquee — a strip of category/keyword text looping
 * forever, used once as a texture band, not as primary navigation. Content
 * is duplicated so the loop is seamless; frozen under prefers-reduced-motion
 * (handled globally in globals.css).
 */
export function Marquee({ items }: { items: readonly string[] }) {
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
