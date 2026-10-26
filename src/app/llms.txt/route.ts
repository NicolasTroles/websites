import {
  addressLine,
  bouquetOffer,
  faq,
  otherServices,
  site,
  whatsappUrl,
} from '@/config/site.config';

const { url } = site.seo;

export function GET() {
  const body = [
    `# ${site.brandFull}`,
    '',
    `> ${site.seo.description}`,
    '',
    `Área de atuação: ${site.areaServed}.`,
    `Endereço: ${addressLine}.`,
    `Horário: ${site.openingHours}.`,
    `Contato: [${site.phone} (WhatsApp)](${whatsappUrl})`,
    '',
    '## Serviços',
    '',
    `- [${bouquetOffer.title}](${url}/#investimento): ${bouquetOffer.price}, pronto em ${bouquetOffer.deadline}. ${bouquetOffer.includes.join('; ')}.`,
    ...otherServices.map((s) => `- [${s.title}](${url}/#investimento): ${s.detail}.`),
    '',
    '## Páginas',
    '',
    `- [Página inicial](${url}/): apresentação do ateliê e da preservação de buquês.`,
    `- [Processo](${url}/#processo): as cinco etapas, do buquê fresco ao quadro pronto.`,
    `- [Quadros](${url}/#quadros): buquês de clientes já preservados e emoldurados.`,
    `- [Molduras](${url}/#molduras): tipos de moldura e personalizações.`,
    `- [Dúvidas](${url}/#duvidas): ${faq.map((f) => f.question).join(' ')}`,
    `- [Contato](${url}/#contato): endereço, horário, telefone e WhatsApp.`,
    '',
    '## Opcional',
    '',
    `- [Blog do ateliê](${site.socialLinks.blog}): todos os trabalhos publicados.`,
    `- [Sitemap](${url}/sitemap.xml): páginas indexáveis do site.`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
