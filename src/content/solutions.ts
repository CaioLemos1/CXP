export type IconName = "book" | "coins" | "key" | "chart" | "calendar" | "handshake" | "layers";

export type Item = { id: string; icon: IconName; title: string; text: string };

/** Fonte: Portfólio Comercial 3.0, "Nossas Soluções" (textos originais). */
export const solutions: Item[] = [
  {
    id: "educacao-planejamento",
    icon: "book",
    title: "Educação e Planejamento Financeiro",
    text: "Organização das finanças, controle de gastos, reestruturação de dívidas e definição de metas.",
  },
  {
    id: "credito",
    icon: "coins",
    title: "Crédito e Soluções Financeiras",
    text: "Análise e intermediação de alternativas de crédito, de acordo com o seu perfil e objetivos.",
  },
  {
    id: "consorcios",
    icon: "key",
    title: "Consórcios",
    text: "Orientação sobre consórcio tradicional e contemplado para a conquista de bens e projetos.",
  },
  {
    id: "estrategias-patrimoniais",
    icon: "chart",
    title: "Estratégias Patrimoniais",
    text: "Análise de instrumentos financeiros para organização, aquisição e expansão patrimonial, considerando custos e riscos.",
  },
];

export type Result = { id: string; icon: IconName; prefix?: string; value: string; unit?: string; text: string };

/** Fonte: Portfólio Comercial 3.0, "Nossos Resultados". Não alterar sem confirmação da CXP. */
export const results: Result[] = [
  {
    id: "alavancagem",
    icon: "chart",
    prefix: "+",
    value: "25",
    unit: "milhões",
    text: "de alavancagem com os clientes",
  },
  {
    id: "instituicoes",
    icon: "handshake",
    prefix: "+",
    value: "20",
    unit: "instituições",
    text: "relacionamento desenvolvido com bancos e fintechs ao longo da trajetória",
  },
  {
    id: "desde",
    icon: "calendar",
    prefix: "Desde",
    value: "2017",
    text: "atuação no mercado de crédito e soluções financeiras",
  },
  {
    id: "evolucao",
    icon: "layers",
    value: "2024",
    text: "evolução para a CXP, com educação financeira, planejamento e estratégias patrimoniais",
  },
];

/** Fonte: Portfólio Comercial 3.0, "Nossa Trajetória". */
export const timeline = [
  { id: "inicio", label: "2017", text: "Início da atuação no mercado de crédito em Porto Velho – RO." },
  { id: "evolucao", label: "Evolução", text: "Ampliação da atuação, incorporando educação financeira e planejamento." },
  {
    id: "hoje",
    label: "Hoje",
    text: "Soluções completas para pessoas e empresas, com foco em resultados e construção de patrimônio.",
  },
] as const;
