'use client';

import type { ReactNode } from 'react';
import { useParallax } from '@/lib/useParallax';

/** A layer that drifts at its own speed while the page scrolls. */
export function Parallax({
  speed = 0.15,
  className = '',
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useParallax<HTMLDivElement>(speed);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transform: 'translate3d(0, var(--parallax, 0px), 0)' }}
    >
      {children}
    </div>
  );
}
