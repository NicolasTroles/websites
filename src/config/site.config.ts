/**
 * Single source of truth for the site. Change data here, never inside components.
 *
 * Data confirmed from two independent official sources: the Google Business
 * listing ("Barbearia Lumberjack", Curitiba) and the Instagram profile
 * (@lumberjackbarbershopp) / linktr.ee/lumberjackbarbearia_. Fields marked
 * TODO were not published in either source and must be confirmed with the
 * client before launch — never invent a name, price, or testimonial.
 */

export const site = {
  brandName: 'Lumberjack',
  brandFull: 'Barbearia Lumberjack',
  tagline: 'Seu estilo, nossa especialidade',
  city: 'Curitiba',
  state: 'PR',

  // Confirmed on Google Business and Instagram (same number in both).
  phone: '+55 41 99987-9216',
  phoneLink: '+554199879216',
  whatsapp: '5541999879216',
  whatsappMessage: 'Olá! Vim pelo site e gostaria de agendar um horário na barbearia.',

  // Confirmed on Google Business.
  address: {
    street: 'Rua Clara Polsin, 716',
    neighborhood: 'Novo Mundo',
    city: 'Curitiba',
    state: 'PR',
    zip: '81020-310',
    mapsQuery: 'Barbearia Lumberjack, Rua Clara Polsin, 716, Novo Mundo, Curitiba - PR',
  },

  // Confirmed on Google Business (matches the Instagram bio: "terça a sábado").
  openingHours: [
    { days: 'Terça a sexta', hours: '10h às 19h' },
    { days: 'Sábado', hours: '09h às 20h' },
    { days: 'Domingo e segunda', hours: 'Fechado' },
  ],

  // Confirmed on Google Business.
  rating: { value: 5.0, count: 48 },

  // Empty links are not rendered.
  socialLinks: {
    instagram: 'https://www.instagram.com/lumberjackbarbershopp/',
    facebook: '',
  },

  seo: {
    title: 'Barbearia Lumberjack | Corte, Barba e Navalha em Curitiba',
    description:
      'Barbearia Lumberjack em Curitiba (Novo Mundo). Corte masculino, degradê, barba na navalha, bigode, sobrancelha e pigmentação. 5,0 estrelas no Google. Agende pelo WhatsApp.',
    url: 'https://barbearia-lumberjack.vercel.app', // TODO: confirm final domain
  },
} as const;

/**
 * Full service menu. Categories and treatments researched against common
 * barbershop offerings in this segment (SP/PR market) — confirm with the
 * client that every item here is actually offered before publishing, since
 * only the shop name/address/phone/hours came from an official source.
 */
export const services = [
  {
    icon: 'scissors' as const,
    title: 'Corte masculino',
    description: 'Tesoura, máquina ou degradê (fade), do clássico ao mais moderno.',
  },
  {
    icon: 'razor' as const,
    title: 'Barba na navalha',
    description: 'Toalha quente, navalha e desenho fino para um acabamento de respeito.',
  },
  {
    icon: 'mustache' as const,
    title: 'Bigode',
    description: 'Aparo e modelagem para manter a régua certa entre um bigode e outro.',
  },
  {
    icon: 'eyebrow' as const,
    title: 'Sobrancelha',
    description: 'Design na navalha ou pinça, sem tirar a naturalidade do olhar.',
  },
  {
    icon: 'droplet' as const,
    title: 'Pigmentação',
    description: 'Disfarça falhas e fios brancos na barba ou no cabelo com efeito natural.',
  },
  {
    icon: 'sparkles' as const,
    title: 'Platinado e coloração',
    description: 'Descoloração e cor para quem quer um visual fora da régua.',
  },
  {
    icon: 'child' as const,
    title: 'Corte infantil',
    description: 'Atendimento com paciência extra para os clientes mais novos da casa.',
  },
  {
    icon: 'wind' as const,
    title: 'Acabamento e cera',
    description: 'Pezinho, limpeza de nuca e cera para nariz e orelha — o acabamento completo.',
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
