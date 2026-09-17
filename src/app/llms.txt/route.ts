import { monitoredItems, process, services, site, whatsappUrl } from '@/config/site.config';

/**
 * Serves /llms.txt (llmstxt.org). The format is Markdown, not prose: an H1, a
 * blockquote summary, then `## ` sections made of `- [Name](url): description`
 * links. A file of loose paragraphs compiles fine but fails the Lighthouse
 * "agentic navigation" audit with "does not appear to contain links".
 *
 * Every anchor linked below must exist as an `id` in the rendered page.
 */
// Next 16 treats route handlers as dynamic by default. Nothing here reads the
// request, so pin it back to static: the file is generated once at build time
// like the sitemap, instead of being rendered on every crawl.
export const dynamic = 'force-static';

const { url } = site.seo;

export function GET() {
  const body = [
    `# ${site.brandFull}`,
    '',
    `> ${site.seo.description}`,
    '',
    `${site.tagline}. ${site.promise}`,
    `Atendimento: ${site.areaServed}.`,
    `Contato: [${site.phone} (WhatsApp)](${whatsappUrl}) · [${site.email}](mailto:${site.email})`,
    '',
    '## Serviços',
    '',
    ...services.map((service) => `- [${service.title}](${url}/#servicos): ${service.description}`),
    '',
    '## Como funciona o atendimento',
    '',
    ...process.map(
      (step) => `- [${step.step}. ${step.title}](${url}/#como-funciona): ${step.description}`,
    ),
    '',
    '## O que pode ser acompanhado',
    '',
    `- [Itens de acompanhamento](${url}/#acompanhamento): ${monitoredItems
      .map((item) => item.label.toLowerCase())
      .join('; ')}.`,
    '',
    '## Páginas',
    '',
    `- [Página inicial](${url}/): apresentação, serviços, SG3, etapas do atendimento e contato.`,
    `- [Sistema SG3](${url}/#sg3): apoio às empresas que utilizam o SG3 na gestão de terceiros.`,
    `- [Sobre ${site.owner}](${url}/#sobre): formação e experiência do profissional responsável.`,
    `- [Contato](${url}/#contato): telefone, e-mail, WhatsApp e formulário de solicitação.`,
    '',
    '## Opcional',
    '',
    `- [Política de privacidade](${url}/privacidade): tratamento de dados enviados pelo site.`,
    `- [Sitemap](${url}/sitemap.xml): páginas indexáveis do site.`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
