import type { Metadata, Viewport } from 'next';
import { Bitter, Work_Sans } from 'next/font/google';
import { site } from '@/config/site.config';
import './globals.css';

// display: 'swap' avoids invisible text while the font loads.
const sans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Bitter({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [
    'barbearia curitiba',
    'barbearia novo mundo curitiba',
    'corte masculino curitiba',
    'barba navalha curitiba',
    'barbearia lumberjack',
  ],
  alternates: { canonical: site.seo.url },
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
  themeColor: '#12160F',
  width: 'device-width',
  initialScale: 1,
  // No maximumScale: blocking zoom breaks accessibility.
};

/**
 * Schema.org business markup. HairSalon is the closest schema.org type to a
 * barbershop (no dedicated "Barbershop" type exists) — this is what lets
 * Google surface the address, phone, and hours directly in search results.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: site.brandFull,
  description: site.seo.description,
  telephone: site.phone,
  url: site.seo.url,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'BR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '20:00',
    },
  ],
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-5 focus:py-3 focus:text-sm focus:text-bark"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
