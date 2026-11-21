'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Check, Copy } from 'lucide-react';

export type PhotoProps = {
  /** Path inside /public, e.g. '/fotos/farol-depois.webp'. Empty renders the placeholder. */
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
  'Mood: night garage, near-black surfaces (#05090b), a single cyan neon accent light (#6adedb), cool white highlights, high contrast, no text, no logos.';

function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(prompt);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard blocked (insecure context / permissions): the prompt is
          // still visible above for manual copy.
        }
      }}
      className="eyebrow border-line-bright text-frost hover:border-neon hover:text-neon mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-[10px] transition-colors"
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
 * the file is missing) it keeps the same box and says which photo goes there,
 * plus a ready prompt to generate one.
 */
export function Photo({
  src,
  alt,
  guide = 'Aqui vai uma foto de um trabalho da ANG',
  aiPrompt = '',
  aspect = 'aspect-[4/3]',
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
        className={`border-line-bright bg-carbon relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed text-center ${aspect} ${className}`}
      >
        <div className="max-w-[90%] px-3 py-5">
          <Camera className="text-neon mx-auto h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          <p className="eyebrow text-neon mt-3 text-[10px]">
            {failed ? 'Arquivo não encontrado' : 'Foto aqui'}
          </p>
          <p className="text-frost mt-2 text-sm leading-relaxed">{guide}</p>
          {aiPrompt && (
            <details className="mt-3 text-left">
              <summary className="eyebrow text-haze hover:text-frost min-h-11 cursor-pointer py-3 text-[10px]">
                Prompt para gerar essa imagem
              </summary>
              <p className="text-haze max-h-28 overflow-y-auto text-xs leading-relaxed">{prompt}</p>
              <CopyPromptButton prompt={prompt} />
            </details>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspect} ${className}`}>
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
