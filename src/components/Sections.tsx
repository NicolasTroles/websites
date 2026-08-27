'use client';

import { Beer, Briefcase, Cake, GraduationCap, Handshake, Heart, Quote, Truck } from 'lucide-react';
import {
  barrelSizes,
  beers,
  eventTypes,
  howItWorks,
  partnershipAudiences,
  site,
  testimonials,
  whatsappUrl,
} from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { BeerMark, SectionDivider } from './Brand';
import { WhatsAppButton } from './Actions';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

const EVENT_ICONS = {
  heart: Heart,
  cake: Cake,
  graduationCap: GraduationCap,
  briefcase: Briefcase,
} as const;

/**
 * Cabeçalho padrão de seção. `tone` troca as cores conforme o fundo da seção,
 * que alterna entre a família escura e a clara ao longo da página.
 */
function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  tone?: 'light' | 'dark';
}) {
  const light = tone === 'light';
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={`brand-caps text-[10px] ${light ? 'text-copperDeep' : 'text-amber'}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-[clamp(2.2rem,6vw,4rem)] font-normal uppercase leading-[0.98] ${
          light ? 'text-stout' : 'text-foam'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-prose text-[17px] leading-relaxed ${
            light ? 'text-copperDeep' : 'text-barley'
          } ${center ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Seção — CLARA. Apresentação da distribuidora. */
export function About() {
  const watermark = useParallax<HTMLDivElement>(0.1);

  return (
    <section id="about" className="relative overflow-hidden bg-wheat py-28 text-stout sm:py-36">
      <div
        ref={watermark.ref}
        className="pointer-events-none absolute -right-16 top-10 hidden opacity-[0.05] will-change-transform lg:block"
        style={{ transform: `translate3d(0, ${watermark.offset}px, 0)` }}
        aria-hidden="true"
      >
        <BeerMark className="h-[34rem] w-auto text-stout" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Quem somos"
              title="Chopp de verdade, entregue na hora certa."
              description={`A ${site.name} é distribuidora de chopp em ${site.city}. Atendemos ${site.serviceArea} com barril, chopeira e todo o suporte para o seu evento não parar.`}
            />
            <div className="mt-10 space-y-6 border-l-2 border-amber/60 pl-7">
              <p className="max-w-prose leading-relaxed text-copperDeep">
                Trabalhamos com Disk Chopp: você escolhe o rótulo pelo WhatsApp e recebe tudo já
                pronto para servir, sem precisar entender de chopeira.
              </p>
              <p className="max-w-prose leading-relaxed text-copperDeep">
                Buscamos o equipamento depois do evento — o único trabalho que sobra pra você é
                aproveitar a festa.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Photo
              src="/profissionais.png"
              guide="Foto da equipe ou do caminhão/carro de entrega da distribuidora, com barris de chopp visíveis."
              aiPrompt="Professional photo of a small local beer keg delivery team next to a delivery van, loading stainless steel beer kegs, warm late afternoon light, amber and copper color grading, friendly and trustworthy mood, shallow depth of field, editorial commercial photography, 4:5 vertical"
              alt="Equipe da Chopp São José carregando barris de chopp na van de entrega"
              aspect="portrait"
              tone="light"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Faixa atmosférica ESCURA em parallax — respiro entre "Sobre" e o catálogo. */
export function BarrelBand() {
  const band = useParallax<HTMLDivElement>(0.22);

  return (
    <div className="relative h-[38vh] overflow-hidden bg-stout sm:h-[52vh]">
      <div
        ref={band.ref}
        className="absolute inset-0 scale-125 will-change-transform"
        style={{ transform: `translate3d(0, ${band.offset}px, 0) scale(1.25)` }}
      >
        <Photo
          src="/banner2.png"
          guide="Foto larga e atmosférica: fileira de barris de chopp de metal, iluminação lateral dramática, ambiente de distribuidora ou evento."
          aiPrompt="Wide atmospheric photo of a row of stainless steel beer kegs stacked in a warehouse, dramatic side lighting, warm amber highlights against deep shadow, subtle fog, cinematic mood, editorial commercial photography, 21:9"
          alt="Fileira de barris de chopp em ambiente escuro e iluminado lateralmente"
          aspect="landscape"
          variant="backdrop"
          sizes="100vw"
          className="!aspect-auto h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-stout/60" aria-hidden="true" />
    </div>
  );
}

/** Seção — ESCURA. Catálogo de chopes, em cards uniformes (nenhum rótulo em destaque). */
export function Catalog() {
  return (
    <section id="catalog" className="bg-stout py-28 text-foam sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Catálogo"
            title="Chopes disponíveis."
            description="Consulte com a gente outros rótulos e disponibilidade para a sua data. Valores só pelo WhatsApp."
            tone="dark"
          />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {beers.map((beer, i) => (
            <Reveal key={beer.slug} delay={i * 60} className="h-full">
              <article className="group flex h-full flex-col gap-6 rounded-2xl border border-caskLine bg-cask p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber/60">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-stout text-amber transition-colors duration-300 group-hover:bg-amber group-hover:text-stout">
                    <Beer className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="brand-caps rounded-full bg-hop/20 px-3 py-1 text-[9px] text-hop">
                    {beer.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase text-foam">{beer.name}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-barley">
                    {beer.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="brand-caps mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] text-barley">
            {barrelSizes.map((size) => (
              <span key={size} className="flex items-center gap-2">
                <Beer className="h-3.5 w-3.5 text-amber" strokeWidth={2} aria-hidden="true" />
                Barril {size}
              </span>
            ))}
            <span className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-amber" strokeWidth={2} aria-hidden="true" />
              Chopeira inclusa na entrega
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Seção — CLARA. Como funciona, em linha do tempo conectada. */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-wheat py-28 text-stout sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Como funciona" title="Do pedido à sua festa." center />
        </Reveal>

        <ol className="relative mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-wheatLine lg:block"
            aria-hidden="true"
          />
          {howItWorks.map((step, i) => (
            <Reveal key={step.number} delay={i * 90}>
              <li className="relative">
                <span
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-wheatLine bg-wheat font-display text-lg text-amber"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-xl uppercase text-stout">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-copperDeep">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Seção — ESCURA. Tipos de evento + fotos de festas atendidas. */
export function Events() {
  return (
    <section id="events" className="bg-stout py-28 text-foam sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Eventos"
            title="Pra toda ocasião que pede chopp."
            tone="dark"
            center
          />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {eventTypes.map((event, i) => {
            const Icon = EVENT_ICONS[event.icon];
            return (
              <Reveal key={event.title} delay={i * 80}>
                <article className="h-full rounded-2xl border border-caskLine bg-cask p-7">
                  <Icon className="h-6 w-6 text-amber" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-5 font-display text-xl uppercase text-foam">{event.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-barley">
                    {event.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Reveal className="sm:col-span-2">
            <Photo
              src="/destaque1.png"
              guide="DESTAQUE: festa em andamento com convidados servindo chopp, ambiente iluminado e animado."
              aiPrompt="Wide photo of a lively outdoor party at golden hour, guests holding cups of golden draft beer near a beer keg tap station, string lights, warm bokeh background, candid documentary style, amber and copper tones, 16:10"
              alt="Convidados servindo chopp em uma festa ao ar livre"
              aspect="landscape"
            />
          </Reveal>
          <Reveal delay={80}>
            <Photo
              src="/destaque2.png"
              guide="Detalhe da torneira da chopeira servindo chopp em um copo, close-up."
              aiPrompt="Macro close-up photo of a beer tap pouring golden draft beer into a glass, foam rising, dark moody background, dramatic side light, water droplets, professional beverage photography, 4:5"
              alt="Torneira de chopeira servindo chopp em copo"
              aspect="portrait"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Seção — CLARA. Parcerias com bares, buffets e revendedores. */
export function Partnerships() {
  const partnershipMessage = encodeURIComponent(
    `Olá! Tenho interesse em uma parceria com a ${site.name}.`,
  );
  const partnershipUrl = `https://wa.me/${site.whatsapp}?text=${partnershipMessage}`;

  return (
    <section id="partnerships" className="bg-wheat py-28 text-stout sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Parcerias"
              title="Fornecimento fixo para quem já trabalha com chopp."
              description="Bares, restaurantes, buffets e revendedores da região contam com entrega recorrente e condições combinadas direto com a gente."
            />
            <a
              href={partnershipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-caps mt-8 inline-flex min-h-12 items-center gap-2.5 border border-copperDeep px-7 text-[13px] text-copperDeep transition-colors hover:bg-wheatDeep"
            >
              <Handshake className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Falar sobre parceria
            </a>
          </Reveal>

          <div className="grid gap-4">
            {partnershipAudiences.map((audience, i) => (
              <Reveal key={audience.title} delay={i * 90}>
                <div className="border border-wheatLine bg-wheatDeep p-7">
                  <h3 className="font-display text-xl uppercase text-stout">{audience.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-copperDeep">
                    {audience.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Seção — ESCURA. Depoimentos. */
export function Testimonials() {
  return (
    <section className="bg-stout py-28 text-foam sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Clientes"
            title="Quem já pediu chopp com a gente."
            tone="dark"
            center
          />
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.author + i} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-caskLine bg-cask p-9">
                <Quote className="h-6 w-6 text-amber" strokeWidth={1.5} aria-hidden="true" />
                <blockquote className="mt-6 flex-1 font-display text-lg leading-relaxed text-foam">
                  {item.text}
                </blockquote>
                <figcaption className="mt-7 border-t border-caskLine pt-5">
                  <p className="brand-caps text-[11px] text-foam">{item.author}</p>
                  <p className="mt-2 text-sm text-barley">{item.context}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <SectionDivider className="mt-20" tone="dark" />
        </Reveal>

        <Reveal delay={80} className="mt-10 flex justify-center">
          <WhatsAppButton />
        </Reveal>
      </div>
    </section>
  );
}
