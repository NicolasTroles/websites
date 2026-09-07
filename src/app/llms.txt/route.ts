import { faqs, mapsUrl, services, site, whatsappUrl } from '@/config/site.config';

/**
 * llms.txt — an emerging (not yet officially adopted by any major AI
 * provider) convention for giving AI assistants/crawlers a clean, plain-text
 * summary of the site. Built from site.config.ts, the same single source of
 * truth as the rest of the site, so it can't drift out of sync.
 *
 * Format follows llmstxt.org: an H1, a blockquote summary, free prose, then
 * H2 sections whose items are markdown links (`- [name](url): notes`). The
 * link list is not decorative — crawlers and audits (Lighthouse's agent
 * accessibility check among them) treat a section with no links as a
 * malformed file, which is what a bare `Telefone: ...` line produces.
 *
 * The site is a single page, so the links point at its real section anchors
 * (#services, #faq, #contato — see page.tsx). Never link an anchor that
 * doesn't exist in the markup.
 */
export async function GET() {
  const url = site.seo.url;

  const body = `# ${site.brandFull}

> ${site.tagline}

${site.brandFull} atende ${site.city} e região, na ${site.address.street}, ${site.address.city} - ${site.address.state}. Orçamentos são feitos pelo WhatsApp, a partir de fotos do equipamento. A oficina não trabalha com computadores ou notebooks e não comercializa componentes eletrônicos avulsos — apenas diagnóstico e reparo.

## Páginas
- [Activa Eletrônica — assistência técnica em ${site.city}](${url}): página principal, com serviços, perguntas frequentes e contato.
- [Serviços](${url}/#services): equipamentos que a oficina diagnostica e repara.
- [Perguntas frequentes](${url}/#faq): o que é e o que não é atendido, e como pedir orçamento.
- [Contato](${url}/#contato): WhatsApp, telefone e localização.

## Serviços
${services.map((s) => `- [${s.title}](${url}/#services): ${s.description}`).join('\n')}

## Perguntas frequentes
${faqs.map((f) => `- [${f.question}](${url}/#faq): ${f.answer}`).join('\n')}

## Contato
- [WhatsApp ${site.phone}](${whatsappUrl}): canal principal de orçamento — envie fotos do equipamento.
- [Telefone ${site.phone}](tel:+${site.phoneLink}): atendimento por ligação.
- [Localização no Google Maps](${mapsUrl}): ${site.address.street}, ${site.address.city} - ${site.address.state}.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
