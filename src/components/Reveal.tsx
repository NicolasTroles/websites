'use client';

import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/lib/useParallax';

type RevealProps = {
  children: ReactNode;
  /** 'wipe' uncovers left to right, like a polish pass; 'up' fades and lifts. */
  variant?: 'wipe' | 'up';
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll reveal. Content is in the HTML from the first byte (SEO, no-JS);
 * only the visual state waits for the observer. Reduced motion and no-JS are
 * handled in globals.css, which shows everything immediately.
 */
export function Reveal({ children, variant = 'up', delay = 0, as, className }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.15);
  const Tag = as ?? 'div';

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      className={`${variant === 'wipe' ? 'reveal-wipe' : 'reveal-up'} ${className ?? ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
