'use client';

import {
  Armchair,
  ClipboardList,
  Droplet,
  ExternalLink,
  Hammer,
  Lamp,
  Paintbrush,
  Wrench,
  Zap,
} from 'lucide-react';
import { mapsUrl, processSteps, services, site } from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { ServiceMarquee, ToolWatermark } from './Brand';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

const SERVICE_ICONS = {
  droplet: Droplet,
  zap: Zap,
  paintbrush: Paintbrush,
  armchair: Armchair,
  hammer: Hammer,
  lamp: Lamp,
  wrench: Wrench,
  clipboard: ClipboardList,
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
      <p className={`label-caps text-[10px] ${light ? 'text-safetyDeep' : 'text-safety'}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] font-bold uppercase leading-[1.05] tracking-wide ${
          light ? 'text-ink' : 'text-chalk'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-prose text-[17px] leading-relaxed ${
            light ? 'text-inkSoft' : 'text-mist'
          } ${center ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Section — LIGHT. Who Isaias is, and the one mention of the Google listing as a trust signal. */
export function About() {
  const watermark = useParallax<HTMLDivElement>(0.08);

  return (
    <section id="about" className="relative overflow-hidden bg-floor py-28 text-ink sm:py-36">
      <div
        ref={watermark.ref}
        className="pointer-events-none absolute -right-16 top-10 hidden opacity-[0.05] will-change-transform lg:block"
        style={{ transform: `translate3d(0, ${watermark.offset}px, 0)` }}
        aria-hidden="true"
      >
        <ToolWatermark className="h-[32rem] w-auto text-ink" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Sobre"
              title="Quem resolve é o Isaias — e resolve bem."
              description={`${site.ownerFirstName} atende em todo o ${site.city}, com o cuidado de quem faz o serviço direito e o preço justo de quem trabalha sem intermediário — do orçamento ao acabamento, é sempre ele quem aparece na sua porta.`}
            />
            <div className="mt-10 space-y-6 border-l-2 border-safetyDeep/50 pl-7">
              <p className="max-w-prose leading-relaxed text-inkSoft">
                Hidráulica, elétrica, pintura, montagem de móveis e pequenos reparos — resolvidos
                com qualidade e ótimo custo-benefício, sem enrolação.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Photo
              src="/sobre.png"
              guide="Foto close, sem rosto: mãos e antebraços consertando um ponto elétrico ou hidráulico, ferramenta em uso."
              aiPrompt="Close-up documentary photo of a pair of weathered male hands and forearms (mid-40s skin tone and build, matching the attached reference photo for continuity — crop excludes the face entirely, so no facial reconstruction needed), gripping a wrench while tightening a fitting on a household electrical panel, sleeves rolled up over a charcoal-grey work shirt, one safety-yellow tool visible for a pop of color, warm side lighting, shallow depth of field, gritty realistic texture, editorial photography, 4:5 vertical"
              alt="Close-up de mãos consertando um ponto elétrico com ferramentas"
              aspect="tall"
              focus="center"
              tone="light"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Section — DARK. Full service menu, styled as riveted metal tags instead of ticket stubs. */
export function Services() {
  return (
    <section id="services" className="bg-charcoal py-28 text-chalk sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Serviços"
            title="Um faz-tudo pra cada canto da casa."
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
                <article className="relative flex h-full flex-col gap-4 border border-steelLine bg-steel px-6 py-7">
                  {/* Rivet dots at each corner, like a bolted metal tag. */}
                  {[
                    'left-2 top-2',
                    'right-2 top-2',
                    'left-2 bottom-2',
                    'right-2 bottom-2',
                  ].map((pos) => (
                    <span
                      key={pos}
                      className={`absolute h-1.5 w-1.5 rounded-full bg-charcoal ${pos}`}
                      aria-hidden="true"
                    />
                  ))}
                  <Icon className="h-6 w-6 text-safety" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-chalk">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-mist">
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

/** Atmospheric DARK parallax band — a wide, close-up strip of tools, a breathing moment before "como funciona". */
export function ToolBand() {
  const band = useParallax<HTMLDivElement>(0.24);

  return (
    <div className="relative h-[38vh] overflow-hidden bg-charcoal sm:h-[52vh]">
      <div
        ref={band.ref}
        className="absolute inset-0 scale-125 will-change-transform"
        style={{ transform: `translate3d(0, ${band.offset}px, 0) scale(1.25)` }}
      >
        <Photo
          src="/ferramentas.png"
          guide="Foto larga e atmosférica: ferramentas (chave inglesa, trena, alicate) organizadas sobre madeira ou concreto."
          aiPrompt="Wide atmospheric flat-lay photo of well-worn hand tools — an adjustable wrench, a tape measure, pliers, a screwdriver — arranged on raw concrete, dramatic raking side light, deep charcoal shadows with one safety-yellow tape measure as the only saturated color, shallow depth of field, editorial product photography, 21:9"
          alt="Ferramentas de trabalho organizadas sobre uma bancada"
          aspect="landscape"
          variant="backdrop"
          sizes="100vw"
          className="!aspect-auto h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-charcoal/55" aria-hidden="true" />
    </div>
  );
}

/** Section — LIGHT. "Como funciona", four numbered steps. */
export function Process() {
  return (
    <section id="process" className="bg-floor py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Como funciona"
            title="Do problema à solução, sem mistério."
            tone="light"
            center
          />
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, i) => (
            <Reveal key={item.step} delay={i * 80}>
              <span className="font-display text-5xl font-bold text-floorLine">{item.step}</span>
              <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-ink">
                {item.title}
              </h3>
              <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-inkSoft">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Continuous ticker of service categories, running like a strip of hazard tape between sections. */
export function ServicesTicker() {
  const items: string[] = [...services.map((s) => s.title), 'Orçamento grátis pelo WhatsApp'];
  return <ServiceMarquee items={items} />;
}

/** Compact badge linking the Google Business listing — the only public profile that exists. */
export function GoogleBadge({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const light = tone === 'light';
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 text-[12px] transition-colors ${
        light ? 'text-safetyDeep hover:text-ink' : 'text-safety hover:text-chalk'
      }`}
    >
      Perfil verificado no Google Maps
      <ExternalLink
        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </a>
  );
}
