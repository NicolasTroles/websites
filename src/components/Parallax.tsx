'use client';

import type { ReactNode } from 'react';
import { useParallax } from '@/lib/useParallax';

type ParallaxProps = {
  children: ReactNode;
  /** See useParallax — 0.1 subtle, 0.35 strong, negative moves the other way. */
  speed: number;
  className?: string;
  /** Hide from assistive tech — true for pure decoration (default). */
  decorative?: boolean;
};

/** A single parallax layer. Moves with transform only; static under reduced motion. */
export function Parallax({ children, speed, className = '', decorative = true }: ParallaxProps) {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div ref={ref} className={`parallax ${className}`} aria-hidden={decorative || undefined}>
      {children}
    </div>
  );
}
