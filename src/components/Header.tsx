'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { navLinks, whatsappUrl } from '@/config/site.config';
import { trackWhatsAppClick } from '@/lib/analytics';

export function Header() {
  // The header starts transparent over the navy hero and only paints a
  // background once the page has moved — otherwise it cuts a hard band across
  // the hero artwork on first paint.
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // A drawer that scrolls the page behind it is disorienting on a phone.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-mist transition-colors duration-300 ease-smooth ${
        scrolled || open ? 'border-b border-navyLine bg-navy/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:h-20 sm:px-8">
        <a href="#topo" className="shrink-0" aria-label="Rodrigues Rangel Consultoria, ir ao topo">
          <Brand />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative py-2 text-sm text-slate transition-colors duration-200 hover:text-mist"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('header')}
            className="hidden min-h-11 items-center bg-emerald px-5 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-navy transition-colors duration-200 hover:bg-mist sm:inline-flex"
          >
            Falar no WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="-mr-2 grid h-11 w-11 cursor-pointer place-items-center text-mist lg:hidden"
          >
            {open ? (
              <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/*
        Kept mounted and collapsed with max-height rather than unmounted, so the
        navigation links are always in the markup for crawlers.
      */}
      <div
        id="menu-mobile"
        className={`overflow-hidden border-t border-navyLine bg-navy transition-[max-height] duration-400 ease-smooth lg:hidden ${
          open ? 'max-h-[70vh]' : 'max-h-0 border-t-0'
        }`}
      >
        <nav aria-label="Principal (móvel)" className="px-5 py-3">
          <ul className="divide-y divide-navyLine">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center font-display text-lg text-mist"
                  tabIndex={open ? undefined : -1}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
