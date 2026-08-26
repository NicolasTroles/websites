'use client';

import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll-driven parallax via rAF.
 *
 * Only writes to `transform` (never top/height), so the browser resolves
 * everything on the GPU without triggering layout. Returns 0 when the user
 * asked for reduced motion, which freezes the element in its neutral position.
 *
 * @param speed fraction of scroll applied to the offset. 0.15 is subtle, 0.4 is strong.
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
      // Distance from the element's center to the viewport's center.
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(fromCenter * speed * -1);
    };

    const onScroll = () => {
      // One frame scheduled at a time: scroll events fire faster than 60fps.
      if (!visible || frame) return;
      frame = requestAnimationFrame(update);
    };

    // Only listen to scroll while the element is near the viewport.
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
 * Reveals the element while it's in the viewport, and retreats again once it
 * scrolls back out — either direction. That two-way motion (not a one-shot
 * fire-and-disconnect) is what makes the page feel alive on the way back up,
 * not just on first scroll-in.
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

    const observer = new IntersectionObserver(([entry]) => setShown(entry.isIntersecting), {
      threshold,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, shown };
}

/**
 * Scroll progress of one element, 0 to 1: 0 while its top is still at the
 * bottom edge of the viewport, 1 once its bottom has scrolled past the top.
 * Drives scroll-linked drawing (e.g. an SVG chart line that extends as the
 * section scrolls by, and retracts again scrolling back up) instead of a
 * fire-once animation.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setProgress(1);
      return;
    }

    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
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
      { rootMargin: '200px 0px' },
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
  }, []);

  return { ref, progress };
}
