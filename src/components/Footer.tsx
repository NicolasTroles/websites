import { Brand } from '@/components/Brand';
import { navLinks, phoneUrl, site, whatsappUrl } from '@/config/site.config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navyLine bg-navy pb-24 pt-16 text-mist sm:pb-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Brand withSubtitle />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate">{site.promise}</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-label text-dim">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Rodapé">
            <p className="font-mono text-[11px] uppercase tracking-label text-dim">Navegação</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate transition-colors duration-200 hover:text-emerald"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-label text-dim">Contato</p>
            <ul className="mt-5 space-y-3 text-sm text-slate">
              <li>
                <a href={phoneUrl} className="transition-colors duration-200 hover:text-emerald">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-emerald"
                >
                  WhatsApp
                </a>
              </li>
              <li className="pt-2 leading-relaxed text-dim">{site.areaServed}</li>
              {site.socialLinks.linkedin && (
                <li>
                  <a
                    href={site.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-emerald"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {site.socialLinks.instagram && (
                <li>
                  <a
                    href={site.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-emerald"
                  >
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-navyLine pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-dim">
            © {year} {site.brandFull}. Todos os direitos reservados.
          </p>
          <a
            href="/privacidade"
            className="text-[13px] text-dim transition-colors duration-200 hover:text-emerald"
          >
            Política de privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
