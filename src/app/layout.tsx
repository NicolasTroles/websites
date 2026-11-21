import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Unbounded } from 'next/font/google';
import { mapsUrl, services, site } from '@/config/site.config';
import './globals.css';

// Wide geometric display face — echoes the "ANG" lettering of the logo.
const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const instrument = Instrument_Sans({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#05090b',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  applicationName: site.brandFull,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.seo.locale,
    url: '/',
    siteName: site.brandFull,
    title: site.seo.title,
    description: site.seo.description,
    images: [
      {
        url: '/brand/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Logo da ANG Estética Automotiva: um carro escuro com faróis em ciano dentro de um anel de neon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
    images: ['/brand/og.jpg'],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

// AutoWash matches the Google Business category ("Lavagem de automóveis").
// No aggregateRating on purpose: Google treats ratings a business publishes
// about itself as self-serving and ignores them for rich results.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoWash',
  '@id': `${site.seo.url}/#business`,
  name: site.brandFull,
  description: site.seo.description,
  url: site.seo.url,
  telephone: `+${site.whatsapp}`,
  image: `${site.seo.url}/brand/og.jpg`,
  logo: `${site.seo.url}/brand/ang-logo.webp`,
  hasMap: mapsUrl,
  areaServed: site.areaServed,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.street}, ${site.address.complement}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: [site.socialLinks.instagram],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços de estética automotiva',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title, description: service.description },
    })),
  },
  slogan: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={`${unbounded.variable} ${instrument.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="bg-neon text-neon-ink sr-only z-100 rounded-full px-5 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          // JSON-LD built from our own config — no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
