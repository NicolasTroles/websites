'use client';

import { ChevronDown } from 'lucide-react';
import { site } from '@/config/site.config';
import { useScrollProgress } from '@/lib/useParallax';
import { PhoneButton, WhatsAppButton } from './Actions';

/**
 * Depth (m) / blow-count (N-SPT) points for the illustrative chart line.
 * Both axes increase together — deeper strata resist more — which is what
 * makes the line read as a plausible soil profile rather than a random squiggle.
 */
const PROFILE_POINTS: ReadonlyArray<{ depth: number; blows: number }> = [
  { depth: 0, blows: 4 },
  { depth: 2, blows: 6 },
  { depth: 4, blows: 9 },
  { depth: 6, blows: 14 },
  { depth: 8, blows: 18 },
  { depth: 10, blows: 22 },
  { depth: 12, blows: 28 },
  { depth: 14, blows: 33 },
  { depth: 16, blows: 38 },
  { depth: 18, blows: 42 },
];

const CHART_X = [40, 260] as const; // px range for 0-45 blows
const CHART_Y = [20, 360] as const; // px range for 0-18 m
const MAX_BLOWS = 45;
const MAX_DEPTH = 18;

function toX(blows: number) {
  return CHART_X[0] + (blows / MAX_BLOWS) * (CHART_X[1] - CHART_X[0]);
}
function toY(depth: number) {
  return CHART_Y[0] + (depth / MAX_DEPTH) * (CHART_Y[1] - CHART_Y[0]);
}

const SOIL_BANDS = [
  { from: 0, to: 5, label: 'Arenoso', color: '#E86A12' },
  { from: 5, to: 11, label: 'Argiloso', color: '#3B62E8' },
  { from: 11, to: 18, label: 'Siltoso', color: '#1FA968' },
] as const;

/**
 * Illustrative SPT depth-vs-resistance chart — a stand-in for a real client
 * borehole log until one is provided. Draws in as the hero scrolls by and
 * retracts scrolling back up (via `pathLength`, so no manual path-length math),
 * instead of a one-shot load animation.
 */
function SoilProfileChart() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const points = PROFILE_POINTS.map((p) => `${toX(p.blows)},${toY(p.depth)}`).join(' ');
  const depthTicks = [0, 4, 8, 12, 16];

  return (
    <div
      ref={ref}
      className="relative border border-line bg-surface p-6 sm:p-8"
      aria-hidden="true"
    >
      <p className="font-mono text-[10px] uppercase tracking-wide2 text-muted">
        Perfil ilustrativo · Sondagem SPT
      </p>

      <svg viewBox="0 0 300 400" className="mt-5 w-full" fill="none">
        {/* Soil-type bands, echoing the depth-band colors used across the site. */}
        {SOIL_BANDS.map((band) => (
          <rect
            key={band.label}
            x={CHART_X[0] - 4}
            y={toY(band.from)}
            width={CHART_X[1] - CHART_X[0] + 8}
            height={toY(band.to) - toY(band.from)}
            fill={band.color}
            opacity={0.06}
          />
        ))}

        {/* Depth gridlines + labels. */}
        {depthTicks.map((d) => (
          <g key={d}>
            <line
              x1={CHART_X[0] - 4}
              x2={CHART_X[1]}
              y1={toY(d)}
              y2={toY(d)}
              stroke="#28334A"
              strokeWidth={1}
            />
            <text
              x={CHART_X[0] - 10}
              y={toY(d) + 3}
              textAnchor="end"
              className="fill-muted font-mono text-[9px]"
            >
              {d}m
            </text>
          </g>
        ))}

        {/* Baseline + axis label. */}
        <line
          x1={CHART_X[0]}
          x2={CHART_X[0]}
          y1={CHART_Y[0]}
          y2={CHART_Y[1]}
          stroke="#28334A"
          strokeWidth={1}
        />
        <text x={CHART_X[0]} y={392} className="fill-muted font-mono text-[9px]">
          N golpes (SPT) →
        </text>

        {/* The resistance line: draws from 0 to full length as `progress` goes 0 to 1. */}
        <polyline
          points={points}
          stroke="#E86A12"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100 * (1 - progress)}
        />

        {/* Data points, appearing in step with the line reaching them. */}
        {PROFILE_POINTS.map((p, i) => {
          const reached = progress >= i / (PROFILE_POINTS.length - 1) - 0.02;
          return (
            <circle
              key={p.depth}
              cx={toX(p.blows)}
              cy={toY(p.depth)}
              r={3}
              fill="#0A0F1C"
              stroke="#E86A12"
              strokeWidth={2}
              opacity={reached ? 1 : 0}
              className="transition-opacity duration-300"
            />
          );
        })}
      </svg>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
        {SOIL_BANDS.map((band) => (
          <div key={band.label} className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: band.color }}
            />
            <span className="font-mono text-[10px] uppercase tracking-wide text-silver">
              {band.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div
        id="content"
        className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:gap-12"
      >
        <div className="max-w-2xl">
          <p className="animate-fade-up text-[10px] uppercase tracking-wide2 text-silver sm:text-[11px]">
            {site.brandFull} · {site.city}, {site.state}
          </p>

          <h1
            className="mt-7 animate-fade-up font-display text-[clamp(2.4rem,6.5vw,4.4rem)] font-semibold leading-[1.02] text-bone"
            style={{ animationDelay: '120ms' }}
          >
            O solo que sustenta
            <br />
            <span className="text-clay">o seu projeto</span>
            <br />
            começa por aqui.
          </h1>

          <div
            className="mt-8 h-px w-24 origin-left animate-draw-line bg-clay"
            style={{ animationDelay: '360ms' }}
            aria-hidden="true"
          />

          <p
            className="mt-8 max-w-prose animate-fade-up text-[17px] leading-relaxed text-silver"
            style={{ animationDelay: '260ms' }}
          >
            Sondagem SPT, rotativa e laudo geológico-geotécnico em Curitiba e região. Equipamento
            próprio e dados confiáveis para o seu projeto de fundação.
          </p>

          <div
            className="mt-11 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '400ms' }}
          >
            <WhatsAppButton />
            <PhoneButton className="hidden sm:inline-flex" />
          </div>
        </div>

        <SoilProfileChart />
      </div>

      <a
        href="#sobre"
        aria-label="Ver mais"
        className="relative mt-16 hidden w-full text-clay transition-colors hover:text-bone md:flex md:justify-center"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" strokeWidth={1.5} />
      </a>
    </section>
  );
}
