'use client';

import { Car, Home, Palette, Wrench } from 'lucide-react';
import { processo, servicos, site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { RollerSilhouette } from './Brand';
import { Foto } from './Foto';
import { Reveal } from './Reveal';

const ICONES = {
  palette: Palette,
  home: Home,
  car: Car,
  wrench: Wrench,
} as const;

/**
 * Cabeçalho padrão de seção.
 * `tom` troca as cores de texto quando o título cai sobre a faixa cheia de
 * azul petróleo — o resto do site é branco/offwhite e usa sempre 'claro'.
 */
function TituloSecao({
  etiqueta,
  titulo,
  descricao,
  centro = false,
  tom = 'claro',
}: {
  etiqueta: string;
  titulo: string;
  descricao?: string;
  centro?: boolean;
  tom?: 'claro' | 'marca';
}) {
  const marca = tom === 'marca';
  return (
    <div className={centro ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p
        className={`brand-caps text-[10px] ${marca ? 'text-white/80' : 'text-petroleoDeep'}`}
      >
        {etiqueta}
      </p>
      <h2
        className={`mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] font-normal leading-[1.08] ${
          marca ? 'text-white' : 'text-ink'
        }`}
      >
        {titulo}
      </h2>
      {descricao && (
        <p
          className={`mt-6 max-w-prose text-[17px] leading-relaxed ${
            marca ? 'text-white/85' : 'text-slate'
          } ${centro ? 'mx-auto' : ''}`}
        >
          {descricao}
        </p>
      )}
    </div>
  );
}

/** Seção 2. A loja, com fotos do balcão e da máquina de mistura. */
export function Loja() {
  const marca = useParallax<HTMLDivElement>(0.12);

  return (
    <section id="loja" className="relative overflow-hidden bg-white py-28 sm:py-36">
      {/* Marca d'água do rolo de pintura, movendo devagar ao fundo. */}
      <div
        ref={marca.ref}
        className="pointer-events-none absolute -right-24 top-0 hidden opacity-[0.05] will-change-transform lg:block"
        style={{ transform: `translate3d(0, ${marca.offset}px, 0)` }}
        aria-hidden="true"
      >
        <RollerSilhouette className="h-[42rem] w-auto text-ink" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <TituloSecao
              etiqueta="A loja"
              titulo="Cor não se escolhe no escuro."
              descricao="Tinta certa não é só a lata certa — é entender a luz do ambiente, a superfície e o que aquela cor precisa aguentar. Só depois vem a mistura."
            />
            <div className="mt-10 space-y-6 border-l-2 border-petroleo/50 pl-7">
              <p className="max-w-prose leading-relaxed text-slate">
                Em {site.cidade}, {site.nome} atende quem está pintando a
                casa pela primeira vez e quem já sabe exatamente o código da
                cor que quer repetir. Nos dois casos, o cuidado é o mesmo.
              </p>
              <p className="max-w-prose leading-relaxed text-slate">
                Máquina de mistura computadorizada, catálogo com milhares de
                tons e uma equipe que testa a cor com você antes de fechar a
                lata — para o resultado bater com o que você imaginou.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <Foto
                // FOTO 2 — placeholder profissional (banco de imagens) até termos
                // a máquina de mistura real — ver FOTOS.md.
                src="/fotos/loja-1.jpg"
                guia="Máquina de mistura de cores em funcionamento, ou a equipe preparando uma tinta."
                alt="Mão aplicando tinta verde na parede com rolo"
                aspect="alto"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="mt-10 rounded-2xl"
              />
              <Foto
                // FOTO 3 — placeholder profissional (banco de imagens).
                src="/fotos/loja-2.jpg"
                guia="Interior da loja: prateleiras de latas, catálogo de cores e balcão de atendimento."
                alt="Pintor aplicando tinta branca na parede com rolo, demarcada com fita crepe"
                aspect="alto"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="rounded-2xl"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Seção 3. Produtos e serviços — cards em grade sobre fundo offwhite. */
export function Servicos() {
  return (
    <section
      id="servicos"
      className="border-t border-line bg-offwhite py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <TituloSecao
            etiqueta="Produtos"
            titulo="O que você encontra aqui."
            centro
          />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {servicos.map((servico, i) => {
            const Icone = ICONES[servico.icone];
            return (
              <Reveal key={servico.titulo} delay={i * 80}>
                <article className="group h-full rounded-2xl border border-line bg-white p-9 transition-shadow duration-300 hover:shadow-lg hover:shadow-ink/5 sm:p-11">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-petroleoTint">
                    <Icone
                      className="h-6 w-6 text-petroleo"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-7 font-display text-2xl text-ink">
                    {servico.titulo}
                  </h3>
                  <p className="mt-4 max-w-prose leading-relaxed text-slate">
                    {servico.descricao}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Seção 4. Galeria: grade de fotos sobre fundo branco. */
export function Galeria() {
  return (
    <section id="galeria" className="bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <TituloSecao
            etiqueta="Fotos"
            titulo="Um pouco do dia a dia da loja."
            descricao="Imagens temporárias, só para dar vida ao layout — trocar pelas fotos reais da loja assim que estiverem prontas."
          />
        </Reveal>

        {/* Grade assimétrica: mais interessante que uma grade uniforme. */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="lg:row-span-2">
            <Foto
              // FOTO 4 — destaque. Placeholders profissionais (banco de imagens)
              // até termos fotos reais da loja — ver FOTOS.md.
              src="/fotos/galeria-destaque.jpg"
              guia="DESTAQUE vertical: fachada da loja ou a prateleira mais colorida. A melhor foto que você tiver."
              alt="Mãos folheando uma cartela de amostras de cores de tinta"
              aspect="alto"
              className="h-full rounded-2xl"
            />
          </Reveal>
          <Reveal delay={80}>
            <Foto
              // FOTO 5
              src="/fotos/galeria-cores.jpg"
              guia="Detalhe do catálogo de cores ou das cartelas na parede."
              alt="Cartela de amostras de cores de tinta em leque"
              aspect="quadrado"
              className="rounded-2xl"
            />
          </Reveal>
          <Reveal delay={160}>
            <Foto
              // FOTO 6
              src="/fotos/galeria-mistura.jpg"
              guia="Detalhe da mistura de tinta: a máquina, ou a lata sendo agitada."
              alt="Rolo de pintura aplicando tinta azul-acinzentada em parede, vista de cima"
              aspect="quadrado"
              className="rounded-2xl"
            />
          </Reveal>
          <Reveal delay={240}>
            <Foto
              // FOTO 7
              src="/fotos/galeria-prateleira.jpg"
              guia="Prateleiras com latas de tinta organizadas por linha ou marca."
              alt="Fileira de casas com fachadas em cores vivas e variadas"
              aspect="paisagem"
              className="rounded-2xl"
            />
          </Reveal>
          <Reveal delay={320}>
            <Foto
              // FOTO 8
              src="/fotos/galeria-balcao.jpg"
              guia="Balcão de atendimento, com cliente sendo atendido, se possível."
              alt="Rolo de pintura aplicando tinta branca em parede clara"
              aspect="paisagem"
              foco="direita"
              className="rounded-2xl"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Seção 5. A faixa cheia da marca — o único bloco de cor forte da página. */
export function Processo() {
  return (
    <section id="processo" className="relative overflow-hidden bg-petroleo">
      {/* Textura sutil, só para a faixa não ficar uma chapa lisa de cor. */}
      <div className="weave absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <Reveal>
          <TituloSecao
            etiqueta="Como funciona"
            titulo="Da dúvida à lata pronta."
            descricao="Quatro passos, do jeito que sempre foi feito por aqui."
            centro
            tom="marca"
          />
        </Reveal>

        <ol className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processo.map((etapa, i) => (
            <Reveal key={etapa.numero} delay={i * 80}>
              <li className="h-full rounded-2xl border border-white/15 bg-white/10 p-8">
                <span
                  className="font-display text-5xl text-white/50"
                  aria-hidden="true"
                >
                  {etapa.numero}
                </span>
                <h3 className="mt-5 font-display text-xl text-white">
                  {etapa.titulo}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/85">
                  {etapa.descricao}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
