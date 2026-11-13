/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ---------------------------------------------------------------
 * Todas as informações institucionais e de contato ficam aqui.
 * Campos marcados com `PENDENTE` não constam nos materiais oficiais
 * enviados e devem ser preenchidos/confirmados antes da publicação.
 * Valores `null` são omitidos automaticamente da interface.
 */

export type TeamMember = {
  id: string;
  name: string;
  roles: string[];
  bio: string;
  quote: string;
  credentials: string[];
  /** WhatsApp direto (DDI + DDD, apenas dígitos). */
  whatsapp: string;
  photo: { src: string; width: number; height: number };
};

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
    /** WhatsApp principal (DDI + DDD, apenas dígitos). Fonte: Portfólio Comercial 3.0, "Fale Conosco". */
    whatsapp: string;
    whatsappConfirmed: boolean;
    /** O Portfólio 3.0 não traz e-mail; mantido o do portfólio anterior. PENDENTE: confirmar. */
    email: string;
    /** Fonte: Portfólio Comercial 3.0. PENDENTE: confirmar cidade/UF (o portfólio cita só rua, número e bairro). */
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
  };
  team: TeamMember[];
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
  tagline: "Antes do crédito, vem o conhecimento.",
  description:
    "Soluções em crédito, consórcios, educação e planejamento financeiro. A CXP transforma conhecimento financeiro em oportunidades de crescimento e construção patrimonial.",
  locale: "pt_BR",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL).replace(/\/+$/, ""),
  region: "Porto Velho · Rondônia",
  contact: {
    whatsapp: "5569993540460",
    whatsappConfirmed: true,
    email: "timecpconsultoria@gmail.com",
    address: "Av. Campos Sales, nº 2437 – Centro, Porto Velho – RO",
  },
  social: {
    instagram: { handle: "@cxpinvestimentos", url: "https://www.instagram.com/cxpinvestimentos/" },
  },
  legal: {
    legalName: "CXP Crédito & Investimentos",
    cnpj: null,
    dataProtectionOfficer: null,
    privacyEmail: "timecpconsultoria@gmail.com",
    lastUpdated: "2026-11-13",
  },
  people: {
    founder: "Pedro Fonseca",
  },
  // Textos do Portfólio Comercial 3.0 (resumidos, sem alterar fatos).
  team: [
    {
      id: "pedro-fonseca",
      name: "Pedro Fonseca",
      roles: ["CEO e fundador da CXP", "Empreendedor e Estrategista Financeiro"],
      bio: "Com 25 anos de experiência profissional, construiu sua trajetória no empreendedorismo, na gestão comercial e no mercado financeiro. Em 2017, fundou a CP Assessoria de Crédito, base da CXP.",
      quote: "Não se trata apenas de acessar recursos. Trata-se de saber como utilizá-los com inteligência.",
      credentials: [],
      whatsapp: "5569993540460",
      photo: { src: "/images/pedro-avatar.jpg", width: 320, height: 320 },
    },
    {
      id: "matheus-torrente",
      name: "Matheus Torrente",
      roles: ["Economista", "Especialista em Investimentos", "Educador Financeiro"],
      bio: "Economista graduado pela Unir, conecta análise econômica, planejamento financeiro e visão patrimonial de longo prazo.",
      quote: "Conhecimento econômico aplicado para multiplicar patrimônio com estratégia.",
      credentials: ["CORECON-RO nº 782", "Autor de 2 livros", "Criador do App Torrente", "TV, Rádio e Podcast"],
      whatsapp: "5569992162700",
      photo: { src: "/images/matheus-torrente.jpg", width: 320, height: 320 },
    },
  ],
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
  { href: "#solucoes", label: "Soluções" },
  { href: "#sobre", label: "Quem Somos" },
  { href: "#resultados", label: "Resultados" },
  { href: "#imprensa", label: "Imprensa" },
  { href: "#contato", label: "Contato" },
] as const;
