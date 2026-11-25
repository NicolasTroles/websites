import type { Metadata } from 'next';

/**
 * Temporary suspension notice. The original home page (Header, Hero,
 * CircuitSection, Services, FAQ, Contact, Footer, MobileContactBar) is
 * untouched in src/components — to restore the site, revert this file.
 *
 * noindex keeps search engines from replacing the indexed listing with
 * this notice while the site is down.
 */
export const metadata: Metadata = {
  title: 'Site temporariamente indisponível',
  description: 'Este site está temporariamente indisponível.',
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <main
      id="content"
      className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-neutral-800"
    >
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
          Site temporariamente indisponível
        </h1>
        <p className="mt-6 text-base leading-relaxed text-neutral-600">
          Estamos fora do ar no momento.
        </p>
        <p className="mt-4 text-base leading-relaxed text-neutral-600">
          Agradecemos a compreensão. Em breve o acesso será restabelecido.
        </p>
      </div>
    </main>
  );
}
