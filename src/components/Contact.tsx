import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { addressLine, mapsEmbedUrl, mapsUrl, site, whatsappUrl } from '@/config/site.config';

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="bg-night text-linen relative overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow text-gold-soft flex items-center gap-3">
            <span className="bg-gold h-px w-10" aria-hidden="true" />
            Contato
          </p>
          <p aria-hidden="true" className="font-script text-blush mt-5 text-5xl">
            casou?
          </p>
          <h2
            id="contato-title"
            className="font-display mt-3 text-[clamp(2.3rem,5vw,4rem)] leading-[1.02] font-light"
          >
            Traga o buquê o quanto antes —{' '}
            <em className="text-blush">flor fresca preserva melhor.</em>
          </h2>
          <p className="text-linen/80 mt-8 max-w-md text-lg leading-relaxed font-light">
            Mande uma foto do buquê pelo WhatsApp e agende o melhor horário para trazê-lo ao ateliê.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blush text-night hover:bg-linen mt-10 inline-flex min-h-14 items-center gap-3 rounded-full px-8 transition-colors"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            <span className="eyebrow text-[12px]">Conversar pelo WhatsApp</span>
          </a>

          <address className="mt-14 grid gap-7 not-italic sm:grid-cols-2">
            <div className="flex gap-4">
              <MapPin
                className="text-gold-soft mt-1 h-5 w-5 shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <p className="eyebrow text-gold-soft text-[10px]">Endereço</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-linen decoration-linen/30 hover:decoration-linen mt-2 block leading-relaxed underline underline-offset-4"
                >
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city} — {site.address.state}
                  <br />
                  CEP {site.address.postalCode}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock
                className="text-gold-soft mt-1 h-5 w-5 shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <p className="eyebrow text-gold-soft text-[10px]">Horário</p>
                <p className="text-linen mt-2 leading-relaxed">{site.openingHours}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone
                className="text-gold-soft mt-1 h-5 w-5 shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <p className="eyebrow text-gold-soft text-[10px]">Telefone e WhatsApp</p>
                <a
                  href={`tel:+${site.whatsapp}`}
                  className="text-linen decoration-linen/30 hover:decoration-linen mt-2 block underline underline-offset-4"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </address>
        </div>

        <div className="arch border-gold/50 bg-ink relative min-h-[26rem] overflow-hidden border lg:min-h-full">
          <iframe
            title={`Mapa: ${addressLine}`}
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale-[35%] sepia-[15%]"
          />
        </div>
      </div>
    </section>
  );
}
