'use client';

import { site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { PhoneButton, WhatsAppButton } from './Actions';
import { Photo } from './Photo';

const STATS = [
  { value: '30L / 50L', label: 'Tamanhos de barril' },
  { value: 'Chopeira', label: 'Inclusa no barril' },
  { value: 'Disk Chopp', label: 'Pedido pelo WhatsApp' },
];

export function Hero() {
  // A foto de fundo se move mais devagar que a página: é isso que cria a profundidade.
  const background = useParallax<HTMLDivElement>(0.18);

  return (
    <section id="top" className="relative flex min-h-dvh items-center overflow-hidden bg-stout">
      {/* Camada 1: foto de fundo em parallax. Escala 110% para não revelar bordas. */}
      <div
        ref={background.ref}
        className="absolute inset-0 scale-110 will-change-transform"
        style={{ transform: `translate3d(0, ${background.offset}px, 0) scale(1.1)` }}
      >
        <Photo
          src="/banner.png"
          guide="Foto larga e escura: chopp sendo servido em taça, com bastante espuma escorrendo, vista de perto (macro). Precisa ter área escura à esquerda para o texto ficar legível."
          aiPrompt="Wide cinematic close-up photo of a glass of golden draft beer (chopp) being poured, thick foam overflowing down the glass, dramatic dark background fading to pure black on the left third of the frame for text overlay, warm amber and copper tones, condensation droplets on the glass, shallow depth of field, moody bar lighting, professional beverage photography, 16:9"
          alt="Copo de chopp gelado sendo servido com espuma transbordando, fundo escuro"
          aspect="landscape"
          priority
          focus="right"
          variant="backdrop"
          sizes="100vw"
          className="!aspect-auto h-full w-full"
        />
      </div>

      {/* Camada 2: véu de contraste — forte à esquerda, onde fica o texto. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-stout via-stout/90 via-55% to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-stout via-transparent to-stout/50"
        aria-hidden="true"
      />

      {/* Bolhas subindo — decoração pontual, desligada com prefers-reduced-motion. */}
      <div
        className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block"
        aria-hidden="true"
      >
        {[14, 34, 58, 76, 90].map((left, i) => (
          <span
            key={left}
            className="absolute bottom-0 animate-rise rounded-full bg-amber/25"
            style={{
              left: `${left}%`,
              width: `${6 + (i % 3) * 4}px`,
              height: `${6 + (i % 3) * 4}px`,
              animationDelay: `${i * 900}ms`,
              animationDuration: `${4000 + i * 600}ms`,
            }}
          />
        ))}
      </div>

      {/* Camada 3: conteúdo. */}
      <div id="content" className="relative mx-auto w-full max-w-7xl px-5 pb-32 pt-32 sm:px-8">
        <div className="max-w-2xl">
          <p className="brand-caps animate-fade-up text-[10px] text-barley sm:text-[11px]">
            {site.tagline} · {site.city}, {site.state}
          </p>

          <h1
            className="mt-6 animate-fade-up font-display text-[clamp(3rem,10vw,6.4rem)] font-normal uppercase leading-[0.92] text-foam"
            style={{ animationDelay: '120ms' }}
          >
            Chopp gelado
            <br />
            direto na sua
            <br />
            <span className="text-amber">festa.</span>
          </h1>

          <p
            className="mt-8 max-w-prose animate-fade-up text-[17px] leading-relaxed text-barley"
            style={{ animationDelay: '260ms' }}
          >
            Disk Chopp em {site.city}. Escolha o rótulo e o tamanho do barril pelo WhatsApp — a
            gente entrega tudo montado, com chopeira inclusa.
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '380ms' }}
          >
            <WhatsAppButton />
            <PhoneButton className="hidden sm:inline-flex" />
          </div>
        </div>

        {/* Cluster de cartões flutuantes — estilo bento, só a partir de md. */}
        <div
          className="mt-16 hidden animate-fade-up gap-4 md:grid md:max-w-2xl md:grid-cols-3"
          style={{ animationDelay: '500ms' }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="border border-caskLine bg-stout/60 px-5 py-4 backdrop-blur-sm"
            >
              <p className="font-display text-xl uppercase text-amber">{stat.value}</p>
              <p className="mt-1 text-[12px] leading-snug text-barley">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
