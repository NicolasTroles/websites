'use client';

import { useEffect, useRef, useState } from 'react';

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll-driven parallax via rAF.
 *
 * Only writes `transform`, so the browser resolves it on the compositor
 * without triggering layout. Returns 0 when the user asked for reduced
 * motion, which freezes the element in its neutral position.
 *
 * @param speed fraction of the scroll delta applied. 0.08 is barely there,
 *              0.35 is strong. On this site the hero layers use 0.06-0.18:
 *              the effect should read as depth, not as a ride.
 */
/**
 * Document-relative top of an element, walking the offsetParent chain.
 *
 * This is deliberately NOT getBoundingClientRect(): that reports the element
 * after its own transform, so a parallax layer measuring itself reads back its
 * own output. offsetTop is a layout value, untouched by transforms, so the
 * measurement stays independent of whatever the hook last applied.
 */
function layoutTop(el: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function useParallax<T extends HTMLElement>(speed = 0.15) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const height = el.offsetHeight;
      const viewport = window.innerHeight;
      const top = layoutTop(el) - window.scrollY;
      const fromCenter = top + height / 2 - viewport / 2;

      /*
       * Clamped to the largest displacement the effect can legitimately produce
       * while the element is on screen. Without it, one measurement taken far
       * off-screen — during an anchor jump, or the scroll position a browser
       * restores on reload — would translate the layer clean out of its own
       * IntersectionObserver window, where `visible` goes false and it freezes
       * hundreds of pixels out of place, with no scroll able to recover it.
       */
      const limit = (viewport + height) * speed;
      const next = Math.max(-limit, Math.min(limit, fromCenter * speed * -1));
      setOffset(next);
    };

    const onScroll = () => {
      // One frame in flight at a time: scroll fires faster than 60fps.
      if (!visible || frame) return;
      frame = requestAnimationFrame(update);
    };

    // The margin exceeds the clamp above, so a layer can never transform itself
    // outside the window that keeps it updating.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) update();
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(el);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

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
 * Reveals the element while it is in the viewport and retreats when it leaves,
 * in either direction — so the page still animates on the way back up rather
 * than being a one-shot on first scroll.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  // No reduced-motion branch here on purpose: the global
  // prefers-reduced-motion rule in globals.css collapses the transition to
  // ~0ms, so the element still appears the moment it enters the viewport — it
  // just does not travel. Special-casing it in JS would mean writing state
  // synchronously inside the effect for no visible gain.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setShown(entry.isIntersecting), {
      threshold,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, shown };
}

/**
 * Progress of a pinned section, 0 to 1, measured over the distance the element
 * can travel under a `position: sticky` child: 0 when its top reaches the top
 * of the viewport, 1 when its bottom does.
 *
 * This is what drives the WebGL compliance field. It reports through a callback
 * instead of state on purpose — the shader reads the value every frame, and
 * re-rendering React 60 times a second to move a uniform would be pure waste.
 *
 * `onProgress` must be stable (wrap it in useCallback): it is an effect
 * dependency, so a new function identity on every render would tear down and rebuild
 * the observer on every frame.
 */
export function usePinProgress<T extends HTMLElement>(onProgress: (value: number) => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      // Freeze at the resolved end state: organised and under control.
      onProgress(1);
      return;
    }

    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) {
        onProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      onProgress(Math.min(1, Math.max(0, -rect.top / travel)));
    };

    const onScroll = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) update();
      },
      { rootMargin: '100px 0px' },
    );
    observer.observe(el);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [onProgress]);

  return ref;
}
