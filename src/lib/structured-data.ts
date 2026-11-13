import type { SiteConfig } from "@/config/site";

/** JSON-LD somente com dados verificados nos materiais oficiais. */
export function buildOrganizationJsonLd(config: SiteConfig) {
  const sameAs = config.social.instagram ? [config.social.instagram.url] : [];
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: config.name,
    url: config.url,
    logo: `${config.url}${config.images.logo.src}`,
    image: `${config.url}${config.images.founder.src}`,
    description: config.description,
    email: config.contact.email,
    telephone: `+${config.contact.whatsapp}`,
    areaServed: { "@type": "State", name: "Rondônia" },
    founder: [
      { "@type": "Person", name: config.people.founder },
      { "@type": "Person", name: config.people.cofounder },
    ],
    ...(sameAs.length ? { sameAs } : {}),
    ...(config.contact.address ? { address: config.contact.address } : {}),
    ...(config.legal.cnpj ? { taxID: config.legal.cnpj } : {}),
  };
}
