'use client';

import { CircuitBoard, Laptop, Microwave, PackageSearch, Plug, Tv } from 'lucide-react';
import { services } from '@/config/site.config';
import { Photo } from './Photo';
import { Reveal } from './Reveal';

const SERVICE_ICONS = {
  tv: Tv,
  circuit: CircuitBoard,
  microwave: Microwave,
  computer: Laptop,
  plug: Plug,
  search: PackageSearch,
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
                    src={service.image}
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
