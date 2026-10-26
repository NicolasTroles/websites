import { ArrowDown, MessageCircle } from 'lucide-react';
import { bouquetOffer, site, whatsappUrl } from '@/config/site.config';
import { Parallax } from './Parallax';
import { PetalsLayer } from './PetalsLayer';
import { Photo } from './Photo';

export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="grain relative min-h-[100svh] overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24"
    >
      {/* Soft blush glow behind the arch. */}
      <div
        aria-hidden="true"
        className="absolute top-10 -right-40 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(closest-side,rgb(234_210_202/0.85),transparent)]"
      />

      {/* Petals drift over the photo but under the text. */}
      <PetalsLayer className="pointer-events-none absolute inset-0 z-10" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div className="relative z-20">
          <p className="eyebrow text-moss flex items-center gap-3">
            <span className="bg-gold h-px w-10" aria-hidden="true" />
            {site.tagline}
          </p>

          <h1
            id="hero-title"
            className="font-display text-ink mt-7 text-[clamp(2.75rem,5.6vw,5.25rem)] leading-[0.95] font-light tracking-[-0.01em]"
          >
            Seu buquê vira quadro.
            <span className="mt-2 block">
              O sim continua{' '}
              <em className="text-rosewood relative font-normal">
                em flor
                <svg
                  viewBox="0 0 200 14"
                  aria-hidden="true"
                  className="text-gold absolute -bottom-2 left-0 w-full"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                >
                  <path d="M2 9c40-6 92-8 196-3" />
                </svg>
              </em>
              .
            </span>
          </h1>

          <p className="text-ink-soft mt-9 max-w-xl text-lg leading-relaxed font-light sm:text-xl">
            Desidratamos o seu buquê flor por flor e o remontamos em 3D, no desenho original, dentro
            de uma moldura com as iniciais e a data do casamento.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-rosewood text-linen hover:bg-rosewood-deep inline-flex min-h-14 items-center gap-3 rounded-full px-8 shadow-[0_14px_30px_-14px_rgb(140_61_74/0.8)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              <span className="eyebrow text-[12px]">Agendar pelo WhatsApp</span>
            </a>
            <a
              href="#quadros"
              className="group font-display text-ink inline-flex min-h-11 items-center gap-2 text-xl italic"
            >
              Ver quadros prontos
              <ArrowDown
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </a>
          </div>

          <dl className="border-ink/15 mt-14 grid max-w-lg grid-cols-3 border-t pt-6">
            {[
              ['A partir de', bouquetOffer.price],
              ['Prazo', bouquetOffer.deadline],
              ['Ateliê', site.address.district],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="eyebrow text-ink-soft text-[10px]">{label}</dt>
                <dd className="font-display text-ink mt-1.5 text-2xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem] lg:mx-0 lg:justify-self-end">
          {/* Gold arch outline that drifts slower than the photo. */}
          <Parallax speed={0.08} className="absolute -inset-4 translate-x-5 sm:-inset-5">
            <div className="arch border-gold/70 h-full w-full border" aria-hidden="true" />
          </Parallax>

          <div className="arch bg-mat relative overflow-hidden shadow-[0_40px_80px_-40px_rgb(16_41_43/0.6)]">
            <Photo
              src="/photos/quadro-stef.jpg"
              alt="Quadro branco com buquê de alstroemérias rosas e azuis, cravos e mosquitinhos preservados, iniciais douradas e a data do casamento"
              aspect="aspect-[4/5]"
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
              imgClassName="object-cover object-[50%_40%]"
            />
          </div>

          <p
            aria-hidden="true"
            className="font-script text-rosewood absolute -bottom-8 -left-4 -rotate-6 text-5xl sm:-left-12 sm:text-6xl"
          >
            desde o altar
          </p>
        </div>
      </div>
    </section>
  );
}
