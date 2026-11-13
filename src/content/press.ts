import type { PressArticle } from "@/lib/press";

/**
 * Matérias publicadas no News Rondônia (títulos, datas e URLs fornecidos pela CXP).
 * Resumos e imagens de capa foram omitidos intencionalmente: só devem ser
 * adicionados após confirmação do conteúdo e da autorização de uso da imagem.
 */
export const PRESS_OUTLET = "News Rondônia";
export const PRESS_HOSTS = ["newsrondonia.com.br", "www.newsrondonia.com.br"] as const;

export const pressArticles: PressArticle[] = [
  {
    id: "consciencia-financeira-empresas",
    title: "CXP Crédito & Investimentos leva consciência financeira para empresas",
    date: "2025-03-11",
    outlet: PRESS_OUTLET,
    url: "https://newsrondonia.com.br/noticias/2025/03/11/cxp-credito-investimentos-leva-consciencia-financeira-para-empresas/",
  },
  {
    id: "encontro-ampliacao-patrimonio",
    title: "CXP Crédito & Investimentos promove encontro sobre estratégias para ampliação de patrimônio",
    date: "2025-02-28",
    outlet: PRESS_OUTLET,
    url: "https://newsrondonia.com.br/noticias/2025/02/28/cxp-credito-investimentos-promove-encontro-sobre-estrategias-para-ampliacao-de-patrimonio/",
  },
  {
    id: "pare-de-pagar-juros-abusivos",
    title: "Pare de pagar juros abusivos: invista com inteligência e conquiste seu imóvel ou veículo",
    date: "2025-02-26",
    outlet: PRESS_OUTLET,
    url: "https://newsrondonia.com.br/noticias/2025/02/26/pare-de-pagar-juros-abusivos-invista-com-inteligencia-e-conquiste-seu-imovel-ou-veiculo/",
  },
  {
    id: "solucoes-estrategicas-futuro-financeiro",
    title: "CXP Crédito & Investimentos: soluções estratégicas para um futuro financeiro seguro",
    date: "2025-02-18",
    outlet: PRESS_OUTLET,
    url: "https://newsrondonia.com.br/noticias/2025/02/18/cxp-credito-investimentos-solucoes-estrategicas-para-um-futuro-financeiro-seguro/",
  },
  {
    id: "sonho-da-sua-familia",
    title: "CXP Investimentos: realizando o sonho da sua família e impulsionando seu patrimônio",
    date: "2025-02-14",
    outlet: PRESS_OUTLET,
    url: "https://newsrondonia.com.br/noticias/2025/02/14/cxp-investimentos-realizando-o-sonho-da-sua-familia-e-impulsionando-seu-patrimonio/",
  },
  {
    id: "investir-com-inteligencia",
    title: "CXP Investimentos: segurança e rentabilidade para quem quer investir com inteligência",
    date: "2025-02-11",
    outlet: PRESS_OUTLET,
    url: "https://newsrondonia.com.br/noticias/2025/02/11/cxp-investimentos-seguranca-e-rentabilidade-para-quem-quer-investir-com-inteligencia/",
  },
];
