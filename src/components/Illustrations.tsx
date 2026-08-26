/**
 * Vector illustrations standing in for real client photography.
 *
 * There's no image-generation tool in this environment to turn the AI photo
 * prompts (still kept on `site.config.ts`-adjacent call sites, see Photo.tsx)
 * into actual raster images, so these fill the same frames with on-brand
 * technical line art instead — blueprint-style, three brand accents, drawn
 * to the same aspect ratios as the frames they replace. Swap any of these
 * for a real <Photo src="..."> once the client sends photos.
 */

type IllustrationProps = {
  tone?: 'light' | 'dark';
};

const STROKE = { light: '#4C5568', dark: '#AAB4C6' } as const;
const STROKE_SOFT = { light: '#D3DAE6', dark: '#28334A' } as const;

/** Shared tripod-rig glyph, reused at different scales/positions across illustrations. */
function RigGlyph({ x, y, scale = 1, stroke, accent }: { x: number; y: number; scale?: number; stroke: string; accent: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1={0} y1={-58} x2={0} y2={4} stroke={stroke} strokeWidth={2.5} />
      <path d="M0 -50 L-26 6 M0 -50 L26 6" stroke={stroke} strokeWidth={2.5} fill="none" />
      <line x1={-16} y1={-14} x2={16} y2={-14} stroke={accent} strokeWidth={2.5} />
      <line x1={-30} y1={6} x2={30} y2={6} stroke={stroke} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

export function SptOperatorIllustration({ tone = 'light' }: IllustrationProps) {
  const stroke = STROKE[tone];
  const soft = STROKE_SOFT[tone];
  return (
    <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <line key={i} x1={0} y1={300 + i * 16} x2={300} y2={300 + i * 16} stroke={soft} strokeWidth={1} />
      ))}
      <RigGlyph x={185} y={230} scale={1.9} stroke={stroke} accent="#E86A12" />
      {/* Operator: head, body, arm reaching for the cable. */}
      <circle cx={92} cy={196} r={11} stroke={stroke} strokeWidth={2.5} />
      <path d="M92 207 L92 250 M92 220 L60 232 M92 220 L128 214 M92 250 L74 296 M92 250 L112 296" stroke={stroke} strokeWidth={2.5} strokeLinecap="round" />
      {/* Depth reference on the right edge. */}
      <line x1={272} y1={80} x2={272} y2={300} stroke={soft} strokeWidth={1.5} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={266} y1={80 + i * 73} x2={278} y2={80 + i * 73} stroke={soft} strokeWidth={1.5} />
      ))}
    </svg>
  );
}

export function SoilSamplesIllustration({ tone = 'light' }: IllustrationProps) {
  const stroke = STROKE[tone];
  const soft = STROKE_SOFT[tone];
  const bands = ['#E86A12', '#3B62E8', '#1FA968'];
  return (
    <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
      {[0, 1, 2].map((i) => {
        const y = 70 + i * 100;
        return (
          <g key={i}>
            <rect x={54} y={y} width={192} height={72} stroke={stroke} strokeWidth={2} />
            {[0, 1, 2, 3].map((j) => (
              <line
                key={j}
                x1={54}
                x2={246}
                y1={y + 14 + j * 15}
                y2={y + 14 + j * 15}
                stroke={soft}
                strokeWidth={1.5}
              />
            ))}
            <rect x={54} y={y - 14} width={40} height={14} fill={bands[i]} opacity={0.85} />
          </g>
        );
      })}
    </svg>
  );
}

export function RigStandingIllustration({ tone = 'dark' }: IllustrationProps) {
  const stroke = STROKE[tone];
  const soft = STROKE_SOFT[tone];
  return (
    <svg viewBox="0 0 300 450" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <line key={i} x1={0} y1={320 + i * 18} x2={300} y2={320 + i * 18} stroke={soft} strokeWidth={1} />
      ))}
      <RigGlyph x={150} y={320} scale={3.6} stroke={stroke} accent="#E86A12" />
      <circle cx={150} cy={343} r={5} fill="#1FA968" />
    </svg>
  );
}

