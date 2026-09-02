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
    // TODO: replace with the real production domain after the first deploy
    // (see skill step 5) and redeploy once it's set.
    url: 'https://activaeletronica.vercel.app',
  },
} as const;

/**
 * Symptoms a customer recognizes without needing to know what's actually
 * wrong — mirrors how people describe the problem before any diagnosis.
 */
export const symptoms = [
  { icon: 'power' as const, title: 'Não liga' },
  { icon: 'restart' as const, title: 'Desliga sozinho' },
  { icon: 'imageOff' as const, title: 'Não apresenta imagem' },
  { icon: 'thermometer' as const, title: 'Não aquece' },
  { icon: 'alert' as const, title: 'Apresenta falhas' },
  { icon: 'volume' as const, title: 'Faz barulho' },
  { icon: 'block' as const, title: 'Não responde' },
  { icon: 'stop' as const, title: 'Parou completamente' },
] as const;

/**
 * Confirmed categories of equipment the client repairs/services. "Outros
 * equipamentos eletrônicos" is deliberately open-ended — evaluated case by
 * case, never promised as "conserta qualquer coisa".
 */
export const services = [
  {
    icon: 'tv' as const,
    title: 'Televisores e eletrônicos',
    description: 'Diagnóstico e reparo de equipamentos eletrônicos.',
  },
  {
    icon: 'circuit' as const,
    title: 'Placas e componentes',
    description: 'Investigação de falhas em placas e componentes eletrônicos.',
  },
  {
    icon: 'microwave' as const,
    title: 'Micro-ondas',
    description: 'Diagnóstico e manutenção de equipamentos.',
  },
  {
    icon: 'computer' as const,
    title: 'Computadores',
    description: 'Manutenção e reparo de computadores e periféricos.',
  },
  {
    icon: 'plug' as const,
    title: 'Fontes e componentes',
    description: 'Diagnóstico e reparo relacionado a alimentação e componentes eletrônicos.',
  },
  {
    icon: 'search' as const,
    title: 'Outros equipamentos eletrônicos',
    description: 'Equipamento fora da lista? Avaliamos caso a caso antes de qualquer resposta.',
  },
] as const;

export const processSteps = [
  {
    step: '01',
    title: 'Entre em contato',
    description: 'Conte para nós qual equipamento apresentou problema.',
  },
  {
    step: '02',
    title: 'Faça o diagnóstico',
    description: 'A equipe avalia o equipamento e identifica a possível origem da falha.',
  },
  {
    step: '03',
    title: 'Receba o orçamento',
    description: 'Você recebe as informações necessárias antes da execução do reparo.',
  },
  {
    step: '04',
    title: 'Aprovou? Nós repararemos.',
    description: 'Após a aprovação, o equipamento segue para o serviço.',
  },
] as const;

export const differentiators = [
  {
    icon: 'search' as const,
    title: 'Conhecimento técnico',
    description: 'Reparos baseados em diagnóstico, não em tentativa e erro.',
  },
  {
    icon: 'pin' as const,
    title: 'Atendimento próximo',
    description: 'Uma empresa local para atender Curitiba.',
  },
  {
    icon: 'check' as const,
    title: 'Diagnóstico antes da decisão',
    description: 'Entenda o problema antes de decidir pelo reparo ou substituição.',
  },
  {
    icon: 'circuit' as const,
    title: 'Peças e componentes',
    description: 'Experiência com componentes e sistemas eletrônicos.',
  },
  {
    icon: 'eye' as const,
    title: 'Transparência',
    description: 'O cliente precisa entender o que está acontecendo com seu equipamento.',
  },
  {
    icon: 'target' as const,
    title: 'Foco em solução',
    description: 'O objetivo é encontrar a melhor solução para cada caso.',
  },
] as const;

/**
 * Placeholders only — no testimonial text is invented. Replace with real
 * Google reviews before launch; keep the same shape (name/rating/text/date).
 */
export const testimonials = [
  {
    name: 'EXEMPLO — substituir por avaliação real do Google',
    rating: 5,
    text: 'EXEMPLO — substituir por um trecho real de avaliação do Google antes de publicar.',
    date: '—',
  },
  {
    name: 'EXEMPLO — substituir por avaliação real do Google',
    rating: 5,
    text: 'EXEMPLO — substituir por um trecho real de avaliação do Google antes de publicar.',
    date: '—',
  },
  {
    name: 'EXEMPLO — substituir por avaliação real do Google',
    rating: 5,
    text: 'EXEMPLO — substituir por um trecho real de avaliação do Google antes de publicar.',
    date: '—',
  },
] as const;

export const faq = [
  {
    question: 'Vocês fazem orçamento?',
    answer:
      'Sim. Depois da avaliação do equipamento, você recebe o orçamento antes de qualquer reparo ser executado.',
  },
  {
    question: 'Preciso saber qual é o defeito antes de levar?',
    answer:
      'Não. Basta descrever os sintomas que você percebeu — não liga, desliga sozinho, faz barulho — e o diagnóstico técnico identifica a possível origem do problema.',
  },
  {
    question: 'Vocês consertam qualquer equipamento eletrônico?',
    answer:
      'Cada caso passa por uma avaliação técnica antes de qualquer resposta. Isso depende da avaliação do equipamento.',
  },
  {
    question: 'Quanto custa um reparo?',
    answer:
      'Isso depende da avaliação do equipamento e da origem do problema. O valor é sempre informado antes da execução do serviço.',
  },
  {
    question: 'Quanto tempo demora?',
    answer:
      'O prazo depende do diagnóstico e da disponibilidade de peças em cada caso — é informado junto com o orçamento.',
  },
  {
    question: 'Vocês trabalham com quais marcas?',
    answer: 'Isso depende do equipamento e é avaliado caso a caso — entre em contato para confirmar.',
  },
  {
    question: 'Onde fica a Activa?',
    answer: `${site.address.street}, ${site.address.city}/${site.address.state}.`,
  },
  {
    question: 'Posso entrar em contato pelo WhatsApp?',
    answer: 'Sim — é a forma mais rápida de falar com a equipe e enviar fotos ou vídeos do problema.',
  },
  {
    question: 'Vale a pena consertar ou comprar outro?',
    answer:
      'Na maioria dos casos, essa resposta só existe depois do diagnóstico: ele mostra a origem do problema e ajuda a decidir entre reparar ou substituir o equipamento.',
  },
  {
    question: 'Vocês fazem manutenção em computadores?',
    answer: 'Sim, manutenção e reparo de computadores e periféricos fazem parte da atuação da Activa.',
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
