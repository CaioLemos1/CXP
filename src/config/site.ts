/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ---------------------------------------------------------------
 * Todas as informações institucionais e de contato ficam aqui.
 * Campos marcados com `PENDENTE` não constam nos materiais oficiais
 * enviados e devem ser preenchidos/confirmados antes da publicação.
 * Valores `null` são omitidos automaticamente da interface.
 */

export type SiteConfig = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  locale: string;
  /** URL pública definitiva. Defina NEXT_PUBLIC_SITE_URL no ambiente de produção. */
  url: string;
  region: string;
  contact: {
    /** Número com DDI + DDD, apenas dígitos. Fonte: portfólio institucional (slide de contato). */
    whatsapp: string;
    /** PENDENTE: confirmar se o número do portfólio é o WhatsApp oficial de atendimento. */
    whatsappConfirmed: boolean;
    email: string;
    /** PENDENTE: endereço comercial não consta nos materiais enviados. */
    address: string | null;
  };
  social: {
    instagram: { handle: string; url: string } | null;
  };
  legal: {
    legalName: string;
    /** PENDENTE: CNPJ não consta nos materiais enviados. Não inventar. */
    cnpj: string | null;
    /** PENDENTE: encarregado(a) pelo tratamento de dados (LGPD, art. 41). */
    dataProtectionOfficer: string | null;
    /** E-mail para solicitações de titulares (LGPD). Usa o contato oficial até haver um canal dedicado. */
    privacyEmail: string;
    lastUpdated: string;
  };
  people: {
    founder: string;
    cofounder: string;
  };
  messages: {
    default: string;
  };
  images: {
    logo: { src: string; width: number; height: number };
    /** Foto principal (hero). */
    hero: { src: string; width: number; height: number };
    /** Foto da seção "Sobre". */
    about: { src: string; width: number; height: number };
  };
};

const FALLBACK_URL = "http://localhost:3000";

export const siteConfig: SiteConfig = {
  name: "CXP Crédito & Investimentos",
  shortName: "CXP",
  tagline: "Realizando os sonhos da sua família e impulsionando seu patrimônio",
  description:
    "Consórcios, cartas contempladas, consultoria para empresários e investidores e educação financeira para construir e multiplicar patrimônio com planejamento e inteligência financeira.",
  locale: "pt_BR",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL).replace(/\/+$/, ""),
  region: "Porto Velho · Rondônia",
  contact: {
    whatsapp: "5569992579620",
    whatsappConfirmed: false,
    email: "timecpconsultoria@gmail.com",
    address: null,
  },
  social: {
    // O slide do portfólio grafa "@cpxinvestimentos"; o perfil ativo no Instagram é "cxpinvestimentos".
    instagram: { handle: "@cxpinvestimentos", url: "https://www.instagram.com/cxpinvestimentos/" },
  },
  legal: {
    legalName: "CXP Crédito & Investimentos",
    cnpj: null,
    dataProtectionOfficer: null,
    privacyEmail: "timecpconsultoria@gmail.com",
    lastUpdated: "2026-11-12",
  },
  people: {
    founder: "Pedro Fonseca",
    cofounder: "Cristiana Fonseca",
  },
  messages: {
    default:
      "Olá! Conheci a CXP pelo site e gostaria de conversar com a equipe sobre planejamento financeiro e soluções para meus objetivos.",
  },
  images: {
    logo: { src: "/images/logo-cxp.png", width: 709, height: 362 },
    hero: { src: "/images/pedro-hero.jpg", width: 1134, height: 1512 },
    about: { src: "/images/pedro-leitura.jpg", width: 1134, height: 1512 },
  },
};

export const navigation = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#imprensa", label: "Imprensa" },
  { href: "#contato", label: "Contato" },
] as const;
