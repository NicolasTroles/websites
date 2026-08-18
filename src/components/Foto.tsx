'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

type FotoProps = {
  /**
   * Caminho a partir de /public. Ex: '/fotos/hero.jpg'.
   * Enquanto estiver vazio, o componente mostra um marcador com as instruções
   * da foto — assim o layout já fica correto antes das imagens existirem.
   */
  src?: string;
  /** Texto alternativo. Obrigatório e descritivo: leitores de tela dependem dele. */
  alt: string;
  /** Instrução visível no marcador, descrevendo que foto entra aqui. */
  guia: string;
  /** Proporção da moldura. Reservar espaço evita salto de layout (CLS). */
  aspect?: 'retrato' | 'paisagem' | 'quadrado' | 'alto';
  /** Marque true apenas na foto do hero, para ela carregar primeiro. */
  priority?: boolean;
  /** Fundo onde a moldura está, para o marcador ficar legível. */
  tom?: 'escuro' | 'claro';
  /**
   * Que parte da foto preservar quando o crop cortar.
   * A moldura tem proporção fixa e a imagem é cortada para preenchê-la
   * (object-cover); isto escolhe qual metade sobra em vez de cortar centralizado.
   */
  foco?: 'centro' | 'topo' | 'esquerda' | 'direita';
  className?: string;
  sizes?: string;
};

const ASPECTOS = {
  retrato: 'aspect-[3/4]',
  paisagem: 'aspect-[16/10]',
  quadrado: 'aspect-square',
  alto: 'aspect-[2/3]',
} as const;

const POSICAO = {
  centro: 'object-center',
  topo: 'object-top',
  esquerda: 'object-left',
  direita: 'object-right',
} as const;

export function Foto({
  src,
  alt,
  guia,
  aspect = 'retrato',
  priority = false,
  tom = 'escuro',
  foco = 'centro',
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: FotoProps) {
  // Se o arquivo não existir, voltamos ao marcador em vez de deixar o ícone
  // de imagem quebrada do navegador na página.
  const [falhou, setFalhou] = useState(false);

  const claro = tom === 'claro';
  const fundo = claro ? 'bg-sandDeep' : 'bg-surface';
  const moldura = `relative overflow-hidden ${fundo} ${ASPECTOS[aspect]} ${className ?? ''}`;

  if (!src || falhou) {
    return (
      <div
        className={`${moldura} ${claro ? 'weave-light border-sandLine' : 'weave border-line'} grid place-items-center border border-dashed`}
      >
        <div className="max-w-[85%] px-5 py-6 text-center">
          <Camera
            className={`mx-auto h-7 w-7 ${claro ? 'text-cocoaSoft' : 'text-muted'}`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p
            className={`brand-caps mt-4 text-[10px] ${claro ? 'text-cocoaSoft' : 'text-muted'}`}
          >
            {falhou ? 'Arquivo não encontrado' : 'Foto aqui'}
          </p>
          <p
            className={`mt-2 text-sm leading-relaxed ${claro ? 'text-cocoa' : 'text-silver'}`}
          >
            {guia}
          </p>
          {falhou && src && (
            <code
              className={`mt-3 block break-all text-[11px] ${claro ? 'text-brassDeep' : 'text-brass'}`}
            >
              public{src}
            </code>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={moldura}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFalhou(true)}
        className={`object-cover ${POSICAO[foco]}`}
      />
    </div>
  );
}