export function SamplerCloseupIllustration({ tone = 'dark' }: IllustrationProps) {
  const stroke = STROKE[tone];
  const soft = STROKE_SOFT[tone];
  const bands = ['#E86A12', '#3B62E8', '#1FA968', '#3B62E8'];
  return (
    <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
      <rect x={110} y={40} width={70} height={220} rx={6} stroke={stroke} strokeWidth={2.5} />
      {bands.map((c, i) => (
        <rect key={i} x={113} y={44 + i * 53} width={64} height={49} fill={c} opacity={0.28} />
      ))}
      <line x1={110} y1={40} x2={80} y2={40} stroke={soft} strokeWidth={1.5} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <line x1={195} y1={45 + i * 45} x2={207} y2={45 + i * 45} stroke={soft} strokeWidth={1.5} />
          <text x={214} y={49 + i * 45} className="font-mono text-[9px]" fill={soft}>
            {i * 2}m
          </text>
        </g>
      ))}
    </svg>
  );
}

export function FieldCrewIllustration({ tone = 'dark' }: IllustrationProps) {
  const stroke = STROKE[tone];
  const soft = STROKE_SOFT[tone];

  function Person({ x, accent }: { x: number; accent: string }) {
    return (
      <g transform={`translate(${x} 0)`}>
        <circle cx={0} cy={110} r={13} stroke={stroke} strokeWidth={2.5} />
        <path d="M-10 100 A13 13 0 0 1 10 100" stroke={accent} strokeWidth={3} strokeLinecap="round" />
        <path d="M0 123 L0 175 M0 138 L-24 150 M0 138 L24 150 M0 175 L-16 210 M0 175 L16 210" stroke={stroke} strokeWidth={2.5} strokeLinecap="round" />
      </g>
    );
  }

  return (
    <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
      <line x1={0} y1={222} x2={300} y2={222} stroke={soft} strokeWidth={1.5} />
      <RigGlyph x={150} y={220} scale={1.1} stroke={stroke} accent="#3B62E8" />
      <Person x={92} accent="#1FA968" />
      <Person x={208} accent="#1FA968" />
    </svg>
  );
}

export function TransportIllustration({ tone = 'dark' }: IllustrationProps) {
  const stroke = STROKE[tone];
  const soft = STROKE_SOFT[tone];
  return (
    <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
      <line x1={0} y1={158} x2={320} y2={158} stroke={soft} strokeWidth={1.5} />
      {/* Pickup silhouette. */}
      <path
        d="M40 158 L40 118 L70 118 L92 96 L150 96 L150 118 L246 118 L246 158"
        stroke="#E86A12"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <circle cx={78} cy={158} r={14} stroke={stroke} strokeWidth={2.5} />
      <circle cx={214} cy={158} r={14} stroke={stroke} strokeWidth={2.5} />
      {/* Rig loaded diagonally in the bed. */}
      <line x1={156} y1={118} x2={238} y2={62} stroke={stroke} strokeWidth={3} strokeLinecap="round" />
      <line x1={156} y1={130} x2={222} y2={92} stroke={stroke} strokeWidth={2} strokeLinecap="round" opacity={0.7} />
    </svg>
  );
}

export function ReportIllustration({ tone = 'dark' }: IllustrationProps) {
  const stroke = STROKE[tone];
  const soft = STROKE_SOFT[tone];
  const points = '30,60 44,52 58,68 72,44 86,58 100,34';
  return (
    <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
      <rect x={92} y={30} width={136} height={140} stroke={stroke} strokeWidth={2.5} />
      <line x1={108} y1={52} x2={196} y2={52} stroke={soft} strokeWidth={2} />
      <line x1={108} y1={64} x2={212} y2={64} stroke={soft} strokeWidth={1.5} />
      <g transform="translate(92 60)">
        <polyline points={points} stroke="#3B62E8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <line x1={108} y1={130} x2={212} y2={130} stroke={soft} strokeWidth={1.5} />
      <line x1={108} y1={142} x2={190} y2={142} stroke={soft} strokeWidth={1.5} />
      {/* Signed / approved seal. */}
      <circle cx={204} cy={148} r={16} stroke="#1FA968" strokeWidth={2} />
      <path d="M197 148 L202 154 L212 141" stroke="#1FA968" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LandscapeStripIllustration() {
  return (
    <svg viewBox="0 0 640 300" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {/* Topographic contour lines — a nod to survey/elevation maps. */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M-20 ${210 - i * 24} C 140 ${170 - i * 26}, 300 ${250 - i * 22}, 460 ${180 - i * 24} S 700 ${210 - i * 20}, 780 ${190 - i * 22}`}
          stroke="#28334A"
          strokeWidth={1.5}
          opacity={0.8}
        />
      ))}
      <RigGlyph x={470} y={168} scale={0.8} stroke="#6C7890" accent="#1FA968" />
      <circle cx={120} cy={60} r={4} fill="#E86A12" />
    </svg>
  );
}
