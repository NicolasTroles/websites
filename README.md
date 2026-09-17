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

- [ ] `phone`, `phoneLink`, `whatsapp` — telefone real
- [ ] `email`
- [ ] `city`, `state`, `areaServed`
- [ ] `openingHours`
- [ ] `socialLinks.linkedin` / `.instagram` (deixar vazio esconde o link)
- [ ] `seo.url` — domínio real, depois do primeiro deploy
- [ ] `owner.education` — confirmar instituição e redação
- [ ] Fotos: `public/valder.jpg` e `public/documentacao.jpg` (ver `PROMPTS-IMAGENS.md`)
- [ ] Logo oficial em `public/logo.png` (hoje o monograma é SVG em `Brand.tsx`)

## Analytics

Desligado por padrão. Para ligar, defina `NEXT_PUBLIC_GA_ID` na Vercel (e em
`.env.local` para rodar local). Sem a variável, nenhuma tag é injetada.

## O formulário de contato

Não tem backend, e isso é intencional: os campos são compostos em uma mensagem de
WhatsApp no próprio navegador, com o assunto selecionado já na primeira linha. Nada
é armazenado — a página de privacidade diz exatamente isso.

## Rotas geradas

`/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/icon.svg` e `/opengraph-image` são todos
gerados a partir do `site.config.ts`. Não crie versões estáticas em `public/` — um
`public/robots.txt`, por exemplo, ganharia do route handler e o deixaria como código
morto.
