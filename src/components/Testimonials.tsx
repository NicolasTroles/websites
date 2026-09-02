import { ExternalLink, Star } from 'lucide-react';
import { mapsUrl, site, testimonials } from '@/config/site.config';
import { SectionHeading } from './Sections';
import { Reveal } from './Reveal';

/** Compact badge linking the Google listing — the only confirmed rating source. */
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
      Ver perfil no Google
      <ExternalLink
        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </a>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-safetyDeep" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" strokeWidth={0} fill={i < count ? 'currentColor' : '#DCE6EA'} />
      ))}
    </div>
  );
}

/** Prova social — real rating value only; testimonial text stays as explicit placeholders until replaced. */
export function Testimonials() {
  return (
    <section id="avaliacoes" className="bg-floorDeep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <SectionHeading
              eyebrow="Prova social"
              title="Quem já confiou na Activa, conta."
              tone="light"
            />
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 border border-floorLine bg-floor px-8 py-5 text-center transition-colors hover:border-ink"
            >
              <p className="font-display text-3xl font-bold text-ink">
                {site.googleRating}
                <span className="ml-1 text-safetyDeep">★</span>
              </p>
              <p className="label-caps mt-1 text-[10px] text-inkSoft">Google</p>
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <article className="flex h-full flex-col gap-4 border border-floorLine bg-floor p-7">
                <Stars count={item.rating} />
                <p className="flex-1 text-[14px] italic leading-relaxed text-inkSoft">
                  “{item.text}”
                </p>
                <div>
                  <p className="text-[13px] font-medium text-ink">{item.name}</p>
                  <p className="text-[11px] text-inkSoft">{item.date}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="mt-10 text-center">
            <GoogleBadge tone="light" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
