/**
 * Single source of truth for the site. Change data here, never inside a
 * component.
 *
 * Positioning, service list and the wording of the three brand pillars come
 * from the material the client supplied (logo lockup + institutional banner:
 * "Segurança do Trabalho | Gestão de Terceiros | SG3" and "Transformando
 * exigências em organização, conformidade e controle").
 *
 * Every field marked `TODO: confirm with client` was NOT in that material and
 * is a placeholder. Do not publish with those still in place — an invented
 * phone number or address is worse than an empty section.
 */

export const site = {
  brandName: 'Rodrigues Rangel',
  brandFull: 'Rodrigues Rangel Consultoria',
  // The three verticals, exactly as they appear on the client's banner.
  tagline: 'Segurança do Trabalho | Gestão de Terceiros | SG3',
  // The banner's own line. Used as the closing statement of the hero.
  promise: 'Transformando exigências em organização, conformidade e controle.',

  owner: 'Valder Rangel',
  ownerRole: 'Técnico em Segurança do Trabalho',

  // TODO: confirm with client — no phone was published in the material.
  phone: '+55 41 90000-0000',
  phoneLink: '+5541900000000',
  whatsapp: '5541900000000',
  whatsappMessage:
    'Olá! Vim pelo site da Rodrigues Rangel Consultoria e gostaria de falar sobre a documentação de SST da minha empresa.',

  // TODO: confirm with client.
  email: 'contato@rodriguesrangel.com.br',

  // TODO: confirm with client — city/region and whether the work is remote.
  city: 'Curitiba',
  state: 'PR',
  areaServed: 'Curitiba, região metropolitana e atendimento remoto para todo o Brasil',

  // TODO: confirm with client.
  openingHours: [
    { days: 'Segunda a sexta', hours: '08h às 18h' },
    { days: 'Sábado', hours: 'Sob agendamento' },
  ],

  // Empty links are not rendered anywhere. Fill in when the profiles are
  // confirmed — do not guess a handle.
  socialLinks: {
    linkedin: '', // TODO: confirm with client
    instagram: '', // TODO: confirm with client
  },

  seo: {
    title:
      'Rodrigues Rangel Consultoria | Segurança do Trabalho, Gestão de Terceiros e SG3',
    description:
      'Consultoria em Segurança do Trabalho, gestão documental de terceiros, acompanhamento de pendências e vencimentos e suporte às rotinas do Sistema SG3. Diagnóstico de conformidade documental e acompanhamento contínuo.',
    // TODO: confirm with client — replace with the real domain before launch,
    // and redeploy. This value feeds the canonical URL, the sitemap, the
    // llms.txt links and the JSON-LD.
    url: 'https://www.rodriguesrangel.com.br',
    // Date of the last real content change — NOT the build date. Bump it by
    // hand when the copy actually changes.
    lastModified: '2026-09-16',
  },
} as const;

/**
 * The three words on the client's own banner. They are the spine of the whole
 * site: the intro section states them, the process delivers them, and the
 * scroll-driven compliance field animates the move from one to the next.
 */
export const pillars = [
  {
    label: 'Organização',
    description:
      'Centralização e classificação dos documentos e informações necessários ao processo.',
  },
  {
    label: 'Conformidade',
    description:
      'Análise do que está regular, pendente ou próximo do vencimento diante dos requisitos aplicáveis.',
  },
  {
    label: 'Controle',
    description:
      'Acompanhamento periódico de prazos e pendências para reduzir recorrências.',
  },
] as const;

export const services = [
  {
    id: 'diagnostico',
    icon: 'search' as const,
    title: 'Diagnóstico de conformidade documental',
    description:
      'Análise da documentação de SST para identificação de pendências, vencimentos, não conformidades e requisitos aplicáveis à empresa ou ao contrato.',
  },
  {
    id: 'gestao-documental',
    icon: 'folder' as const,
    title: 'Gestão documental',
    description:
      'Organização, atualização e acompanhamento dos documentos necessários para atendimento às exigências de clientes, contratantes e processos internos.',
  },
  {
    id: 'terceiros',
    icon: 'users' as const,
    title: 'Gestão de terceiros',
    description:
      'Apoio a empresas prestadoras de serviços na organização de documentos e no atendimento aos requisitos estabelecidos por seus contratantes.',
  },
  {
    id: 'sg3',
    icon: 'system' as const,
    title: 'Suporte ao Sistema SG3',
    description:
      'Apoio na utilização e no acompanhamento do SG3, incluindo organização das informações, documentos, pendências e requisitos relacionados à gestão de terceiros.',
  },
  {
    id: 'regularizacao',
    icon: 'check' as const,
    title: 'Regularização de pendências',
    description:
      'Análise das não conformidades identificadas, orientação sobre os ajustes necessários e acompanhamento do processo de regularização.',
  },
  {
    id: 'documentos-sst',
    icon: 'file' as const,
    title: 'Documentos e controles de SST',
    description:
      'Apoio na elaboração, revisão e atualização de documentos, além do acompanhamento de vencimentos de documentos, exames, treinamentos e demais requisitos aplicáveis.',
  },
] as const;

