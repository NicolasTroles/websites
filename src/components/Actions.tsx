import { MessageCircle, Phone } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';

/**
 * Contact buttons. All at a minimum height of 48px (min-h-12) to meet the
 * 44pt touch-target guideline on mobile.
 */

const BASE =
  'inline-flex min-h-12 items-center justify-center gap-2.5 px-7 text-[13px] uppercase tracking-wide2 transition-all duration-200 ease-smooth cursor-pointer';

/** Primary CTA. Clay on dark and on stone — works on both backgrounds. */
export function WhatsAppButton({ className }: { className?: string }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE} bg-clay text-ink hover:bg-clayDeep hover:text-bone active:scale-[0.98] ${className ?? ''}`}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      Solicitar orçamento
    </a>
  );
}

/** Secondary button. `tone` adapts the border and text to the section's background. */
export function PhoneButton({
  className,
  tone = 'dark',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const colors =
    tone === 'light'
      ? 'border-stoneLine text-graphite hover:border-clayDeep hover:bg-stoneDeep'
      : 'border-line text-bone hover:border-clay hover:bg-elevated';
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
 * The body's bottom padding reserves space so it never covers content.
 */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur-sm md:hidden">
      <div
        className="flex gap-2 p-3"
        // Respects the home-gesture area on iPhones.
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-clay text-[12px] uppercase tracking-wide2 text-ink active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={`tel:${site.phoneLink}`}
          aria-label={`Ligar para ${site.phone}`}
          className="grid min-h-12 w-14 place-items-center border border-line text-bone active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
