'use client';

import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Parallax preso ao scroll via rAF.
 *
 * Só escreve em `transform` (nunca top/height), então o navegador resolve tudo
 * na GPU sem recalcular layout. Retorna 0 quando o usuário pediu menos
 * movimento, o que congela o elemento na posição neutra.
 *
 * @param speed fração do scroll aplicada ao deslocamento. 0.15 é sutil, 0.4 é forte.
 */
export function useParallax<T extends HTMLElement>(speed = 0.2) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // Distância do centro do elemento ao centro da viewport.
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(fromCenter * speed * -1);
    };

    const onScroll = () => {
      // Um frame agendado por vez: eventos de scroll disparam mais rápido que 60fps.
      if (!visible || frame) return;
      frame = requestAnimationFrame(update);
    };

    // Só ouvimos o scroll enquanto o elemento está por perto da tela.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) update();
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(el);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return { ref, offset };
}

/**
 * Revela o elemento quando ele entra na viewport.
 * Dispara uma vez só: reanimar a cada scroll incomoda mais do que encanta.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, shown };
}
