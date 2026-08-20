'use client';

import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { mapsEmbedUrl, mapsUrl, site } from '@/config/site.config';
import { BotaoWhatsApp } from './Acoes';
import { Reveal } from './Reveal';

/**
 * Contato + mapa.
 *
 * A seção é branca, então aplicamos só uma leve dessaturação no mapa do
 * Google para ele não brigar com o resto da página — mapas coloridos puxam
 * a atenção para longe do endereço e do botão de rota.
 */
export function Contato() {
  return (
    <section id="contato" className="bg-white">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* Coluna de informações */}
        <div className="px-5 py-24 sm:px-8 sm:py-32 lg:pr-16">
          <Reveal>
            <p className="brand-caps text-[10px] text-petroleoDeep">Contato</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] font-normal leading-[1.08] text-ink">
              Venha ver
              <br />
              as cores de perto.
            </h2>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-slate">
              Cor na tela nunca é igual à cor na parede. Passe na loja, veja
              as amostras físicas e chame no WhatsApp se preferir adiantar o
              orçamento.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 space-y-8">
              <div className="flex gap-5">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-petroleo"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="brand-caps text-[10px] text-slate">Endereço</h3>
                  <address className="mt-3 not-italic leading-relaxed text-ink">
                    {site.endereco.logradouro}
                    <br />
                    {site.endereco.bairro}, {site.endereco.cidade} —{' '}
                    {site.endereco.estado}
                    <br />
                    CEP {site.endereco.cep}
                  </address>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 brand-caps text-[11px] text-petroleoDeep underline decoration-line underline-offset-[6px] transition-colors hover:decoration-petroleoDeep"
                  >
                    <Navigation className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    Traçar rota
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-petroleo"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="brand-caps text-[10px] text-slate">Telefone</h3>
                  <a
                    href={`tel:${site.telefoneLink}`}
                    className="mt-3 inline-flex min-h-11 items-center font-display text-2xl text-ink transition-colors hover:text-petroleoDeep"
                  >
                    {site.telefone}
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-petroleo"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="w-full max-w-xs">
                  <h3 className="brand-caps text-[10px] text-slate">
                    Horário
                  </h3>
                  <dl className="mt-3 space-y-2.5">
                    {site.horarios.map((h) => (
                      <div key={h.dias} className="flex justify-between gap-6">
                        <dt className="text-slate">{h.dias}</dt>
                        <dd className="tabular-nums text-ink">{h.horas}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12">
              <BotaoWhatsApp className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>

        {/* Coluna do mapa */}
        <div className="relative min-h-[24rem] border-t border-line lg:min-h-full lg:border-l lg:border-t-0">
          <iframe
            src={mapsEmbedUrl}
            title={`Mapa: ${site.marcaLoja}, ${site.endereco.logradouro}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            style={{ filter: 'grayscale(0.5) contrast(0.95)' }}
          />
        </div>
      </div>
    </section>
  );
}
