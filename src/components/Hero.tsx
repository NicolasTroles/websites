'use client';

import { ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { mapsUrl, site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { PhoneButton, WhatsAppButton } from './Actions';
import { HazardStripe, ToolWatermark } from './Brand';
import { Magnetic } from './Magnetic';
import { Photo } from './Photo';

/**
 * Full-bleed hero: one wide photo fills the whole viewport (not the diagonal
 * split used on the barbershop project), darkened under a charcoal gradient
 * so the type stays legible. Two parallax layers move at different speeds —
 * the photo itself, and a huge, near-invisible tool-mark watermark — for
 * depth instead of a single flat background.
 */
export function Hero() {
  const background = useParallax<HTMLDivElement>(0.12);
  const watermark = useParallax<HTMLDivElement>(0.05);

  return (
    <section id="top" className="relative flex min-h-dvh items-end overflow-hidden bg-charcoal">
      <div
        ref={background.ref}
        className="absolute inset-0 scale-110 will-change-transform"
        style={{ transform: `translate3d(0, ${background.offset}px, 0) scale(1.1)` }}
      >
        <Photo
          src="/hero.jpg"
          guide="Foto de fundo, cheia a tela: Isaias visto de costas, trabalhando em um reparo na casa de um cliente."
          aiPrompt="Cinematic wide photo, shot from behind: a Brazilian handyman in his 40s, back and shoulders to camera, head turned fully away so no facial features are visible, wearing a charcoal-grey work shirt and tool belt, kneeling to fix an exposed pipe under a kitchen sink in a modest Brazilian home. Use the attached reference photo only for build, posture and skin tone — keep him strictly back-facing / face not visible, do not reconstruct or guess his facial features. Warm practical light from a single window, one small flash of safety-yellow (tape measure or tool handle) as the only saturated color against a charcoal-and-concrete palette, shallow depth of field, gritty photojournalistic texture, 35mm lens look, vertical 4:5"
          alt="Marido de aluguel trabalhando em um reparo hidráulico dentro de uma residência"
          aspect="portrait"
          priority
          focus="center"
          variant="backdrop"
          sizes="100vw"
          className="!aspect-auto h-full w-full"
        />
      </div>

      {/* Charcoal gradient so headline/body text stay legible over any photo. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/30 to-transparent"
        aria-hidden="true"
      />

      {/* Giant faint tool mark, drifting slower than the photo for depth. */}
      <div
        ref={watermark.ref}
        className="pointer-events-none absolute -right-16 -top-10 hidden opacity-[0.06] will-change-transform lg:block"
        style={{ transform: `translate3d(0, ${watermark.offset}px, 0)` }}
        aria-hidden="true"
      >
        <ToolWatermark className="h-[26rem] w-auto text-chalk" />
      </div>

      <div id="content" className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8">
        <div className="max-w-xl">
          <p className="label-caps animate-fade-up text-[10px] text-safety sm:text-[11px]">
            {site.brandFull} · {site.city}, {site.state}
          </p>

          <h1
            className="mt-6 animate-fade-up font-display text-[clamp(2.6rem,7.5vw,4.8rem)] uppercase leading-[0.98] tracking-wide text-chalk"
            style={{ animationDelay: '120ms' }}
          >
            Aquele reparo,
            <br />
            resolvido de
            <br />
            <span className="text-safety">vez.</span>
          </h1>

          <div
            className="mt-7 h-px w-24 origin-left animate-draw-line bg-safety"
            style={{ animationDelay: '360ms' }}
            aria-hidden="true"
          />

          <p
            className="mt-7 max-w-prose animate-fade-up text-[17px] leading-relaxed text-mist"
            style={{ animationDelay: '260ms' }}
          >
            {site.tagline} Atendimento na sua casa, em {site.city} e região.
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '400ms' }}
          >
            <Magnetic>
              <WhatsAppButton label="Falar no WhatsApp" />
            </Magnetic>
            <PhoneButton className="hidden sm:inline-flex" />
          </div>

          <div
            className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-mist"
            style={{ animationDelay: '480ms' }}
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-safety" strokeWidth={1.5} aria-hidden="true" />
              Atende {site.city} e região
            </span>
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="h-3.5 w-3.5 text-safety" strokeWidth={1.5} aria-hidden="true" />
              Orçamento pelo WhatsApp
            </span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 underline decoration-steelLine underline-offset-4 transition-colors hover:text-chalk hover:decoration-safety"
            >
              <ExternalLink className="h-3.5 w-3.5 text-safety" strokeWidth={1.5} aria-hidden="true" />
              Perfil no Google Maps
            </a>
          </div>
        </div>
      </div>

      <HazardStripe className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
