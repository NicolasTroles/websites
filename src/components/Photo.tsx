'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Check, Copy } from 'lucide-react';

type PhotoProps = {
  /** Caminho a partir de /public. Ex: '/photos/hero.jpg'. */
  src?: string;
  /** Texto alternativo. Obrigatório e descritivo: leitores de tela dependem dele. */
  alt: string;
  /** Instrução visível no marcador, em português, descrevendo a foto real que entra aqui. */
  guide: string;
  /**
   * Prompt em inglês pronto para gerar essa imagem numa IA (Midjourney, DALL-E,
   * Google Nano Banana etc.) — inglês por ser o idioma que dá melhor resultado
   * nessas ferramentas, não conteúdo do site.
   */
  aiPrompt: string;
  /** Proporção da moldura. Reservar espaço evita salto de layout (CLS). */
  aspect?: 'portrait' | 'landscape' | 'square' | 'tall';
  /** Marque true apenas na foto do hero, para ela carregar primeiro. */
  priority?: boolean;
  /** Fundo onde a moldura está, para o marcador ficar legível. */
  tone?: 'dark' | 'light';
  /** Que parte da foto preservar quando o crop cortar (object-cover). */
  focus?: 'center' | 'top' | 'left' | 'right';
  /**
   * 'frame' (padrão) é um cartão autônomo, com o aviso centralizado.
   * 'backdrop' é para foto de fundo atrás de outro conteúdo (hero, faixas
   * parallax) — o aviso vira um selo discreto no canto, para não brigar com
   * o texto que fica por cima.
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
      className={`brand-caps mt-3 inline-flex min-h-9 items-center gap-1.5 px-3 text-[11px] ${
        light
          ? 'border border-wheatLine text-copperDeep hover:bg-wheatDeep'
          : 'border border-caskLine text-amber hover:bg-cask'
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
  // Se o arquivo não existir, voltamos ao marcador em vez do ícone de imagem
  // quebrada do navegador.
  const [failed, setFailed] = useState(false);

  const light = tone === 'light';
  const background = light ? 'bg-wheatDeep' : 'bg-cask';
  const frame = `relative overflow-hidden ${background} ${ASPECTS[aspect]} ${className ?? ''}`;

  if (!src || failed) {
    if (variant === 'backdrop') {
      return (
        <div className={`${frame} ${light ? 'grain-light' : 'grain'}`}>
          <div
            className={`absolute bottom-5 right-5 max-w-[min(20rem,80%)] rounded-md border px-4 py-3 text-left backdrop-blur-sm ${
              light
                ? 'border-wheatLine bg-wheat/85 text-copperDeep'
                : 'border-caskLine bg-stout/75 text-barley'
            }`}
          >
            <p className="brand-caps flex items-center gap-2 text-[10px]">
              <Camera className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              {failed ? 'Arquivo não encontrado' : 'Foto aqui'}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed">{guide}</p>
            <details className="mt-2">
              <summary
                className={`brand-caps cursor-pointer text-[10px] ${light ? 'text-copperDeep' : 'text-amber'}`}
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
        className={`${frame} ${light ? 'grain-light border-wheatLine' : 'grain border-caskLine'} flex flex-col items-center justify-center border border-dashed`}
      >
        <div className="max-w-[88%] px-5 py-6 text-center">
          <Camera
            className={`mx-auto h-7 w-7 ${light ? 'text-copperDeep' : 'text-barley'}`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className={`brand-caps mt-4 text-[10px] ${light ? 'text-copperDeep' : 'text-barley'}`}>
            {failed ? 'Arquivo não encontrado' : 'Foto aqui'}
          </p>
          <p className={`mt-2 text-sm leading-relaxed ${light ? 'text-copperDeep' : 'text-foam'}`}>
            {guide}
          </p>
          {failed && src && (
            <code
              className={`mt-3 block break-all text-[11px] ${light ? 'text-copperDeep' : 'text-amber'}`}
            >
              public{src}
            </code>
          )}

          <details className="mt-4 text-left">
            <summary
              className={`brand-caps cursor-pointer text-[11px] ${light ? 'text-copperDeep' : 'text-amber'}`}
            >
              Prompt para gerar essa imagem
            </summary>
            <p
              className={`mt-2 max-h-40 overflow-y-auto text-[11px] leading-relaxed ${light ? 'text-copperDeep/80' : 'text-barley'}`}
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
