/**
 * Fonte única de verdade do site. Trocar dados aqui, nunca dentro dos componentes.
 *
 * Nome, endereço e telefone extraídos de alfaiatariafigueiredo.guiapinhais.com.br.
 * Itens marcados com CONFIRMAR não estavam publicados nessa página e precisam
 * ser validados com a Figueiredo antes de publicar.
 */

export const site = {
  /** Nome no letreiro/logo da loja. */
  nome: 'Figueiredo',
  sobrenomeMarca: 'Alfaiataria',
  /** Marca completa, como aparece no site de origem. */
  marcaLoja: 'Alfaiataria Figueiredo',
  cidade: 'Pinhais',
  estado: 'PR',

  /** Confirmado no site oficial: alfaiatariafigueiredo.guiapinhais.com.br. */
  telefone: '+55 41 99875-1324',
  telefoneLink: '+5541998751324',
  whatsapp: '5541998751324',
  whatsappMensagem:
    'Olá! Vim pelo site e gostaria de saber mais sobre trajes sob medida e uniformes personalizados.',

  endereco: {
    /** Confirmado no site oficial. */
    logradouro: 'R. Genoveva Forlepa Kopka, 219',
    bairro: 'Pineville',
    cidade: 'Pinhais',
    estado: 'PR',
    cep: '83320-560',
    /** Usado no embed do mapa e no botão "traçar rota". */
    queryMaps:
      'Alfaiataria Figueiredo, R. Genoveva Forlepa Kopka, 219, Pineville, Pinhais - PR',
  },

  /** CONFIRMAR horários com a Figueiredo — não estavam publicados no site de origem. */
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
    titulo: 'Alfaiataria Figueiredo | Trajes sob medida e uniformes em Pinhais',
    descricao:
      'Alfaiataria Figueiredo, em Pineville, Pinhais/PR. Trajes sociais, uniformes empresariais, camisetas, polos, jaquetas e reformas em geral. Agende pelo WhatsApp.',
    url: 'https://alfaiataria-figueiredo.vercel.app', // CONFIRMAR domínio final
  },
} as const;

export const servicos = [
  {
    icone: 'suit' as const,
    titulo: 'Trajes sociais',
    descricao:
      'Ternos e trajes formais sob medida, para o dia a dia, cerimônias ou o ambiente de trabalho. Corte e caimento ajustados ao seu corpo.',
  },
  {
    icone: 'briefcase' as const,
    titulo: 'Uniformes empresariais personalizados',
    descricao:
      'Fardamento sob medida para equipes, com identidade visual da empresa. Do orçamento em lote à entrega padronizada para todo o time.',
  },
  {
    icone: 'shirt' as const,
    titulo: 'Camisetas, polos e jaquetas',
    descricao:
      'Peças personalizadas com bordado ou estampa da sua marca, para uso corporativo, promocional ou esportivo.',
  },
  {
    icone: 'scissors' as const,
    titulo: 'Reformas em geral',
    descricao:
      'Ajustes de barra, cintura, ombros e mangas. Aquela peça que nunca serviu direito pode voltar a vestir bem.',
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
    contexto: 'Uniforme da equipe',
  },
  {
    texto: 'EXEMPLO — substituir por avaliação real do Google.',
    autor: 'Nome do cliente',
    contexto: 'Ajuste de terno',
  },
  {
    texto: 'EXEMPLO — substituir por avaliação real do Google.',
    autor: 'Nome do cliente',
    contexto: 'Traje social sob medida',
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
