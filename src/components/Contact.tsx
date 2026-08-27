'use client';

import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { mapsEmbedUrl, mapsUrl, site } from '@/config/site.config';
import { WhatsAppButton } from './Actions';
import { Reveal } from './Reveal';

/** Contact + map. Address is confirmed on Google Business, so a real embed is safe to show. */
export function Contact() {
  return (
    <section id="contact" className="bg-cream text-ink">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="px-5 py-24 sm:px-8 sm:py-32 lg:pr-16">
          <Reveal>
            <p className="label-caps text-[10px] text-rustDeep">Contato</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.08] text-ink">
              Agende seu
              <br />
              horário.
            </h2>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-inkSoft">
              Chame no WhatsApp e a gente confirma o melhor horário para o seu corte.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 space-y-8">
              <div className="flex gap-5">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-rustDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="label-caps text-[10px] text-inkSoft">Endereço</h3>
                  <address className="mt-3 not-italic leading-relaxed text-ink">
                    {site.address.street}
                    <br />
                    {site.address.neighborhood}, {site.address.city} — {site.address.state}
                    <br />
                    CEP {site.address.zip}
                  </address>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-caps mt-4 inline-flex min-h-11 items-center gap-2 text-[11px] text-rustDeep underline decoration-creamLine underline-offset-[6px] transition-colors hover:decoration-rustDeep"
                  >
                    <Navigation className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    Traçar rota
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-rustDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="label-caps text-[10px] text-inkSoft">Telefone</h3>
                  <a
                    href={`tel:${site.phoneLink}`}
                    className="mt-3 inline-flex min-h-11 items-center font-display text-2xl text-ink transition-colors hover:text-rustDeep"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-rustDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="w-full max-w-xs">
                  <h3 className="label-caps text-[10px] text-inkSoft">Horário</h3>
                  <dl className="mt-3 space-y-2.5">
                    {site.openingHours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-6">
                        <dt className="text-inkSoft">{h.days}</dt>
                        <dd className="tabular-nums text-ink">{h.hours}</dd>
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

        <div className="relative min-h-[24rem] border-t border-creamLine lg:min-h-full lg:border-l lg:border-t-0">
          <iframe
            src={mapsEmbedUrl}
            title={`Mapa: ${site.brandFull}, ${site.address.street}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            style={{ filter: 'grayscale(0.5) contrast(0.95) sepia(0.12)' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-cream/10" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
