'use client';

import type { ReactNode } from 'react';
import { useReveal } from '@/lib/useParallax';

type RevealProps = {
  children: ReactNode;
  /**
   * `wipe` uncovers the block behind a moving edge, like a document being
   * pulled out of a folder — the house reveal on this site. `up` is the quieter
   * fallback for short text, where a wipe would be fussy.
   */
  variant?: 'wipe' | 'up';
  /** Delay in ms. 70-90 per item reads as a deliberate sequence in a list. */
  delay?: number;
  className?: string;
};

export function Reveal({ children, variant = 'up', delay = 0, className }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  /*
   * Two elements, and they cannot be merged: Chrome factors clip-path into the
   * intersection rect, so an element clipped to zero height never reports as
   * intersecting — it would wait forever for the reveal it is itself blocking.
   * The observed element therefore stays unclipped and the animation runs on
   * the child.
   */
  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transitionDelay: `${delay}ms`,
          ...(variant === 'wipe'
            ? { clipPath: shown ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }
            : null),
        }}
        className={`transition-[opacity,transform,clip-path] duration-[800ms] ease-smooth ${
          shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
