export type IconName = "key" | "seal" | "compass" | "scale" | "podium" | "cup";

export type Solution = {
  id: string;
  icon: IconName;
  kicker: string;
  title: string;
  description: string;
  points: string[];
  /** Assunto usado na mensagem pré-preenchida do WhatsApp. */
  topic: string;
};

/** Soluções confirmadas no portfólio institucional e nos canais oficiais da CXP. */
export const solutions: Solution[] = [
  {
    id: "consorcios",
    icon: "key",
    kicker: "Aquisição planejada",
    title: "Consórcios",
    description:
      "Planejamento para conquistar imóveis e veículos sem os juros de um financiamento tradicional, com parcelas organizadas no seu orçamento.",
    points: [
      "Imobiliário e veículos",
      "Contemplação por sorteio ou lance",
      "Taxa de administração definida em contrato",
    ],
    topic: "consórcios",
  },
  {
    id: "cartas-contempladas",
    icon: "seal",
    kicker: "Crédito já liberado",
    title: "Cartas contempladas",
    description:
      "Cotas de consórcio já contempladas, transferidas com anuência da administradora, para quem precisa do crédito disponível agora.",
    points: [
      "Análise do saldo devedor e do custo total",
      "Transferência formal pela administradora",
      "Avaliação caso a caso",
    ],
    topic: "cartas contempladas",
  },
  {
    id: "consultoria",
    icon: "compass",
    kicker: "Empresários e investidores",
    title: "Consultoria patrimonial",
    description:
      "Estratégias inteligentes para construir e multiplicar patrimônio, usando consórcios e cartas contempladas como ferramentas de alavancagem planejada.",
    points: ["Diagnóstico de objetivos e prazos", "Preservação da liquidez", "Comparação com o crédito bancário"],
    topic: "consultoria patrimonial para empresários e investidores",
  },
  {
    id: "credito",
    icon: "scale",
    kicker: "Crédito estratégico",
    title: "Planejamento de crédito",
    description:
      "Antes de contratar, compare. Ajudamos você a avaliar custos, taxas, prazos e riscos para usar o crédito a favor do seu patrimônio.",
    points: ["Custo efetivo total em primeiro lugar", "Alavancagem com responsabilidade", "Organização financeira"],
    topic: "planejamento de crédito",
  },
  {
    id: "palestras",
    icon: "podium",
    kicker: "Empresas e força de trabalho",
    title: "Palestras de educação financeira",
    description:
      "“Educação Financeira – Construa e Multiplique seu Patrimônio”: conscientização sobre planejamento e gestão inteligente dos recursos.",
    points: [
      "Para empresas e colaboradores",
      "Saúde financeira e produtividade",
      "Ferramentas estratégicas na prática",
    ],
    topic: "palestras de educação financeira para a minha empresa",
  },
  {
    id: "encontros",
    icon: "cup",
    kicker: "Relacionamento",
    title: "Encontros e cafés",
    description:
      "Encontros de educação e planejamento financeiro com investidores e futuros investidores, para conversar sobre estratégias com quem vive o tema.",
    points: ["Cafés de educação financeira", "Encontros sobre ampliação de patrimônio", "Convite pela equipe CXP"],
    topic: "os próximos encontros e cafés da CXP",
  },
];

export const consortiumSteps = [
  {
    title: "Adesão ao grupo",
    text: "Você escolhe o valor da carta de crédito e o prazo compatíveis com seu objetivo.",
  },
  {
    title: "Parcelas mensais",
    text: "Compostas por fundo comum, taxa de administração e, conforme o contrato, fundo de reserva e seguro.",
  },
  {
    title: "Contemplação",
    text: "Acontece por sorteio ou por lance, nas assembleias. Não há data garantida de contemplação.",
  },
  {
    title: "Uso do crédito",
    text: "Com a carta contemplada e a análise aprovada, o crédito é usado na aquisição do bem.",
  },
] as const;
