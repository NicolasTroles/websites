import Image from 'next/image';
import { site } from '@/config/site.config';
import { HazardStripe } from './Brand';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal pb-16 pt-8 text-chalk">
      <HazardStripe flip />

      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <Image
            src="/logo.png"
            alt={site.brandFull}
            width={2103}
            height={748}
            className="h-11 w-auto object-contain"
          />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-steelLine pt-8 text-center text-[13px] text-mist md:flex-row md:justify-between md:text-left">
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
