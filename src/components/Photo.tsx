'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Check, Copy } from 'lucide-react';

export type PhotoProps = {
  /** Path from /public. E.g. '/photos/hero.jpg'. */
  src?: string;
  /** Alt text. Required and descriptive: screen readers depend on it. */
  alt: string;
  /** Visible placeholder instruction, in Portuguese, describing the real photo that goes here. */
  guide: string;
  /**
   * Ready-to-use prompt in English for an AI image generator (Midjourney,
   * DALL-E, Google Nano Banana, etc.) — English because it's the language
   * that gives the best results in these tools, not site content.
   */
  aiPrompt: string;
  /** Frame aspect ratio. Reserving space avoids layout shift (CLS). */
  aspect?: 'portrait' | 'landscape' | 'square' | 'tall';
  /** Set true only on the hero photo, so it loads first. */
  priority?: boolean;
  /** Background the frame sits on, so the placeholder stays legible. */
  tone?: 'dark' | 'light';
  /** Which part of the photo to keep when the crop cuts in (object-cover). */
  focus?: 'center' | 'top' | 'left' | 'right';
  /**
   * 'frame' (default) is a self-contained card, with the notice centered.
   * 'backdrop' is for a background photo sitting behind other content (hero,
   * parallax bands) — the notice becomes a small corner badge instead, so it
   * doesn't fight the text on top of it.
   */
  variant?: 'frame' | 'backdrop';
  className?: string;
  sizes?: string;
};

const ASPECTS = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[16/10]',
  square: 'aspect-square',
  tall: 'aspect-[2/3]',
} as const;

const POSITION = {
  center: 'object-center',
  top: 'object-top',
  left: 'object-left',
  right: 'object-right',
} as const;

function CopyPromptButton({ prompt, light }: { prompt: string; light: boolean }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`label-caps mt-3 inline-flex min-h-9 items-center gap-1.5 px-3 text-[11px] ${
        light
          ? 'border border-floorLine text-safetyDeep hover:bg-floorDeep'
          : 'border border-steelLine text-safety hover:bg-steel'
      }`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          Copiar prompt
        </>
      )}
    </button>
  );
}

export function Photo({
  src,
  alt,
  guide,
  aiPrompt,
  aspect = 'portrait',
  priority = false,
  tone = 'dark',
  focus = 'center',
  variant = 'frame',
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: PhotoProps) {
  // If the file doesn't exist yet, fall back to the placeholder instead of
  // the browser's broken-image icon.
  const [failed, setFailed] = useState(false);

  const light = tone === 'light';
  const background = light ? 'bg-floorDeep' : 'bg-steel';
  const frame = `relative overflow-hidden ${background} ${ASPECTS[aspect]} ${className ?? ''}`;

  if (!src || failed) {
    if (variant === 'backdrop') {
      return (
        <div className={`${frame} ${light ? 'concrete-light' : 'concrete'}`}>
          <div
            className={`absolute bottom-5 right-5 max-w-[min(20rem,80%)] rounded-md border px-4 py-3 text-left backdrop-blur-sm ${
              light
                ? 'border-floorLine bg-floor/85 text-safetyDeep'
                : 'border-steelLine bg-charcoal/75 text-mist'
            }`}
          >
            <p className="label-caps flex items-center gap-2 text-[10px]">
              <Camera className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              {failed ? 'Arquivo não encontrado' : 'Foto aqui'}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed">{guide}</p>
            <details className="mt-2">
              <summary
                className={`label-caps cursor-pointer text-[10px] ${light ? 'text-safetyDeep' : 'text-safety'}`}
              >
                Prompt para gerar essa imagem
              </summary>
              <p className="mt-1.5 max-h-28 overflow-y-auto text-[10px] leading-relaxed">
                {aiPrompt}
              </p>
              <CopyPromptButton prompt={aiPrompt} light={light} />
            </details>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${frame} ${light ? 'concrete-light border-floorLine' : 'concrete border-steelLine'} flex flex-col items-center justify-center border border-dashed`}
      >
        <div className="max-w-[88%] px-5 py-6 text-center">
          <Camera
            className={`mx-auto h-7 w-7 ${light ? 'text-safetyDeep' : 'text-mist'}`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className={`label-caps mt-4 text-[10px] ${light ? 'text-safetyDeep' : 'text-mist'}`}>
            {failed ? 'Arquivo não encontrado' : 'Foto aqui'}
          </p>
          <p className={`mt-2 text-sm leading-relaxed ${light ? 'text-safetyDeep' : 'text-chalk'}`}>
            {guide}
          </p>
          {failed && src && (
            <code
              className={`mt-3 block break-all text-[11px] ${light ? 'text-safetyDeep' : 'text-safety'}`}
            >
              public{src}
            </code>
          )}

          <details className="mt-4 text-left">
            <summary
              className={`label-caps cursor-pointer text-[11px] ${light ? 'text-safetyDeep' : 'text-safety'}`}
            >
              Prompt para gerar essa imagem
            </summary>
            <p
              className={`mt-2 max-h-40 overflow-y-auto text-[11px] leading-relaxed ${light ? 'text-safetyDeep/80' : 'text-mist'}`}
            >
              {aiPrompt}
            </p>
            <CopyPromptButton prompt={aiPrompt} light={light} />
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className={frame}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
        className={`object-cover ${POSITION[focus]}`}
      />
    </div>
  );
}
