'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { whatsappUrl } from '@/config/site.config';
import { Wordmark } from './Brand';

const LINKS = [
  { href: '#loja', label: 'A loja' },
  { href: '#servicos', label: 'Produtos' },
  { href: '#galeria', label: 'Fotos' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    // Sombra só depois de sair do topo, para marcar a profundidade do header fixo.
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 ease-smooth ${
        scrolled ? 'border-line shadow-sm' : 'border-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Navegação principal"
      >
        <a href="#topo" aria-label="Início">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="brand-caps text-[11px] text-slate transition-colors duration-200 hover:text-petroleo"
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
          className="hidden min-h-11 items-center bg-petroleo px-6 brand-caps text-[11px] text-white transition-colors duration-200 hover:bg-petroleoDeep lg:inline-flex"
        >
          Falar no WhatsApp
        </a>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="grid h-11 w-11 place-items-center text-ink lg:hidden"
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
        <div className="border-t border-line bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className="flex min-h-12 items-center brand-caps text-xs text-slate"
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
