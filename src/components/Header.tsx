'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { whatsappUrl } from '@/config/site.config';
import { LogoMark, Wordmark } from './Brand';

const LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#trabalhos', label: 'Trabalhos' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Solid background only after leaving the hero, so the header never
    // competes with the photo behind it.
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Locks background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        scrolled ? 'bg-ink/92 border-b border-line backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Navegação principal"
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Início">
          <LogoMark className="h-8 w-8" />
          <Wordmark className="text-lg" />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] uppercase tracking-wide2 text-silver transition-colors duration-200 hover:text-clay"
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
          className="hidden min-h-11 items-center bg-clay px-6 text-[11px] uppercase tracking-wide2 text-ink transition-colors duration-200 hover:bg-clayDeep hover:text-bone lg:inline-flex"
        >
          Solicitar orçamento
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center text-bone lg:hidden"
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
        <div className="border-t border-line bg-ink lg:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center text-xs uppercase tracking-wide2 text-silver"
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
