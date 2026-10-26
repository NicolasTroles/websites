/**
 * Single source of truth for every piece of business data on the site.
 * Components never hardcode name, phone, address or prices — they read here.
 *
 * Sources (collected 2026-10-26):
 * - [blog] https://ateliercampestre.blogspot.com/ (home: address, phone, hours, prices)
 * - [flores] https://ateliercampestre.blogspot.com/p/preservacao-de-flores.html
 *   (technique, frames, extras, deadline, flowers not accepted)
 * - [label] https://ateliercampestre.blogspot.com/search/label/Flores%20e%20Buqu%C3%AA%20de%20noivas
 *   (photos and process steps posted in Mar 2025)
 */

export const site = {
  brand: 'Atelier Campestre',
  brandFull: 'Atelier Campestre — Preservação de Buquês de Noiva',
  tagline: 'Preservação de buquês de noiva em Curitiba',
  // [blog] posts are signed "Marilda e Ana Rita".
  artisans: 'Marilda e Ana Rita',

  // [blog]
  address: {
    street: 'Rua 1º de Maio, 414 — Loja 6',
    district: 'Xaxim',
    city: 'Curitiba',
    state: 'PR',
    postalCode: '81810-000',
    country: 'BR',
  },
  // [blog] "41 99984 9769" / "55 41 999849769"
  phone: '(41) 99984-9769',
  whatsapp: '5541999849769',
  whatsappMessage:
    'Olá! Vim pelo site do Atelier Campestre e gostaria de saber sobre a preservação do meu buquê.',
  // [blog] "13:00 às 18:00 — Agende horário". The blog doesn't say which weekdays.
  // TODO: confirm with client — weekdays the studio is open.
  openingHours: 'Atendimento das 13h às 18h, com horário agendado',
  areaServed: 'Curitiba e região metropolitana',

  socialLinks: {
    blog: 'https://ateliercampestre.blogspot.com/',
    // TODO: confirm with client — no Instagram/Facebook profile was found.
    instagram: '',
  },

  seo: {
    // TODO: replace with the production domain after the first Vercel deploy.
    url: 'https://ateliercampestre.vercel.app',
    title: 'Atelier Campestre | Preservação de Buquê de Noiva em Curitiba',
    description:
      'Ateliê em Curitiba que desidrata o buquê de noiva flor a flor e o remonta em 3D dentro de um quadro, com iniciais e a data do casamento.',
    keywords: [
      'preservação de buquê',
      'eternização de buquê de noiva',
      'buquê desidratado',
      'quadro de buquê',
      'buquê de noiva Curitiba',
      'desidratação de flores',
      'eternização de sapatinhos',
    ],
    locale: 'pt_BR',
    // Date of the last real content change — not the build date.
    lastModified: '2026-10-26',
  },
} as const;

/** Bouquet preservation offer. [flores] */
export const bouquetOffer = {
  title: 'Desidratação e emolduração do buquê',
  // [blog] [flores] "R$ 580,00"
  price: 'R$ 580',
  priceValue: 580,
  // [flores] "Prazo: 40 a 50 dias"
  deadline: '40 a 50 dias',
  note: 'Temos condições especiais — consulte pelo WhatsApp.',
  includes: [
    'Desmontagem do buquê e tratamento de cada flor em sílica gel',
    'Remontagem em 3D, no desenho original do buquê',
    'Moldura escolhida com você, quadrada ou retangular',
    'Iniciais e data do casamento aplicadas no fundo',
  ],
} as const;

