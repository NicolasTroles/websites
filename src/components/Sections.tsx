'use client';

import { ArrowUpRight, Baby, Droplet, Scissors, Sparkles, Star, Wind } from 'lucide-react';
import { mapsUrl, services, site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import {
  ClipperSilhouette,
  EyebrowGlyph,
  InstagramGlyph,
  MustacheGlyph,
  RazorGlyph,
} from './Brand';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

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
              alt="Interior da Barbearia Lumberjack, com o letreiro da loja e cadeiras de barbeiro em fila"
              aspect="tall"
              focus="top"
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
            title="Serviços para cada detalhe do seu visual."
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

/**
 * Section — DARK. Instead of embedding placeholder gallery photos or
 * testimonial quotes we can't fully verify, this just points people to
 * where that content actually lives and is kept up to date: Instagram and
 * the real Google Business listing.
 */
export function SocialProof() {
  return (
    <section id="reviews" className="border-t border-barkLine bg-bark py-28 text-paper sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Redes e avaliações"
            title="Veja mais no Instagram e no Google."
            description="Fotos de cortes, bastidores e as avaliações reais de quem já passou por aqui."
            tone="dark"
            center
          />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-2">
          <Reveal>
            <a
              href={site.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between border border-barkLine bg-pine p-9 transition-colors hover:border-rust/60"
            >
              <InstagramGlyph className="h-7 w-7 text-rust" />
              <div className="mt-10">
                <h3 className="font-display text-xl font-bold text-paper">Instagram</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-fern">
                  Cortes, bastidores e novidades da barbearia.
                </p>
                <span className="label-caps mt-6 inline-flex items-center gap-2 text-[11px] text-rust">
                  Ver perfil
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={80}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between border border-barkLine bg-pine p-9 transition-colors hover:border-rust/60"
            >
              <div className="flex gap-0.5 text-rust" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <div className="mt-10">
                <h3 className="font-display text-xl font-bold text-paper">
                  {site.rating.value.toFixed(1).replace('.', ',')} no Google
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-fern">
                  {site.rating.count} avaliações de clientes de {site.city}.
                </p>
                <span className="label-caps mt-6 inline-flex items-center gap-2 text-[11px] text-rust">
                  Ver avaliações
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
