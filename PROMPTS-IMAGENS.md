# Prompts de imagem — Rodrigues Rangel Consultoria

Os prompts estão em **inglês** de propósito: é o idioma em que Midjourney, DALL·E,
Nano Banana e afins entregam o melhor resultado. Eles não são conteúdo do site.

Todos já carregam a paleta do projeto (azul-marinho `#0A1E2C`, verde `#3FA98A`,
cinza-claro `#F5F7F9`), para as imagens nascerem coerentes com o layout.

Os dois primeiros também aparecem dentro do próprio site, no lugar onde a foto vai
entrar, com botão de copiar — é só abrir a página e clicar.

---

## 1. Retrato do Valder — seção "Sobre o profissional"

Salvar em `public/valder.jpg` e preencher `src=` no `<Photo>` de `Owner()`
(`src/components/Sections.tsx`). Proporção **3:4 (retrato)**.

> Professional corporate headshot of a Brazilian man in his 40s, wearing a plain navy
> polo shirt, standing against a clean light grey studio background, soft even key light
> from the left, shallow depth of field, chest-up framing, calm confident expression,
> neutral colour grade with deep navy and muted emerald accents, photorealistic, 4:3 portrait

**Melhor ainda:** foto real do Valder, fundo neutro claro, camisa social ou polo, do peito
para cima. Uma foto de verdade vale mais que qualquer geração aqui.

---

## 2. Banda documental — entre "O que pode ser acompanhado" e "Para quem é"

Salvar em `public/documentacao.jpg` e preencher `src=` no `<Photo>` de `WorkBand()`.
Proporção **16:10 (paisagem)**.

> Wide documentary photograph of occupational safety paperwork on a light desk: an organised
> stack of folders, a printed compliance checklist with a pen resting on it, and a white hard
> hat slightly out of focus in the background. Natural window light from the left, calm neutral
> colour grade with deep navy and muted emerald accents, shallow depth of field, no faces,
> no text legible, 16:10 landscape, photorealistic

> **Atenção:** nenhum texto deve ficar legível na imagem. Documento inventado e legível num
> site de consultoria documental passa a impressão errada.

---

## 3. Alternativa para a banda documental — campo, não escritório

Se preferir puxar para a operação em vez do escritório:

> Wide documentary photograph inside an industrial facility: a safety technician in a white
> hard hat and reflective vest reviewing a clipboard beside a service contractor, shot from
> behind and to the side so no face is identifiable, clean modern plant in soft focus behind
> them, natural daylight, calm neutral colour grade with deep navy and muted emerald accents,
> 16:10 landscape, photorealistic

---

## 4. Imagem de apoio para redes sociais / apresentação

Não entra no site — serve para post, proposta comercial e assinatura de e-mail.

> Minimal corporate abstract composition: a grid of small paper sheets arranged in perfect
> rows on a deep navy background, a few sheets at the left edge still scattered and tinted
> amber while the rest are aligned and tinted muted emerald, soft top-down studio light,
> subtle depth of field, no text, no logos, 16:9, photorealistic render

Essa é a tradução literal da animação da seção "Como funciona" — serve bem como capa.

---

## 5. Favicon e imagem de compartilhamento

**Já estão prontos, não precisa gerar:**

- `src/app/icon.svg` — o monograma RR em SVG, gerado em código.
- `src/app/opengraph-image.tsx` — o card do WhatsApp/LinkedIn, montado no build a partir
  do `site.config.ts`. Se a tagline mudar, o card muda junto, sem precisar reexportar nada.

---

## Quando a logo oficial chegar

Hoje o monograma do cabeçalho é desenhado em SVG (`src/components/Brand.tsx`) como
aproximação da marca. Com o arquivo oficial em mãos:

1. Salve como `public/logo.png` (fundo transparente, pelo menos 512px de altura).
2. Em `Brand.tsx`, troque `<Monogram />` por um `next/image` apontando para o arquivo — o
   espaço já está reservado com as mesmas dimensões, o layout não mexe.
