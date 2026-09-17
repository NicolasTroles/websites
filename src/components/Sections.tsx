import {
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
  FolderTree,
  LayoutGrid,
  Search,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Photo } from '@/components/Photo';
import { Reveal } from '@/components/Reveal';
import { audiences, monitoredItems, owner, services, site } from '@/config/site.config';

/** Maps the icon key in site.config to a concrete lucide component. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  search: Search,
  folder: FolderTree,
  users: Users,
  system: LayoutGrid,
  check: CheckCircle2,
  file: FileCheck2,
};

/**
 * Acronyms that commonly appear in this kind of engagement. Deliberately framed
 * as "podem entrar no acompanhamento" — the site must not imply that every one
 * of these is inside every contract.
 */
const DOCUMENT_TICKER = [
  'PGR',
  'LTCAT',
  'PCMSO',
  'ASO',
  'NR-06',
  'NR-10',
  'NR-12',
  'NR-18',
  'NR-33',
  'NR-35',
  'CIPA',
  'Ficha de EPI',
  'PPP',
  'PCA',
  'PPR',
  'SG3',
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-label text-emeraldDeep">{children}</p>
  );
}

/* ------------------------------------------------------------------ */

export function About() {
  return (
    <section id="atuacao" className="relative bg-paper py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionLabel>Apoio técnico</SectionLabel>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.015em] text-ink sm:text-4xl">
              Organização e conformidade documental
            </h2>
          </Reveal>

          <Reveal delay={90} className="max-w-prose">
            <p className="text-lg leading-relaxed text-ink">
              A {site.brandFull} atua na análise, organização e acompanhamento de documentos e
              requisitos relacionados à Segurança do Trabalho e à gestão de terceiros.
            </p>
            <p className="mt-5 text-base leading-relaxed text-inkSoft">
              O trabalho pode abranger desde a identificação inicial de pendências até o
              acompanhamento das correções, dos vencimentos e das atualizações necessárias —
              conforme o escopo definido com cada empresa.
            </p>
          </Reveal>
        </div>
      </div>

      {/*
        Ticker of document acronyms. Pure texture: it says "this is the material
        we deal with" faster than a paragraph would, and it is duplicated so the
        loop has no visible seam.
      */}
      <div className="mt-16 border-y border-paperLine bg-paperDeep py-4 sm:mt-20">
        <p className="mx-auto max-w-6xl px-5 font-mono text-[10px] uppercase tracking-label text-inkSoft sm:px-8">
          Itens que podem entrar no acompanhamento
        </p>
        <div className="fade-x mt-3 overflow-hidden" aria-hidden="true">
          <div className="flex w-max animate-marquee gap-10 pr-10">
            {[...DOCUMENT_TICKER, ...DOCUMENT_TICKER].map((item, index) => (
              <span
                key={`${item}-${index}`}
                // 65% is the lightest this can go and still clear AA (5.3:1) on paperDeep.
                className="whitespace-nowrap font-display text-lg font-medium text-ink/65"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Services() {
  return (
    <section id="servicos" className="bg-paper pb-20 pt-4 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-prose pt-16 sm:pt-20">
          <SectionLabel>Serviços</SectionLabel>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.015em] text-ink sm:text-4xl">
            Seis frentes de atendimento
          </h2>
          <p className="mt-5 text-base leading-relaxed text-inkSoft">
            O escopo é definido caso a caso. Uma empresa pode contratar apenas o diagnóstico
            inicial, ou o acompanhamento contínuo de toda a documentação.
          </p>
        </Reveal>

        {/*
          An editorial ledger, not a card grid: a hairline per row, generous
          white space, and the index in monospace. Closer to a document index
          than to a product page, which is the register this business speaks in.
        */}
        <div className="mt-14 grid gap-x-16 sm:mt-16 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[service.icon] ?? CheckCircle2;
            return (
              <Reveal key={service.id} variant="wipe" delay={(index % 2) * 80}>
                <article className="group border-t border-paperLine py-8 transition-colors duration-300 ease-smooth hover:border-emeraldDeep">
                  <div className="flex items-start gap-5">
                    <span className="mt-1 font-mono text-xs text-inkSoft transition-colors duration-300 group-hover:text-emeraldDeep">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-3">
                        <Icon
                          className="mt-0.5 h-5 w-5 shrink-0 text-emeraldDeep"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                          {service.title}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-inkSoft">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function SG3({ whatsappSg3Url }: { whatsappSg3Url: string }) {
  return (
    <section id="sg3" className="relative overflow-hidden bg-navy py-20 text-mist sm:py-28">
      <div aria-hidden="true" className="grid-dark absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-label text-emerald">
            Sistema de gestão de terceiros
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.015em] sm:text-4xl">
            Gestão e acompanhamento no SG3
          </h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-slate">
            Apoio às empresas que utilizam o Sistema SG3 na gestão de terceiros. O atendimento
            pode envolver orientação na organização dos documentos, acompanhamento de
            pendências, conferência das informações necessárias ao processo e suporte às
            rotinas relacionadas à utilização do sistema.
          </p>

          <a
            href={whatsappSg3Url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex min-h-12 items-center gap-2 border border-emerald px-7 font-display text-sm font-semibold uppercase tracking-[0.08em] text-emerald transition-colors duration-200 hover:bg-emerald hover:text-navy"
          >
            Falar sobre suporte no SG3
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        </Reveal>

        <Reveal delay={120} variant="wipe">
          <div className="border border-navyLine bg-navySoft/70">
            <p className="border-b border-navyLine px-6 py-4 font-mono text-[10px] uppercase tracking-label text-dim">
              O que costuma ser tratado no sistema
            </p>
            <ul className="divide-y divide-navyLine">
              {[
                'Cadastro e envio de documentos da empresa e dos colaboradores',
                'Conferência das informações exigidas em cada requisito',
                'Acompanhamento das pendências apontadas pelo contratante',
                'Reenvio e correção de documentos reprovados',
                'Controle de validades para evitar bloqueio de acesso',
              ].map((item) => (
                <li key={item} className="flex gap-4 px-6 py-4">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-slate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Monitored() {
  return (
    <section id="acompanhamento" className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-prose">
          <SectionLabel>Controle de documentos e requisitos</SectionLabel>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.015em] text-ink sm:text-4xl">
            O que pode ser acompanhado
          </h2>
          <p className="mt-5 text-base leading-relaxed text-inkSoft">
            Conforme a necessidade de cada empresa ou contrato, o acompanhamento pode envolver:
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-px border border-paperLine bg-paperLine sm:grid-cols-2">
          {monitoredItems.map((item, index) => (
            <li key={item.code} className="bg-paper">
              <Reveal delay={(index % 2) * 60}>
                <div className="flex items-start gap-4 p-6">
                  <span className="mt-0.5 min-w-[3.25rem] font-mono text-[11px] uppercase tracking-[0.1em] text-emeraldDeep">
                    {item.code}
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink">{item.label}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * One documentary photograph, full width. The rest of the site is type,
 * hairlines and the WebGL field; a single real image of the work stops it from
 * reading as an abstraction. Until the client sends the photo, the frame holds
 * the brief and the generator prompt at the right aspect ratio, so nothing
 * shifts when the file lands.
 */
export function WorkBand() {
  return (
    <section className="bg-paper pb-4 sm:pb-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal variant="wipe">
          <Photo
            src="/documentacao.webp"
            alt="Pastas de documentos, checklist de conformidade e capacete de segurança sobre uma mesa de escritório"
            aspect="landscape"
            tone="light"
            guide="Foto horizontal de documentos de SST sobre uma mesa clara — pastas, checklist e um capacete ao fundo, luz natural, sem rosto em destaque."
            aiPrompt="Wide documentary photograph of occupational safety paperwork on a light desk: an organised stack of folders, a printed compliance checklist with a pen resting on it, and a white hard hat slightly out of focus in the background. Natural window light from the left, calm neutral colour grade with deep navy and muted emerald accents, shallow depth of field, no faces, no text legible, 16:10 landscape, photorealistic"
            sizes="(max-width: 1024px) 100vw, 1088px"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Audiences() {
  return (
    <section id="para-quem" className="bg-paperDeep py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionLabel>Para quem é</SectionLabel>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.015em] text-ink sm:text-4xl">
              Empresas que precisam organizar e acompanhar exigências de SST
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <p className="text-base leading-relaxed text-inkSoft">A consultoria pode atender empresas que:</p>
            <ul className="mt-6 divide-y divide-paperLine border-y border-paperLine">
              {audiences.map((item, index) => (
                <li key={item} className="flex gap-5 py-5">
                  <span className="font-mono text-xs text-emeraldDeep">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="max-w-prose text-[15px] leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Owner() {
  return (
    <section id="sobre" className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal variant="wipe">
            <Photo
              src="/valder.webp"
              alt={`${owner.name}, ${owner.role}`}
              aspect="portrait"
              tone="light"
              guide="Foto do Valder em fundo neutro claro, camisa social ou polo, enquadramento do peito para cima, olhando para a câmera."
              aiPrompt="Professional corporate headshot of a Brazilian man in his 40s, wearing a plain navy polo shirt, standing against a clean light grey studio background, soft even key light from the left, shallow depth of field, chest-up framing, calm confident expression, neutral colour grade with deep navy and muted emerald accents, photorealistic, 4:3 portrait"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </Reveal>

          <Reveal delay={100}>
            <SectionLabel>Sobre o profissional</SectionLabel>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.015em] text-ink sm:text-4xl">
              {owner.name}
            </h2>
            <p className="mt-3 font-display text-base text-emeraldDeep">{owner.role}</p>

            {owner.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-6 max-w-prose text-base leading-relaxed text-inkSoft">
                {paragraph}
              </p>
            ))}

            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink">{owner.education}</p>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Temas de atuação">
              {owner.topics.map((topic) => (
                <li
                  key={topic}
                  className="border border-paperLine px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-inkSoft"
                >
                  {topic}
                </li>
              ))}
            </ul>

            {site.socialLinks.linkedin && (
              <a
                href={site.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex min-h-11 items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.08em] text-emeraldDeep"
              >
                Ver perfil no LinkedIn
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