/** The path from the wedding to the wall. [flores] + [label] (posts of 31 Mar 2025). */
export const process = [
  {
    title: 'Agende pelo WhatsApp',
    description:
      'Mande uma foto do buquê e combinamos o dia de trazê-lo ao ateliê, no Xaxim, das 13h às 18h.',
    photo: '',
  },
  {
    title: 'Flor por flor, na sílica',
    description:
      'O buquê é desmontado e cada flor é tratada separadamente em sílica gel granulada, com um produto específico para preservação.',
    photo: '/photos/detalhe-flores.jpg',
  },
  {
    title: 'A montagem em 3D',
    description:
      'Com as flores desidratadas, o buquê é remontado sobre a base no formato original — as flores continuam em volume, não prensadas.',
    photo: '/photos/etapa-1-montagem.jpg',
  },
  {
    title: 'Proteção, iniciais e data',
    description:
      'As flores recebem proteção e entram no fundo os detalhes do casal: iniciais, data, brasão em corte a laser.',
    photo: '/photos/etapa-2-iniciais.jpg',
  },
  {
    title: 'Emoldurado, pronto para a parede',
    description:
      'O quadro é fechado e fica pronto em 40 a 50 dias — é a etapa que todo mundo espera.',
    photo: '/photos/etapa-3-quadro.jpg',
  },
] as const;

/** Real work posted on the blog. Width/height are the files' real pixel sizes. [label] */
export const gallery = [
  {
    src: '/photos/quadro-stef.jpg',
    alt: 'Quadro com buquê de alstroemérias rosas e azuis, cravos e mosquitinhos, com iniciais douradas e a data do casamento',
    caption: 'Alstroemérias, cravos e iniciais em dourado',
    size: 'feature',
  },
  {
    src: '/photos/orquideas-azuis.jpg',
    alt: 'Quadro com buquê de orquídeas azuis, laço de cetim branco, monograma e topo de bolo dos noivos',
    caption: 'Orquídeas azuis com o topo do bolo',
    size: 'small',
  },
  {
    src: '/photos/quadro-dalia.jpg',
    alt: 'Quadro com buquê em tons alaranjados, em estilo campestre',
    caption: 'Tons alaranjados, cenário campestre',
    size: 'small',
  },
  {
    src: '/photos/quadro-lirios.jpg',
    alt: 'Quadro com buquê de lírios na parede da casa da cliente',
    caption: 'Lírios, já na casa da noiva',
    size: 'small',
  },
  {
    src: '/photos/quadro-danielle.jpg',
    alt: 'Quadro com buquê misto e recordações especiais do casamento',
    caption: 'Buquê misto com recordações do dia',
    size: 'small',
  },
  {
    src: '/photos/quadro-luciana.jpg',
    alt: 'Quadro com buquê de flores vermelhas, brancas e azuis',
    caption: 'Vermelho, branco e um toque de azul',
    size: 'small',
  },
  {
    src: '/photos/quadro-2310.jpg',
    alt: 'Quadro vertical com buquê de noiva preservado',
    caption: 'Momentos de felicidade, preservados',
    size: 'small',
  },
  {
    src: '/photos/quadro-simone.jpg',
    alt: 'Quadro com buquê de rosas amarelas e brancas preservadas',
    caption: 'Rosas amarelas e brancas',
    size: 'small',
  },
  {
    src: '/photos/buque-danielle.jpg',
    alt: 'Buquê misto já desidratado e remontado, antes de entrar na moldura',
    caption: 'Buquê misto, antes da moldura',
    size: 'small',
  },
] as const;

/** Frame options. [flores] */
export const frames = [
  {
    name: 'Vidro simples',
    description: 'Moldura clássica com vidro, para quem quer o buquê como protagonista.',
    style: 'glass',
  },
  {
    name: 'Fundo texturizado',
    description: 'Um fundo com relevo atrás das flores, que dá profundidade ao quadro.',
    style: 'textured',
  },
  {
    name: 'Caixa rústica',
    description: 'Moldura tipo caixa, em madeira, combinando com casamentos no campo.',
    style: 'rustic',
  },
  {
    name: 'Fechada com acrílico',
    description: 'Moldura com moldurinha interna e acrílico transparente, bem vedada.',
    style: 'acrylic',
  },
] as const;

