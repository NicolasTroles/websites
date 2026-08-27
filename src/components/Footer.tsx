import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import { site } from '@/config/site.config';
import { FoamEdge } from './Brand';

export function Footer() {
  const year = new Date().getFullYear();
  const hasSocialLinks = site.socialLinks.instagram || site.socialLinks.facebook;

  return (
    <footer className="relative bg-stout pb-16 pt-8 text-foam">
      <FoamEdge className="absolute inset-x-0 top-0 h-8 w-full text-wheat sm:h-10" flip />

      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <Image
            src="/logo.png"
            alt={site.name}
            width={168}
            height={142}
            className="h-16 w-auto object-contain"
          />

          {hasSocialLinks && (
            <div className="flex gap-2">
              {site.socialLinks.instagram && (
                <a
                  href={site.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-12 w-12 place-items-center border border-caskLine text-barley transition-colors hover:border-barley hover:text-foam"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                </a>
              )}
              {site.socialLinks.facebook && (
                <a
                  href={site.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-12 w-12 place-items-center border border-caskLine text-barley transition-colors hover:border-barley hover:text-foam"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-caskLine pt-8 text-center text-[13px] text-barley md:flex-row md:justify-between md:text-left">
          <p>
            © {year} {site.name}
          </p>
          <p>{site.serviceArea}</p>
        </div>
      </div>
    </footer>
  );
}
