import { Phone } from 'lucide-react';
import { site } from '@/config/site.config';
import { WhatsAppButton } from './Actions';
import { CircuitWatermark } from './Brand';
import { Reveal } from './Reveal';

/**
 * Closing CTA — the one section on pure black (#000000), the brand's
 * documented "alto contraste" application, distinct from the everyday petrol
 * dark tone used in Authority. The single most decisive beat of the page.
 */
export function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-void py-24 text-chalk sm:py-32">
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 opacity-[0.06]"
        aria-hidden="true"
      >
        <CircuitWatermark className="h-96 w-auto text-chalk" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-chalk">
            Seu equipamento parou? Vamos descobrir o problema.
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-[17px] leading-relaxed text-mist">
            Entre em contato com a Activa Eletrônica e explique o que aconteceu.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex justify-center">
            <WhatsAppButton className="px-10 text-[14px]" />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <a
            href={`tel:${site.phoneLink}`}
            className="mt-8 inline-flex items-center gap-2 font-display text-xl font-bold text-chalk transition-colors hover:text-safety"
          >
            <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
