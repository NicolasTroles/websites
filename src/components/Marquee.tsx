import { beers } from '@/config/site.config';
import { BeerMark, FoamEdge } from './Brand';

/**
 * Ticker horizontal contínuo com as marcas/estilos do catálogo.
 * O conteúdo é duplicado (dois blocos idênticos lado a lado) e a animação
 * desloca -50%, então o loop fecha sem salto perceptível.
 */
export function BrandMarquee() {
  const items = [...beers, ...beers];

  return (
    <div className="border-t border-caskLine bg-cask" aria-hidden="true">
      <div className="overflow-hidden py-5">
        <div className="flex w-max animate-marquee gap-12">
          {items.map((beer, i) => (
            <span
              key={`${beer.slug}-${i}`}
              className="brand-caps flex items-center gap-3 whitespace-nowrap text-sm text-barley"
            >
              <BeerMark className="h-4 w-4 text-amber" />
              {beer.name}
            </span>
          ))}
        </div>
      </div>

      {/* Espuma no rodapé do ticker: transição para o bloco claro seguinte. */}
      <FoamEdge className="block h-8 w-full text-wheat sm:h-10" />
    </div>
  );
}
