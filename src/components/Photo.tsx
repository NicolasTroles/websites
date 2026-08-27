'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Camera, Check, Copy } from 'lucide-react';

type PhotoProps = {
  /**
   * Path under /public, e.g. '/images/hero.jpg'. While empty, the component
   * renders `illustration` (if given) or a placeholder with instructions —
   * the layout is already correct before real photos exist.
   */
  src?: string;
  /**
   * Vector stand-in for a real photo, filling the same frame. Takes over the
   * empty-`src` case instead of the "foto aqui" placeholder — used until the
   * client sends real photography.
   */
  illustration?: ReactNode;
  /** Alt text. Required and descriptive: screen readers depend on it. */
  alt: string;
  /** Visible placeholder caption, in Portuguese, describing what photo goes here. */
  guide: string;
  /**
   * Ready-to-use prompt for an AI image generator (Midjourney, DALL-E, etc.),
   * in English — that's the language these tools respond best to. Shown in a
   * dismissible tooltip on the placeholder, with a copy button, so it's never
   * mistaken for content that ships on the live site.
   */
  aiPrompt?: string;
  /** Frame ratio. Reserving it avoids layout shift (CLS) once the photo loads. */
  aspect?: 'portrait' | 'landscape' | 'square' | 'tall';
  /** Set true only on the hero photo, so it loads first. */
  priority?: boolean;
  /** Background the frame sits on, so the placeholder stays legible. */
  tone?: 'dark' | 'light';
  /**
   * Which part of the photo to preserve when the crop cuts in.
   * The frame has a fixed ratio and the image fills it (object-cover); this
   * picks which half survives instead of always cropping to center.
   */
  focus?: 'center' | 'top' | 'left' | 'right';
  className?: string;
  sizes?: string;
};

const ASPECT_CLASSES = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[16/10]',
  square: 'aspect-square',
  tall: 'aspect-[2/3]',
} as const;

const FOCUS_CLASSES = {
  center: 'object-center',
  top: 'object-top',
  left: 'object-left',
  right: 'object-right',
} as const;

function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the prompt is still selectable as text.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="border-current/30 hover:border-current/60 mt-3 inline-flex min-h-8 items-center gap-1.5 border px-3 text-[11px] uppercase tracking-wide2 transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
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
  illustration,
  aspect = 'portrait',
  priority = false,
  tone = 'dark',
  focus = 'center',
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: PhotoProps) {
  // If the file is missing, fall back to the placeholder instead of leaving
  // the browser's broken-image icon on the page.
  const [failed, setFailed] = useState(false);

  const isLight = tone === 'light';
  const background = isLight ? 'bg-stoneDeep' : 'bg-surface';
  const frame = `relative overflow-hidden ${background} ${ASPECT_CLASSES[aspect]} ${className ?? ''}`;
  const showPlaceholder = !src || failed;

  // Always visible (not tucked behind a click) so the prompt is never
  // mistaken for optional/debug info while a real photo is still pending.
  const promptPanel = showPlaceholder && aiPrompt && (
    <div
      className={`mt-3 border p-4 text-left text-[12px] leading-relaxed ${isLight ? 'border-stoneLine bg-stone text-graphite' : 'border-line bg-ink text-silver'}`}
    >
      <p
        className={`text-[10px] uppercase tracking-wide2 ${isLight ? 'text-graphiteSoft' : 'text-muted'}`}
      >
        Prompt para gerar esta imagem
      </p>
      <p className="mt-2 font-mono">{aiPrompt}</p>
      <CopyPromptButton prompt={aiPrompt} />
    </div>
  );

  if (showPlaceholder && illustration) {
    return (
      <div>
        <div
          className={`${frame} ${isLight ? 'grid-texture-light' : 'grid-texture'}`}
          role="img"
          aria-label={alt}
        >
          {illustration}
        </div>
        {promptPanel}
      </div>
    );
  }

  if (showPlaceholder) {
    return (
      <div>
        <div
          className={`${frame} ${isLight ? 'grid-texture-light border-stoneLine' : 'grid-texture border-line'} grid place-items-center border border-dashed`}
        >
          <div className="max-w-[85%] px-5 py-6 text-center">
            <Camera
              className={`mx-auto h-7 w-7 ${isLight ? 'text-graphiteSoft' : 'text-muted'}`}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p
              className={`mt-4 text-[10px] uppercase tracking-wide2 ${isLight ? 'text-graphiteSoft' : 'text-muted'}`}
            >
              {failed ? 'Arquivo não encontrado' : 'Foto aqui'}
            </p>
            <p
              className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-graphite' : 'text-silver'}`}
            >
              {guide}
            </p>
            {failed && src && (
              <code
                className={`mt-3 block break-all text-[11px] ${isLight ? 'text-clayDeep' : 'text-clay'}`}
              >
                public{src}
              </code>
            )}
          </div>
        </div>
        {promptPanel}
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
        className={`object-cover ${FOCUS_CLASSES[focus]}`}
      />
    </div>
  );
}
