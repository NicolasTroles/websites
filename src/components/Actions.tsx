import { MessageCircle, Phone } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';

/**
 * Contact buttons. All at a minimum height of 48px (min-h-12) to meet the
 * 44pt touch-target guideline on mobile.
 */

const BASE =
  'inline-flex min-h-12 items-center justify-center gap-2.5 px-7 text-[13px] label-caps transition-all duration-200 ease-smooth cursor-pointer';

/** Primary CTA. Rust on dark (4.9:1) — the color of a well-worn axe handle. */
export function WhatsAppButton({ className }: { className?: string }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE} bg-rust text-bark hover:bg-paper active:scale-[0.98] ${className ?? ''}`}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      Agendar no WhatsApp
    </a>
  );
}

/** Secondary button. `tone` adapts the border/text to the section's background. */
export function PhoneButton({
  className,
  tone = 'dark',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const colors =
    tone === 'light'
      ? 'border-creamLine text-rustDeep hover:border-rustDeep hover:bg-creamDeep'
      : 'border-barkLine text-paper hover:border-rust hover:bg-pine';
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-barkLine bg-bark/95 backdrop-blur-sm md:hidden">
      <div
        className="flex gap-2 p-3"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps flex min-h-12 flex-1 items-center justify-center gap-2 bg-rust text-[12px] text-bark active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={`tel:${site.phoneLink}`}
          aria-label={`Ligar para ${site.phone}`}
          className="grid min-h-12 w-14 place-items-center border border-barkLine text-paper active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
