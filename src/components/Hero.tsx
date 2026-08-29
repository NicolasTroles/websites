'use client';

import { site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { PhoneButton, WhatsAppButton } from './Actions';
import { ClipperSilhouette, CombEdge } from './Brand';
import { Magnetic } from './Magnetic';
import { Photo } from './Photo';

/**
 * Split hero: dark panel with the pitch on the left, a photo panel cut at an
 * angle on the right. Two parallax layers move at different speeds behind
 * the text — the photo and a big, faint hair-clipper silhouette — for a
 * sense of depth instead of a single flat background.
 */
export function Hero() {
  const background = useParallax<HTMLDivElement>(0.14);
  const silhouette = useParallax<HTMLDivElement>(0.05);

  return (
    <section id="top" className="relative flex min-h-dvh items-center overflow-hidden bg-bark">
      {/* Right panel: photo, clipped at a diagonal. */}
      <div
        className="absolute inset-y-0 right-0 w-full sm:w-[62%]"
        style={{ clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0% 100%)' }}
      >
        <div
          ref={background.ref}
          className="absolute inset-0 scale-110 will-change-transform"
          style={{ transform: `translate3d(0, ${background.offset}px, 0) scale(1.1)` }}
        >
          <Photo
            src="/banner.png"
            guide="Foto vertical, em tons quentes: barbeiro aparando uma barba cheia com navalha, cliente de perfil, ambiente de barbearia ao fundo."
            aiPrompt="Moody portrait photo of a barber trimming a full, well-groomed beard with a straight razor, client shown in profile, warm tungsten barbershop lighting, dark green and walnut tones in the background, shallow depth of field, editorial barbershop photography, 4:5"
            alt="Barbeiro aparando a barba de um cliente com navalha"
            aspect="portrait"
            priority
            focus="top"
            variant="backdrop"
            sizes="(max-width: 640px) 100vw, 62vw"
            className="!aspect-auto h-full w-full"
          />
        </div>
        {/* Left-edge fade so the diagonal cut doesn't read as a hard pasted seam. */}
        <div
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-bark to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Big faint clipper mark, drifting slower than the photo for depth. */}
      <div
        ref={silhouette.ref}
        className="pointer-events-none absolute -left-8 bottom-0 hidden opacity-[0.07] will-change-transform lg:block"
        style={{ transform: `translate3d(0, ${silhouette.offset}px, 0)` }}
        aria-hidden="true"
      >
        <ClipperSilhouette className="h-[30rem] w-auto text-paper" />
      </div>

      {/* Content, over the dark portion. */}
      <div id="content" className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8">
        <div className="max-w-xl">
          <p className="label-caps animate-fade-up text-[10px] text-fern sm:text-[11px]">
            {site.brandFull} · {site.city}, {site.state}
          </p>

          <h1
            className="mt-6 animate-fade-up font-display text-[clamp(2.6rem,7vw,4.6rem)] font-bold leading-[1.02] text-paper"
            style={{ animationDelay: '120ms' }}
          >
            Barba, corte
            <br />e navalha na
            <br />
            <span className="text-rust">medida certa.</span>
          </h1>

          <div
            className="mt-7 h-px w-24 origin-left animate-draw-line bg-rust"
            style={{ animationDelay: '360ms' }}
            aria-hidden="true"
          />

          <p
            className="mt-7 max-w-prose animate-fade-up text-[17px] leading-relaxed text-fern"
            style={{ animationDelay: '260ms' }}
          >
            {site.tagline}. Barba na navalha, corte, bigode e sobrancelha — o ritual completo, sem
            pressa e sem fórmula de franquia.
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '400ms' }}
          >
            <Magnetic>
              <WhatsAppButton />
            </Magnetic>
            <PhoneButton className="hidden sm:inline-flex" />
          </div>
        </div>
      </div>

      <CombEdge className="absolute inset-x-0 bottom-0 h-8 w-full text-cream sm:h-11" />
    </section>
  );
}
