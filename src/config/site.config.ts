/**
 * Single source of truth for the site. Change data here, never inside components.
 *
 * Brand name, address, phone and category confirmed on the Google Business
 * listing ("Marido de Aluguel Oliveira", Campo Largo — categorized there as
 * "Escritório da empresa", i.e. a base of operations, not a walk-in shop).
 * The profile shows 5,0 with only 2 reviews — real, but intentionally not
 * surfaced as a star widget anywhere on the site (client's call: too thin a
 * sample to lead with). The listing itself is still linked as a
 * verification signal ("ele existe e está registrado no Google").
 */

export const site = {
  brandName: 'Oliveira',
  brandFull: 'Marido de Aluguel Oliveira',
  tagline: 'Hidráulica, elétrica, pintura e reparos, resolvidos na sua casa.',
  ownerFirstName: 'Isaias',
  city: 'Campo Largo',
  state: 'PR',

  // Confirmed on Google Business.
  phone: '+55 41 99723-3236',
  phoneLink: '+554199723236',
  whatsapp: '5541997233236',
  whatsappMessage: 'Olá! Vim pelo site e preciso de um orçamento para um serviço em casa.',

  // Confirmed on Google Business. Category there is "Escritório da empresa" —
  // this is the base Isaias works from, not a storefront clients visit; the
  // service happens at the client's home, so copy leans on "atende na sua
  // casa" rather than "venha até nós".
  address: {
    street: 'Rua Apóstolo Pedro, 79',
    neighborhood: 'Vila Campesi',
    city: 'Campo Largo',
    state: 'PR',
    zip: '83604-684',
    mapsQuery:
      'Marido de Aluguel Oliveira, Rua Apóstolo Pedro, 79, Vila Campesi, Campo Largo - PR',
  },

  // Only one data point is confirmed on Google Business: "Fecha·Abre seg. às
  // 08:00". Full weekly hours were not published — TODO: confirm the rest
  // (closing time, Saturday) with Isaias before launch instead of guessing.
  openingHours: [{ days: 'Segunda a sexta', hours: 'A partir das 08h' }],

  // No Instagram/Facebook or own website — the Google Business listing is
  // the only public profile that exists. TODO: confirm with Isaias if any
  // social profile is created later.
  socialLinks: {
    instagram: '',
    facebook: '',
  },

  seo: {
    title: 'Marido de Aluguel Oliveira | Hidráulica, Elétrica e Reparos em Campo Largo',
    description:
      'Marido de aluguel em Campo Largo/PR. Hidráulica, elétrica, pintura, montagem de móveis e pequenos reparos residenciais, com atendimento na sua casa. Orçamento pelo WhatsApp.',
    url: 'https://maridodealuguel-oliveira.vercel.app', // TODO: confirm final domain after deploy
  },
} as const;

/**
 * Service categories researched against what "marido de aluguel" / handyman
 * businesses in this segment (BR market) commonly advertise — confirm with
 * Isaias exactly which of these he performs before publishing, since only
 * the name/address/phone came from an official source.
 */
export const services = [
  {
    icon: 'droplet' as const,
    title: 'Hidráulica',
    description: 'Vazamentos, troca de registros e torneiras, sifões entupidos, caixa d’água.',
  },
  {
    icon: 'zap' as const,
    title: 'Elétrica',
    description: 'Tomadas, disjuntores, chuveiro elétrico, ventilador de teto, troca de luminárias.',
  },
  {
    icon: 'paintbrush' as const,
    title: 'Pintura',
    description: 'Retoques, pintura de paredes, portões e muros — interno e externo.',
  },
  {
    icon: 'armchair' as const,
    title: 'Montagem de móveis',
    description: 'Armários, guarda-roupas, estantes e móveis planejados, prontos pra usar.',
  },
  {
    icon: 'hammer' as const,
    title: 'Marcenaria e portas',
    description: 'Dobradiças, fechaduras emperradas, portas que não fecham direito, rodapés.',
  },
  {
    icon: 'lamp' as const,
    title: 'Instalações',
    description: 'Prateleiras, quadros, cortinas, suporte de TV — fixado com segurança.',
  },
  {
    icon: 'wrench' as const,
    title: 'Manutenção geral',
    description: 'Aquela lista de pequenos reparos acumulados que ninguém teve tempo de resolver.',
  },
  {
    icon: 'clipboard' as const,
    title: 'Reparos residenciais',
    description: 'Problema fora da lista? Chama no WhatsApp e descreve — provavelmente dá pra resolver.',
  },
] as const;

export const processSteps = [
  {
    step: '01',
    title: 'Chama no WhatsApp',
    description: 'Descreve o problema e manda uma foto, se tiver. Resposta rápida, sem enrolação.',
  },
  {
    step: '02',
    title: 'Combina o orçamento',
    description: 'Isaias avalia o serviço e passa o valor e o prazo antes de qualquer coisa.',
  },
  {
    step: '03',
    title: 'Atendimento na sua casa',
    description: 'Ele vai até você, em Campo Largo e região, com as ferramentas certas para o serviço.',
  },
  {
    step: '04',
    title: 'Serviço resolvido',
    description: 'Sem retrabalho, sem deixar bagunça — só o problema resolvido de verdade.',
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
