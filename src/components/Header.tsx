'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';
import { AxeMark } from './Brand';

const LINKS = [
  { href: '#about', label: 'Sobre' },
  { href: '#services', label: 'Serviços' },
  { href: '#gallery', label: 'Galeria' },
  { href: '#testimonials', label: 'Avaliações' },
  { href: '#contact', label: 'Contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Solid background only once past the hero, so the header doesn't compete with it.
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
        scrolled ? 'bg-bark/92 border-b border-barkLine backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Navegação principal"
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Início">
          <AxeMark className="h-7 w-7 text-rust" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-bold uppercase tracking-wide text-paper">
              {site.brandName}
            </span>
            <span className="label-caps mt-1 text-[9px] text-fern">Barbearia</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="label-caps text-[11px] text-fern transition-colors duration-200 hover:text-rust"
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
          className="label-caps hidden min-h-11 items-center bg-rust px-6 text-[11px] text-bark transition-colors duration-200 hover:bg-paper lg:inline-flex"
        >
          Agendar horário
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center text-paper lg:hidden"
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
        <div className="border-t border-barkLine bg-bark lg:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="label-caps flex min-h-12 items-center text-xs text-fern"
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
