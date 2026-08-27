import { site } from '@/config/site.config';
import { AxeCutEdge, AxeMark, FacebookGlyph, InstagramGlyph } from './Brand';

export function Footer() {
  const year = new Date().getFullYear();
  const hasSocialLinks = site.socialLinks.instagram || site.socialLinks.facebook;

  return (
    <footer className="relative bg-bark pb-16 pt-8 text-paper">
      <AxeCutEdge className="absolute inset-x-0 top-0 h-8 w-full text-cream sm:h-11" flip />

      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <AxeMark className="h-8 w-8 text-rust" />
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wide text-paper">
                {site.brandName}
              </p>
              <p className="label-caps mt-1.5 text-[9px] text-fern">Barbearia</p>
            </div>
          </div>

          {hasSocialLinks && (
            <div className="flex gap-2">
              {site.socialLinks.instagram && (
                <a
                  href={site.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-12 w-12 place-items-center border border-barkLine text-fern transition-colors hover:border-fern hover:text-paper"
                >
                  <InstagramGlyph className="h-4 w-4" />
                </a>
              )}
              {site.socialLinks.facebook && (
                <a
                  href={site.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-12 w-12 place-items-center border border-barkLine text-fern transition-colors hover:border-fern hover:text-paper"
                >
                  <FacebookGlyph className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-barkLine pt-8 text-center text-[13px] text-fern md:flex-row md:justify-between md:text-left">
          <p>
            © {year} {site.brandFull}
          </p>
          <p>
            {site.address.street} — {site.address.neighborhood}, {site.address.city}/
            {site.address.state}
          </p>
        </div>
      </div>
    </footer>
  );
}
