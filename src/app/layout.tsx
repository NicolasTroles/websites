import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { site } from '@/config/site.config';
import './globals.css';

// display: 'swap' evita texto invisível enquanto a fonte carrega.
const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.titulo,
  description: site.seo.descricao,
  keywords: [
    'loja de tintas campo largo',
    'tintas campo largo pr',
    'mistura de cores campo largo',
    'tinta automotiva campo largo',
    'tinta imobiliária campo largo',
  ],
  openGraph: {
    title: site.seo.titulo,
    description: site.seo.descricao,
    url: site.seo.url,
    siteName: site.marcaLoja,
    locale: 'pt_BR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B7285',
  width: 'device-width',
  initialScale: 1,
  // Sem maximumScale: bloquear zoom quebra a acessibilidade.
};

/**
 * Schema.org de negócio local. É o que faz o Google exibir endereço, telefone
 * e horário direto no resultado de busca.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HardwareStore',
  name: site.marcaLoja,
  description: site.seo.descricao,
  telephone: site.telefone,
  url: site.seo.url,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.endereco.logradouro,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.estado,
    postalCode: site.endereco.cep,
    addressCountry: 'BR',
  },
  // A loja fecha para almoço das 11h30 às 11h50, por isso são dois blocos por dia útil.
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '11:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '11:50',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '13:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.avaliacaoGoogle.nota,
    reviewCount: site.avaliacaoGoogle.total,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
