'use client';

import { ArrowDown, MapPin, ShieldCheck } from 'lucide-react';
import { site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { WhatsAppButton } from './Actions';
import { CircuitWatermark } from './Brand';
import { Magnetic } from './Magnetic';
import { Photo } from './Photo';

/**
 * Split hero: copy on the left, a framed technical photo on the right — not
 * the full-bleed background photo used on the handyman project. The real
 * logo only reads on a light ground (petrol + amber on white), so the hero
 * stays white/light rather than opening the site on a dark band.
 */
export function Hero() {
  const photo = useParallax<HTMLDivElement>(0.1);
  const watermark = useParallax<HTMLDivElement>(0.04);

  return (
    <section
      id="top"
      className="circuit-grid-light relative overflow-hidden bg-floor pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-40"
    >
      <div
        ref={watermark.ref}
        className="pointer-events-none absolute -left-24 -top-16 hidden opacity-[0.05] will-change-transform lg:block"
        style={{ transform: `translate3d(0, ${watermark.offset}px, 0)` }}
        aria-hidden="true"
      >
        <CircuitWatermark className="h-[30rem] w-auto text-ink" />
      </div>

      <div id="content" className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr,0.95fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="label-caps animate-fade-up text-[10px] text-safetyDeep sm:text-[11px]">
              {site.brandFull} · {site.city}, {site.state}
            </p>

            <h1
              className="mt-6 animate-fade-up font-display text-[clamp(2.4rem,6.4vw,4.2rem)] font-bold leading-[1.04] tracking-tight text-ink"
              style={{ animationDelay: '120ms' }}
            >
              Seu equipamento parou.
              <br />A gente descobre <span className="text-safetyDeep">por quê.</span>
            </h1>

            <div
              className="mt-7 h-px w-24 origin-left animate-draw-line bg-safety"
              style={{ animationDelay: '360ms' }}
              aria-hidden="true"
            />

            <p
              className="mt-7 max-w-prose animate-fade-up text-[17px] leading-relaxed text-inkSoft"
              style={{ animationDelay: '260ms' }}
            >
              {site.tagline}
            </p>

            <div
              className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
              style={{ animationDelay: '400ms' }}
            >
              <Magnetic>
                <WhatsAppButton />
              </Magnetic>
              <a
                href="#services"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 border border-floorLine px-7 text-[13px] label-caps text-ink transition-all duration-200 ease-smooth hover:border-ink hover:bg-floorDeep"
              >
                Conhecer nossos serviços
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              </a>
            </div>

            <div
              className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-inkSoft"
              style={{ animationDelay: '480ms' }}
            >
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-safetyDeep" strokeWidth={1.5} aria-hidden="true" />
                Diagnóstico técnico
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-safetyDeep" strokeWidth={1.5} aria-hidden="true" />
                Atendimento em {site.city}
              </span>
            </div>
          </div>

          <div
            ref={photo.ref}
            className="relative will-change-transform"
            style={{ transform: `translate3d(0, ${photo.offset * 0.5}px, 0)` }}
          >
            {/* Corner ticks — a technical frame detail, not a decorative border. */}
            <span
              className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-safety"
              aria-hidden="true"
            />
            <span
              className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-safety"
              aria-hidden="true"
            />
            <Photo
              src=""
              guide="Foto grande: bancada técnica real, placa eletrônica sob análise, multímetro ligado e mãos de um técnico trabalhando com precisão."
              aiPrompt="Professional editorial photograph of an electronics repair workbench, shot close and slightly from above: a technician's hands, precise and focused, holding a soldering iron over an open circuit board resting on an anti-static mat. A multimeter with probes attached sits beside the board, screen showing a reading. Scattered small components, a screwdriver set and a spool of solder are visible at the edge of frame. Warm, directional studio lighting from one side creates realistic shadows and highlights on brushed metal tools and the green PCB; one small accent of amber-yellow (F4B41A) light or a yellow-handled tool, otherwise a neutral palette of deep petrol blue (#0B2B3A), graphite and metal. Shallow depth of field, shot on a full-frame camera with a 50mm lens, photorealistic, no text, no logos, no futuristic or sci-fi elements, no visible face."
              alt="Bancada técnica com placa eletrônica em diagnóstico"
              aspect="tall"
              priority
              tone="light"
              focus="center"
              className="shadow-[0_30px_60px_-25px_rgba(11,43,58,0.35)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
