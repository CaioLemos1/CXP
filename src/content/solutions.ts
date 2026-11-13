export type IconName = "key" | "seal" | "podium" | "diamond" | "target" | "handshake" | "chart";

export type Item = { id: string; icon: IconName; title: string; text: string };

/** Soluções confirmadas no portfólio institucional (textos curtos). */
export const solutions: Item[] = [
  {
    id: "consorcios",
    icon: "key",
    title: "Consórcios",
    text: "Planejamento para conquistar imóveis e veículos sem juros de financiamento.",
  },
  {
    id: "cartas-contempladas",
    icon: "seal",
    title: "Cartas Contempladas",
    text: "Crédito já contemplado para quem precisa agir agora.",
  },
  {
    id: "educacao-financeira",
    icon: "podium",
    title: "Educação Financeira",
    text: "Palestras e consultoria para empresas, empresários e investidores.",
  },
];

export const differentials: Item[] = [
  { id: "experiencia", icon: "diamond", title: "+20 anos de mercado", text: "Experiência comprovada" },
  { id: "personalizacao", icon: "target", title: "Soluções personalizadas", text: "Para cada objetivo" },
  { id: "confianca", icon: "handshake", title: "Parceria de confiança", text: "Com transparência" },
  { id: "planejamento", icon: "chart", title: "Foco em planejamento", text: "Decisões conscientes" },
];
