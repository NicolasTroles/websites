'use client';

import { Baby, Droplet, Quote, Scissors, Sparkles, Wind } from 'lucide-react';
import { differentiators, services, site, testimonials } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import {
  ClipperSilhouette,
  EyebrowGlyph,
  MustacheGlyph,
  RazorGlyph,
  SectionDivider,
} from './Brand';
import { Photo, type PhotoProps } from './Photo';
import { Reveal } from './Reveal';

/** A gallery photo that drifts vertically at its own rate as the page scrolls — the "cascade". */
function ParallaxPhoto({ speed, ...photoProps }: { speed: number } & PhotoProps) {
  const { ref, offset } = useParallax<HTMLDivElement>(speed);
  return (
    <div
      ref={ref}
      className="h-full will-change-transform"
      style={{ transform: `translate3d(0, ${offset}px, 0)` }}
    >
      <Photo {...photoProps} />
    </div>
  );
}

const SERVICE_ICONS = {
  scissors: Scissors,
  razor: RazorGlyph,
  mustache: MustacheGlyph,
  eyebrow: EyebrowGlyph,
  droplet: Droplet,
  sparkles: Sparkles,
  child: Baby,
  wind: Wind,
} as const;

/** Standard section header. `tone` swaps colors for the alternating light/dark backgrounds. */
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
      <p className={`label-caps text-[10px] ${light ? 'text-rustDeep' : 'text-rust'}`}>{eyebrow}</p>
      <h2
        className={`mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.08] ${
          light ? 'text-ink' : 'text-paper'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-prose text-[17px] leading-relaxed ${
            light ? 'text-inkSoft' : 'text-fern'
          } ${center ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Section — LIGHT. Brand story. */
export function About() {
  const watermark = useParallax<HTMLDivElement>(0.1);

  return (
    <section id="about" className="relative overflow-hidden bg-cream py-28 text-ink sm:py-36">
      <div
        ref={watermark.ref}
        className="pointer-events-none absolute -right-14 top-6 hidden opacity-[0.05] will-change-transform lg:block"
        style={{ transform: `translate3d(0, ${watermark.offset}px, 0)` }}
        aria-hidden="true"
      >
        <ClipperSilhouette className="h-[38rem] w-auto text-ink" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Sobre"
              title="Barba, tesoura e história de bairro."
              description={`A ${site.brandFull} fica no ${site.address.neighborhood}, em ${site.city}. Nada de fórmula de franquia: aqui o corte é feito com tempo, técnica e o ritual completo de uma barbearia de verdade.`}
            />
            <div className="mt-10 space-y-6 border-l-2 border-rust/60 pl-7">
              <p className="max-w-prose leading-relaxed text-inkSoft">
                Corte, barba na navalha, bigode, sobrancelha e pigmentação — tudo debaixo do mesmo
                teto, com quem entende do ofício.
              </p>
              <p className="max-w-prose leading-relaxed text-inkSoft">
                O resultado: nota máxima e {site.rating.count} avaliações no Google de clientes da
                região.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Photo
              src="/interior.png"
              guide="Foto do interior da barbearia: cadeiras, espelhos, ferramentas à mostra, iluminação quente."
              aiPrompt="Interior photo of a modern rustic barbershop, dark green walls, leather barber chairs, exposed wood shelving with grooming tools, warm Edison bulb lighting, editorial architectural photography, 4:5 vertical"
              alt="Interior da Barbearia Lumberjack, com cadeiras de couro e prateleiras de produtos"
              aspect="portrait"
              tone="light"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Atmospheric DARK parallax band — a strong scale+drift photo strip, a breathing moment before the menu. */
export function BeardBand() {
  const band = useParallax<HTMLDivElement>(0.24);

  return (
    <div className="relative h-[38vh] overflow-hidden bg-bark sm:h-[52vh]">
      <div
        ref={band.ref}
        className="absolute inset-0 scale-125 will-change-transform"
        style={{ transform: `translate3d(0, ${band.offset}px, 0) scale(1.25)` }}
      >
        <Photo
          src="/barba.png"
          guide="Foto larga e atmosférica: barba cheia e bem cuidada em close-up, iluminação lateral dramática."
          aiPrompt="Wide atmospheric close-up photo of a thick, well-groomed beard, dramatic side lighting, warm amber highlights against deep shadow, shallow depth of field, editorial barbershop photography, 21:9"
          alt="Close-up de barba bem cuidada"
          aspect="landscape"
          variant="backdrop"
          sizes="100vw"
          className="!aspect-auto h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-bark/55" aria-hidden="true" />
    </div>
  );
}

/** Static angled ribbon banner listing the core service categories — a sash, not a moving ticker. */
export function ServiceRibbon() {
  const items = ['Corte', 'Barba', 'Bigode', 'Sobrancelha', 'Navalha', 'Pigmentação'];

  return (
    <div className="overflow-hidden bg-bark py-2" aria-hidden="true">
      <div className="-rotate-1 border-y-4 border-paper/20 bg-rust py-3">
        <p className="label-caps flex flex-wrap justify-center gap-x-10 gap-y-2 px-5 text-center text-[13px] text-bark sm:text-sm">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
      </div>
    </div>
  );
}

/** Section — DARK. Full service menu, styled as ticket-stub cards. */
export function Services() {
  return (
    <section id="services" className="bg-bark py-28 text-paper sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Serviços"
            title="O ritual completo do corte."
            description="Consulte disponibilidade e valores pelo WhatsApp."
            tone="dark"
            center
          />
        </Reveal>

        <div className="mt-16 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <Reveal key={service.title} delay={i * 60} className="h-full">
                <article className="relative flex h-full flex-col gap-4 border-y border-dashed border-barkLine bg-pine px-6 py-7">
                  {/* Ticket punch-holes, matching the section background. */}
                  <span
                    className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-bark"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-bark"
                    aria-hidden="true"
                  />
                  <Icon className="h-6 w-6 text-rust" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-paper">{service.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-fern">
                      {service.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Section — LIGHT. Three differentiators. */
export function Differentiators() {
  return (
    <section className="border-t border-creamLine bg-cream py-24 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="h-full border border-creamLine bg-creamDeep p-8">
                <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-inkSoft">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Section — DARK. Photo gallery. */
export function Gallery() {
  return (
    <section id="gallery" className="bg-bark py-28 text-paper sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Galeria" title="Trabalho que fala por si." tone="dark" center />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <ParallaxPhoto
              speed={0.08}
              src=""
              guide="DESTAQUE: barba cheia e bem definida em close-up, cliente de frente, luz de estúdio."
              aiPrompt="Close-up portrait photo of a man with a thick, sharply shaped full beard, clean neckline, studio lighting, dark background, editorial barbershop photography, 16:10"
              alt="Barba cheia e bem definida feita na barbearia"
              aspect="landscape"
            />
          </Reveal>
          <Reveal delay={80}>
            <ParallaxPhoto
              speed={-0.06}
              src=""
              guide="Detalhe de navalha aparando a barba, close-up macro."
              aiPrompt="Macro close-up photo of a straight razor shaping a beard line, shaving foam, dramatic side light, dark moody background, professional barbershop photography, 4:5"
              alt="Navalha aparando a linha da barba"
              aspect="tall"
            />
          </Reveal>
          <Reveal delay={140}>
            <ParallaxPhoto
              speed={0.1}
              src=""
              guide="Ferramentas de barbeiro sobre a bancada: tesoura, navalha, pente."
              aiPrompt="Flat lay photo of barber tools on a wooden counter — scissors, straight razor, comb, clippers — warm side lighting, dark green and walnut tones, editorial still life photography, 4:5"
              alt="Ferramentas de barbeiro sobre a bancada"
              aspect="tall"
            />
          </Reveal>
          <Reveal delay={200} className="lg:col-span-2">
            <ParallaxPhoto
              speed={-0.07}
              src=""
              guide="Cliente relaxado recebendo toalha quente antes da barba."
              aiPrompt="Photo of a relaxed client with a hot towel wrap on his face at a barbershop, warm ambient lighting, dark green leather chair, editorial barbershop photography, 16:10"
              alt="Cliente recebendo toalha quente antes da barba"
              aspect="landscape"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Section — DARK. Real Google reviews. */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-barkLine bg-bark py-28 text-paper sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Avaliações"
            title={`${site.rating.value.toFixed(1).replace('.', ',')} estrelas no Google.`}
            center
            tone="dark"
          />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2">
          {testimonials.map((item, i) => (
            <Reveal key={item.quote} delay={i * 100}>
              <figure className="flex h-full flex-col border border-barkLine bg-pine p-9">
                <Quote className="h-6 w-6 text-rust" strokeWidth={1.5} aria-hidden="true" />
                <blockquote className="mt-6 flex-1 font-display text-lg leading-relaxed text-paper">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-barkLine pt-5">
                  <p className="label-caps text-[11px] text-fern">{item.author}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <SectionDivider className="mt-16" tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}
