import { ArrowUpRight, Plus, Quote } from 'lucide-react';
import {
  bouquetOffer,
  extras,
  faq,
  frames,
  gallery,
  otherServices,
  process,
  site,
  testimonials,
  whatsappUrl,
} from '@/config/site.config';
import { Sprig } from './Brand';
import { Parallax } from './Parallax';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

function SectionTitle({
  eyebrow,
  script,
  children,
  id,
  tone = 'light',
  className = '',
}: {
  eyebrow: string;
  script?: string;
  children: React.ReactNode;
  id: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <div className={className}>
      <p className={`eyebrow flex items-center gap-3 ${dark ? 'text-gold-soft' : 'text-moss'}`}>
        <span className="bg-gold h-px w-10" aria-hidden="true" />
        {eyebrow}
      </p>
      {script && (
        <p
          aria-hidden="true"
          className={`font-script mt-5 text-4xl sm:text-5xl ${dark ? 'text-blush' : 'text-rosewood'}`}
        >
          {script}
        </p>
      )}
      <h2
        id={id}
        className={`font-display mt-3 text-[clamp(2.3rem,5vw,4rem)] leading-[1.02] font-light ${
          dark ? 'text-linen' : 'text-ink'
        }`}
      >
        {children}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="relative overflow-hidden py-24 sm:py-36">
      {/* Oversized word sliding behind the content. */}
      <Parallax
        speed={-0.25}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
      >
        <p
          aria-hidden="true"
          className="font-display text-ink/[0.045] text-[clamp(7rem,24vw,22rem)] leading-none whitespace-nowrap italic select-none"
        >
          campestre
        </p>
      </Parallax>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal variant="arch" className="relative mx-auto w-full max-w-md">
          <div className="arch overflow-hidden">
            <Photo
              src="/photos/detalhe-flores.jpg"
              alt="Buquê de rosas brancas, folhagens e mosquitinhos já desidratados e remontados em volume, antes de entrar no quadro"
              aspect="aspect-[4/5]"
              sizes="(max-width: 1024px) 90vw, 440px"
            />
          </div>
        </Reveal>

        <div>
          <SectionTitle eyebrow="O ateliê" script="flor por flor" id="manifesto-title">
            Não é um buquê prensado. <em className="text-rosewood">É o seu buquê, em volume.</em>
          </SectionTitle>
          <Reveal>
            <p className="text-ink-soft mt-9 max-w-xl text-lg leading-relaxed font-light">
              Cada flor é desidratada separadamente e depois volta para o lugar em que estava — por
              isso o quadro mantém o desenho original do buquê, em 3D, e não uma colagem achatada.
            </p>
            <p className="text-ink-soft mt-5 max-w-xl text-lg leading-relaxed font-light">
              O trabalho é feito à mão por {site.artisans}, no Atelier Campestre, no{' '}
              {site.address.district}, em Curitiba. Além dos buquês, o ateliê eterniza sapatinhos,
              roupinhas e outras lembranças de família.
            </p>
          </Reveal>
          <Sprig className="text-gold mt-10 w-32" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Fern({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M60 396C58 290 62 150 60 6" />
      {Array.from({ length: 16 }, (_, i) => {
        const y = 40 + i * 22;
        const len = 18 + Math.sin((i / 15) * Math.PI) * 30;
        return (
          <g key={i}>
            <path d={`M60 ${y}c-${len * 0.5}-6-${len}-4-${len}-${10 + i * 0.3}`} />
            <path d={`M60 ${y}c${len * 0.5}-6 ${len}-4 ${len}-${10 + i * 0.3}`} />
          </g>
        );
      })}
    </svg>
  );
}

export function Process() {
  return (
    <section
      id="processo"
      aria-labelledby="processo-title"
      className="bg-night text-linen relative overflow-hidden py-24 sm:py-32"
    >
      {/* Botanical layers at two depths. */}
      <Parallax
        speed={0.18}
        className="pointer-events-none absolute top-10 -left-10 hidden md:block"
      >
        <Fern className="text-leaf/25 h-[34rem] w-auto" />
      </Parallax>
      <Parallax speed={-0.12} className="pointer-events-none absolute -right-6 bottom-0">
        <Fern className="text-gold/25 h-[26rem] w-auto rotate-12" />
      </Parallax>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionTitle eyebrow="Como funciona" script="do altar" tone="dark" id="processo-title">
            à parede da sua casa
          </SectionTitle>
          <p className="text-linen/80 mt-8 max-w-sm text-lg leading-relaxed font-light">
            Cinco etapas, todas feitas à mão no ateliê. Do dia em que você traz o buquê até o quadro
            pronto: {bouquetOffer.deadline}.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow border-linen/40 text-linen hover:bg-linen hover:text-night mt-10 inline-flex min-h-12 items-center gap-2 rounded-full border px-7 text-[11px] transition-colors"
          >
            Mandar foto do buquê
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <ol className="relative">
          {/* The stem that connects the steps. */}
          <span
            aria-hidden="true"
            className="from-gold/70 via-leaf/50 absolute top-3 bottom-3 left-[1.35rem] w-px bg-gradient-to-b to-transparent sm:left-[1.85rem]"
          />
          {process.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              className="relative grid grid-cols-[auto_1fr] gap-6 pb-14 last:pb-0 sm:gap-10"
            >
              <span className="border-gold/70 bg-night font-display text-gold-soft relative z-10 flex h-11 w-11 items-center justify-center rounded-full border text-xl italic sm:h-15 sm:w-15 sm:text-2xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
                <div>
                  <h3 className="font-display text-linen text-3xl font-normal sm:text-[2.1rem]">
                    {step.title}
                  </h3>
                  <p className="text-linen/80 mt-3 max-w-md leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
                {step.photo && (
                  <div className="frame w-36 rotate-2 sm:w-40">
                    <div className="frame-glass">
                      <Photo
                        src={step.photo}
                        alt={`Etapa ${i + 1}: ${step.title.toLowerCase()}`}
                        aspect="aspect-[3/4]"
                        sizes="160px"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const GALLERY_LAYOUT = {
  feature: 'col-span-2 md:row-span-2 md:col-start-2',
  small: 'col-span-1',
} as const;

const TILTS = ['-rotate-1', 'rotate-1', '-rotate-[0.6deg]', 'rotate-[0.8deg]'];

export function Gallery() {
  return (
    <section id="quadros" aria-labelledby="quadros-title" className="grain py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Quadros entregues"
            script="parede de lembranças"
            id="quadros-title"
          >
            Buquês que já viraram <em className="text-rosewood">quadro</em>
          </SectionTitle>
          <a
            href={site.socialLinks.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-display text-ink inline-flex min-h-11 items-center gap-2 text-xl italic"
          >
            Mais trabalhos no blog do ateliê
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Salon hang: frames of different sizes, slightly off-level, each on its own nail. */}
        <ul className="mt-16 grid grid-flow-dense grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-8 md:grid-cols-4 md:gap-y-16">
          {gallery.map((item, i) => (
            <li key={item.src} className={GALLERY_LAYOUT[item.size]}>
              <Reveal delay={(i % 4) * 90}>
                <figure className="group relative">
                  <span
                    aria-hidden="true"
                    className="bg-gold absolute -top-6 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full shadow-[0_1px_2px_rgb(0_0_0/0.3)]"
                  />
                  <div
                    className={`frame origin-top transition-transform duration-700 ease-[var(--ease-petal)] group-hover:rotate-0 ${TILTS[i % TILTS.length]}`}
                  >
                    <div className="frame-glass">
                      <Photo
                        src={item.src}
                        alt={item.alt}
                        aspect={item.size === 'small' ? 'aspect-[4/5]' : 'aspect-[3/4]'}
                        sizes={
                          item.size === 'small'
                            ? '(max-width: 768px) 45vw, 260px'
                            : '(max-width: 768px) 90vw, 560px'
                        }
                      />
                    </div>
                  </div>
                  <figcaption className="font-display text-ink-soft mt-5 text-center text-lg leading-snug italic">
                    {item.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const FRAME_STYLE = {
  glass: 'border-[10px] border-paper shadow-[0_0_0_1px_rgb(23_63_66/0.12)] bg-linen',
  textured:
    'border-[10px] border-[#e9dfcf] bg-[repeating-radial-gradient(circle_at_30%_30%,#f3ece0_0_6px,#ebe1d1_6px_7px)]',
  rustic: 'border-[14px] border-[#9a7550] bg-[#efe6d6] shadow-[inset_0_0_0_3px_#7f5e3e]',
  acrylic:
    'border-[8px] border-ink bg-paper shadow-[inset_0_0_0_6px_#efe7da,inset_0_0_0_7px_rgb(23_63_66/0.25)]',
} as const;

function MiniBouquet() {
  return (
    <svg viewBox="0 0 60 80" aria-hidden="true" className="mx-auto h-full w-auto">
      <path d="M30 78V44" stroke="#3f6b4c" strokeWidth="2" />
      <path d="M26 66h8" stroke="#fbf8f3" strokeWidth="5" />
      <g opacity="0.95">
        <circle cx="22" cy="30" r="8" fill="#e7b4b0" />
        <circle cx="38" cy="28" r="9" fill="#d48f92" />
        <circle cx="30" cy="18" r="8" fill="#f1d9cf" />
        <circle cx="16" cy="18" r="5" fill="#6f9c6a" />
        <circle cx="45" cy="16" r="5" fill="#6f9c6a" />
        <circle cx="30" cy="38" r="6" fill="#e2b768" />
      </g>
    </svg>
  );
}

export function Frames() {
  return (
    <section
      id="molduras"
      aria-labelledby="molduras-title"
      className="bg-petal/60 relative overflow-hidden py-24 sm:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionTitle eyebrow="Molduras e detalhes" script="do seu jeito" id="molduras-title">
            Escolhemos a moldura <em className="text-rosewood">junto com você</em>
          </SectionTitle>
          <p className="text-ink-soft mt-8 max-w-lg text-lg leading-relaxed font-light">
            Quadrada ou retangular, conforme o tamanho do buquê, em molduras clássicas ou modernas,
            de várias cores e texturas.
          </p>

          <Reveal variant="arch" className="mt-12 hidden max-w-sm lg:block">
            <div className="arch overflow-hidden">
              <Photo
                src="/photos/quadro-espetaculo.jpg"
                alt="Quadro branco tipo caixa com buquê de rosas brancas e folhagens, apoiado num cavalete de madeira"
                aspect="aspect-[4/5]"
                sizes="380px"
              />
            </div>
          </Reveal>
        </div>

        <div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {frames.map((frame, i) => (
              <Reveal as="li" key={frame.name} delay={i * 80}>
                <article className="bg-paper h-full rounded-[2px] p-6 shadow-[0_1px_0_rgb(23_63_66/0.06)] transition-shadow duration-500 hover:shadow-[0_26px_50px_-30px_rgb(16_41_43/0.5)]">
                  <div className={`mx-auto aspect-[4/5] w-28 p-3 ${FRAME_STYLE[frame.style]}`}>
                    <MiniBouquet />
                  </div>
                  <h3 className="font-display text-ink mt-6 text-2xl">{frame.name}</h3>
                  <p className="text-ink-soft mt-2 leading-relaxed font-light">
                    {frame.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>

          <div className="border-ink/15 mt-12 border-t pt-8">
            <h3 className="eyebrow text-moss">Personalize o fundo do quadro</h3>
            <ul className="mt-5 flex flex-wrap gap-3">
              {extras.map((extra) => (
                <li
                  key={extra}
                  className="border-gold/60 bg-paper font-display text-ink inline-flex items-center gap-2 rounded-full border px-4 py-2 text-lg italic"
                >
                  <Plus className="text-gold h-3.5 w-3.5" aria-hidden="true" />
                  {extra}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Investment() {
  return (
    <section id="investimento" aria-labelledby="investimento-title" className="py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Investimento"
          id="investimento-title"
          className="mx-auto max-w-2xl text-center [&>p:first-child]:justify-center"
        >
          Um valor claro, <em className="text-rosewood">sem surpresa</em>
        </SectionTitle>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Styled like a wedding invitation: double gold rule, centred. */}
          <Reveal>
            <article className="bg-paper relative p-3 shadow-[0_40px_80px_-50px_rgb(16_41_43/0.55)]">
              <div className="border-gold/70 border p-2">
                <div className="border-gold/40 border px-6 py-12 text-center sm:px-12">
                  <p className="font-script text-rosewood text-4xl" aria-hidden="true">
                    o seu buquê
                  </p>
                  <h3 className="font-display text-ink mt-2 text-3xl sm:text-4xl">
                    {bouquetOffer.title}
                  </h3>
                  <p className="font-display text-ink mt-8 text-[clamp(3.5rem,9vw,5.5rem)] leading-none font-light">
                    {bouquetOffer.price}
                  </p>
                  <p className="eyebrow text-ink-soft mt-4">Pronto em {bouquetOffer.deadline}</p>
                  <Sprig className="text-gold mx-auto mt-8 w-28" />
                  <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
                    {bouquetOffer.includes.map((item) => (
                      <li
                        key={item}
                        className="text-ink-soft flex gap-3 leading-relaxed font-light"
                      >
                        <span
                          className="bg-rosewood mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow bg-rosewood text-linen hover:bg-rosewood-deep mt-10 inline-flex min-h-13 items-center rounded-full px-8 text-[12px] transition-colors"
                  >
                    Reservar a data do meu buquê
                  </a>
                  <p className="text-ink-soft mt-5 text-sm">{bouquetOffer.note}</p>
                </div>
              </div>
            </article>
          </Reveal>

          <div>
            <p className="font-script text-rosewood text-4xl" aria-hidden="true">
              e também
            </p>
            <h3 className="font-display text-ink mt-2 text-3xl sm:text-4xl">
              Outras lembranças que eternizamos
            </h3>
            {/* Menu-style list with dotted leaders. */}
            <dl className="mt-8">
              {otherServices.map((service) => (
                <div
                  key={service.title}
                  className="border-ink/20 flex flex-col gap-1 border-b border-dashed py-5 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <dt className="font-display text-ink text-2xl">{service.title}</dt>
                  <span aria-hidden="true" className="hidden flex-1 sm:block" />
                  <dd className="text-ink-soft font-light sm:text-right">{service.detail}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 grid grid-cols-2 gap-5">
              <div className="frame -rotate-1">
                <div className="frame-glass">
                  <Photo
                    src="/photos/buque-simone.jpg"
                    alt="Buquê de rosas amarelas e brancas desidratadas, com laço de cetim, sobre fundo texturizado"
                    aspect="aspect-[4/5]"
                    sizes="(max-width: 1024px) 45vw, 260px"
                  />
                </div>
              </div>
              <div className="frame mt-10 rotate-1">
                <div className="frame-glass">
                  <Photo
                    alt="Par de sapatinhos de bebê eternizados"
                    guide="Aqui vai uma foto de um par de sapatinhos de bebê eternizados pelo ateliê"
                    aiPrompt="Close-up product photo of a pair of tiny baby shoes preserved with a satin cream finish, displayed in a white shadow box frame with linen mat, soft natural window light, shallow depth of field, warm and delicate, editorial still life."
                    aspect="aspect-[4/5]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Testimonials() {
  return (
    <section aria-labelledby="depoimentos-title" className="bg-blush/45 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle eyebrow="Noivas do ateliê" script="com carinho" id="depoimentos-title">
          O que dizem as noivas
        </SectionTitle>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 100}>
              <figure className="arch bg-paper flex h-full flex-col px-8 pt-16 pb-10 text-center">
                <Quote className="text-gold mx-auto h-6 w-6" aria-hidden="true" />
                <blockquote className="font-display text-ink mt-6 flex-1 text-2xl leading-snug italic">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8">
                  <span className="text-ink block font-sans font-medium">{t.author}</span>
                  <span className="eyebrow text-ink-soft mt-1 block text-[10px]">{t.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionTitle eyebrow="Bom saber" script="antes do sim" id="duvidas-title">
            Dúvidas de quem vai casar
          </SectionTitle>
          <p className="text-ink-soft mt-8 max-w-sm text-lg leading-relaxed font-light">
            Respostas sinceras, para você decidir com calma. Ficou alguma dúvida? É só chamar no
            WhatsApp.
          </p>
        </div>

        <div className="border-ink/15 border-t">
          {faq.map((item) => (
            <details key={item.question} className="group border-ink/15 border-b">
              <summary className="font-display text-ink flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 text-2xl sm:text-[1.7rem] [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  className="text-rosewood h-5 w-5 shrink-0 transition-transform duration-500 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="text-ink-soft max-w-2xl pb-8 text-lg leading-relaxed font-light">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
