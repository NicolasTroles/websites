import { Facebook, Instagram } from 'lucide-react';
import { site } from '@/config/site.config';
import { Wordmark } from './Brand';

export function Footer() {
  const ano = new Date().getFullYear();
  const temRedes = site.redes.instagram || site.redes.facebook;

  return (
    <footer className="border-t border-line bg-offwhite py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <Wordmark />

          {temRedes && (
            <div className="flex gap-2">
              {site.redes.instagram && (
                <a
                  href={site.redes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-12 w-12 place-items-center rounded-full border border-line text-slate transition-colors hover:border-petroleo hover:text-petroleo"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                </a>
              )}
              {site.redes.facebook && (
                <a
                  href={site.redes.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-12 w-12 place-items-center rounded-full border border-line text-slate transition-colors hover:border-petroleo hover:text-petroleo"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-8 text-center text-[13px] text-muted md:flex-row md:justify-between md:text-left">
          <p>
            © {ano} {site.marcaLoja}
          </p>
          <p>
            {site.endereco.logradouro} — {site.endereco.bairro},{' '}
            {site.endereco.cidade}/{site.endereco.estado}
          </p>
        </div>
      </div>
    </footer>
  );
}
