# Guia de fotos

Coloque os arquivos em `public/fotos/` com **exatamente** estes nomes. Depois
descomente o `src` correspondente no componente indicado.

Enquanto uma foto não existir, o site mostra uma moldura tracejada no lugar
certo, com a descrição do que entra ali. O layout já está correto sem elas.

| # | Arquivo | Onde aparece | Proporção | O que fotografar |
|---|---------|--------------|-----------|------------------|
| 1 | `hero.jpg` | Hero, tela cheia | Larga, 16:10+ | Terno bem cortado em um homem, ou Carlos ajustando uma lapela. **Precisa ter área escura à esquerda** — o texto fica por cima. |
| 2 | `oficio-1.jpg` ✅ **já ativado** | Seção "O ofício" — **fundo claro** | Vertical 2:3 (cropada) | Carlos marcando o tecido com a régua, moldes ao fundo. Crop ancorado à esquerda. |
| 3 | `oficio-2.jpg` ✅ **já ativado** | Seção "O ofício" — **fundo claro** | Vertical 2:3 (cropada) | Interior do ateliê: Carlos ao lado do provador, prateleiras de tecido. |
| 4 | `galeria-destaque.jpg` | Galeria, ocupa 2 linhas | Vertical 2:3 | **A melhor foto que você tiver.** Homem de terno completo, corpo inteiro. |
| 5 | `galeria-lapela.jpg` | Galeria | Quadrada | Detalhe de lapela, botão ou casa de botão feita à mão. |
| 6 | `galeria-camisa.jpg` | Galeria | Quadrada | Camisa sob medida: colarinho e punho em destaque. |
| 7 | `galeria-casamento.jpg` | Galeria | Larga 16:10 | Terno de casamento: noivo ou padrinhos. |
| 8 | `galeria-tecidos.jpg` | Galeria | Larga 16:10 | Rolos de tecido ou cartela de amostras, luz lateral. |
| 9 | `ateliê.jpg` | Faixa parallax | Larga, 16:9+ | Interior da alfaiataria, arara de ternos, mesa de corte. Atmosférica. |

## Status

**Fotos 2 e 3 estão no ar.** ✅ Faltam 7.

### A extensão importa

O código pede `.jpg`. Se você salvar um `.png` ou `.heic`, o slot mostra
"arquivo não encontrado" mesmo com a foto na pasta certa. Converta:

```bash
sips -s format jpeg -s formatOptions 82 foto.png --out oficio-1.jpg
```

(`formatOptions 82` já comprime bem — as duas primeiras ficaram em ~90 KB,
sem precisar passar pelo squoosh.)

### Como o crop funciona

As molduras têm proporção fixa e a foto é cortada para preencher
(`object-cover`). A prop `foco` escolhe **qual parte preservar**:

```tsx
<Foto foco="esquerda" ... />   // mantém a metade esquerda
```

Valores: `centro` (padrão), `topo`, `esquerda`, `direita`.

A foto 2 usa `foco="esquerda"` porque é deitada (4:3) num slot em pé (2:3):
sem isso, o corte centralizado comeria 25% de cada lado e levaria junto os
moldes de papel. Ancorada à esquerda, sacrifica só o tecido vazio da direita.

Se ao ver a foto real o enquadramento não agradar, troque o `foco` em
`src/components/Secoes.tsx` — é uma palavra só.

### Apareceu um retângulo azul ou cinza liso?

É **cache de imagem do Next**, não a sua foto. Acontece quando o arquivo é
trocado ou removido depois de já ter sido otimizado uma vez. Resolve com:

```bash
rm -rf .next/cache/images
```

Depois recarregue o navegador com Cmd+Shift+R.

## Como ativar uma foto

Em `src/components/Hero.tsx`, `Secoes.tsx`:

```tsx
<Foto
  src="/fotos/hero.jpg"   // <- adicione esta linha
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

## Antes de subir as imagens

- **Resolução**: mínimo 1600px no lado maior. O Next converte para AVIF/WebP sozinho.
- **Peso**: comprima antes (squoosh.app). Alvo: menos de 400 KB por foto.
- **Direitos**: não use fotos do Google Imagens de terceiros. Fotografe as peças
  do Carlos ou compre em banco de imagens. Foto real converte muito mais.
- **Pessoas**: peça autorização para publicar imagem de clientes.

## Pendências de conteúdo

1. **Depoimentos** — `src/config/site.config.ts` está com textos de EXEMPLO.
   Copie as avaliações reais do Google Maps antes de publicar.
2. **Número do endereço** — a fachada mostra `58`, o diretório mostra `263`.
   Confirmar com o Carlos.
3. **Instagram / Facebook** — preencher em `site.redes`. Vazio não renderiza.
4. **Domínio** — atualizar `site.seo.url` depois do deploy.
