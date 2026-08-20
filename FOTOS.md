# Guia de fotos

Todos os slots já estão preenchidos com fotos temporárias de banco de imagens
(Pexels, licença gratuita para uso comercial, sem exigência de atribuição) —
só para o layout não ficar vazio. **Troque pelas fotos reais da loja assim
que possível**, salvando o arquivo com o mesmo nome em `public/fotos/`.

| #   | Arquivo                  | Onde aparece            | Proporção    |
| --- | ------------------------ | ----------------------- | ------------ |
| 1   | `hero.jpg`               | Hero, coluna da foto    | Vertical 2:3 |
| 2   | `loja-1.jpg`             | Seção "A loja"          | Vertical 2:3 |
| 3   | `loja-2.jpg`             | Seção "A loja"          | Vertical 2:3 |
| 4   | `galeria-destaque.jpg`   | Galeria, ocupa 2 linhas | Vertical 2:3 |
| 5   | `galeria-cores.jpg`      | Galeria                 | Quadrada     |
| 6   | `galeria-mistura.jpg`    | Galeria                 | Quadrada     |
| 7   | `galeria-prateleira.jpg` | Galeria                 | Larga 16:10  |
| 8   | `galeria-balcao.jpg`     | Galeria                 | Larga 16:10  |

## Logo

O header e o rodapé usam um wordmark em SVG próprio (`src/components/Brand.tsx`,
componente `Wordmark`) — uma gota de tinta + o nome "Marciel Tintas" — porque
ainda não há um arquivo de logo da loja. Se a Marciel tiver uma logo oficial,
troque `<Wordmark />` por `<Image src="/logo-marciel.png" ... />` nos dois
componentes (`Header.tsx` e `Footer.tsx`).

### A extensão importa

O código pede `.jpg` em todos os slots. Se salvar um `.png` ou `.heic`, o
slot mostra "arquivo não encontrado" mesmo com a foto na pasta certa. Converta:

```bash
sips -s format jpeg -s formatOptions 82 foto.png --out nome.jpg
```

### Como o crop funciona

As molduras têm proporção fixa e a foto é cortada para preencher
(`object-cover`). A prop `foco` escolhe **qual parte preservar**:

```tsx
<Foto foco="esquerda" ... />   // mantém a metade esquerda
```

Valores: `centro` (padrão), `topo`, `esquerda`, `direita`.

### Apareceu um retângulo cinza liso?

É **cache de imagem do Next**, não a sua foto. Acontece quando o arquivo é
trocado ou removido depois de já ter sido otimizado uma vez. Resolve com:

```bash
rm -rf .next/cache/images
```

Depois recarregue o navegador com Cmd+Shift+R.

## Como trocar uma foto

Em `src/components/Hero.tsx` e `src/components/Secoes.tsx`, procure o
comentário `// FOTO N` correspondente e troque o `src` e o `alt` (o `alt`
deve descrever a foto real, não a de banco de imagens):

```tsx
<Foto src="/fotos/nome-do-arquivo.jpg" alt="..." guia="..." />
```

## Antes de publicar

- **Resolução**: mínimo 1600px no lado maior. O Next converte para AVIF/WebP
  sozinho.
- **Peso**: comprima antes (squoosh.app). Alvo: menos de 400 KB por foto.
- **Pessoas**: peça autorização para publicar imagem de clientes ou da equipe.

## Pendências de conteúdo

Endereço, telefone e horário já foram confirmados na ficha do Google Maps
("Marciel Tintas em Campo Largo") e estão em `src/config/site.config.ts`.
Ainda falta:

1. **Fotos reais da loja** — os 8 slots estão com placeholders de banco de
   imagens (ver tabela acima); trocar assim que houver fotos da Marciel.
2. **Marcas de tinta revendidas** (Suvinil, Coral, Sherwin-Williams etc.) —
   ajustar a descrição dos produtos em `servicos` se fizer sentido citar
   marcas específicas.
3. **Instagram / Facebook** — preencher em `site.redes`. Vazio não renderiza.
4. **Domínio** — atualizar `site.seo.url` depois do deploy.
