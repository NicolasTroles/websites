'use client';

import { site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { BotaoTelefone, BotaoWhatsApp } from './Acoes';
import { Foto } from './Foto';

export function Hero() {
  // A foto se move um pouco mais devagar que a página: profundidade sutil, sem exagero.
  const foto = useParallax<HTMLDivElement>(0.08);

  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-white pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      <div id="conteudo" className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Coluna de texto */}
          <div>
            <p className="brand-caps animate-fade-up text-[10px] text-petroleoDeep sm:text-[11px]">
              {site.marcaLoja} · {site.cidade}, {site.estado}
            </p>

            <h1
              className="mt-7 animate-fade-up font-display text-[clamp(2.6rem,6vw,4.6rem)] font-normal leading-[1.02] text-ink"
              style={{ animationDelay: '120ms' }}
            >
              A tinta que
              <br />
              <span className="italic text-petroleo">acerta a cor</span>
              <br />
              de primeira.
            </h1>

            <div
              className="mt-8 h-1 w-24 origin-left animate-draw-line bg-petroleo"
              style={{ animationDelay: '360ms' }}
              aria-hidden="true"
            />

            <p
              className="mt-8 max-w-prose animate-fade-up text-[17px] leading-relaxed text-slate"
              style={{ animationDelay: '260ms' }}
            >
              Tintas imobiliárias e automotivas, mistura de cor na hora e
              acessórios de pintura, com atendimento de quem entende do
              assunto, em Campo Largo.
            </p>

            <div
              className="mt-11 flex animate-fade-up flex-col gap-3 sm:flex-row"
              style={{ animationDelay: '400ms' }}
            >
              <BotaoWhatsApp />
              <BotaoTelefone />
            </div>
          </div>

          {/* Coluna da foto */}
          <div className="relative">
            {/* Forma decorativa: a única "mancha" de cor da dobra inicial. */}
            <div
              className="absolute -right-6 -top-6 h-full w-full rounded-[2rem] bg-petroleoTint sm:-right-8 sm:-top-8"
              aria-hidden="true"
            />
            <div
              ref={foto.ref}
              className="relative will-change-transform"
              style={{ transform: `translate3d(0, ${foto.offset}px, 0)` }}
            >
              <Foto
                // FOTO 1 — hero. Placeholder profissional (banco de imagens) até
                // termos uma foto real da loja — ver FOTOS.md.
                src="/fotos/hero.jpg"
                guia="Foto vertical ou quadrada: a fachada da loja, a prateleira de latas coloridas ou a máquina de mistura em funcionamento."
                alt="Latas de tinta coloridas com pincéis e rolo sobre papel kraft"
                aspect="alto"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-[2rem] shadow-xl shadow-ink/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
