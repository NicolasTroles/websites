import { MessageCircle, Phone } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';

/**
 * Botões de contato. Todos com altura mínima de 48px (min-h-12) para atender
 * ao alvo de toque de 44pt exigido em mobile.
 */

const BASE =
  'inline-flex min-h-12 items-center justify-center gap-2.5 px-7 text-[13px] brand-caps transition-all duration-200 ease-smooth cursor-pointer';

/** CTA principal. Dourado sobre escuro (6.1:1) e sobre bege — funciona nos dois. */
export function BotaoWhatsApp({ className }: { className?: string }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE} bg-brass text-ink hover:bg-brassDeep hover:text-bone active:scale-[0.98] ${className ?? ''}`}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      Falar no WhatsApp
    </a>
  );
}

/** Botão secundário. `tom` adapta a borda e o texto ao fundo da seção. */
export function BotaoTelefone({
  className,
  tom = 'escuro',
}: {
  className?: string;
  tom?: 'claro' | 'escuro';
}) {
  const cores =
    tom === 'claro'
      ? 'border-sandLine text-cocoa hover:border-brassDeep hover:bg-sandDeep'
      : 'border-line text-bone hover:border-brass hover:bg-elevated';
  return (
    <a
      href={`tel:${site.telefoneLink}`}
      className={`${BASE} border ${cores} active:scale-[0.98] ${className ?? ''}`}
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur-sm md:hidden">
      <div
        className="flex gap-2 p-3"
        // Respeita a área do gesto de home nos iPhones.
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-brass text-[12px] brand-caps text-ink active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={`tel:${site.telefoneLink}`}
          aria-label={`Ligar para ${site.telefone}`}
          className="grid min-h-12 w-14 place-items-center border border-line text-bone active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
