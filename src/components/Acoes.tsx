import { MessageCircle, Phone } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';

/**
 * Botões de contato. Todos com altura mínima de 48px (min-h-12) para atender
 * ao alvo de toque de 44pt exigido em mobile.
 */

const BASE =
  'inline-flex min-h-12 items-center justify-center gap-2.5 px-7 text-[13px] brand-caps transition-all duration-200 ease-smooth cursor-pointer';

/** CTA principal: a cor da marca em texto branco. */
export function BotaoWhatsApp({ className }: { className?: string }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE} whitespace-nowrap bg-petroleo text-white hover:bg-petroleoDeep active:scale-[0.98] ${className ?? ''}`}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      Falar no WhatsApp
    </a>
  );
}

/** Botão secundário: contorno neutro, preenche com o tom clarinho da marca no hover. */
export function BotaoTelefone({ className }: { className?: string }) {
  return (
    <a
      href={`tel:${site.telefoneLink}`}
      className={`${BASE} border border-line text-ink hover:border-petroleo hover:bg-petroleoTint active:scale-[0.98] ${className ?? ''}`}
    >
      <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      {site.telefone}
    </a>
  );
}

/**
 * Barra fixa de contato no rodapé, só em mobile.
 * O padding-bottom do body reserva o espaço para ela não cobrir conteúdo.
 */
export function BarraContatoMobile() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 shadow-[0_-4px_16px_rgba(28,27,25,0.06)] backdrop-blur-sm md:hidden">
      <div
        className="flex gap-2 p-3"
        // Respeita a área do gesto de home nos iPhones.
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-petroleo text-[12px] brand-caps text-white active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={`tel:${site.telefoneLink}`}
          aria-label={`Ligar para ${site.telefone}`}
          className="grid min-h-12 w-14 place-items-center border border-line text-ink active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
