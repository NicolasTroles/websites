'use client';

import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { mapsEmbedUrl, mapsUrl, site } from '@/config/site.config';
import { WhatsAppButton } from './Actions';
import { Reveal } from './Reveal';

/**
 * Contato + mapa.
 *
 * Sem endereço físico confirmado (Disk Chopp — entrega, não loja com
 * fachada), o mapa mostra a área de atendimento em nível de cidade, não um
 * pino de endereço específico inventado.
 */
export function Contact() {
  return (
    <section id="contact" className="bg-wheat text-stout">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="px-5 py-24 sm:px-8 sm:py-32 lg:pr-16">
          <Reveal>
            <p className="brand-caps text-[10px] text-copperDeep">Contato</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4rem)] font-normal uppercase leading-[0.98] text-stout">
              Peça seu
              <br />
              chopp agora.
            </h2>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-copperDeep">
              Chame no WhatsApp com a data do evento e a gente confirma disponibilidade, rótulo e
              tamanho do barril na hora.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 space-y-8">
              <div className="flex gap-5">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-copperDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="brand-caps text-[10px] text-copperDeep">Área de atendimento</h3>
                  <p className="mt-3 leading-relaxed text-stout">{site.serviceArea}</p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-caps mt-4 inline-flex min-h-11 items-center gap-2 text-[11px] text-copperDeep underline decoration-wheatLine underline-offset-[6px] transition-colors hover:decoration-copperDeep"
                  >
                    <Navigation className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    Ver no mapa
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-copperDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="brand-caps text-[10px] text-copperDeep">Disk Chopp</h3>
                  <a
                    href={`tel:${site.phoneLink}`}
                    className="mt-3 inline-flex min-h-11 items-center font-display text-2xl text-stout transition-colors hover:text-copperDeep"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-copperDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="w-full max-w-xs">
                  <h3 className="brand-caps text-[10px] text-copperDeep">Horário</h3>
                  <dl className="mt-3 space-y-2.5">
                    {site.openingHours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-6">
                        <dt className="text-copperDeep">{h.days}</dt>
                        <dd className="tabular-nums text-stout">{h.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12">
              <WhatsAppButton className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>

        <div className="relative min-h-[24rem] border-t border-wheatLine lg:min-h-full lg:border-l lg:border-t-0">
          <iframe
            src={mapsEmbedUrl}
            title={`Área de atendimento: ${site.name}, ${site.city} - ${site.state}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            style={{ filter: 'grayscale(0.4) contrast(0.95) sepia(0.15)' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-wheat/10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
