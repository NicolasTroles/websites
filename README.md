# Rodrigues Rangel Consultoria

Site institucional one-page para consultoria em **Segurança do Trabalho, Gestão de
Terceiros e Sistema SG3**.

Next.js (App Router) · TypeScript · Tailwind CSS · React 19.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start
```

## Onde mexer

| O quê | Onde |
| --- | --- |
| Telefone, e-mail, cidade, redes, domínio, textos das listas | `src/config/site.config.ts` |
| Paleta e tipografia | `tailwind.config.ts` + `src/app/layout.tsx` |
| Seções da home e a ordem delas | `src/app/page.tsx` |
| Animação WebGL do "Como funciona" | `src/components/ComplianceField.tsx` |
| Prompts para gerar as imagens | `PROMPTS-IMAGENS.md` |

**`site.config.ts` é a única fonte de verdade.** Nenhum dado de negócio é escrito
direto em componente — o mesmo objeto alimenta a página, o JSON-LD, o sitemap e o
`llms.txt`.

## Antes de publicar

Os campos marcados com `// TODO: confirm with client` no `site.config.ts` ainda são
placeholder e **precisam ser trocados**:

- [ ] `city`, `state`, `areaServed`
- [ ] `socialLinks.linkedin` / `.instagram` (deixar vazio esconde o link)
- [ ] `owner.education` — confirmar instituição e redação
- [x] `seo.url` — https://rodrigues-rangel.vercel.app
- [x] Logo, retrato e foto documental — ver "Imagens" abaixo

## Imagens

Os originais ficam em `design/` (fora do `public/`, portanto não são servidos) e o que
o site usa são versões WebP redimensionadas em `public/`:

| Original | Servido | Onde |
| --- | --- | --- |
| `design/logo.png` 2129x739 | `public/logo.webp` 722x200 · 23kB | header e rodapé |
| `design/valder.png` 1086x1448 | `public/valder.webp` 900x1200 · 41kB | seção "Sobre" |
| `design/banner.png` 1586x992 | `public/documentacao.webp` · 87kB | banda documental |
| `design/logo-og.png` 520x144 | — | inlinado no card de compartilhamento, em build |
| `design/monogram.png` | `src/app/icon.png` · `apple-icon.png` | favicon |

Para regerar depois de trocar um original:

```bash
magick design/logo.png  -trim +repage -resize x200 -define webp:near-lossless=60 -quality 92 public/logo.webp
magick design/valder.png -resize 900x -quality 82 public/valder.webp
magick design/banner.png -resize 1586x -quality 80 public/documentacao.webp
```

## Analytics

Desligado por padrão. Para ligar, defina `NEXT_PUBLIC_GA_ID` na Vercel (e em
`.env.local` para rodar local). Sem a variável, nenhuma tag é injetada.

## Contato

Não há formulário: por decisão do cliente, todo contato é WhatsApp. O que o formulário
fazia de útil era qualificar o lead, e isso continua — a lista `contactTopics` no
`site.config.ts` gera um botão por assunto, cada um abrindo a conversa com a mensagem
já escrita. Para mudar os textos, mexa só nessa lista.

## Rotas geradas

`/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/icon.svg` e `/opengraph-image` são todos
gerados a partir do `site.config.ts`. Não crie versões estáticas em `public/` — um
`public/robots.txt`, por exemplo, ganharia do route handler e o deixaria como código
morto.
