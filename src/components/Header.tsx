'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';

const LINKS = [
  { href: '#services', label: 'Serviços' },
  { href: '#contato', label: 'Contato' },
];

/**
 * Frosted glass, always on: a translucent wash of the page's own light
 * background (not a flat opaque bar), blurred so whatever sits behind it —
 * the dark hero photo, or a lighter section further down — softens into a
 * tint rather than showing through sharp. Never fully transparent: the logo
 * is petrol-on-light and the hero is a dark full-bleed photo
 * (public/reparo.png), so the glass needs enough of its own fill to keep
 * text/logo legible over any background.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-floorLine/60 bg-floor/60 backdrop-blur-md">
      <nav
        className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 py-2 sm:px-8"
        aria-label="Navegação principal"
      >
        <a href="#top" aria-label="Início" className="inline-flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt={site.brandFull}
            width={2172}
            height={724}
            priority
            className="h-10 w-auto object-contain sm:h-12"
          />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="label-caps text-[11px] text-ink transition-colors duration-200 hover:text-safetyDeep"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps hidden min-h-11 items-center bg-safety px-6 text-[11px] text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-safety lg:inline-flex"
        >
          Solicitar orçamento
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center text-ink lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6" strokeWidth={1.5} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-floorLine bg-floor lg:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="label-caps flex min-h-12 items-center text-xs text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
