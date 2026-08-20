/**
 * Fonte única de verdade do site. Trocar dados aqui, nunca dentro dos componentes.
 *
 * Nome, endereço, telefone, horário e avaliações confirmados na ficha do
 * Google Maps ("Marciel Tintas em Campo Largo", 5,0 · 14 avaliações).
 */

export const site = {
  /** Nome no letreiro/logo da loja. */
  nome: 'Marciel',
  sobrenomeMarca: 'Tintas',
  /** Marca completa, como aparece na ficha do Google Maps. */
  marcaLoja: 'Marciel Tintas',
  cidade: 'Campo Largo',
  estado: 'PR',

  /** Confirmado na ficha do Google Maps. */
  telefone: '+55 41 99683-9808',
  telefoneLink: '+5541996839808',
  whatsapp: '5541996839808',
  whatsappMensagem:
    'Olá! Vim pelo site e gostaria de saber mais sobre tintas e produtos para pintura.',

  endereco: {
    /** Confirmado na ficha do Google Maps. */
    logradouro: 'R. Prof. João Batista Vallões, 1032',
    bairro: 'Centro',
    cidade: 'Campo Largo',
    estado: 'PR',
    cep: '83601-110',
    /** Usado no embed do mapa e no botão "traçar rota". */
    queryMaps:
      'Marciel Tintas em Campo Largo, R. Prof. João Batista Vallões, 1032, Centro, Campo Largo - PR',
  },

  /**
   * Confirmado na ficha do Google Maps. A loja fecha para almoço das 11h30
   * às 11h50 de segunda a sexta.
   */
  horarios: [
    { dias: 'Segunda a sexta', horas: '08h às 11h30 e 11h50 às 18h' },
    { dias: 'Sábado', horas: '08h às 13h' },
    { dias: 'Domingo', horas: 'Fechado' },
  ],

  /** Preencher quando tiver os perfis. Links vazios não são renderizados. */
  redes: {
    instagram: '',
    facebook: '',
  },

  /** Confirmado na ficha do Google Maps. */
  avaliacaoGoogle: {
    nota: 5.0,
    total: 14,
  },

  seo: {
    titulo: 'Marciel Tintas | Tintas e materiais para pintura em Campo Largo',
    descricao:
      'Marciel Tintas, no Centro de Campo Largo/PR. Tintas imobiliárias, automotivas, texturas e acessórios para pintura, com mistura de cores na hora. Nota 5,0 no Google. Atendimento pelo WhatsApp.',
    url: 'https://marciel-tintas.vercel.app', // CONFIRMAR domínio final
  },
} as const;

export const servicos = [
  {
    icone: 'palette' as const,
    titulo: 'Mistura de cores na hora',
    descricao:
      'Máquina de mistura computadorizada, com milhares de cores disponíveis. Você escolhe o tom certo e leva pronto para usar.',
  },
  {
    icone: 'home' as const,
    titulo: 'Tintas imobiliárias',
    descricao:
      'Látex, acrílicas, texturas e vernizes para paredes internas, externas, madeira e metal. Das principais marcas do mercado.',
  },
  {
    icone: 'car' as const,
    titulo: 'Tintas automotivas',
    descricao:
      'Linha completa para funilaria e repintura automotiva, com produtos e catálogo de cores para todo tipo de veículo.',
  },
  {
    icone: 'wrench' as const,
    titulo: 'Ferramentas e acessórios',
    descricao:
      'Rolos, pincéis, fitas, lixas e todo o material de preparação de superfície para o serviço sair bem-feito.',
  },
];

export const processo = [
  {
    numero: '01',
    titulo: 'Você traz a ideia',
    descricao:
      'Uma foto do ambiente, um pedaço de referência ou só a cor que está na cabeça. A equipe ajuda a decidir com calma.',
  },
  {
    numero: '02',
    titulo: 'Escolha da cor certa',
    descricao:
      'Catálogo com milhares de tons e amostras físicas para ver a cor na luz real, antes de fechar a lata.',
  },
  {
    numero: '03',
    titulo: 'Mistura computadorizada',
    descricao:
      'A tinta é preparada na hora, na máquina, com a mesma fórmula sempre que você precisar repetir a cor.',
  },
  {
    numero: '04',
    titulo: 'Pronto para usar',
    descricao:
      'Você sai com a tinta, os acessórios certos e as dicas de aplicação para o resultado durar.',
  },
];

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMensagem,
)}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.endereco.queryMaps,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.endereco.queryMaps,
)}&output=embed`;
