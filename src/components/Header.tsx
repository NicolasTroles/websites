'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, whatsappUrl } from '@/config/site.config';
import { Brand } from './Brand';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // The browser may restore the scroll position after hydration without
    // firing a scroll event, so check again on the next frame and on load.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('load', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
        scrolled || open
          ? 'bg-linen/92 py-3 shadow-[0_1px_0_rgb(23_63_66/0.08)] backdrop-blur-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#topo" aria-label="Atelier Campestre — voltar ao início" className="shrink-0">
          <Brand />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="eyebrow text-ink after:bg-rosewood relative py-2 text-[11px] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow bg-rosewood text-linen hover:bg-rosewood-deep hidden min-h-11 items-center rounded-full px-6 text-[11px] transition-colors sm:inline-flex"
          >
            Agendar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="border-ink/20 text-ink inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Menu"
        hidden={!open}
        className="border-ink/10 border-t px-5 pt-2 pb-6 lg:hidden"
      >
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-ink/10 font-display text-ink block border-b py-4 text-2xl italic"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
