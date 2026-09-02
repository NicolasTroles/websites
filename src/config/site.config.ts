/**
 * Single source of truth for the site. Change data here, never inside components.
 *
 * Confirmed by the client directly (name, city, address, phone) — see individual
 * comments below for what still needs a TODO. Nothing about review counts, years
 * in business, warranties, certifications, authorized brands or pricing was
 * confirmed, so none of that appears anywhere in this config or the copy that
 * reads from it.
 */

export const site = {
  brandName: 'Activa',
  brandFull: 'Activa Eletrônica',
  tagline:
    'Assistência técnica especializada em eletrônicos, eletrodomésticos e informática em Curitiba.',
  city: 'Curitiba',
  state: 'PR',

  phone: '(41) 3153-4809',
  phoneLink: '554131534809',
  // TODO(client): replace with the real WhatsApp number before launch. This
  // is currently the landline above (8 digits, no 9th digit) reused as a
  // placeholder — every "Falar no WhatsApp" button on the site is broken
  // until this is a real WhatsApp-enabled number in `55DDNNNNNNNNN` format
  // (country code + area code + number, digits only, e.g. '5541999998888').
  whatsapp: '554131534809',
  whatsappMessage: 'Olá! Vim pelo site e preciso de um orçamento para o reparo do meu equipamento.',

  address: {
    street: 'Rua Coronel José Carvalho de Oliveira, 449',
    city: 'Curitiba',
    state: 'PR',
    mapsQuery: 'Activa Eletrônica, Rua Coronel José Carvalho de Oliveira, 449, Curitiba - PR',
  },

  // Confirmed rating value only — review count was not provided, so it's
  // never printed alongside the rating.
  googleRating: '4,3',

  seo: {
    title: 'Activa Eletrônica | Assistência Técnica em Curitiba',
    description:
      'Assistência técnica especializada em eletrônicos, computadores e equipamentos em Curitiba. Diagnóstico e reparo. Entre em contato com a Activa Eletrônica.',
    // Confirmed production domain — Vercel project subdomains are always
    // *.vercel.app (there's no *.vercel.com equivalent), so that's the
    // suffix used here even though it was requested as ".com".
    url: 'https://activaeletronica.vercel.app',
  },
} as const;

/**
 * Confirmed categories of equipment the client repairs/services. Cross-
 * checked against how comparable Brazilian assistências técnicas (TV +
 * micro-ondas shops) structure their own service lists — same shape, only
 * categories the client actually confirmed. "Outros equipamentos
 * eletrônicos" is deliberately open-ended — evaluated case by case, never
 * promised as "conserta qualquer coisa".
 */
// Only three real photos exist so far (public/servicos1.png, servicos2.png,
// servico4.png) — client's call to reuse them across all six cards rather
// than leave placeholders, so each appears twice, arranged so the same
// photo never lands on two cards next to each other in the grid.
export const services = [
  {
    icon: 'tv' as const,
    title: 'Televisores e eletrônicos',
    description: 'Diagnóstico e reparo de equipamentos eletrônicos.',
    image: '/servicos1.png',
  },
  {
    icon: 'circuit' as const,
    title: 'Placas e componentes',
    description: 'Investigação de falhas em placas e componentes eletrônicos.',
    image: '/servicos2.png',
  },
  {
    icon: 'microwave' as const,
    title: 'Micro-ondas',
    description: 'Diagnóstico e manutenção de equipamentos.',
    image: '/servico4.png',
  },
  {
    icon: 'computer' as const,
    title: 'Computadores',
    description: 'Manutenção e reparo de computadores e periféricos.',
    image: '/servico4.png',
  },
  {
    icon: 'plug' as const,
    title: 'Fontes e componentes',
    description: 'Diagnóstico e reparo relacionado a alimentação e componentes eletrônicos.',
    image: '/servicos1.png',
  },
  {
    icon: 'search' as const,
    title: 'Outros equipamentos eletrônicos',
    description: 'Equipamento fora da lista? Avaliamos caso a caso antes de qualquer resposta.',
    image: '/servicos2.png',
  },
] as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.mapsQuery,
)}&output=embed`;
