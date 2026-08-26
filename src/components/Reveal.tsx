'use client';

import type { ReactNode } from 'react';
import { useReveal } from '@/lib/useParallax';

type RevealProps = {
  children: ReactNode;
  /** Delay in ms. Use 60-100 per item to stagger lists. */
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-smooth ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className ?? ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
