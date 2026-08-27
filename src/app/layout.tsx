import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Manrope } from 'next/font/google';
import { site } from '@/config/site.config';
import './globals.css';

// display: 'swap' evita texto invisível enquanto a fonte carrega.
const sans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [
    'chopp são josé dos pinhais',
    'disk chopp são josé dos pinhais',
    'aluguel de chopeira curitiba',
    'distribuidora de chopp curitiba',
    'chopp para eventos pr',
    'chopp brahma heineken barril',
  ],
  alternates: { canonical: site.seo.url },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    siteName: site.name,
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
  themeColor: '#14100C',
  width: 'device-width',
  initialScale: 1,
  // Sem maximumScale: bloquear zoom quebra a acessibilidade.
};

/**
 * Schema.org de negócio local. LiquorStore é o subtipo mais próximo do
 * schema.org para uma distribuidora que vende/entrega chopp — não existe um
 * @type específico para locação de chopeira.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LiquorStore',
  name: site.name,
  description: site.seo.description,
  telephone: site.phone,
  url: site.seo.url,
  areaServed: site.serviceArea,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: 'BR',
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-foam focus:px-5 focus:py-3 focus:text-sm focus:text-stout"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
