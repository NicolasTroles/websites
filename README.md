# ANG Estética Automotiva

Site institucional one-page da **ANG Estética Automotiva** — lavagem, detalhamento,
higienização, vitrificação e restauração de faróis.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · React 19 · ogl (WebGL).

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start
```

## Onde mexer

| O quê                                                     | Onde                                                    |
| --------------------------------------------------------- | ------------------------------------------------------- |
| Endereço, telefone, horário, avaliações, serviços, textos | `src/config/site.config.ts`                             |
| Paleta e tipografia                                       | `src/app/globals.css` (`@theme`) + `src/app/layout.tsx` |
| Seções da home e a ordem delas                            | `src/app/page.tsx`                                      |
| Cena WebGL do "Processo" (luz de inspeção)                | `src/lib/paintScene.ts` + `src/components/Scene.tsx`    |
| Logo original do cliente                                  | `design/logo-original.png` → `public/brand/`            |

**`site.config.ts` é a única fonte de verdade.** O mesmo objeto alimenta a página, o
JSON-LD, o sitemap e o `llms.txt`.

## Antes de publicar

Campos marcados com `// TODO: confirm with client` no `site.config.ts`:

- [ ] **Cidade**: o Instagram diz "Itapoá SC", o Google diz Curitiba (Jardim das Américas). O site segue o Google.
- [ ] O número (41) 98837-7961 é também o WhatsApp?
- [ ] Horário completo da semana (o Google só mostrou "abre sáb. às 08:30").
- [ ] Descrição e itens de cada serviço; se o "detalhamento" inclui polimento/correção de pintura.
- [ ] `seo.url`: domínio definitivo.
- [ ] Depoimentos: trocar os três "EXEMPLO" por avaliações reais do Google (com autorização).
- [ ] Fotos de antes/depois e da vitrificação: cada espaço vazio mostra o que vai ali e um prompt de IA para gerar provisoriamente.

## Imagens

Para trocar um placeholder, coloque o arquivo em `public/fotos/` e preencha o `src`
correspondente em `results` (`site.config.ts`), ou no `Photo` da vitrificação em
`src/components/Sections.tsx`. O espaço já está dimensionado, então o layout não pula.
