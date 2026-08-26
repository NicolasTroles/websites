/**
 * Single source of truth for the site. Change data here, never inside components.
 *
 * Brand name, owner and phone taken from the public Instagram bio
 * (instagram.com/alfageo_sondagens). Fields marked TODO were not published
 * there and must be validated with AlfaGeo before launch — never invent a
 * street address, opening hours, or testimonial.
 */

export const site = {
  brandName: 'AlfaGeo',
  brandFull: 'AlfaGeo Sondagens',
  tagline: 'Sondagens e investigação geotécnica',
  city: 'Curitiba',
  state: 'PR',

  // Confirmed on the Instagram bio.
  phone: '+55 41 99657-6854',
  phoneLink: '+5541996576854',
  whatsapp: '5541996576854',
  whatsappMessage:
    'Olá! Vim pelo site e gostaria de solicitar um orçamento de sondagem geotécnica.',

  // TODO: confirm exact service area with the client — assuming metro Curitiba
  // based on the Instagram location and the founder's base city.
  areaServed: 'Curitiba e Região Metropolitana, PR',

  // TODO: confirm business hours with the client — not published on Instagram.
  openingHours: [
    { days: 'Segunda a sexta', hours: '08h às 18h' },
    { days: 'Sábado', hours: 'Plantão sob consulta' },
  ],

  // Empty links are not rendered. Fill in when official profiles are confirmed.
  socialLinks: {
    instagram: 'https://www.instagram.com/alfageo_sondagens/',
    facebook: '',
  },

  seo: {
    title: 'AlfaGeo Sondagens | Sondagem SPT, Rotativa e Laudo Geotécnico em Curitiba',
    description:
      'AlfaGeo Sondagens executa sondagem SPT, sondagem rotativa, poços de inspeção, ensaio de percolação do solo e laudo geológico-geotécnico em Curitiba e região. Orçamento pelo WhatsApp.',
    url: 'https://alfageo.vercel.app', // TODO: confirm final domain
  },
} as const;

export const services = [
  {
    icon: 'coreSample' as const,
    title: 'Sondagem SPT',
    description:
      'Sondagem de simples reconhecimento à percussão, conforme NBR 6484, para definir o perfil do solo e a capacidade de carga antes da fundação.',
  },
  {
    icon: 'drill' as const,
    title: 'Sondagem rotativa',
    description:
      'Perfuração em rocha e solos de alta resistência, com extração de testemunhos, para investigações mais profundas ou terrenos com matacões.',
  },
  // Trado and lab tests are common complementary services offered alongside
  // SPT/rotativa by geotechnical providers in this segment (per market
  // research on similar companies) — confirm with AlfaGeo that these are
  // actually part of the service list before publishing.
  {
    icon: 'ruler' as const,
    title: 'Sondagem a trado',
    description:
      'Perfuração manual para reconhecimento raso em terrenos de fácil acesso, indicada para investigações preliminares e obras de menor porte.',
  },
  {
    icon: 'layers' as const,
    title: 'Poços de inspeção',
    description:
      'Poços e trincheiras de inspeção visual para reconhecimento raso do solo, complementando os dados da sondagem à percussão.',
  },
  {
    icon: 'droplets' as const,
    title: 'Ensaio de percolação do solo',
    description:
      'Ensaio de infiltração para dimensionar sumidouros e sistemas de disposição de esgoto, conforme a norma técnica aplicável.',
  },
  {
    icon: 'flask' as const,
    title: 'Ensaios de laboratório',
    description:
      'Classificação, umidade e compactação das amostras coletadas em campo, complementando os índices de resistência com a caracterização física do solo.',
  },
  {
    icon: 'fileCheck' as const,
    title: 'Laudo geológico-geotécnico',
    description:
      'Relatório técnico assinado por engenheiro responsável, com os resultados de campo e as recomendações para o projeto de fundação.',
  },
] as const;

export const process = [
  {
    number: '01',
    title: 'Contato e diagnóstico',
    description:
      'Você conta o tipo de obra, o endereço e a fase do projeto. Definimos juntos qual ensaio atende a necessidade e o prazo.',
  },
  {
    number: '02',
    title: 'Visita técnica e execução',
    description:
      'Equipe e equipamento próprio vão até o terreno e executam a sondagem em campo, seguindo a norma técnica correspondente.',
  },
  {
    number: '03',
    title: 'Análise dos dados',
    description:
      'As amostras e os índices de resistência coletados em campo são organizados e interpretados pela equipe técnica.',
  },
  {
    number: '04',
    title: 'Entrega do laudo',
    description:
      'Laudo geotécnico assinado, pronto para instruir o projeto de fundação junto ao engenheiro ou arquiteto responsável.',
  },
] as const;

/**
 * TODO: replace with real client reviews (Google/Instagram) before launch.
 * Do not publish with this placeholder text.
 */
export const testimonials = [
  {
    quote: 'EXEMPLO — substituir por avaliação real do cliente.',
    author: 'Nome do cliente',
    context: 'Fundação de obra residencial',
  },
  {
    quote: 'EXEMPLO — substituir por avaliação real do cliente.',
    author: 'Nome do cliente',
    context: 'Sondagem para edifício comercial',
  },
  {
    quote: 'EXEMPLO — substituir por avaliação real do cliente.',
    author: 'Nome do cliente',
    context: 'Laudo geotécnico para condomínio',
  },
] as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;
