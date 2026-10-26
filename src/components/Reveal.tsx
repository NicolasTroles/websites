'use client';

import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/lib/useParallax';

type RevealProps = {
  children: ReactNode;
  /** 'up' fades and lifts; 'arch' opens a clip-path like a window (for images). */
  variant?: 'up' | 'arch';
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll reveal. Content is in the HTML from the first byte (good for SEO and
 * no-JS); only the visual state waits for the observer. Reduced motion is
 * handled in CSS, which shows everything immediately.
 */
export function Reveal({ children, variant = 'up', delay = 0, as, className }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Tag = as ?? 'div';

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      className={`${variant === 'arch' ? 'reveal-arch' : 'reveal-up'} ${className ?? ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
