'use client';

import { ChevronDown } from 'lucide-react';
import { site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { BotaoTelefone, BotaoWhatsApp } from './Acoes';
import { Foto } from './Foto';

export function Hero() {
  // A foto de fundo se move mais devagar que a página: é isso que cria a profundidade.
  const fundo = useParallax<HTMLDivElement>(0.18);

  return (
    <section
      id="topo"
      className="relative flex min-h-dvh items-center overflow-hidden"
    >
      {/* Camada 1: foto de fundo em parallax. Escala 110% para não revelar bordas. */}
      <div
        ref={fundo.ref}
        className="absolute inset-0 scale-110 will-change-transform"
        style={{ transform: `translate3d(0, ${fundo.offset}px, 0) scale(1.1)` }}
      >
        <Foto
          // FOTO 1 — hero
          guia="Foto larga e escura: terno bem cortado em um homem, ou o Carlos ajustando uma lapela. Precisa ter área escura à esquerda para o texto ficar legível."
          alt="Terno sob medida confeccionado por Carlos Simões"
          aspect="paisagem"
          priority
          sizes="100vw"
          className="h-full w-full !aspect-auto"
        />
      </div>

      {/* Camada 2: véu que garante contraste do texto sobre qualquer foto. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50"
        aria-hidden="true"
      />

      {/* Camada 3: conteúdo. */}
      <div
        id="conteudo"
        className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-28 sm:px-8"
      >
        <div className="max-w-2xl">
          <p className="brand-caps animate-fade-up text-[10px] text-brass sm:text-[11px]">
            {site.marcaLoja} · {site.cidade}, {site.estado}
          </p>

          <h1
            className="mt-7 animate-fade-up font-display text-[clamp(2.6rem,8vw,5.2rem)] font-normal leading-[0.98] text-bone"
            style={{ animationDelay: '120ms' }}
          >
            O terno que
            <br />
            <span className="italic text-brass">veste você</span>
            <br />
            e mais ninguém.
          </h1>

          <div
            className="mt-8 h-px w-24 origin-left animate-draw-line bg-brass"
            style={{ animationDelay: '360ms' }}
            aria-hidden="true"
          />

          <p
            className="mt-8 max-w-prose animate-fade-up text-[17px] leading-relaxed text-silver"
            style={{ animationDelay: '260ms' }}
          >
            Alfaiataria tradicional no centro de Curitiba. Ternos e camisas
            cortados à mão sobre as suas medidas, com o cuidado de quem faz isso
            há décadas.
          </p>

          <div
            className="mt-11 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '400ms' }}
          >
            <BotaoWhatsApp />
            <BotaoTelefone className="hidden sm:inline-flex" />
          </div>
        </div>
      </div>

      <a
        href="#oficio"
        aria-label="Ver mais"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-brass transition-colors hover:text-bone md:block"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" strokeWidth={1.5} />
      </a>
    </section>
  );
}
