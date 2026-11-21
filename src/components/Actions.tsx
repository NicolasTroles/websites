import { Phone } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';
import { WhatsAppIcon } from './Brand';

/** Fixed contact bar on small screens — WhatsApp is the main channel. */
export function Actions() {
  return (
    <div className="border-line bg-night/90 fixed inset-x-0 bottom-0 z-40 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <div className="flex gap-3">
        <a
          href={site.phoneHref}
          className="border-line-bright text-frost inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border font-medium"
        >
          <Phone className="h-4.5 w-4.5" aria-hidden="true" />
          Ligar
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-neon text-neon-ink inline-flex min-h-12 flex-[2] items-center justify-center gap-2 rounded-full font-semibold"
        >
          <WhatsAppIcon />
          Orçamento
          <span className="sr-only"> no WhatsApp (abre em nova aba)</span>
        </a>
      </div>
    </div>
  );
}
