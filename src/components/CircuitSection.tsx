'use client';

import { useEffect, useRef } from 'react';
import { CircuitScene } from './CircuitScene';

/**
 * Pins a full-viewport WebGL circuit board for the height of this section
 * (260vh) and drives its "connecting" animation from how far the user has
 * scrolled through that range — not the whole page. Progress lives in a ref,
 * not React state, so scrolling never triggers a re-render; only the
 * uniforms inside CircuitScene's render loop change.
 */
export function CircuitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      progressRef.current = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 1;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '260vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-charcoal">
        <CircuitScene progressRef={progressRef} />
        <div className="relative z-10 mx-auto flex h-full max-w-2xl items-center justify-center px-5 text-center sm:px-8">
         
          {/* Plain rectangle, partial opacity — no mask, no border. */}
          <div className="bg-charcoal/85 px-7 py-10 backdrop-blur-md sm:px-14 sm:py-14">
            <p className="label-caps text-[11px] text-safety">Diagnóstico em tempo real</p>
            <h2 className="mt-4 font-display text-[clamp(1.4rem,3.4vw,2.2rem)] font-bold leading-[1.25] text-chalk">
              Eletrônica exige diagnóstico. Venha fazer um orçamento.
            </h2>
            <p className="mx-auto mt-5 max-w-sm text-[14px] leading-relaxed text-mist">
              Antes de trocar qualquer peça, a Activa testa o circuito até encontrar a origem
              real da falha, é isso que evita retrabalho e ajuda a decidir entre reparar ou
              substituir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
