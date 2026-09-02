import { MessageCircle, Phone } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';

/**
 * Contact buttons. All at a minimum height of 48px (min-h-12) to meet the
 * 44pt touch-target guideline on mobile.
 */

const BASE =
  'inline-flex min-h-12 items-center justify-center gap-2.5 px-7 text-[13px] label-caps transition-all duration-200 ease-smooth cursor-pointer';

/** Primary CTA. Amarelo energia — the brand's "ponto de ativação" color — on petrol text (8:1+). */
export function WhatsAppButton({
  className,
  label = 'Falar no WhatsApp',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE} bg-safety text-charcoal hover:bg-chalk active:scale-[0.98] ${className ?? ''}`}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      {label}
    </a>
  );
}

/** Secondary button. `tone` adapts the border/text to the section's background. */
export function PhoneButton({
  className,
  tone = 'light',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const colors =
    tone === 'light'
      ? 'border-floorLine text-ink hover:border-ink hover:bg-floorDeep'
      : 'border-steelLine text-chalk hover:border-safety hover:bg-steel';
  return (
    <a
      href={`tel:${site.phoneLink}`}
      className={`${BASE} border ${colors} active:scale-[0.98] ${className ?? ''}`}
    >
      <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      {site.phone}
    </a>
  );
}

/**
 * Fixed contact bar at the bottom, mobile only.
 * The spacer in page.tsx reserves space so it never covers the footer.
 */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-steelLine bg-charcoal/95 backdrop-blur-sm md:hidden">
      <div
        className="flex gap-2 p-3"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps flex min-h-12 flex-1 items-center justify-center gap-2 bg-safety text-[13px] text-charcoal active:scale-[0.98]"
        >
          <span aria-hidden="true">💬</span>
          Falar no WhatsApp
        </a>
        <a
          href={`tel:${site.phoneLink}`}
          aria-label={`Ligar para ${site.phone}`}
          className="grid min-h-12 w-14 place-items-center border border-steelLine text-chalk active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
