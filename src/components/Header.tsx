'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';

const LINKS = [
  { href: '#problemas', label: 'Problemas' },
  { href: '#services', label: 'Serviços' },
  { href: '#process', label: 'Como funciona' },
  { href: '#faq', label: 'FAQ' },
  { href: '#localizacao', label: 'Localização' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Solid only once the hero (#top) has scrolled fully out of view — the
    // logo needs a light background to read, and the hero already is one, so
    // the header can stay transparent for as long as it's over it.
    const hero = document.getElementById('top');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        scrolled ? 'border-b border-floorLine bg-floor/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
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
