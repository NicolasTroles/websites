import { Armchair, ArrowUpRight, Cog, Droplets, Gem, Lightbulb, Sparkles } from 'lucide-react';
import {
  mapsUrl,
  process,
  results,
  services,
  site,
  testimonials,
  type Service,
} from '@/config/site.config';
import { InstagramIcon, Stars } from './Brand';
import { Photo } from './Photo';
import { Reveal } from './Reveal';
import { Scene } from './Scene';

const icons: Record<Service['icon'], typeof Gem> = {
  gem: Gem,
  lightbulb: Lightbulb,
  armchair: Armchair,
  sparkles: Sparkles,
  droplets: Droplets,
  cog: Cog,
};

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-neon">{eyebrow}</p>
      <Reveal variant="wipe">
        <h2
          id={id}
          className="font-display mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-[1.08] font-semibold tracking-tight text-balance"
        >
          {title}
        </h2>
      </Reveal>
      {intro && <p className="text-haze mt-5 text-lg leading-relaxed text-pretty">{intro}</p>}
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Serviços — bento grid. Vitrificação gets the big tile (it's the premium
 * service and the one with a "wow" visual); the rest scale down.
 * ------------------------------------------------------------------------ */

const bentoSpan: Record<string, string> = {
  vitrificacao: 'lg:col-span-2 lg:row-span-2',
  farois: 'lg:col-span-2',
  higienizacao: '',
  detalhamento: '',
  lavagem: 'lg:col-span-2',
  motor: 'lg:col-span-2',
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = icons[service.icon];
  const featured = service.id === 'vitrificacao';

  return (
    <Reveal
      as="article"
      delay={(index % 3) * 90}
      className={`group border-line bg-carbon hover:border-neon/45 relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-colors sm:p-8 ${bentoSpan[service.id] ?? ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="border-line-bright text-neon group-hover:border-neon/60 inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors">
          <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span className="font-display text-dim text-sm tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3
        className={`font-display mt-6 font-semibold tracking-tight ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}
      >
        {service.title}
      </h3>
      <p className="text-haze mt-3 leading-relaxed">{service.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {service.points.map((point) => (
          <li
            key={point}
            className="border-line text-frost rounded-full border px-3 py-1.5 text-[13px]"
          >
            {point}
          </li>
        ))}
      </ul>

      {featured && (
        <Photo
          className="mt-8 flex-1"
          aspect="aspect-[16/10] lg:aspect-auto lg:min-h-56"
          alt="Gotas de água sobre a pintura escura de um carro vitrificado"
          guide="Foto de gotas de água sobre a pintura vitrificada"
          aiPrompt="Macro photo of perfect round water beads on glossy black car paint after ceramic coating, a single cyan LED light reflected across the paint, shallow depth of field"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      )}
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title="Cuidado completo, por dentro e por fora."
          intro="Da lavagem do dia a dia à proteção que dura meses. Cada serviço pode ser feito sozinho ou combinado — o orçamento sai de acordo com o modelo e o estado do carro."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Processo — tall section with the WebGL panel pinned behind; the four steps
 * scroll over it. Its scroll progress drives the scene (data-scene-track).
 * ------------------------------------------------------------------------ */

export function Process() {
  return (
    <section id="processo" aria-labelledby="processo-title" data-scene-track className="relative">
      <div className="sticky top-0 h-dvh">
        <Scene />
      </div>

      <div className="relative -mt-[100dvh]">
        <div className="mx-auto flex min-h-dvh max-w-7xl items-center px-4 sm:px-8">
          <div className="max-w-xl">
            <p className="eyebrow text-neon">Processo</p>
            <h2
              id="processo-title"
              className="font-display mt-4 text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.06] font-semibold tracking-tight text-balance"
            >
              Debaixo da luz certa, nenhum detalhe escapa.
            </h2>
            <p className="text-haze mt-6 text-lg leading-relaxed text-pretty">
              Role a página e acompanhe a luz de inspeção passando pela pintura: é assim que cada
              carro é tratado aqui, etapa por etapa.
            </p>
          </div>
        </div>

        {/* The light travels left → right, so the first two cards sit on the
            right and the last two on the left — never on top of the bar. */}
        <ol>
          {process.map((item, index) => (
            <li
              key={item.step}
              className={`mx-auto flex min-h-[92dvh] max-w-7xl items-center px-4 sm:px-8 ${index < 2 ? 'justify-end' : 'justify-start'}`}
            >
              <article className="border-line/80 bg-night/72 w-full max-w-md rounded-3xl border p-7 backdrop-blur-md sm:p-9">
                <p className="font-display text-neon text-5xl font-semibold tabular-nums sm:text-6xl">
                  {item.step}
                </p>
                <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-haze mt-4 leading-relaxed">{item.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Resultados — before/after pairs. Placeholders until the client sends
 * photos (the Instagram highlights already show these exact jobs).
 * ------------------------------------------------------------------------ */

export function Results() {
  return (
    <section id="resultados" aria-labelledby="resultados-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="resultados-title"
            eyebrow="Antes e depois"
            title="A diferença aparece na foto."
            intro="Alguns dos trabalhos que mais pedem por aqui. Tem muito mais no Instagram."
          />
          <a
            href={site.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="border-line-bright text-frost hover:border-neon hover:text-neon inline-flex min-h-12 shrink-0 items-center gap-2.5 self-start rounded-full border px-6 font-medium transition-colors lg:self-auto"
          >
            <InstagramIcon className="h-5 w-5" />
            {site.socialLinks.instagramHandle}
            <span className="sr-only"> no Instagram (abre em nova aba)</span>
          </a>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {results.map((result, index) => (
            <Reveal key={result.id} as="figure" delay={index * 120}>
              <div className="grid grid-cols-2 gap-2">
                {(['before', 'after'] as const).map((key) => (
                  <div key={key} className="relative">
                    <Photo
                      src={result[key].src}
                      alt={`${result.title} — ${key === 'before' ? 'antes' : 'depois'}`}
                      guide={result[key].guide}
                      aiPrompt={result[key].aiPrompt}
                      aspect="aspect-[3/4]"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                    <span
                      className={`eyebrow pointer-events-none absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[9px] ${key === 'after' ? 'bg-neon text-neon-ink' : 'bg-night/85 text-frost'}`}
                    >
                      {key === 'before' ? 'Antes' : 'Depois'}
                    </span>
                  </div>
                ))}
              </div>
              <figcaption className="font-display mt-4 text-base font-medium">
                {result.title}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Avaliações — the real Google score, big; quotes stay as explicit
 * placeholders until the client picks real reviews.
 * ------------------------------------------------------------------------ */

export function Reviews() {
  return (
    <section
      id="avaliacoes"
      aria-labelledby="avaliacoes-title"
      className="border-line bg-carbon/60 border-y py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-neon">Avaliações</p>
          <h2
            id="avaliacoes-title"
            className="font-display mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-[1.08] font-semibold tracking-tight"
          >
            Quem deixou o carro aqui, voltou.
          </h2>
          <div className="mt-10 flex items-end gap-5">
            <p className="font-display text-neon text-[clamp(4.5rem,10vw,7.5rem)] leading-none font-semibold">
              {site.rating.value}
            </p>
            <div className="pb-3">
              <Stars className="text-neon" />
              <p className="text-haze mt-2 text-sm">{site.rating.count} avaliações no Google</p>
            </div>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-frost hover:text-neon decoration-line-bright mt-8 inline-flex min-h-11 items-center gap-2 font-medium underline underline-offset-4 transition-colors"
          >
            Ler as avaliações no Google
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>

        <ul className="divide-line border-line divide-y border-y lg:col-span-7">
          {testimonials.map((t, index) => (
            <li key={index}>
              <Reveal as="blockquote" className="py-8" delay={index * 100}>
                <p className="font-display text-frost text-lg leading-relaxed text-pretty sm:text-xl">
                  “{t.text}”
                </p>
                <footer className="text-haze mt-4 text-sm">
                  <span className="text-frost font-medium">{t.name}</span> · {t.car}
                </footer>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
