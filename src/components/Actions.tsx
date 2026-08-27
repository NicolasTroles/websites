import { MessageCircle, Phone } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';

/**
 * Botões de contato. Todos com altura mínima de 48px (min-h-12) para atender
 * ao alvo de toque de 44pt exigido em mobile.
 */

const BASE =
  'inline-flex min-h-12 items-center justify-center gap-2.5 px-7 text-[13px] brand-caps transition-all duration-200 ease-smooth cursor-pointer';

/** CTA principal. Âmbar sobre escuro (9.5:1) — cor do próprio chopp. */
export function WhatsAppButton({ className }: { className?: string }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE} bg-amber text-stout hover:bg-foam active:scale-[0.98] ${className ?? ''}`}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      Pedir no WhatsApp
    </a>
  );
}

/** Botão secundário. `tone` adapta a borda e o texto ao fundo da seção. */
export function PhoneButton({
  className,
  tone = 'dark',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const colors =
    tone === 'light'
      ? 'border-wheatLine text-copperDeep hover:border-copperDeep hover:bg-wheatDeep'
      : 'border-caskLine text-foam hover:border-amber hover:bg-cask';
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
 * Barra fixa de contato no rodapé, só em mobile.
 * O espaçador em page.tsx reserva o espaço para ela não cobrir conteúdo.
 */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-caskLine bg-stout/95 backdrop-blur-sm md:hidden">
      <div
        className="flex gap-2 p-3"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="brand-caps flex min-h-12 flex-1 items-center justify-center gap-2 bg-amber text-[12px] text-stout active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={`tel:${site.phoneLink}`}
          aria-label={`Ligar para ${site.phone}`}
          className="grid min-h-12 w-14 place-items-center border border-caskLine text-foam active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
