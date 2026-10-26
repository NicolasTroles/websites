import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google';
import { bouquetOffer, site, whatsappUrl } from '@/config/site.config';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

// Script accent, used for a handful of words — echoes the logo lettering.
const pinyon = Pinyon_Script({
  variable: '--font-pinyon',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#f6f1e9',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  applicationName: site.brand,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.seo.locale,
    url: '/',
    siteName: site.brand,
    title: site.seo.title,
    description: site.seo.description,
    images: [
      {
        url: '/photos/quadro-espetaculo.jpg',
        width: 896,
        height: 1190,
        alt: 'Buquê de rosas brancas e folhagens preservado dentro de um quadro branco, sobre um cavalete',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
    images: ['/photos/quadro-espetaculo.jpg'],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.seo.url}/#business`,
  name: site.brand,
  description: site.seo.description,
  url: site.seo.url,
  telephone: `+${site.whatsapp}`,
  image: `${site.seo.url}/photos/quadro-espetaculo.jpg`,
  logo: `${site.seo.url}/photos/logo-original.png`,
  priceRange: 'R$ 180 – R$ 580',
  areaServed: site.areaServed,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: [site.socialLinks.blog],
  makesOffer: {
    '@type': 'Offer',
    name: bouquetOffer.title,
    price: bouquetOffer.priceValue,
    priceCurrency: 'BRL',
    url: whatsappUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${jost.variable} ${pinyon.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="bg-ink text-linen sr-only z-[100] rounded-full px-5 py-3 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
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
