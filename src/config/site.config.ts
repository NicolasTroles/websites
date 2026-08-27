/**
 * Fonte única de verdade do site. Trocar dados aqui, nunca dentro dos componentes.
 *
 * Dados de contato e bio levantados do perfil @choppsaojose no Instagram
 * (372 posts, 3.683 seguidores) e de um flyer de tabela de chopes postado
 * pelo perfil. Itens marcados com TODO não puderam ser confirmados numa
 * fonte oficial (site próprio ou Google Business não localizados) e devem
 * ser checados com o cliente antes de publicar.
 */

export const site = {
  name: 'Chopp São José',
  tagline: 'Distribuidora de Chopp',
  city: 'São José dos Pinhais',
  state: 'PR',
  // TODO: confirm exact service radius with client — inferred from Instagram bio (city only).
  serviceArea: 'São José dos Pinhais e região metropolitana de Curitiba',

  /** Número do Disk Chopp, do flyer de tabela de chopes do Instagram. */
  phone: '+55 41 99618-1098',
  phoneLink: '+5541996181098',
  whatsapp: '5541996181098',
  whatsappMessage:
    'Olá! Vim pelo site da Chopp São José e queria fazer um pedido de chopp para o meu evento.',

  // TODO: confirm with client — not shown on the Instagram profile.
  openingHours: [{ days: 'Disk Chopp, todos os dias', hours: 'Mediante agendamento' }],

  socialLinks: {
    instagram: 'https://www.instagram.com/choppsaojose',
    facebook: '',
  },

  seo: {
    title: 'Chopp São José | Disk Chopp e locação de chopeira em São José dos Pinhais',
    description:
      'Distribuidora de chopp em São José dos Pinhais. Brahma, Heineken, Pilsen, Puro Malte, IPA e mais, em barris de 30 e 50 litros com chopeira inclusa. Peça pelo WhatsApp.',
    url: 'https://chopp-sao-jose.vercel.app', // TODO: update after deploy / custom domain
  },
} as const;

/**
 * Catálogo de chopes. Tamanhos e "chopeira inclusa" vêm do flyer do
 * Instagram; os próprios valores não entram no site a pedido do cliente
 * (consultar direto pelo WhatsApp).
 */
export const beers = [
  {
    slug: 'pilsen',
    name: 'Pilsen',
    tag: 'Clássico',
    description: 'Leve, refrescante e de fácil aprovação — o chopp que nunca falta em festa boa.',
  },
  {
    slug: 'puro-malte',
    name: 'Puro Malte',
    tag: 'Encorpado',
    description: 'Mais corpo e sabor de malte, para quem já bebe chopp com exigência.',
  },
  {
    slug: 'brahma',
    name: 'Brahma',
    tag: 'Tradicional',
    description: 'A marca mais pedida do Brasil, gelada e no ponto certo de espuma.',
  },
  {
    slug: 'heineken',
    name: 'Heineken',
    tag: 'Premium',
    description: 'Rótulo internacional, para eventos que pedem um chopp mais sofisticado.',
  },
  {
    slug: 'ipa',
    name: 'IPA',
    tag: 'Lupulado',
    description: 'Amargor marcante e aroma cítrico para o convidado que curte um craft.',
  },
  {
    slug: 'chopp-de-vinho',
    name: 'Chopp de Vinho',
    tag: 'Diferente',
    description: 'A opção mais pedida por quem não bebe cerveja — doce, gelada e sem álcool forte.',
  },
  {
    slug: 'mega-chopp',
    name: 'Mega Chopp',
    tag: 'Alto volume',
    description: 'Formato para eventos grandes, com estrutura pensada para servir sem fila.',
  },
] as const;

export const barrelSizes = ['30 Litros', '50 Litros'] as const;

export const howItWorks = [
  {
    number: '01',
    title: 'Chame no WhatsApp',
    description: 'Conte a data, o número de convidados e escolha o chopp e o tamanho do barril.',
  },
  {
    number: '02',
    title: 'Confirmamos tudo',
    description: 'Fechamos data, horário e endereço de entrega — sem letra miúda.',
  },
  {
    number: '03',
    title: 'Entregamos instalado',
    description: 'Barril e chopeira chegam prontos pra servir. A chopeira já vai inclusa.',
  },
  {
    number: '04',
    title: 'Você só aproveita',
    description: 'Serve à vontade durante o evento — buscamos o equipamento depois.',
  },
] as const;

export const eventTypes = [
  {
    icon: 'heart' as const,
    title: 'Casamentos',
    description: 'Chopp gelado para brindar do início ao fim da festa.',
  },
  {
    icon: 'cake' as const,
    title: 'Aniversários',
    description: 'De confraternização em casa a festa grande de salão.',
  },
  {
    icon: 'graduationCap' as const,
    title: 'Formaturas',
    description: 'Estrutura para grupos grandes, sem faltar chopp na pista.',
  },
  {
    icon: 'briefcase' as const,
    title: 'Eventos de empresa',
    description: 'Confraternizações, happy hours e eventos corporativos.',
  },
] as const;

export const partnershipAudiences = [
  {
    title: 'Bares e restaurantes',
    description: 'Fornecimento recorrente com entrega programada, sem quebra de estoque.',
  },
  {
    title: 'Casas de festa e buffets',
    description: 'Parceria fixa para eventos que você já tem na agenda.',
  },
  {
    title: 'Revendedores',
    description: 'Condições especiais para quem já revende chopp na região.',
  },
] as const;

/**
 * SUBSTITUIR pelos depoimentos reais do Google/Instagram.
 * Não publique com estes textos de exemplo.
 */
export const testimonials = [
  {
    text: 'EXEMPLO — substituir por avaliação real do Google ou Instagram.',
    author: 'Nome do cliente',
    context: 'Aniversário',
  },
  {
    text: 'EXEMPLO — substituir por avaliação real do Google ou Instagram.',
    author: 'Nome do cliente',
    context: 'Casamento',
  },
  {
    text: 'EXEMPLO — substituir por avaliação real do Google ou Instagram.',
    author: 'Nome do cliente',
    context: 'Evento de empresa',
  },
] as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

const mapsQuery = `${site.city} - ${site.state}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  mapsQuery,
)}&output=embed`;
