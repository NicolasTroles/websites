'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, Copy, Flower2 } from 'lucide-react';

export type PhotoProps = {
  /** Path inside /public, e.g. '/photos/hero.jpg'. Empty renders the placeholder. */
  src?: string;
  /** Descriptive alt text, in Portuguese. */
  alt: string;
  /** Placeholder notice (Portuguese): what real photo goes here. */
  guide?: string;
  /**
   * Prompt in English for an AI image generator (Midjourney, DALL-E, Nano
   * Banana…). English on purpose: it isn't site content, it's an instruction
   * for another tool, and those work best in English.
   */
  aiPrompt?: string;
  /** Tailwind aspect class. Reserving the box up front avoids layout shift. */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
};

const PALETTE_HINT =
  'Palette: warm linen #f6f1e9, deep teal #173f42, dusty rose #ead2ca, rosewood #8c3d4a, antique gold accents.';

function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="eyebrow border-ink/25 text-ink hover:bg-petal mt-3 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[10px] transition-colors"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {copied ? 'Copiado' : 'Copiar prompt'}
    </button>
  );
}

/**
 * next/image wrapper that is also its own placeholder: with no `src` (or if
 * the file is missing) it keeps the same box and shows what photo goes there,
 * plus a ready prompt to generate one.
 */
export function Photo({
  src,
  alt,
  guide = 'Aqui vai uma foto do ateliê',
  aiPrompt = '',
  aspect = 'aspect-[3/4]',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
  imgClassName = 'object-cover',
}: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const prompt = `${aiPrompt} ${PALETTE_HINT}`.trim();
    return (
      <div
        className={`border-ink/30 bg-petal relative flex flex-col items-center justify-center overflow-hidden border border-dashed text-center ${aspect} ${className}`}
      >
        <div className="max-w-[88%] px-4 py-6">
          <Flower2
            className="text-rosewood mx-auto h-7 w-7"
            strokeWidth={1.25}
            aria-hidden="true"
          />
          <p className="eyebrow text-rosewood mt-3 text-[10px]">
            {failed ? 'Arquivo não encontrado' : 'Foto aqui'}
          </p>
          <p className="text-ink mt-2 text-sm leading-relaxed">{guide}</p>
          {aiPrompt && (
            <details className="mt-3 text-left">
              <summary className="eyebrow text-ink cursor-pointer text-[10px]">
                Prompt para gerar essa imagem
              </summary>
              <p className="text-ink-soft mt-2 max-h-32 overflow-y-auto text-xs leading-relaxed">
                {prompt}
              </p>
              <CopyPromptButton prompt={prompt} />
            </details>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
        className={imgClassName}
      />
    </div>
  );
}
