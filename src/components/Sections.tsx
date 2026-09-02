'use client';

import type { ReactNode } from 'react';
import {
  CheckCircle2,
  CircleSlash2,
  CircuitBoard,
  ClipboardCheck,
  Eye,
  ImageOff,
  Laptop,
  Microwave,
  OctagonAlert,
  PackageSearch,
  Plug,
  PowerOff,
  RotateCcw,
  SearchCheck,
  Target,
  Thermometer,
  TriangleAlert,
  Tv,
  Volume2,
  Wrench,
  XCircle,
  MapPin,
} from 'lucide-react';
import {
  differentiators,
  processSteps,
  services,
  site,
  symptoms,
} from '@/config/site.config';
import { useParallax } from '@/lib/useParallax';
import { WhatsAppButton } from './Actions';
import { Marquee } from './Brand';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

const SYMPTOM_ICONS = {
  power: PowerOff,
  restart: RotateCcw,
  imageOff: ImageOff,
  thermometer: Thermometer,
  alert: TriangleAlert,
  volume: Volume2,
  block: CircleSlash2,
  stop: OctagonAlert,
} as const;

const SERVICE_ICONS = {
  tv: Tv,
  circuit: CircuitBoard,
  microwave: Microwave,
  computer: Laptop,
  plug: Plug,
  search: PackageSearch,
} as const;

const DIFFERENTIATOR_ICONS = {
  search: SearchCheck,
  pin: MapPin,
  check: ClipboardCheck,
  circuit: CircuitBoard,
  eye: Eye,
  target: Target,
} as const;

/** Standard section header. `tone` swaps colors for the alternating light/dark backgrounds. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  tone?: 'light' | 'dark';
}) {
  const light = tone === 'light';
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={`label-caps text-[10px] ${light ? 'text-safetyDeep' : 'text-safety'}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-[clamp(1.9rem,4.4vw,2.9rem)] font-bold leading-[1.1] tracking-tight ${
          light ? 'text-ink' : 'text-chalk'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-prose text-[17px] leading-relaxed ${
            light ? 'text-inkSoft' : 'text-mist'
          } ${center ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Compact strip right under the hero — real, non-invented trust signals only. */
export function TrustBar() {
  return (
    <section className="border-y border-floorLine bg-floorDeep py-8" aria-label="Indicadores de confiança">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center sm:flex-row sm:justify-between sm:text-left sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex text-safetyDeep" aria-hidden="true">
            {'★★★★★'.split('').map((star, i) => (
              <span key={i} className="text-base leading-none">
                {star}
              </span>
            ))}
          </div>
          <div>
            <p className="label-caps text-[10px] text-ink">Avaliações de clientes</p>
            <p className="text-[12px] text-inkSoft">{site.googleRating} no Google</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] label-caps text-inkSoft">
          <span>Diagnóstico técnico</span>
          <span>Orçamento antes do reparo</span>
          <span>Atendimento em {site.city}</span>
        </div>
      </div>
    </section>
  );
}