/** Personalisation extras. [flores] */
export const extras = [
  'Nomes ou iniciais',
  'Data do casamento',
  'Brasão em corte a laser',
  'Topo de bolo em biscuit',
  'Convite ou foto do casal',
] as const;

/** Other keepsakes the studio preserves. [blog] prices; categories from the blog labels. */
export const otherServices = [
  { title: 'Sapatinhos de bebê', detail: 'A partir de R$ 180 o par · prazo de 25 dias' },
  { title: 'Roupinhas', detail: 'A partir de R$ 250, em tela com moldura' },
  { title: 'Chapéu', detail: 'A partir de R$ 230, avulso' },
  { title: 'Sapatilhas de balé', detail: 'Sob consulta' },
  { title: 'Quadro porta-maternidade', detail: 'Sob consulta' },
  { title: 'Banho de cobre e outros objetos', detail: 'Sob consulta' },
] as const;

/** Honest answers, taken from the studio's own page. [flores] */
export const faq = [
  {
    question: 'As flores ficam eternas?',
    answer:
      'Não, e preferimos ser sinceras: com o tempo as flores encolhem, mudam de cor e desbotam — é o envelhecimento natural. A desidratação e os produtos especiais desaceleram muito esse processo, e o quadro fechado protege as flores.',
  },
  {
    question: 'Quanto tempo leva?',
    answer: 'O quadro do buquê fica pronto em 40 a 50 dias.',
  },
  {
    question: 'Quais flores não podem ser preservadas?',
    answer:
      'Gérbera, girassol, dália, boca-de-leão, mini lírios, statice, angélica, alstroeméria, suculentas e sempre-vivas não têm garantia de sobrevivência no processo. Na dúvida, mande uma foto do buquê pelo WhatsApp.',
  },
  {
    question: 'E se alguma flor chegar machucada?',
    answer:
      'Flores danificadas podem ser substituídas por outras da mesma qualidade, cobradas à parte. Flores com mofo ou em decomposição não são desidratadas.',
  },
  {
    question: 'Dá para colocar a taça ou o terço no quadro?',
    answer:
      'Taças, terços e rosários não entram, porque podem ser danificados. Já topo de bolo em biscuit, convite e foto podem compor o quadro.',
  },
  {
    question: 'Vocês emolduram buquês artificiais ou de broches?',
    answer:
      'Sim. Flores naturais já preservadas, buquês de broches e flores artificiais também podem ser emoldurados.',
  },
] as const;

// No reviews were found on the blog. Keep the explicit placeholders until the
// client sends real ones (e.g. from Google).
export const testimonials = [
  {
    quote: 'EXEMPLO — substituir por avaliação real de uma noiva.',
    author: 'Nome da noiva',
    detail: 'Casamento em 2026',
  },
  {
    quote: 'EXEMPLO — substituir por avaliação real de uma noiva.',
    author: 'Nome da noiva',
    detail: 'Casamento em 2025',
  },
  {
    quote: 'EXEMPLO — substituir por avaliação real de uma noiva.',
    author: 'Nome da noiva',
    detail: 'Casamento em 2025',
  },
] as const;

export const navLinks = [
  { href: '#processo', label: 'Processo' },
  { href: '#quadros', label: 'Quadros' },
  { href: '#molduras', label: 'Molduras' },
  { href: '#investimento', label: 'Investimento' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
] as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

const fullAddress = `${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}, ${site.address.postalCode}`;

export const addressLine = fullAddress;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

/** Developer credit — not client data. */
export const developer = {
  name: 'Nicolas Troles',
  whatsapp: '5541999447746',
  message: 'Olá Nicolas! Vi o site do Atelier Campestre e gostaria de um orçamento.',
} as const;

export const developerWhatsappUrl = `https://wa.me/${developer.whatsapp}?text=${encodeURIComponent(
  developer.message,
)}`;
