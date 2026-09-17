'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';
import { Monogram } from '@/components/Brand';
import { pillars, site, whatsappUrl } from '@/config/site.config';
import { trackWhatsAppClick } from '@/lib/analytics';
import { useParallax } from '@/lib/useParallax';

/**
 * Illustrative rows for the hero panel. Explicitly labelled as an example in
 * the panel header — it must never be mistaken for a real client's document
 * status, which is why no company name appears anywhere in it.
 */
const SAMPLE_ROWS = [
  { code: 'ASO', label: 'Exame ocupacional', status: 'vence em 12 dias', state: 'pending' },
  { code: 'NR-35', label: 'Treinamento de altura', status: 'regular', state: 'ok' },
  { code: 'PGR', label: 'Programa de riscos', status: 'revisão pendente', state: 'pending' },
  { code: 'EPI', label: 'Ficha de entrega', status: 'regular', state: 'ok' },
] as const;

export function Hero() {
  // Three depths, all subtle. The wedge barely moves, the panel moves most —
  // that difference is what reads as depth instead of as a gimmick.
  const wedge = useParallax<HTMLDivElement>(0.06);
  const ghost = useParallax<HTMLDivElement>(0.11);
  const panel = useParallax<HTMLDivElement>(0.18);

  return (
    <section id="topo" className="relative overflow-hidden bg-navy text-mist">
      {/* Ruled-paper base layer, static. */}
      <div aria-hidden="true" className="ruled-dark absolute inset-0" />

      {/* The emerald wedge from the client's banner, cutting in from the right. */}
      <div
        ref={wedge.ref}
        aria-hidden="true"
        style={{
          transform: `translate3d(0, ${wedge.offset}px, 0)`,
          // The diagonal is the one shape carried over literally from the
          // client's banner, so it stays a hand-written polygon rather than a
          // utility class.
          clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 100%)',
        }}
        className="absolute -right-24 bottom-[-20%] hidden h-[78%] w-[46%] bg-emerald/10 lg:block"
      />
      <div
        ref={ghost.ref}
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${ghost.offset}px, 0)` }}
        className="absolute -left-16 top-[18%] hidden opacity-[0.045] md:block"
      >
        <Monogram className="h-[36rem] w-[36rem] text-mist" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:pb-32 lg:pt-40">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-label text-emerald">
            {site.tagline.split(' | ').join('  ·  ')}
          </p>

          <h1 className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.85rem]">
            Transformando exigências em{' '}
            <span className="text-emerald">organização, conformidade</span> e{' '}
            <span className="text-emerald">controle</span>.
          </h1>

          <p className="mt-7 max-w-prose text-base leading-relaxed text-slate sm:text-lg">
            Apoio técnico para empresas que precisam identificar pendências, organizar
            documentos, acompanhar vencimentos e atender aos requisitos aplicáveis aos seus
            contratos e operações.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contato"
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-emerald px-7 font-display text-sm font-semibold uppercase tracking-[0.08em] text-navy transition-colors duration-200 hover:bg-mist"
            >
              Solicitar diagnóstico
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('hero')}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-navyLine px-7 font-display text-sm font-semibold uppercase tracking-[0.08em] text-mist transition-colors duration-200 hover:border-emerald hover:text-emerald"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>

          <dl className="mt-14 grid gap-px border border-navyLine bg-navyLine sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.label} className="bg-navy p-5">
                <dt className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-emerald">
                  {pillar.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-dim">{pillar.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The deepest parallax layer: a mock reading of document status. */}
        <div
          ref={panel.ref}
          style={{ transform: `translate3d(0, ${panel.offset}px, 0)` }}
          className="relative hidden lg:block"
        >
          <div className="border border-navyLine bg-navySoft/80 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-navyLine px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-label text-slate">
                Leitura de pendências
              </p>
              <p className="font-mono text-[10px] uppercase tracking-label text-dim">
                exemplo ilustrativo
              </p>
            </div>

            <ul className="divide-y divide-navyLine">
              {SAMPLE_ROWS.map((row) => (
                <li key={row.code} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-emerald">{row.code}</p>
                    <p className="mt-1 truncate text-sm text-mist">{row.label}</p>
                  </div>
                  <span
                    className={`shrink-0 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${
                      row.state === 'ok'
                        ? 'border-emerald/40 text-emerald'
                        : 'border-amber/40 text-amber'
                    }`}
                  >
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>

            {/* A scanning line, echoing the audit sweep in the WebGL section. */}
            <div className="relative h-1 overflow-hidden border-t border-navyLine">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 w-1/3 animate-sweep-x bg-gradient-to-r from-transparent via-emerald to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
