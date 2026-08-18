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
    'alfaiate curitiba',
    'terno sob medida curitiba',
    'camisa sob medida curitiba',
    'alfaiataria centro curitiba',
    'ajuste de terno curitiba',
  ],
  openGraph: {
    title: site.seo.titulo,
    description: site.seo.descricao,
    url: site.seo.url,
    siteName: `${site.nome} ${site.sobrenomeMarca}`,
    locale: 'pt_BR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
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
  '@type': 'ClothingStore',
  name: `${site.nome} ${site.sobrenomeMarca}`,
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
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00',
    },
  ],
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
