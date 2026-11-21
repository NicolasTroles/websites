import { Clock, MapPin, Phone } from 'lucide-react';
import { fullAddress, mapsEmbedUrl, mapsUrl, site, whatsappUrl } from '@/config/site.config';
import { InstagramIcon, WhatsAppIcon } from './Brand';
import { Reveal } from './Reveal';

const steps = [
  { title: 'Chame no WhatsApp', text: 'Toque no botão abaixo — a mensagem já vai pronta.' },
  { title: 'Mande modelo e ano', text: 'E o serviço que procura. Se puder, uma foto ajuda.' },
  { title: 'Receba e agende', text: 'Você recebe o valor e já combina o melhor dia.' },
] as const;

export function Contact() {
  return (
    <section id="orcamento" aria-labelledby="orcamento-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-neon">Orçamento</p>
            <Reveal variant="wipe">
              <h2
                id="orcamento-title"
                className="font-display mt-4 text-[clamp(2rem,5vw,3.75rem)] leading-[1.04] font-semibold tracking-tight text-balance"
              >
                Mande o modelo e o ano. A gente responde com o valor.
              </h2>
            </Reveal>

            <ol className="mt-12 space-y-7">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <span className="font-display border-neon/50 text-neon inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-display font-medium">{step.title}</p>
                    <p className="text-haze mt-1">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neon text-neon-ink glow hover:bg-neon-soft mt-12 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full px-8 text-lg font-semibold transition-colors sm:w-auto"
            >
              <WhatsAppIcon className="h-6 w-6" />
              Pedir orçamento no WhatsApp
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>

          <div className="lg:col-span-5">
            <dl className="border-line bg-carbon divide-line divide-y rounded-3xl border">
              <div className="relative py-6 pr-6 pl-16">
                <MapPin className="text-neon absolute top-6 left-6 h-5 w-5" aria-hidden="true" />
                <dt className="eyebrow text-haze text-[10px]">Endereço</dt>
                <dd className="mt-2 leading-relaxed">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neon decoration-line-bright underline underline-offset-4 transition-colors"
                  >
                    {fullAddress}
                    <span className="sr-only"> (abre o Google Maps em nova aba)</span>
                  </a>
                </dd>
              </div>
              <div className="relative py-6 pr-6 pl-16">
                <Phone className="text-neon absolute top-6 left-6 h-5 w-5" aria-hidden="true" />
                <dt className="eyebrow text-haze text-[10px]">Telefone e WhatsApp</dt>
                <dd className="mt-2">
                  <a
                    href={site.phoneHref}
                    className="hover:text-neon inline-flex min-h-11 items-center text-lg font-medium transition-colors"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="relative py-6 pr-6 pl-16">
                <Clock className="text-neon absolute top-6 left-6 h-5 w-5" aria-hidden="true" />
                <dt className="eyebrow text-haze text-[10px]">Horário</dt>
                {site.openingHours.map((row) => (
                  <dd key={row.days} className="mt-2">
                    <span className="font-medium">{row.days}:</span>{' '}
                    <span className="text-haze">{row.hours}</span>
                  </dd>
                ))}
              </div>
              <div className="relative py-6 pr-6 pl-16">
                <InstagramIcon className="text-neon absolute top-6 left-6 h-5 w-5" />
                <dt className="eyebrow text-haze text-[10px]">Instagram</dt>
                <dd className="mt-2">
                  <a
                    href={site.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neon inline-flex min-h-11 items-center font-medium transition-colors"
                  >
                    {site.socialLinks.instagramHandle}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border-line mt-14 overflow-hidden rounded-3xl border">
          <iframe
            title={`Mapa: localização da ${site.brandFull}`}
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-80 w-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.6)] sm:h-96"
          />
        </div>
      </div>
    </section>
  );
}
