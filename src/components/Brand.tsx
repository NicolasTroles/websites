/**
 * Decorative technical mark for this project — a hexagon + waveform motif
 * echoing the diagnostic "pulse" in the real logo (public/logo.png), redrawn
 * from scratch as an abstract watermark, not a copy of the logo artwork
 * itself.
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
