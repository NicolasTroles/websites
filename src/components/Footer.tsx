import { developer, developerWhatsappUrl, navLinks, site } from '@/config/site.config';
import { Brand, Sprig } from './Brand';

export function Footer() {
  return (
    <footer className="grain pt-20 pb-28 lg:pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <Brand />
          <Sprig className="text-gold mt-8 w-32" />
          <p className="font-display text-ink-soft mt-6 max-w-md text-xl italic">
            Preservação de buquês de noiva e eternização de lembranças, em {site.address.city}.
          </p>
        </div>

        <nav aria-label="Rodapé" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="eyebrow text-ink hover:text-rosewood inline-block py-2 text-[11px]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.socialLinks.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow text-ink hover:text-rosewood inline-block py-2 text-[11px]"
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>

        <div className="border-ink/15 text-ink-soft mt-12 flex flex-col items-center gap-3 border-t pt-8 text-center text-sm">
          <p>
            © {new Date(site.seo.lastModified).getFullYear()} {site.brand}. Todos os direitos
            reservados.
          </p>
          <p>
            Desenvolvido por{' '}
            <a
              href={developerWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Falar com ${developer.name} no WhatsApp`}
              className="text-ink decoration-ink/30 hover:decoration-ink font-medium underline underline-offset-4"
            >
              {developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
