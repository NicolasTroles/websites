'use client';

import { useRef, useState, type ReactNode } from 'react';

/**
 * Wraps a single interactive child (typically the primary CTA) and nudges it
 * a few pixels toward the cursor on hover, snapping back on leave. A small,
 * deliberate flourish — used once, not on every button on the page.
 * No-op on touch devices: they never fire mousemove in a way that triggers this.
 */
export function Magnetic({ children, strength = 14 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
        setOffset({ x, y });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="inline-block transition-transform duration-200 ease-smooth will-change-transform"
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
    >
      {children}
    </div>
  );
}
