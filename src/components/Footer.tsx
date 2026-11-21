import { developer, developerWhatsappUrl, navLinks, site } from '@/config/site.config';
import { Brand } from './Brand';

export function Footer() {
  return (
    <footer className="border-line border-t pt-16 pb-28 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Brand />
            <p className="text-haze mt-5 leading-relaxed">
              {site.tagline}. {site.address.district}, {site.address.city} - {site.address.state}.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-haze hover:text-frost inline-flex min-h-11 items-center transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-line text-haze mt-12 flex flex-col gap-2 border-t pt-8 text-sm sm:flex-row sm:justify-between">
          <p>
            © {new Date(site.seo.lastModified).getFullYear()} {site.brandFull}. Todos os direitos
            reservados.
          </p>
          <p>
            Desenvolvido por{' '}
            <a
              href={developerWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Falar com ${developer.name} no WhatsApp`}
              className="text-frost hover:text-neon decoration-line-bright font-medium underline underline-offset-4 transition-colors"
            >
              {developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
