import { MessageCircle, Phone } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';

/** Fixed contact bar on mobile — WhatsApp is the studio's main channel. */
export function Actions() {
  return (
    <div className="border-ink/10 bg-linen/95 fixed inset-x-0 bottom-0 z-40 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow bg-rosewood text-linen flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-[11px]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={`tel:+${site.whatsapp}`}
          className="eyebrow border-ink/25 text-ink flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 text-[11px]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Ligar
        </a>
      </div>
    </div>
  );
}
