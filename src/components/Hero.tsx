import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { mapsUrl, site, whatsappUrl } from '@/config/site.config';
import { Stars, WhatsAppIcon } from './Brand';
import { Parallax } from './Parallax';

/**
 * Asymmetric hero: oversized type on the left, the client's own artwork on
 * the right. Three parallax layers drift at different speeds — the outlined
 * "ANG" behind everything, the logo, and a loose neon ring in front.
 * The h1 is plain text, so it paints first and is the LCP element.
 */
export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden pt-18"
    >
      {/* Ambient light pooling on the right, where the car sits. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_78%_45%,rgb(106_222_219/0.13),transparent_70%)]"
      />

      <Parallax
        speed={0.14}
        className="pointer-events-none absolute inset-x-0 bottom-[-14vw] -z-10"
      >
        <p className="font-display text-outline text-center text-[38vw] leading-none font-bold tracking-tighter select-none">
          ANG
        </p>
      </Parallax>

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-4 py-14 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-7">
          <p className="eyebrow text-neon flex items-center gap-3">
            <span className="bg-neon glow inline-block h-1.5 w-1.5 shrink-0 rounded-full" />
            Estética automotiva ·{' '}
            <span className="hidden sm:inline">{site.address.district}, </span>
            {site.address.city}
          </p>

          <h1
            id="hero-title"
            className="font-display mt-6 text-[clamp(2.35rem,6.4vw,5.25rem)] leading-[1.02] font-semibold tracking-tight text-balance"
          >
            Brilho de <span className="text-neon">vitrine</span>, do motor ao farol.
          </h1>

          <p className="text-haze mt-7 max-w-xl text-lg leading-relaxed text-pretty">
            Lavagem detalhada, higienização interna, vitrificação e restauração de faróis. Mande o
            modelo e o ano do seu carro e receba o orçamento pelo WhatsApp.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neon text-neon-ink glow hover:bg-neon-soft inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-7 font-semibold transition-colors"
            >
              <WhatsAppIcon />
              Pedir orçamento
              <span className="sr-only"> no WhatsApp (abre em nova aba)</span>
            </a>
            <a
              href="#servicos"
              className="border-line-bright text-frost hover:border-frost inline-flex min-h-13 items-center justify-center rounded-full border px-7 font-medium transition-colors"
            >
              Ver serviços
            </a>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-haze hover:text-frost mt-10 inline-flex min-h-11 items-center gap-3 text-sm transition-colors"
          >
            <Stars className="text-neon" />
            <span>
              <strong className="text-frost font-semibold">{site.rating.value}</strong> no Google ·{' '}
              {site.rating.count} avaliações
              <span className="sr-only"> (abre o Google Maps em nova aba)</span>
            </span>
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:col-span-5 lg:max-w-none">
          <Parallax speed={-0.04} decorative={false}>
            <Image
              src="/brand/ang-logo.webp"
              alt="Arte da ANG Estética Automotiva: silhueta de um carro escuro com faróis acesos em ciano, dentro de um anel de neon"
              width={1060}
              height={1060}
              priority
              sizes="(max-width: 640px) 22rem, (max-width: 1024px) 28rem, 40vw"
              // The artwork sits on pure black; the radial mask melts its square
              // edge into the page so only the ring and the car remain.
              className="aspect-square w-full [mask-image:radial-gradient(closest-side,#000_95%,transparent_100%)]"
            />
          </Parallax>
          <Parallax
            speed={0.07}
            className="border-neon/20 pointer-events-none absolute inset-[-6%] rounded-full border"
          >
            <span className="bg-neon glow absolute top-[14%] left-[8%] h-2 w-2 rounded-full" />
          </Parallax>
        </div>
      </div>

      <a
        href="#servicos"
        className="eyebrow text-haze hover:text-neon mx-auto mb-6 inline-flex min-h-11 items-center gap-2 transition-colors"
      >
        Role para ver
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
}
