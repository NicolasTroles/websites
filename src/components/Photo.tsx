'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Check, Copy } from 'lucide-react';

type PhotoProps = {
  /**
   * Path under /public, e.g. '/valder.jpg'. While it is empty the component
   * renders the placeholder instead — the layout is already correct before the
   * real photography exists.
   */
  src?: string;
  /** Alt text. Required and descriptive: screen readers depend on it. */
  alt: string;
  /** Visible placeholder caption, in Portuguese, describing the photo to shoot. */
  guide: string;
  /**
   * Ready-to-paste prompt for an image generator, written in English because
   * that is what those tools respond best to. It is an instruction for another
   * tool, not site copy — which is why it breaks the Portuguese-only rule.
   */
  aiPrompt?: string;
  aspect?: 'portrait' | 'landscape' | 'square' | 'tall';
  /** Only on an above-the-fold photo. */
  priority?: boolean;
  tone?: 'dark' | 'light';
  className?: string;
  sizes?: string;
};

const ASPECT_CLASSES = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[16/10]',
  square: 'aspect-square',
  tall: 'aspect-[2/3]',
} as const;

function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context, denied permission) — the
      // prompt stays selectable as plain text.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 border border-current px-4 text-[11px] uppercase tracking-label opacity-70 transition-opacity duration-200 hover:opacity-100"
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
  tone = 'light',
  className,
  sizes = '(max-width: 768px) 100vw, 40vw',
}: PhotoProps) {
  // A missing file falls back to the placeholder rather than leaving the
  // browser's broken-image icon on a client's site.
  const [failed, setFailed] = useState(false);
  const isLight = tone === 'light';
  const showPlaceholder = !src || failed;

  const frame = `relative overflow-hidden ${ASPECT_CLASSES[aspect]} ${
    isLight ? 'bg-paperDeep' : 'bg-navySoft'
  } ${className ?? ''}`;

  if (showPlaceholder) {
    return (
      <div>
        <div
          className={`${frame} ${
            isLight ? 'grid-light border-paperLine' : 'grid-dark border-navyLine'
          } grid place-items-center border border-dashed`}
        >
          <div className="max-w-[86%] px-5 py-6 text-center">
            <Camera
              className={`mx-auto h-7 w-7 ${isLight ? 'text-inkSoft' : 'text-dim'}`}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p
              className={`mt-4 font-mono text-[10px] uppercase tracking-label ${
                isLight ? 'text-inkSoft' : 'text-dim'
              }`}
            >
              {failed ? 'Arquivo não encontrado' : 'Foto aqui'}
            </p>
            <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-ink' : 'text-slate'}`}>
              {guide}
            </p>
            {failed && src && (
              <code
                className={`mt-3 block break-all font-mono text-[11px] ${
                  isLight ? 'text-amberDeep' : 'text-amber'
                }`}
              >
                public{src}
              </code>
            )}
          </div>
        </div>
        {aiPrompt && (
          <div
            className={`mt-3 border p-4 text-left ${
              isLight ? 'border-paperLine bg-white text-ink' : 'border-navyLine bg-navy text-slate'
            }`}
          >
            <p
              className={`font-mono text-[10px] uppercase tracking-label ${
                isLight ? 'text-inkSoft' : 'text-dim'
              }`}
            >
              Prompt para gerar esta imagem
            </p>
            <p className="mt-2 font-mono text-[12px] leading-relaxed">{aiPrompt}</p>
            <CopyPromptButton prompt={aiPrompt} />
          </div>
        )}
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
        className="object-cover"
      />
    </div>
  );
}
