import { fullAddress, navLinks, services, site, whatsappUrl } from '@/config/site.config';

const { url } = site.seo;

// Markdown, per llmstxt.org: H1, blockquote summary, then sections made of
// link lists. Every anchor below matches an `id` rendered on the page.
export function GET() {
  const body = [
    `# ${site.brandFull}`,
    '',
    `> ${site.seo.description}`,
    '',
    `Endereço: ${fullAddress}.`,
    `Área de atuação: ${site.areaServed}.`,
    `Horário: ${site.openingHours.map((h) => `${h.days}: ${h.hours}`).join('; ')}.`,
    `Contato: [${site.phone} (WhatsApp)](${whatsappUrl}) — para orçamento, envie o modelo e o ano do carro.`,
    '',
    '## Serviços',
    '',
    ...services.map((s) => `- [${s.title}](${url}/#servicos): ${s.description}`),
    '',
    '## Páginas',
    '',
    `- [Página inicial](${url}/): apresentação, serviços, processo e contato.`,
    ...navLinks.map(
      (link) =>
        `- [${link.label}](${url}/${link.href}): seção ${link.label.toLowerCase()} da página inicial.`,
    ),
    '',
    '## Opcional',
    '',
    `- [Instagram](${site.socialLinks.instagram}): trabalhos recentes, antes e depois.`,
    `- [Sitemap](${url}/sitemap.xml): páginas indexáveis do site.`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
