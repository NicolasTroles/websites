'use client';

import { Calendar, Scissors, Shirt, Quote } from 'lucide-react';
import { depoimentos, processo, servicos, site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { SectionDivider, SuitSilhouette } from './Brand';
import { Foto } from './Foto';
import { Reveal } from './Reveal';

const ICONES = {
  suit: Shirt,
  shirt: Shirt,
  scissors: Scissors,
  calendar: Calendar,
} as const;

/**
 * Cabeçalho padrão de seção.
 * `tom` troca as cores de texto conforme a seção seja clara ou escura —
 * a página alterna entre as duas famílias de fundo.
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
  tom?: 'claro' | 'escuro';
}) {
  const claro = tom === 'claro';
  return (
    <div className={centro ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p
        className={`brand-caps text-[10px] ${claro ? 'text-brassDeep' : 'text-brass'}`}
      >
        {etiqueta}
      </p>
      <h2
        className={`mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] font-normal leading-[1.08] ${
          claro ? 'text-cocoa' : 'text-bone'
        }`}
      >
        {titulo}
      </h2>
      {descricao && (
        <p
          className={`mt-6 max-w-prose text-[17px] leading-relaxed ${
            claro ? 'text-cocoaSoft' : 'text-silver'
          } ${centro ? 'mx-auto' : ''}`}
        >
          {descricao}
        </p>
      )}
    </div>
  );
}

/** Seção 2 — CLARA. A história do ofício, com fotos do Carlos trabalhando. */
export function Oficio() {
  const marca = useParallax<HTMLDivElement>(0.12);

  return (
    <section
      id="oficio"
      className="relative overflow-hidden bg-sand py-28 text-cocoa sm:py-36"
    >
      {/* Marca d'água da silhueta da fachada, movendo devagar ao fundo. */}
      <div
        ref={marca.ref}
        className="pointer-events-none absolute -right-24 top-0 hidden opacity-[0.06] will-change-transform lg:block"
        style={{ transform: `translate3d(0, ${marca.offset}px, 0)` }}
        aria-hidden="true"
      >
        <SuitSilhouette className="h-[42rem] w-auto text-cocoa" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <TituloSecao
              etiqueta="O ofício"
              titulo="Cada peça começa numa conversa."
              descricao="Alfaiataria não é medir e entregar. É entender como você se move, onde vai usar a peça e o que ela precisa dizer por você. Só depois vêm a fita métrica, o giz e a tesoura."
            />
            <div className="mt-10 space-y-6 border-l-2 border-brass/50 pl-7">
              <p className="max-w-prose leading-relaxed text-cocoaSoft">
                No centro de Curitiba, {site.nome} mantém o ofício de alfaiate e
                camiseiro do jeito que ele foi ensinado: molde exclusivo, corte à
                mão e provas até o caimento ficar exato.
              </p>
              <p className="max-w-prose leading-relaxed text-cocoaSoft">
                É um trabalho lento por escolha. O resultado é uma peça que
                acompanha você por anos, em vez de uma que serve mais ou menos
                por uma temporada.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {/*
             * Lado a lado, ambas em 2:3 com crop.
             *
             * A foto da mesa é 4:3 deitada, então perde ~25% de cada lado nesse
             * slot. `foco` decide qual metade sobra: ancorando à esquerda,
             * preservamos Carlos e os moldes e sacrificamos só o tecido vazio
             * da direita — em vez de perder um pedaço de cada ponta.
             */}
            <div className="grid grid-cols-2 gap-4">
              <Foto
                // FOTO 2 — mesa de corte
                src="/fotos/oficio-1.jpg"
                guia="Carlos trabalhando: mãos cortando tecido, marcando com régua."
                alt="Carlos Simões marcando um tecido azul com régua de alfaiate sobre a mesa de corte, com moldes de papel pendurados ao fundo"
                aspect="alto"
                tom="claro"
                foco="esquerda"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="mt-10"
              />
              <Foto
                // FOTO 3 — interior do ateliê
                src="/fotos/oficio-2.jpg"
                guia="Interior do ateliê: Carlos recebendo, prateleiras de tecido e provador."
                alt="Carlos Simões no interior do seu ateliê, ao lado do provador, com prateleiras de tecidos e gravatas ao fundo"
                aspect="alto"
                tom="claro"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Seção 3 — CLARA. Serviços. */
export function Servicos() {
  return (
    <section
      id="servicos"
      className="border-t border-sandLine bg-sand py-28 text-cocoa sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <TituloSecao
            etiqueta="Serviços"
            titulo="O que sai da alfaiataria."
            centro
          />
        </Reveal>

        <div className="mt-16 grid gap-px border border-sandLine bg-sandLine sm:grid-cols-2">
          {servicos.map((servico, i) => {
            const Icone = ICONES[servico.icone];
            return (
              <Reveal key={servico.titulo} delay={i * 80}>
                <article className="group h-full bg-sand p-9 transition-colors duration-300 hover:bg-sandDeep sm:p-11">
                  <Icone
                    className="h-6 w-6 text-brassDeep"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mt-7 font-display text-2xl text-cocoa">
                    {servico.titulo}
                  </h3>
                  <p className="mt-4 max-w-prose leading-relaxed text-cocoaSoft">
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

/** Seção 4 — ESCURA. Galeria: o fundo escuro faz as fotos saltarem. */
export function Galeria() {
  return (
    <section id="galeria" className="bg-ink py-28 text-bone sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <TituloSecao
            etiqueta="Trabalhos"
            titulo="Peças que saíram daqui."
            descricao="Substitua por fotos reais das peças do Carlos. Fotos em pessoas convertem muito mais do que peças no cabide."
            tom="escuro"
          />
        </Reveal>

        {/* Grade assimétrica: mais interessante que uma grade uniforme. */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="lg:row-span-2">
            <Foto
              // FOTO 4 — destaque
              guia="DESTAQUE vertical: homem de terno completo, corpo inteiro, em pé. A melhor foto que você tiver."
              alt="Terno completo sob medida"
              aspect="alto"
              className="h-full"
            />
          </Reveal>
          <Reveal delay={80}>
            <Foto
              // FOTO 5
              guia="Detalhe de lapela, botão ou casa de botão feita à mão."
              alt="Detalhe de lapela de terno sob medida"
              aspect="quadrado"
            />
          </Reveal>
          <Reveal delay={160}>
            <Foto
              // FOTO 6
              guia="Camisa sob medida: colarinho e punho em destaque."
              alt="Camisa sob medida"
              aspect="quadrado"
            />
          </Reveal>
          <Reveal delay={240}>
            <Foto
              // FOTO 7
              guia="Terno de casamento: noivo ou padrinhos."
              alt="Traje de casamento sob medida"
              aspect="paisagem"
            />
          </Reveal>
          <Reveal delay={320}>
            <Foto
              // FOTO 8
              guia="Tecidos: rolos ou cartela de amostras, luz lateral."
              alt="Tecidos disponíveis na alfaiataria"
              aspect="paisagem"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Seção 5 — faixa de foto ESCURA, depois processo CLARO. */
export function Processo() {
  const faixa = useParallax<HTMLDivElement>(0.22);

  return (
    <section id="processo">
      {/* Faixa de foto em parallax: transição entre o escuro e o claro. */}
      <div className="relative h-[45vh] overflow-hidden bg-ink sm:h-[60vh]">
        <div
          ref={faixa.ref}
          className="absolute inset-0 scale-125 will-change-transform"
          style={{ transform: `translate3d(0, ${faixa.offset}px, 0) scale(1.25)` }}
        >
          <Foto
            // FOTO 9 — faixa parallax
            guia="Foto larga e atmosférica: interior da alfaiataria, arara de ternos, ou a mesa de corte. Serve de respiro entre seções."
            alt="Interior da alfaiataria de Carlos Simões"
            aspect="paisagem"
            sizes="100vw"
            className="h-full w-full !aspect-auto"
          />
        </div>
        <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
      </div>

      <div className="bg-sand text-cocoa">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
          <Reveal>
            <TituloSecao
              etiqueta="Processo"
              titulo="Do tecido à entrega."
              descricao="Quatro etapas, sem pressa em nenhuma delas."
              centro
            />
          </Reveal>

          <ol className="mt-16 grid gap-px border border-sandLine bg-sandLine md:grid-cols-2 lg:grid-cols-4">
            {processo.map((etapa, i) => (
              <Reveal key={etapa.numero} delay={i * 80}>
                <li className="h-full bg-sand p-9">
                  <span
                    className="font-display text-5xl text-brass/60"
                    aria-hidden="true"
                  >
                    {etapa.numero}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-cocoa">
                    {etapa.titulo}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-cocoaSoft">
                    {etapa.descricao}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Seção 6 — CLARA. Depoimentos. */
export function Depoimentos() {
  return (
    <section className="border-t border-sandLine bg-sand py-28 text-cocoa sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <TituloSecao etiqueta="Clientes" titulo="Quem já vestiu." centro />
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {depoimentos.map((dep, i) => (
            <Reveal key={i} delay={i * 90}>
              <figure className="flex h-full flex-col border border-sandLine bg-sandDeep p-9">
                <Quote
                  className="h-6 w-6 text-brassDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <blockquote className="mt-6 flex-1 font-display text-lg leading-relaxed text-cocoa">
                  {dep.texto}
                </blockquote>
                <figcaption className="mt-7 border-t border-sandLine pt-5">
                  <p className="brand-caps text-[11px] text-cocoa">{dep.autor}</p>
                  <p className="mt-2 text-sm text-cocoaSoft">{dep.contexto}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <SectionDivider className="mt-20" tom="claro" />
        </Reveal>
      </div>
    </section>
  );
}
