import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono, Public_Sans } from 'next/font/google';
import Script from 'next/script';
import { owner, services, site } from '@/config/site.config';
import './globals.css';

/**
 * Set NEXT_PUBLIC_GA_ID in the Vercel project (and in .env.local for local
 * runs) to switch analytics on. Left unset, no tag is injected at all — which
 * is the right default while the site is still a preview.
 */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Wide grotesque for display, echoing the squared wordmark of the client's logo.
const display = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Public Sans was drawn for US federal documents. On a site about regulatory
// paperwork, that is the right voice for body copy.
const sans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

// Reserved for document codes and status readouts (ASO, NR-35, 01/04).
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [
    'consultoria segurança do trabalho',
    'gestão de terceiros',
    'sistema sg3',
    'documentação sst',
    'regularização de pendências documentais',
    'controle de vencimentos sst',
  ],
  authors: [{ name: site.brandFull }],
  alternates: { canonical: '/' },
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
  themeColor: '#0A1E2C',
  width: 'device-width',
  initialScale: 1,
  // No maximumScale: blocking zoom breaks accessibility.
};

/**
 * schema.org markup. `ProfessionalService` is the right type here — this is a
 * consultancy, not a shop with a storefront, so no `address` with a street is
 * claimed, only the area served.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.brandFull,
  description: site.seo.description,
  url: site.seo.url,
  telephone: site.phone,
  areaServed: site.areaServed,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: 'BR',
  },
  founder: { '@type': 'Person', name: owner.name, jobTitle: owner.role },
  knowsAbout: [
    'Segurança do Trabalho',
    'Gestão de terceiros',
    'Gestão documental de SST',
    'Sistema SG3',
  ],
  ...(site.socialLinks.linkedin ? { sameAs: [site.socialLinks.linkedin] } : {}),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços de consultoria em Segurança do Trabalho e gestão de terceiros',
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
    <html lang="pt-BR" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-mist focus:px-5 focus:py-3 focus:text-sm focus:text-navy"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
