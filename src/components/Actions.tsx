'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { phoneUrl, site, whatsappUrl } from '@/config/site.config';
import { trackWhatsAppClick } from '@/lib/analytics';

/**
 * Fixed contact bar, phones only. WhatsApp is the main channel for this kind of
 * consultancy, and a visitor should never have to scroll back to the top to
 * find it. The page reserves matching bottom padding so it never covers the
 * footer's last line.
 */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-navyLine bg-navy/95 backdrop-blur-md sm:hidden">
      <a
        href={phoneUrl}
        className="flex min-h-14 items-center justify-center gap-2 text-sm text-mist"
        aria-label={`Ligar para ${site.phone}`}
      >
        <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        Ligar
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('barra-mobile')}
        className="flex min-h-14 items-center justify-center gap-2 bg-emerald text-sm font-semibold text-navy"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
