'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { whatsappUrl } from '@/config/site.config';

const LINKS = [
  { href: '#oficio', label: 'O ofício' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#galeria', label: 'Trabalhos' },
  { href: '#processo', label: 'Processo' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    // Fundo sólido só depois de sair do hero, para o header não competir com a foto.
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trava o scroll do fundo enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        scrolled ? 'border-b border-line bg-ink/92 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Navegação principal"
      >
        <a href="#topo" className="flex items-center" aria-label="Início">
          <Image
            src="/logo-figueiredo.png"
            alt="Alfaiataria Figueiredo"
            width={593}
            height={155}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="brand-caps text-[11px] text-silver transition-colors duration-200 hover:text-platinum"
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
          className="hidden min-h-11 items-center bg-platinum px-6 brand-caps text-[11px] text-ink transition-colors duration-200 hover:bg-platinumDeep hover:text-bone lg:inline-flex"
        >
          Agendar prova
        </a>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="grid h-11 w-11 place-items-center text-bone lg:hidden"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
        >
          {aberto ? (
            <X className="h-6 w-6" strokeWidth={1.5} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {aberto && (
        <div className="border-t border-line bg-ink lg:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className="flex min-h-12 items-center brand-caps text-xs text-silver"
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
