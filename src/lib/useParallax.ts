'use client';

import { useEffect, useRef, useState } from 'react';

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll-linked parallax driven by rAF.
 *
 * Writes the offset straight into a CSS custom property (`--parallax`) instead
 * of React state, so scrolling never re-renders the tree; the element moves
 * with `transform` only (GPU, no layout). With reduced motion it stays at 0.
 *
 * @param speed fraction of the distance to the viewport centre applied as
 *   offset. 0.1 is subtle, 0.35 is strong; negative values move the other way.
 */
export function useParallax<T extends HTMLElement>(speed = 0.2) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.setProperty('--parallax', `${(fromCenter * -speed).toFixed(1)}px`);
    };

    const onScroll = () => {
      // One frame at a time: scroll events fire faster than the display.
      if (!visible || frame) return;
      frame = requestAnimationFrame(update);
    };

    // Only listen while the element is near the viewport.
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

  return ref;
}

/**
 * Flips to `true` once when the element enters the viewport. Fires a single
 * time: re-animating on every pass annoys more than it delights.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
