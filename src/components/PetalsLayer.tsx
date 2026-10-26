'use client';

import dynamic from 'next/dynamic';
import { PetalsFallback } from './PetalsFallback';

// three.js stays out of the critical path: the hero paints (text + photo)
// first, then this chunk loads and the canvas fades in over the fallback.
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => <PetalsFallback className="absolute inset-0" />,
});

export function PetalsLayer({ className = '' }: { className?: string }) {
  return <Scene className={className} />;
}
