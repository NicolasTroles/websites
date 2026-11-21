'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/useParallax';

function supportsWebGL() {
  try {
    const probe = document.createElement('canvas');
    const ctx = probe.getContext('webgl2') ?? probe.getContext('webgl');
    if (!ctx) return false;
    ctx.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Sticky WebGL backdrop for the process section (see lib/paintScene.ts for
 * what it draws). It is a layer, not content:
 *  - the CSS fallback below is always rendered, so the section is complete
 *    with reduced motion, without WebGL, or before the chunk arrives;
 *  - the WebGL code is fetched with import() only when the section gets
 *    close to the viewport, so it never competes with the hero (LCP);
 *  - the canvas fades in after its first frame.
 *
 * Must live inside an element marked `data-scene-track` — its scroll
 * progress drives the scene.
 */
export function Scene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const track = wrap?.closest<HTMLElement>('[data-scene-track]');
    if (!wrap || !canvas || !track) return;
    if (prefersReducedMotion() || !supportsWebGL()) return;

    let disposed = false;
    let handle: { dispose: () => void } | undefined;

    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loader.disconnect();
        import('@/lib/paintScene')
          .then(({ mountPaintScene }) => {
            if (disposed) return;
            handle = mountPaintScene(canvas, { track, onReady: () => setLive(true) });
          })
          .catch(() => {
            // Chunk failed to load: the CSS fallback simply stays.
          });
      },
      { rootMargin: '600px 0px' },
    );
    loader.observe(track);

    return () => {
      disposed = true;
      loader.disconnect();
      handle?.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Fallback: a static inspection light across dark paint. */}
      <div className="bg-night absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(100deg,transparent_38%,rgb(106_222_219/0.08)_46%,rgb(230_242_241/0.28)_49.6%,rgb(230_242_241/0.5)_50%,rgb(106_222_219/0.1)_54%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-night)_85%)]" />
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${live ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
