/**
 * Single source of truth for the site. Every business fact shown on the page,
 * in the JSON-LD, in the sitemap and in llms.txt comes from here — never
 * hardcode them in a component.
 *
 * Sources (collected 2026-11-20):
 *  - [G] Google Business profile "ANG ESTÉTICA AUTOMOTIVA" (screenshot sent by
 *        the developer): address, phone, rating, Saturday opening time.
 *  - [IG] instagram.com/ang_estetica_automotiva: services in the bio and in
 *        the story highlights, "send model and year" quote flow, logo.
 *
 * Known conflict: the Instagram bio says "Localizado em Itapoá SC", while the
 * Google profile places the shop in Curitiba (and the phone has a Curitiba
 * area code). The site follows Google. Confirm with the client.
 */

export const site = {
  brand: 'ANG',
  brandFull: 'ANG Estética Automotiva',
  tagline: 'Lavagem, detalhamento, higienização, vitrificação e restauração de faróis',

  // [G] — TODO: confirm with client (Instagram bio says Itapoá/SC).
  address: {
    complement: 'Cond. Sebastião de Quadros, conjunto 1',
    street: 'Av. Nossa Senhora de Lourdes, 641',
    district: 'Jardim das Américas',
    city: 'Curitiba',
    state: 'PR',
    postalCode: '81530-020',
    country: 'BR',
  },
  areaServed: 'Curitiba e região metropolitana',

  // [G]
  phone: '(41) 98837-7961',
  phoneHref: 'tel:+5541988377961',
  // TODO: confirm with client that this same number is the WhatsApp line.
  whatsapp: '5541988377961',
  // Mirrors the Instagram bio ("envie modelo e ano"): the quote needs the car.
  whatsappMessage:
    'Olá! Vim pelo site da ANG Estética Automotiva e gostaria de um orçamento.\nModelo e ano do carro: \nServiço: ',

  // [G] only showed "Abre sáb. às 08:30". The rest of the week is unknown.
  // TODO: confirm with client — full weekly schedule.
  openingHours: [
    { days: 'Sábado', hours: 'a partir das 08h30' },
    { days: 'Demais dias', hours: 'horário a confirmar — chame no WhatsApp' },
  ],

  // [G] snapshot from 2026-11-20 — update when the count changes.
  rating: { value: '5,0', count: 10 },

  socialLinks: {
    instagram: 'https://www.instagram.com/ang_estetica_automotiva/',
    instagramHandle: '@ang_estetica_automotiva',
  },

  // Google Maps place id (CID) taken from the profile link sent by the developer.
  mapsCid: '486508264797291645',

  seo: {
    // TODO: confirm with client — replace with the custom domain once there is one.
    url: 'https://ang-estetica-automotiva.vercel.app',
    // Date of the last real content change (not the build date) — see sitemap.ts.
    lastModified: '2026-11-20',
    title: 'ANG Estética Automotiva | Lavagem, vitrificação e faróis em Curitiba',
    description:
      'Estética automotiva no Jardim das Américas, em Curitiba: lavagem detalhada, higienização interna, lavagem de motor, vitrificação de pintura e restauração de faróis. Orçamento pelo WhatsApp.',
    keywords: [
      'estética automotiva Curitiba',
      'lavagem detalhada Curitiba',
      'higienização interna de carro',
      'vitrificação de pintura',
      'restauração de faróis',
      'lavagem de motor',
      'detalhamento automotivo',
      'Jardim das Américas',
    ],
    locale: 'pt_BR',
  },
} as const;

export const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Orçamento', href: '#orcamento' },
] as const;

export type Service = {
  id: string;
  title: string;
  description: string;
  points: readonly string[];
  icon: 'droplets' | 'sparkles' | 'armchair' | 'gem' | 'lightbulb' | 'cog';
};

// [IG] bio: "Lavagem | Detalhamento | Higienização | Vitrificação | Restauração
// de Faróis"; highlight "Lavagem de motor". The descriptions are ours — the
// points list what each service usually covers. TODO: confirm with client.
export const services: readonly Service[] = [
  {
    id: 'vitrificacao',
    title: 'Vitrificação de pintura',
    description:
      'Uma camada protetora sobre o verniz que deixa a pintura mais brilhante, repele água e facilita a lavagem por muito mais tempo.',
    points: ['Brilho profundo', 'Efeito repelente de água', 'Proteção contra sol e sujeira'],
    icon: 'gem',
  },
  {
    id: 'farois',
    title: 'Restauração de faróis',
    description:
      'Faróis amarelados e opacos voltam a ficar transparentes — melhora a aparência do carro e a iluminação à noite.',
    points: ['Remoção do amarelado', 'Lixamento e polimento', 'Proteção final'],
    icon: 'lightbulb',
  },
  {
    id: 'higienizacao',
    title: 'Higienização interna',
    description:
      'Limpeza profunda de bancos, carpetes, teto e painel, tirando manchas, odores e a sujeira que a aspiração não alcança.',
    points: ['Bancos de tecido e couro', 'Carpetes e teto', 'Painel e portas'],
    icon: 'armchair',
  },
  {
    id: 'detalhamento',
    title: 'Detalhamento',
    description:
      'Cuidado minucioso de cada parte do carro, por dentro e por fora, para quem quer o carro com cara de novo.',
    points: ['Frisos, rodas e borrachas', 'Acabamento de plásticos', 'Revisão sob luz de inspeção'],
    icon: 'sparkles',
  },
  {
    id: 'lavagem',
    title: 'Lavagem detalhada',
    description:
      'Lavagem técnica, com produtos próprios para cada superfície e secagem cuidadosa para não marcar a pintura.',
    points: ['Pré-lavagem', 'Rodas e caixas de roda', 'Secagem sem riscos'],
    icon: 'droplets',
  },
  {
    id: 'motor',
    title: 'Lavagem de motor',
    description:
      'Limpeza segura do cofre do motor e acabamento protetor nas peças plásticas e borrachas.',
    points: ['Desengraxe controlado', 'Proteção dos componentes', 'Acabamento renovado'],
    icon: 'cog',
  },
];

