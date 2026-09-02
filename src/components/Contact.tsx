'use client';

import { ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import { mapsEmbedUrl, mapsUrl, site } from '@/config/site.config';
import { WhatsAppButton } from './Actions';
import { CircuitWatermark } from './Brand';
import { Reveal } from './Reveal';

/** Localização + contato — endereço confirmado pelo cliente, então o mapa real é seguro de mostrar. */
export function Contact() {
  return (
    <section id="contato" className="bg-floor text-ink">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="px-5 py-24 sm:px-8 sm:py-32 lg:pr-16">
          <Reveal>
            <p className="label-caps text-[10px] text-safetyDeep">Contato</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.2rem)] font-bold leading-[1.08] tracking-tight text-ink">
              Estamos em Curitiba.
            </h2>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-inkSoft">
              Leve ou envie fotos do seu equipamento — a equipe da Activa avalia e retorna com o
              diagnóstico.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 space-y-8">
              <div className="flex gap-5">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-safetyDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="label-caps text-[10px] text-inkSoft">Endereço</h3>
                  <address className="mt-3 not-italic leading-relaxed text-ink">
                    {site.address.street}
                    <br />
                    {site.address.city} — {site.address.state}
                  </address>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-caps mt-4 inline-flex min-h-11 items-center gap-2 text-[11px] text-safetyDeep underline decoration-floorLine underline-offset-[6px] transition-colors hover:decoration-safetyDeep"
                  >
                    <Navigation className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    Como chegar
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-safetyDeep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="label-caps text-[10px] text-inkSoft">Telefone</h3>
                  <a
                    href={`tel:${site.phoneLink}`}
                    className="mt-3 inline-flex min-h-11 items-center font-display text-2xl font-bold text-ink transition-colors hover:text-safetyDeep"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-floorLine px-5 py-4 transition-colors hover:border-ink"
              >
                <span className="font-display text-2xl font-bold text-ink">
                  {site.googleRating}
                  <span className="ml-1 text-safetyDeep">★</span>
                </span>
                <span className="label-caps text-[10px] text-inkSoft">
                  Google
                  <ExternalLink
                    className="ml-1 inline h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12">
              <WhatsAppButton label="Falar pelo WhatsApp" className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>

        <div className="relative min-h-[24rem] border-t border-floorLine lg:min-h-full lg:border-l lg:border-t-0">
          <iframe
            src={mapsEmbedUrl}
            title={`Mapa: ${site.brandFull}, ${site.address.street}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            style={{ filter: 'grayscale(0.35) contrast(1.02)' }}
          />
        </div>
      </div>

      {/* Closing band — pure black, the brand's documented "alto contraste" application. */}
      <div className="relative overflow-hidden bg-void py-20 text-chalk sm:py-28">
        <div className="pointer-events-none absolute -bottom-16 -right-16 opacity-[0.06]" aria-hidden="true">
          <CircuitWatermark className="h-80 w-auto text-chalk" />
        </div>
        <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,4.4vw,2.9rem)] font-bold leading-[1.1] tracking-tight text-chalk">
              Seu equipamento parou? Vamos descobrir o problema.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 flex justify-center">
              <WhatsAppButton className="px-10 text-[14px]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
