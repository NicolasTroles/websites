import Image from 'next/image';
import { site } from '@/config/site.config';

/**
 * The studio's own logo (teal script + green leaves), taken from their blog.
 * It is the approved artwork, so it is used as-is rather than redrawn.
 */
export function Brand({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/photos/logo-original.png"
      alt={site.brand}
      width={557}
      height={107}
      sizes="(max-width: 640px) 170px, 210px"
      className={`h-auto w-[170px] sm:w-[210px] ${className}`}
    />
  );
}

/** Small ornamental sprig, drawn in code — used as a divider. */
export function Sprig({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M2 12h44M74 12h44" />
      <path d="M60 20c0-6 0-10 0-16" />
      <path d="M60 10c-4-4-9-5-12-3 3 3 8 4 12 3ZM60 10c4-4 9-5 12-3-3 3-8 4-12 3Z" />
      <path d="M60 16c-3-3-7-3-9-2 2 2 6 3 9 2ZM60 16c3-3 7-3 9-2-2 2-6 3-9 2Z" />
      <circle cx="60" cy="3.5" r="1.5" />
    </svg>
  );
}
