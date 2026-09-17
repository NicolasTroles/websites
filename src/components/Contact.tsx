'use client';

import { useState, type FormEvent } from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { contactSubjects, emailUrl, phoneUrl, site, whatsappUrlWith } from '@/config/site.config';
import { trackFormSubmit, trackWhatsAppClick } from '@/lib/analytics';

type Errors = Partial<Record<'name' | 'contact' | 'subject', string>>;

/**
 * The form has no backend on purpose: this is a one-page institutional site
 * with no server to receive a POST, and a silent form that pretends to send
 * mail is worse than no form. Instead the fields are composed into a WhatsApp
 * message, so the lead arrives already classified by subject — which is the
 * whole point of asking for the subject in the first place.
 *
 * The button label says exactly what will happen, so nobody is surprised when
 * WhatsApp opens.
 */
export function Contact() {
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = String(data.get('name') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const next: Errors = {};
    if (!name) next.name = 'Informe seu nome.';
    if (!phone && !email) next.contact = 'Informe um telefone ou um e-mail para retorno.';
    if (!subject) next.subject = 'Selecione o assunto.';

    setErrors(next);
    if (Object.keys(next).length > 0) {
      /*
       * Move focus to the first field that failed, rather than only painting a
       * message the visitor may have already scrolled past. The field is picked
       * from `next` and not by querying [aria-invalid] — React has not
       * re-rendered with those attributes yet at this point in the handler.
       */
      const firstInvalid = (['name', 'contact', 'subject'] as const).find((key) => next[key]);
      const fieldName = firstInvalid === 'contact' ? 'phone' : firstInvalid;
      const field = event.currentTarget.elements.namedItem(fieldName ?? '');
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    const lines = [
      `Olá! Vim pelo site da ${site.brandFull}.`,
      '',
      `Assunto: ${subject}`,
      `Nome: ${name}`,
      company && `Empresa: ${company}`,
      phone && `Telefone: ${phone}`,
      email && `E-mail: ${email}`,
      message && `\n${message}`,
    ].filter(Boolean) as string[];

    trackFormSubmit(subject);
    window.open(whatsappUrlWith(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  const fieldClass =
    'mt-2 min-h-12 w-full border border-navyLine bg-navySoft/60 px-4 text-[15px] text-mist placeholder:text-dim focus:border-emerald';
  const labelClass = 'font-mono text-[11px] uppercase tracking-label text-slate';

  return (
    <section id="contato" className="relative overflow-hidden bg-navy py-20 text-mist sm:py-28">
      <div aria-hidden="true" className="ruled-dark absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-label text-emerald">Contato</p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.015em] sm:text-4xl">
            Precisa organizar documentos ou regularizar pendências?
          </h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-slate">
            Entre em contato para apresentar a necessidade da empresa e avaliar o escopo do
            atendimento.
          </p>

          <a
            href={whatsappUrlWith(site.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('contato')}
            className="mt-8 inline-flex min-h-12 items-center gap-2 bg-emerald px-7 font-display text-sm font-semibold uppercase tracking-[0.08em] text-navy transition-colors duration-200 hover:bg-mist"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Falar pelo WhatsApp
          </a>

          {/*
            dt/dd must sit directly under the dl (or one div deep) — nesting
            them further makes axe report the list as malformed, which also
            drags down the agentic-browsing score. The icon therefore lives
            inside the dt rather than in a wrapper row.
          */}
          <dl className="mt-12 border-t border-navyLine pt-10">
            <dt className={`flex items-center gap-3 ${labelClass}`}>
              <Phone className="h-4 w-4 shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
              Telefone
            </dt>
            <dd className="mt-1 pl-7">
              <a href={phoneUrl} className="text-[15px] text-mist hover:text-emerald">
                {site.phone}
              </a>
            </dd>

            <dt className={`mt-5 flex items-center gap-3 ${labelClass}`}>
              <Mail className="h-4 w-4 shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
              E-mail
            </dt>
            <dd className="mt-1 pl-7">
              <a href={emailUrl} className="break-all text-[15px] text-mist hover:text-emerald">
                {site.email}
              </a>
            </dd>

            <dt className={`mt-5 flex items-center gap-3 ${labelClass}`}>
              <MapPin className="h-4 w-4 shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
              Atendimento
            </dt>
            <dd className="mt-1 pl-7 text-[15px] leading-relaxed text-slate">{site.areaServed}</dd>

            <dt className={`mt-5 flex items-center gap-3 ${labelClass}`}>
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
        </div>

        <form onSubmit={handleSubmit} noValidate className="border border-navyLine bg-navy/60 p-6 backdrop-blur-sm sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className={labelClass}>
                Nome *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={fieldClass}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 font-mono text-[11px] text-amber">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="company" className={labelClass}>
                Empresa
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Telefone / WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={errors.contact ? 'contact-error' : undefined}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={errors.contact ? 'contact-error' : undefined}
                className={fieldClass}
              />
            </div>

            {errors.contact && (
              <p id="contact-error" className="font-mono text-[11px] text-amber sm:col-span-2">
                {errors.contact}
              </p>
            )}

            <div className="sm:col-span-2">
              <label htmlFor="subject" className={labelClass}>
                Assunto *
              </label>
              <select
                id="subject"
                name="subject"
                required
                defaultValue=""
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className={`${fieldClass} cursor-pointer appearance-none`}
              >
                <option value="" disabled>
                  Selecione…
                </option>
                {contactSubjects.map((subject) => (
                  <option key={subject} value={subject} className="bg-navy">
                    {subject}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p id="subject-error" className="mt-2 font-mono text-[11px] text-amber">
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className={labelClass}>
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Descreva rapidamente a situação da documentação da empresa."
                className={`${fieldClass} min-h-32 resize-y py-3`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 bg-emerald px-7 font-display text-sm font-semibold uppercase tracking-[0.08em] text-navy transition-colors duration-200 hover:bg-mist sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Enviar pelo WhatsApp
          </button>

          <p className="mt-4 text-[13px] leading-relaxed text-dim">
            Ao enviar, o WhatsApp abre com os dados preenchidos para você conferir antes de
            mandar. Nenhuma informação é armazenada por este site.
          </p>
        </form>
      </div>
    </section>
  );
}