/** Symptom-based entry point — the customer identifies with the problem, not a product category. */
export function Problems() {
  return (
    <section id="problemas" className="bg-floor py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Diagnóstico"
            title="Seu equipamento apresentou algum desses problemas?"
            description="Nem sempre um equipamento que parou de funcionar precisa ser substituído. Um diagnóstico técnico pode identificar a origem da falha e indicar se o reparo é viável."
            tone="light"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-floorLine bg-floorLine sm:grid-cols-4">
          {symptoms.map((symptom, i) => {
            const Icon = SYMPTOM_ICONS[symptom.icon];
            return (
              <Reveal key={symptom.title} delay={i * 40}>
                <div className="flex h-full flex-col items-start gap-4 bg-floor px-6 py-8 transition-colors duration-200 hover:bg-floorDeep">
                  <Icon className="h-6 w-6 text-safetyDeep" strokeWidth={1.5} aria-hidden="true" />
                  <p className="text-[14px] font-medium leading-snug text-ink">{symptom.title}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex justify-center">
            <WhatsAppButton label="Falar com um técnico" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** What the client repairs — photography-led cards, categories confirmed by the client, evaluated case by case. */
export function Services() {
  return (
    <section id="services" className="bg-floorDeep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Serviços"
            title="O que a Activa pode reparar?"
            description="Cada categoria abaixo passa por avaliação técnica antes de qualquer diagnóstico ser confirmado."
            tone="light"
            center
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <Reveal key={service.title} delay={i * 60} className="h-full">
                <article className="group h-full border border-floorLine bg-floor">
                  <Photo
                    src=""
                    guide={`Foto técnica representando "${service.title}".`}
                    aiPrompt={SERVICE_PROMPTS[service.icon]}
                    alt={`${service.title} — Activa Eletrônica`}
                    aspect="landscape"
                    tone="light"
                    focus="center"
                  />
                  <div className="flex flex-col gap-3 p-6">
                    <Icon className="h-5 w-5 text-safetyDeep" strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="font-display text-lg font-bold text-ink">{service.title}</h3>
                    <p className="text-[14px] leading-relaxed text-inkSoft">{service.description}</p>
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

const SERVICE_PROMPTS: Record<(typeof services)[number]['icon'], string> = {
  tv: "Editorial product photograph of the back panel of a flat-screen television opened for repair, resting on a workbench, exposing the internal circuit boards and connectors. A technician's hand holds a screwdriver near one of the boards. Neutral studio lighting, deep petrol-blue (#0B2B3A) and graphite tones with a single amber-yellow (#F4B41A) accent (a tool handle or indicator light), photorealistic, shallow depth of field, no text, no logos, no face visible.",
  circuit:
    "Macro editorial photograph of a green printed circuit board held under focused work light, showing soldered components, resistors and a soldering iron tip mid-repair with a thin curl of smoke. Extreme close-up, shallow depth of field, precise and technical mood, deep petrol-blue and graphite palette with one amber-yellow accent (solder wire spool or LED), photorealistic, no text, no logos.",
  microwave:
    "Editorial photograph of a microwave oven with its outer casing removed, placed on a repair workbench, revealing the internal components and wiring. A multimeter with probes rests nearby, screen lit. Warm directional studio lighting, deep petrol-blue and metal tones, one amber-yellow accent, photorealistic, shallow depth of field, no text, no logos, no visible face.",
  computer:
    "Editorial photograph of an open desktop computer case on a workbench, internal components and cables visible, a technician's hands working with an anti-static wrist strap and a small screwdriver near the motherboard. Focused studio lighting, deep petrol-blue and graphite palette with one amber-yellow accent, photorealistic, shallow depth of field, no text, no logos, no visible face.",
  plug: "Macro editorial photograph of an electronic power supply unit opened for repair, showing capacitors, transformer and wiring, with a multimeter probe touching a component and displaying a reading. Precise studio lighting, deep petrol-blue and metal tones, one amber-yellow accent, photorealistic, shallow depth of field, no text, no logos.",
  search:
    "Editorial photograph of a technician's workbench holding several different small electronic devices and modules awaiting evaluation, organized neatly with labeled tags, tools and a multimeter nearby. Neutral studio lighting, deep petrol-blue and graphite tones with one amber-yellow accent, photorealistic, shallow depth of field, no text, no logos, no visible face.",
};

/** Thin atmospheric ticker — a breathing transition between Services and the recovery pitch. */
export function ProblemTicker() {
  const items = [...symptoms.map((s) => s.title), 'Diagnóstico técnico'];
  return <Marquee items={items} />;
}

/** The strongest section: reframes "trocar" as a decision that comes after diagnosis, not before. */
export function DiagnoseCTA() {
  return (
    <section id="diagnostico" className="bg-floor py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="label-caps text-[10px] text-safetyDeep">Antes de decidir</p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-ink">
            Seu equipamento pode não estar perdido.
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-[17px] leading-relaxed text-inkSoft">
            Uma falha em um componente ou placa não significa necessariamente que você precisa
            comprar um equipamento novo. A avaliação técnica ajuda a entender o problema antes de
            tomar essa decisão.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16 grid grid-cols-[auto,1fr,auto,1fr,auto,1fr,auto] items-center gap-2 sm:gap-3">
            <ProcessNode label="Com defeito" icon={<XCircle className="h-5 w-5" strokeWidth={1.5} />} />
            <Line />
            <ProcessNode label="Diagnóstico" icon={<SearchCheck className="h-5 w-5" strokeWidth={1.5} />} />
            <Line />
            <ProcessNode label="Reparo" icon={<Wrench className="h-5 w-5" strokeWidth={1.5} />} />
            <Line />
            <ProcessNode label="Funcionando" icon={<CheckCircle2 className="h-5 w-5" strokeWidth={1.5} />} />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-10">
            <Photo
              src=""
              guide="Foto larga: composição lado a lado — o mesmo tipo de equipamento com defeito de um lado e reparado e funcionando do outro."
              aiPrompt="Editorial split composition photograph, side by side: on the left, a malfunctioning electronic device (an older flat-screen TV or small home appliance) on a repair workbench looking worn and off; on the right, the same type of device now repaired, powered on with a lit screen or indicator lights, on a clean surface. A technician's hands are visible working on the left side only. Consistent studio lighting across both halves, deep petrol-blue (#0B2B3A) and graphite tones with a subtle amber-yellow (#F4B41A) accent light on the working side, photorealistic, wide 21:9 crop, no text, no logos, no visible face."
              alt="Equipamento eletrônico antes e depois do reparo"
              aspect="landscape"
              tone="light"
              focus="center"
            />
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-16 flex justify-center">
            <WhatsAppButton label="Quero avaliar meu equipamento" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProcessNode({
  label,
  icon,
  children,
  className,
}: {
  label: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className ?? ''}`}>
      {children ?? (
        <div className="grid h-16 w-16 place-items-center border border-floorLine bg-floorDeep text-safetyDeep sm:h-20 sm:w-20">
          {icon}
        </div>
      )}
      <span className="label-caps text-center text-[9px] leading-tight text-inkSoft sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

function Line({ className }: { className?: string }) {
  return (
    <div
      className={`h-px w-full origin-left animate-draw-line bg-safety ${className ?? ''}`}
      aria-hidden="true"
    />
  );
}

/** "Como funciona" — four numbered steps, no invented timelines. */
export function HowItWorks() {
  return (
    <section id="process" className="bg-floorDeep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Como funciona" title="Do contato ao reparo, em quatro passos." tone="light" center />
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, i) => (
            <Reveal key={item.step} delay={i * 80}>
              <span className="font-display text-5xl font-bold text-floorLine">{item.step}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-inkSoft">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Differentiators — no absolute claims, no invented guarantees. */
export function Differentiators() {
  return (
    <section className="bg-floor py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Diferenciais" title="Por que avaliar com a Activa." tone="light" center />
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => {
            const Icon = DIFFERENTIATOR_ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={i * 60}>
                <Icon className="h-6 w-6 text-safetyDeep" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-inkSoft">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** DARK atmospheric section — the one deliberate moody moment, petrol background with a parallax bench photo. */
export function Authority() {
  const band = useParallax<HTMLDivElement>(0.18);

  return (
    <section id="autoridade" className="relative overflow-hidden bg-charcoal py-24 text-chalk sm:py-32">
      <div
        ref={band.ref}
        className="absolute inset-0 scale-125 opacity-40 will-change-transform"
        style={{ transform: `translate3d(0, ${band.offset}px, 0) scale(1.25)` }}
        aria-hidden="true"
      >
        <Photo
          src=""
          guide="Foto larga e atmosférica: bancada técnica completa — solda, multímetro, ferramentas, placas — sob luz dramática."
          aiPrompt="Wide atmospheric editorial photograph of a professional electronics repair workbench from a slightly elevated angle: soldering station, multimeter with probes, oscilloscope screen showing a waveform, small components in labeled trays, a circuit board mid-repair. Dramatic directional side lighting, deep petrol-blue (#0B2B3A) shadows with one amber-yellow (#F4B41A) accent light source, photorealistic, cinematic, wide 21:9 crop, no text, no logos, no people."
          alt="Bancada técnica completa de reparo eletrônico"
          aspect="landscape"
          tone="dark"
          variant="backdrop"
          sizes="100vw"
          className="!aspect-auto h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-charcoal/70" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="label-caps text-[10px] text-safety">Autoridade técnica</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.2rem)] font-bold leading-[1.1] tracking-tight text-chalk">
            Eletrônica exige diagnóstico. Não chute.
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-[17px] leading-relaxed text-mist">
            Muitos problemas eletrônicos não são resolvidos trocando peças por tentativa e erro.
            Antes de intervir em uma placa ou componente, a origem da falha precisa ser
            identificada — é isso que evita retrabalho e ajuda a decidir o melhor caminho para o
            seu equipamento.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