// Steps shown over the WebGL scene. Generic description of the detailing
// workflow — the scene illustrates each one as the visitor scrolls.
export const process = [
  {
    step: '01',
    title: 'Avaliação sob luz',
    description:
      'Antes de qualquer produto, o carro passa por uma inspeção com luz direcionada. É ela que revela riscos finos, manchas e o que realmente precisa ser feito.',
  },
  {
    step: '02',
    title: 'Lavagem e descontaminação',
    description:
      'A sujeira sai com produtos certos para cada superfície. Sem esponja áspera, sem pano seco arrastando poeira sobre o verniz.',
  },
  {
    step: '03',
    title: 'Correção e polimento',
    description:
      'A máquina passa camada por camada e os micro-riscos somem. O que fica é o reflexo limpo, sem aquelas marcas circulares no sol.',
  },
  {
    step: '04',
    title: 'Proteção',
    description:
      'A vitrificação sela o resultado: a água escorre em gotas, a sujeira gruda menos e o brilho dura muito mais.',
  },
] as const;

// Before/after slots. Photos come from the client — see Photo.tsx placeholders.
export const results = [
  {
    id: 'farol',
    title: 'Restauração de farol',
    before: {
      src: '',
      guide: 'Foto do farol amarelado, antes da restauração',
      aiPrompt:
        'Close-up photo of a yellowed, oxidized and hazy car headlight lens, studio lighting at night, dark garage background, realistic automotive detailing documentation',
    },
    after: {
      src: '',
      guide: 'Foto do mesmo farol, transparente, depois da restauração',
      aiPrompt:
        'Close-up photo of a crystal clear restored car headlight lens with sharp reflections, dark garage background with a cyan LED strip reflection, realistic automotive detailing photography',
    },
  },
  {
    id: 'bancos',
    title: 'Higienização de bancos',
    before: {
      src: '',
      guide: 'Foto do banco manchado, antes da higienização',
      aiPrompt:
        'Photo of a stained fabric car seat with visible dirt marks, interior of a car, natural light, realistic before-cleaning documentation',
    },
    after: {
      src: '',
      guide: 'Foto do mesmo banco limpo, depois da higienização',
      aiPrompt:
        'Photo of a spotless, freshly cleaned fabric car seat, interior of a car, soft light, realistic automotive interior detailing result',
    },
  },
  {
    id: 'motor',
    title: 'Lavagem de motor',
    before: {
      src: '',
      guide: 'Foto do cofre do motor sujo, antes da lavagem',
      aiPrompt:
        'Photo of a dusty, greasy car engine bay seen from above with the hood open, realistic before-cleaning documentation, dark background',
    },
    after: {
      src: '',
      guide: 'Foto do mesmo motor limpo, depois da lavagem',
      aiPrompt:
        'Photo of a clean, dressed car engine bay seen from above with satin black plastics, dark garage, subtle cyan rim light, realistic automotive detailing photography',
    },
  },
] as const;

// Never invent reviews. These stay as explicit placeholders until the client
// approves real Google reviews to publish here.
export const testimonials = [
  {
    name: 'Cliente',
    car: 'Modelo do carro',
    text: 'EXEMPLO — substituir por avaliação real do Google.',
  },
  {
    name: 'Cliente',
    car: 'Modelo do carro',
    text: 'EXEMPLO — substituir por avaliação real do Google.',
  },
  {
    name: 'Cliente',
    car: 'Modelo do carro',
    text: 'EXEMPLO — substituir por avaliação real do Google.',
  },
] as const;

export const fullAddress = `${site.address.street} — ${site.address.complement}, ${site.address.district}, ${site.address.city} - ${site.address.state}, ${site.address.postalCode}`;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const mapsUrl = `https://maps.google.com/?cid=${site.mapsCid}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `ANG Estética Automotiva, ${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}`,
)}&output=embed`;

/** Developer credit — not client data, kept apart on purpose. */
export const developer = {
  name: 'Nicolas Troles',
  whatsapp: '5541999447746',
  message: 'Olá Nicolas! Vi o site da ANG Estética Automotiva e gostaria de um orçamento.',
} as const;

export const developerWhatsappUrl = `https://wa.me/${developer.whatsapp}?text=${encodeURIComponent(developer.message)}`;
