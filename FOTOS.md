# Guia de fotos

O site usa fotos importadas de [alfaiatariafigueiredo.guiapinhais.com.br](https://alfaiatariafigueiredo.guiapinhais.com.br/)
como exemplo, para o layout não ficar vazio enquanto não há um ensaio próprio.
Estão marcadas como "site de origem" na tabela abaixo — **troque por fotos
reais da loja assim que possível**, o crop e o layout continuam os mesmos.

| # | Arquivo | Onde aparece | Proporção | Origem |
|---|---------|--------------|-----------|--------|
| 1 | `hero.jpg` ✅ | Hero, tela cheia | Larga, 16:10+ | Foto de banco de imagens (mantida por pedido — não é foto real da loja) |
| 2 | `oficio-1.jpg` ✅ | Seção "O ofício" — fundo claro | Vertical 2:3 | Site de origem: tirada de medidas |
| 3 | `oficio-2.jpg` ✅ | Seção "O ofício" — fundo claro | Vertical 2:3 | Site de origem: interior da loja |
| 4 | `galeria-destaque.jpg` ✅ | Galeria, ocupa 2 linhas | Vertical 2:3 | Site de origem: blazers em manequim |
| 5 | `galeria-jaqueta.jpg` ✅ | Galeria | Quadrada | Site de origem: jaquetas personalizadas |
| 6 | `galeria-medidas.jpg` ✅ | Galeria | Quadrada | Site de origem: detalhe da tirada de medidas |
| 7 | `galeria-uniformes.jpg` ✅ | Galeria | Larga 16:10 | Site de origem: uniformes em lote |
| 8 | `galeria-social.jpg` ✅ | Galeria | Larga 16:10 | Site de origem: trajes sociais |
| 9 | `faixa-loja.jpg` ✅ | Faixa parallax | Larga, 16:9+ | Site de origem: interior da loja |

## Logo e favicon

- `public/logo-figueiredo.png` — logo real da Figueiredo (PNG com fundo
  transparente, texto claro). Só funciona sobre fundo escuro — por isso
  está no header e no rodapé, que são sempre `bg-ink`.
- `src/app/icon.png` — ícone "AF" da Figueiredo, usado pelo Next.js como
  favicon automaticamente (convenção de arquivo do App Router).

### A extensão importa

O código pede `.jpg` nos slots de galeria/ofício. Se salvar um `.png` ou
`.heic`, o slot mostra "arquivo não encontrado" mesmo com a foto na pasta
certa. Converta:

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

### Apareceu um retângulo azul ou cinza liso?

É **cache de imagem do Next**, não a sua foto. Acontece quando o arquivo é
trocado ou removido depois de já ter sido otimizado uma vez. Resolve com:

```bash
rm -rf .next/cache/images
```

Depois recarregue o navegador com Cmd+Shift+R.

## Como trocar uma foto

Em `src/components/Hero.tsx` e `src/components/Secoes.tsx`, procure o
comentário `// FOTO N` correspondente e troque o `src`:

```tsx
<Foto
  src="/fotos/nome-do-arquivo.jpg"
  guia="..."
  alt="..."
/>
```

## Fundo de cada seção

A página alterna claro e escuro. Isso importa na hora de escolher a foto:

```
HERO        escuro   -> foto precisa de área escura à esquerda
O OFÍCIO    claro    -> fotos 2 e 3, luminosas
SERVIÇOS    claro
GALERIA     escuro   -> fotos 4-8, o escuro faz o tecido saltar
faixa       escuro   -> foto 9, atmosférica
PROCESSO    claro
DEPOIMENTOS claro
CONTATO     claro    -> mapa em tom sépia suave
RODAPÉ      escuro
```

## Antes de subir fotos próprias da Figueiredo

- **Resolução**: mínimo 1600px no lado maior. O Next converte para AVIF/WebP sozinho.
- **Peso**: comprima antes (squoosh.app). Alvo: menos de 400 KB por foto.
- **Direitos**: as fotos atuais vêm do site oficial da Figueiredo — ok como
  exemplo interno, mas confirme com a loja antes de publicar publicamente.
- **Pessoas**: peça autorização para publicar imagem de clientes.

## Pendências de conteúdo

1. **Depoimentos** — `src/config/site.config.ts` está com textos de EXEMPLO.
   Copie as avaliações reais do Google Maps antes de publicar.
2. **Horário de funcionamento** — não estava publicado no site de origem.
   Confirmar com a Figueiredo (`site.horarios` em `site.config.ts`).
3. **Instagram / Facebook** — preencher em `site.redes`. Vazio não renderiza.
4. **Domínio** — atualizar `site.seo.url` depois do deploy.
5. **Fotos próprias** — todas as fotos de trabalho vieram do site de origem;
   trocar por um ensaio da loja assim que possível (ver tabela acima).
