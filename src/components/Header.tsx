import { navLinks, whatsappUrl } from '@/config/site.config';
import { Brand, WhatsAppIcon } from './Brand';

export function Header() {
  return (
    <header className="border-line/70 bg-night/75 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
        <a href="#topo" className="rounded-full">
          <Brand />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-haze hover:text-frost inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir orçamento no WhatsApp (abre em nova aba)"
          className="border-neon/60 text-neon hover:bg-neon hover:text-neon-ink inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors"
        >
          <WhatsAppIcon className="h-4.5 w-4.5" />
          <span className="hidden sm:inline">Orçamento</span>
        </a>
      </div>
    </header>
  );
}