/**
 * The four stages of the engagement. This list drives two things at once: the
 * "Como funciona" copy and the scroll positions of the WebGL compliance field
 * — `state` is what the shader interpolates towards at each stage, so keep the
 * array length and order in sync with ComplianceField.
 */
export const process = [
  {
    step: '01',
    title: 'Levantamento',
    description:
      'Identificação do cenário atual: documentos disponíveis, exigências aplicáveis e pendências já existentes.',
    state: 'Documentos dispersos',
  },
  {
    step: '02',
    title: 'Diagnóstico',
    description:
      'Análise das informações e classificação dos pontos que precisam de regularização, atualização ou acompanhamento.',
    state: 'Pendências identificadas',
  },
  {
    step: '03',
    title: 'Organização e regularização',
    description:
      'Definição das ações necessárias e suporte na organização e na correção das pendências identificadas.',
    state: 'Documentação organizada',
  },
  {
    step: '04',
    title: 'Acompanhamento',
    description:
      'Controle periódico de documentos, prazos e novas pendências, conforme o escopo definido para o atendimento.',
    state: 'Controle contínuo',
  },
] as const;

/**
 * Concrete items the engagement can cover. The word "pode" is deliberate and
 * must survive any copy edit: the scope of each contract is defined case by
 * case, and the site must not promise that everything here is always included.
 */
export const monitoredItems = [
  { label: 'Documentação de Segurança do Trabalho', code: 'SST' },
  { label: 'Documentos de empresas terceirizadas', code: 'TERC' },
  { label: 'Treinamentos e respectivas validades', code: 'NR' },
  { label: 'Exames ocupacionais e vencimentos', code: 'ASO' },
  { label: 'Documentos dos profissionais mobilizados', code: 'MOB' },
  { label: 'Pendências apontadas por contratantes', code: 'PEND' },
  { label: 'Requisitos cadastrados em sistemas de gestão de terceiros', code: 'SG3' },
  { label: 'Atualização e revisão de documentos de SST', code: 'REV' },
] as const;

/** Situations the consultancy can attend. Phrased as the client's problem. */
export const audiences = [
  'Prestam serviços dentro das instalações de clientes e precisam manter a documentação dos seus profissionais regularizada.',
  'Utilizam empresas terceirizadas e precisam acompanhar documentos e requisitos de acesso.',
  'Possuem pendências documentais que precisam ser identificadas e tratadas.',
  'Utilizam o SG3 nos seus processos de gestão de terceiros.',
  'Precisam acompanhar vencimentos de documentos, treinamentos e exames.',
  'Necessitam revisar ou organizar documentos de Segurança do Trabalho.',
] as const;

/**
 * Short, factual account of the professional. Kept deliberately free of
 * "especialista", "referência" or any wording that could read as a
 * certification the site cannot back up.
 */
export const owner = {
  name: site.owner,
  role: site.ownerRole,
  // TODO: confirm with client — taken from the brief, not from a public
  // profile. Confirm the institution and the wording before launch.
  education: 'Formação técnica em Segurança do Trabalho — TECPUC / PUCPR',
  paragraphs: [
    'Profissional com atuação em Segurança do Trabalho e experiência em gestão documental, acompanhamento de terceiros, análise de procedimentos, treinamentos e organização de requisitos relacionados à SST.',
    'Ao longo da trajetória profissional, atuou em ambientes corporativos e em contratos de prestação de serviços, com atividades relacionadas a controle documental, programas de segurança, gestão de riscos e acompanhamento de requisitos de saúde e segurança.',
  ],
  // Areas the professional has worked with. Factual list, no claims attached.
  topics: ['PGR', 'LTCAT', 'PCA', 'PPR', 'CIPA', 'Controle de EPI', 'Treinamentos', 'SG3'],
} as const;

/**
 * Subjects offered in the contact form. They double as lead qualification —
 * the selected value is carried into the WhatsApp message, so the first reply
 * already knows what the conversation is about.
 */
export const contactSubjects = [
  'Diagnóstico documental',
  'Gestão de terceiros',
  'Suporte no SG3',
  'Regularização de pendências',
  'Documentos de SST',
  'Outro assunto',
] as const;

/** Main navigation. Same list feeds the header, the footer and llms.txt. */
export const navLinks = [
  { href: '#atuacao', label: 'Atuação' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#sg3', label: 'SG3' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
] as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

/** Builds a WhatsApp link with a custom message (used by the contact form). */
export function whatsappUrlWith(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const phoneUrl = `tel:${site.phoneLink}`;
export const emailUrl = `mailto:${site.email}`;

/**
 * Indexable routes. One entry per real URL — anchors are not pages and must
 * never be added here (the sitemap would be rejected). This same list feeds
 * the sitemap; llms.txt links the anchors separately.
 */
export const pages = [
  { path: '/', priority: 1 },
  { path: '/privacidade', priority: 0.3 },
] as const;
