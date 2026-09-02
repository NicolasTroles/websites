'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faq } from '@/config/site.config';
import { Reveal } from './Reveal';
import { SectionHeading } from './Sections';

function FAQItem({ question, answer, delay }: { question: string; answer: string; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={delay}>
      <div className="border-b border-floorLine">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left"
        >
          <span className="text-[15px] font-medium text-ink">{question}</span>
          <Plus
            className={`h-4 w-4 shrink-0 text-safetyDeep transition-transform duration-300 ease-smooth ${
              open ? 'rotate-45' : ''
            }`}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-smooth ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <p className="max-w-prose pb-6 text-[14px] leading-relaxed text-inkSoft">{answer}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="bg-floor py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" tone="light" center />
        </Reveal>

        <div className="mt-14">
          {faq.map((item, i) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} delay={i * 40} />
          ))}
        </div>
      </div>
    </section>
  );
}
