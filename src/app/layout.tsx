import type { Metadata, Viewport } from 'next';
import { Archivo, Manrope } from 'next/font/google';
import { mapsUrl, services, site } from '@/config/site.config';
import './globals.css';

// display: 'swap' avoids invisible text while the font loads.
const sans = Manrope({
  // latin-ext covers the Portuguese accented capitals (Ê, Ã, Ç...) that plain
  // 'latin' can render inconsistently, especially combined with uppercase
  // display text.
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [
    'assistência técnica em Curitiba',
    'assistência técnica eletrônica',
    'conserto de eletrônicos',
    'conserto de TV',
    'conserto de micro-ondas',
    'manutenção eletrônica',
    'reparo de placas eletrônicas',
    'manutenção de computadores',
  ],
  alternates: { canonical: site.seo.url },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    siteName: site.brandFull,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B2B3A',
  width: 'device-width',
  initialScale: 1,
  // No maximumScale: blocking zoom breaks accessibility.
};

/**
 * Schema.org business markup. There's no schema.org type specific to
 * electronics repair, so LocalBusiness (the documented generic fallback) is
 * used, with the service catalog spelled out via hasOfferCatalog so each
 * repair category is machine-readable. Opening hours are intentionally
 * omitted — not confirmed by the client, and a partial
 * openingHoursSpecification risks Google inferring unlisted days as closed.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.brandFull,
  description: site.seo.description,
  image: `${site.seo.url}/opengraph-image`,
  telephone: site.phone,
  url: site.seo.url,
  sameAs: [mapsUrl],
  hasMap: mapsUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: 'BR',
  },
  areaServed: `${site.city} e região`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
      },
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-floor focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
