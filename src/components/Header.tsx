'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site.config';
import { BeerMark } from './Brand';

const LINKS = [
  { href: '#about', label: 'Sobre' },
  { href: '#catalog', label: 'Chopes' },
  { href: '#how-it-works', label: 'Como funciona' },
  { href: '#events', label: 'Eventos' },
  { href: '#partnerships', label: 'Parcerias' },
  { href: '#contact', label: 'Contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fundo sólido só depois de sair do hero, para o header não competir com ele.
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
        scrolled ? 'bg-stout/92 border-b border-caskLine backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Navegação principal"
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Início">
          <BeerMark className="h-7 w-7 text-amber" />
          <span className="flex flex-col leading-none">
            <span className="brand-caps text-[13px] text-foam">{site.name}</span>
            <span className="mt-1 font-sans text-[9px] uppercase tracking-[0.24em] text-barley">
              {site.tagline}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="brand-caps text-[11px] text-barley transition-colors duration-200 hover:text-amber"
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
          className="brand-caps hidden min-h-11 items-center bg-amber px-6 text-[11px] text-stout transition-colors duration-200 hover:bg-foam lg:inline-flex"
        >
          Pedir chopp
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center text-foam lg:hidden"
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
        <div className="border-t border-caskLine bg-stout lg:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="brand-caps flex min-h-12 items-center text-xs text-barley"
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
