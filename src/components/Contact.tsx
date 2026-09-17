import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { contactTopics, phoneUrl, site, whatsappUrl, whatsappUrlWith } from '@/config/site.config';

/**
 * Contact is WhatsApp only, by the client's decision — there is no form and no
 * backend to receive one.
 *
 * The one thing a form was good for was qualifying the lead, and the subject
 * buttons below keep that: each opens the conversation already stating what it
 * is about, so the first reply is informed. No server component here needs to
 * be interactive, so this whole section stays out of the JS bundle.
 */
export function Contact() {
  return (
    <section id="contato" className="relative overflow-hidden bg-navy py-20 text-mist sm:py-28">
      <div aria-hidden="true" className="ruled-dark absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-label text-emerald">Contato</p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.015em] sm:text-4xl">
            Precisa organizar documentos ou regularizar pendências?
          </h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-slate">
            Chame no WhatsApp apresentando a necessidade da empresa. A partir daí avaliamos
            juntos o escopo do atendimento.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 bg-emerald px-7 font-display text-sm font-semibold uppercase tracking-[0.08em] text-navy transition-colors duration-200 hover:bg-mist"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Falar pelo WhatsApp
          </a>

          {/*
            dt/dd sit directly under the dl — nesting them deeper makes axe
            report the list as malformed.
          */}
          <dl className="mt-12 border-t border-navyLine pt-10">
            <dt className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-slate">
              <Phone className="h-4 w-4 shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
              Telefone e WhatsApp
            </dt>
            <dd className="mt-1 pl-7">
              <a href={phoneUrl} className="text-[15px] text-mist hover:text-emerald">
                {site.phone}
              </a>
            </dd>

            <dt className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-slate">
              <MapPin className="h-4 w-4 shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
              Atendimento
            </dt>
            <dd className="mt-1 pl-7 text-[15px] leading-relaxed text-slate">{site.areaServed}</dd>

            <dt className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-slate">
              <Clock className="h-4 w-4 shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
              Horário
            </dt>
            <dd className="mt-1 space-y-1 pl-7 text-[15px] text-slate">
              {site.openingHours.map((entry) => (
                <p key={entry.days}>
                  {entry.days}: {entry.hours}
                </p>
              ))}
            </dd>
          </dl>
        </Reveal>

        <Reveal delay={110} variant="wipe">
          <div className="border border-navyLine bg-navySoft/60">
            <p className="border-b border-navyLine px-6 py-4 font-mono text-[10px] uppercase tracking-label text-dim">
              Sobre o que você quer falar?
            </p>
            <ul className="divide-y divide-navyLine">
              {contactTopics.map((topic) => (
                <li key={topic.label}>
                  <a
                    href={whatsappUrlWith(topic.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-16 items-center justify-between gap-4 px-6 py-4 transition-colors duration-200 ease-smooth hover:bg-navyLift"
                  >
                    <span className="font-display text-[15px] font-medium text-mist sm:text-base">
                      {topic.label}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-emerald transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p className="border-t border-navyLine px-6 py-4 text-[13px] leading-relaxed text-dim">
              Cada opção abre o WhatsApp com a mensagem já escrita — você confere e envia.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
