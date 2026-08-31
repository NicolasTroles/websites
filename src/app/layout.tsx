import type { Metadata, Viewport } from 'next';
import { DM_Sans, Oswald } from 'next/font/google';
import { mapsUrl, services, site } from '@/config/site.config';
import './globals.css';

// display: 'swap' avoids invisible text while the font loads.
const sans = DM_Sans({
  // latin-ext covers the Portuguese accented capitals (Ê, Ã, Ç...) that plain
  // 'latin' can render inconsistently, especially combined with uppercase
  // display text.
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// Anton (the original pick) has a broken/misplaced accent glyph for capital
// Ê in this weight — the circumflex renders floating and detached instead of
// sitting on the letter. Oswald keeps the same condensed job-site-signage
// feel (it's modeled on Alternate Gothic, a classic sign-painter face) with
// verified full Portuguese diacritic support.
const display = Oswald({
  subsets: ['latin', 'latin-ext'],
  weight: '700',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [
    'marido de aluguel campo largo',
    'hidráulica campo largo',
    'eletricista campo largo',
    'pintor campo largo',
    'reparos residenciais campo largo pr',
    'faz tudo campo largo',
    'orçamento marido de aluguel',
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
  themeColor: '#181B1D',
  width: 'device-width',
  initialScale: 1,
  // No maximumScale: blocking zoom breaks accessibility.
};

/**
 * Schema.org business markup. HomeAndConstructionBusiness is the schema.org
 * type for a general home-repair business that spans multiple trades
 * (plumbing, electrical, painting) — more accurate than picking a single
 * trade subtype (Plumber, Electrician, HousePainter) Isaias doesn't
 * exclusively practice.
 *
 * `sameAs`/`hasMap` point at the Google Business listing so Google can tie
 * this page to that profile. `hasOfferCatalog` mirrors the service list so
 * each trade (hidráulica, elétrica, pintura...) is machine-readable, not
 * just prose. Opening hours are deliberately left out here — only one data
 * point is confirmed (see site.config.ts), and a partial
 * openingHoursSpecification risks Google inferring the unlisted days as
 * closed, which is worse than omitting it until the full week is confirmed.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
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
    postalCode: site.address.zip,
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
