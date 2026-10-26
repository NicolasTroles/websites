/**
 * Still petals in SVG — shown while the WebGL chunk loads and when the
 * browser has no WebGL. Keeps the hero composition intact without the scene.
 */
const PETALS = [
  { x: 8, y: 18, r: -24, s: 1, c: '#e7b4b0' },
  { x: 22, y: 72, r: 38, s: 0.8, c: '#d48f92' },
  { x: 46, y: 10, r: 12, s: 0.7, c: '#f1d9cf' },
  { x: 58, y: 84, r: -52, s: 0.9, c: '#e2b768' },
  { x: 78, y: 28, r: 64, s: 1.1, c: '#d48f92' },
  { x: 90, y: 62, r: -12, s: 0.75, c: '#e7b4b0' },
  { x: 34, y: 40, r: 80, s: 0.6, c: '#6f9c6a' },
  { x: 68, y: 50, r: -70, s: 0.65, c: '#b86b74' },
];

export function PetalsFallback({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      {PETALS.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 20 26"
          className="absolute h-7 w-6 opacity-70"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `rotate(${p.r}deg) scale(${p.s})`,
          }}
        >
          <path
            d="M10 25C3 19 0 12 2 6c1.5-4 5-5.5 8-3 3-2.5 6.5-1 8 3 2 6-1 13-8 19Z"
            fill={p.c}
          />
        </svg>
      ))}
    </div>
  );
}
