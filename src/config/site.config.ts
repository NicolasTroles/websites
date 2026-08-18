/**
 * Fonte única de verdade do site. Trocar dados aqui, nunca dentro dos componentes.
 *
 * Itens marcados com CONFIRMAR foram levantados de diretórios online e da foto
 * da fachada, mas não puderam ser validados no Google Maps (a página de
 * avaliações é renderizada por JavaScript e não pôde ser lida).
 */

export const site = {
  /** Nome no letreiro interno da fachada. */
  nome: 'Carlos Simões',
  sobrenomeMarca: 'Alfaiate Camiseiro',
  /** Marca maior no letreiro superior da loja. */
  marcaLoja: 'Cavalieri Moda',
  cidade: 'Curitiba',
  estado: 'PR',

  /** Confirmado em duas fontes: letreiro da fachada + diretório Bendito Guia. */
  telefone: '+55 41 99930-2624',
  telefoneLink: '+554199302624',
  whatsapp: '5541999302624',
  whatsappMensagem:
    'Olá! Vim pelo site e gostaria de saber mais sobre alfaiataria sob medida.',

  endereco: {
    // CONFIRMAR: a fachada mostra o número 58; o diretório registra 263.
    // Provável que 58 seja o número da porta e 263 o do edifício. Checar com o Carlos.
    logradouro: 'Alameda Dr. Carlos de Carvalho, 263',
    bairro: 'Centro',
    cidade: 'Curitiba',
    estado: 'PR',
    cep: '80410-180',
    /** Usado no embed do mapa e no botão "traçar rota". */
    queryMaps: 'Carlos Simões Alfaiate, Alameda Dr. Carlos de Carvalho, Centro, Curitiba - PR',
  },

  /** CONFIRMAR horários com o Carlos antes de publicar. */
  horarios: [
    { dias: 'Segunda a sexta', horas: '09h às 18h' },
    { dias: 'Sábado', horas: '09h às 13h' },
    { dias: 'Domingo', horas: 'Fechado' },
  ],

  /** Preencher quando tiver os perfis. Links vazios não são renderizados. */
  redes: {
    instagram: '',
    facebook: '',
  },

  seo: {
    titulo: 'Carlos Simões Alfaiate | Ternos e camisas sob medida em Curitiba',
    descricao:
      'Alfaiataria tradicional no centro de Curitiba. Ternos, camisas sob medida e ajustes finos executados à mão por Carlos Simões. Agende sua prova pelo WhatsApp.',
    url: 'https://carlos-alfaiate.vercel.app', // CONFIRMAR domínio final
  },
} as const;

export const servicos = [
  {
    icone: 'suit' as const,
    titulo: 'Ternos sob medida',
    descricao:
      'Do corte do tecido ao último ponto. Cada peça é modelada a partir das suas medidas, com provas intermediárias até o caimento ficar exato.',
  },
  {
    icone: 'shirt' as const,
    titulo: 'Camisas sob medida',
    descricao:
      'Colarinho, punho e comprimento definidos por você. O ofício de camiseiro que dá nome à casa, com tecidos escolhidos peça a peça.',
  },
  {
    icone: 'scissors' as const,
    titulo: 'Ajustes e reformas',
    descricao:
      'Aquele terno que nunca serviu direito pode voltar a servir. Barras, cintura, ombros e mangas ajustados com precisão de alfaiataria.',
  },
  {
    icone: 'calendar' as const,
    titulo: 'Trajes para ocasião',
    descricao:
      'Casamento, formatura ou cerimônia. Planejamos o traje com antecedência para que ele esteja pronto, provado e impecável na data.',
  },
];

export const processo = [
  {
    numero: '01',
    titulo: 'Conversa e escolha do tecido',
    descricao:
      'Entendemos a ocasião, o seu estilo e o orçamento. Você vê e sente os tecidos disponíveis antes de decidir.',
  },
  {
    numero: '02',
    titulo: 'Medidas',
    descricao:
      'Mais de vinte medidas tiradas à mão, considerando postura e proporções. É isso que separa sob medida de tamanho padrão.',
  },
  {
    numero: '03',
    titulo: 'Corte e montagem',
    descricao:
      'O molde é feito exclusivamente para você e o tecido é cortado à mão. A peça é montada e alinhavada para a primeira prova.',
  },
  {
    numero: '04',
    titulo: 'Provas e entrega',
    descricao:
      'Uma ou mais provas para acertar cada detalhe. A peça só sai da alfaiataria quando o caimento está exato.',
  },
];

/**
 * SUBSTITUIR pelos depoimentos reais do Google Maps.
 * Não publique com estes textos de exemplo.
 */
export const depoimentos = [
  {
    texto: 'EXEMPLO — substituir por avaliação real do Google.',
    autor: 'Nome do cliente',
    contexto: 'Terno de casamento',
  },
  {
    texto: 'EXEMPLO — substituir por avaliação real do Google.',
    autor: 'Nome do cliente',
    contexto: 'Ajuste de terno',
  },
  {
    texto: 'EXEMPLO — substituir por avaliação real do Google.',
    autor: 'Nome do cliente',
    contexto: 'Camisas sob medida',
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
