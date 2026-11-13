import { describe, expect, it } from "vitest";
import { type SiteConfig, siteConfig } from "@/config/site";
import { hasBlockingIssues, validateSiteConfig } from "@/lib/config-validation";
import { buildOrganizationJsonLd } from "@/lib/structured-data";
import { normalizeBrazilianPhone } from "@/lib/whatsapp";

const complete: SiteConfig = {
  ...siteConfig,
  url: "https://www.exemplo.com.br",
  contact: { ...siteConfig.contact, address: "Rua Exemplo, 1" },
  legal: { ...siteConfig.legal, cnpj: "00.000.000/0001-00", dataProtectionOfficer: "Fulana" },
};

describe("validateSiteConfig", () => {
  it("a configuração atual não tem erros bloqueantes", () => {
    expect(hasBlockingIssues(validateSiteConfig(siteConfig))).toBe(false);
  });

  it("lista as pendências conhecidas da configuração atual", () => {
    const fields = validateSiteConfig({ ...siteConfig, url: "http://localhost:3000" }).map((i) => i.field);
    expect(fields).toEqual(expect.arrayContaining(["url", "legal.cnpj", "legal.dataProtectionOfficer"]));
  });

  it("descreve cada pendência com severidade e mensagem", () => {
    const issues = validateSiteConfig({
      ...siteConfig,
      url: "http://localhost:3000",
      contact: { ...siteConfig.contact, whatsappConfirmed: false, address: null },
    });
    expect(issues.map(({ field, severity }) => `${field}:${severity}`)).toEqual([
      "contact.whatsappConfirmed:pending",
      "url:pending",
      "legal.cnpj:pending",
      "legal.dataProtectionOfficer:pending",
      "contact.address:pending",
    ]);
    for (const issue of issues) expect(issue.message.length).toBeGreaterThan(5);
  });

  it.each(["a@b.co x", " a@b.co", "a@b", "a b@c.co"])("rejeita e-mail malformado %j", (email) => {
    const issues = validateSiteConfig({ ...complete, contact: { ...complete.contact, email } });
    expect(issues).toEqual([{ field: "contact.email", severity: "error", message: expect.stringMatching(/E-mail/) }]);
  });

  it("exige que a URL comece com http(s)", () => {
    const issues = validateSiteConfig({ ...complete, url: "site-https://x.com" });
    expect(issues.map((i) => `${i.field}:${i.severity}`)).toEqual(["url:error"]);
  });

  it("configuração completa não gera pendências", () => {
    expect(validateSiteConfig(complete)).toEqual([]);
  });

  it("detecta erros bloqueantes", () => {
    const broken: SiteConfig = {
      ...complete,
      url: "ftp://x",
      contact: { ...complete.contact, whatsapp: "123", email: "sem-arroba" },
      legal: { ...complete.legal, cnpj: "123", privacyEmail: "x@" },
    };
    const issues = validateSiteConfig(broken);
    for (const issue of issues) expect(issue.message.length).toBeGreaterThan(5);
    expect(issues.filter((i) => i.severity === "error").map((i) => i.field)).toEqual([
      "contact.whatsapp",
      "contact.email",
      "legal.privacyEmail",
      "url",
      "legal.cnpj",
    ]);
    expect(hasBlockingIssues(issues)).toBe(true);
  });

  it("pendências não são bloqueantes", () => {
    expect(hasBlockingIssues([{ field: "x", severity: "pending", message: "" }])).toBe(false);
    expect(hasBlockingIssues([])).toBe(false);
  });
});

describe("buildOrganizationJsonLd", () => {
  it("gera o objeto completo esperado", () => {
    expect(buildOrganizationJsonLd(complete)).toEqual({
      "@context": "https://schema.org",
      "@type": "FinancialService",
      name: "CXP Crédito & Investimentos",
      url: "https://www.exemplo.com.br",
      logo: "https://www.exemplo.com.br/images/logo-cxp.png",
      image: "https://www.exemplo.com.br/images/pedro-hero.jpg",
      description: complete.description,
      email: "timecpconsultoria@gmail.com",
      telephone: "+5569993540460",
      areaServed: { "@type": "State", name: "Rondônia" },
      founder: [{ "@type": "Person", name: "Pedro Fonseca" }],
      sameAs: ["https://www.instagram.com/cxpinvestimentos/"],
      address: "Rua Exemplo, 1",
      taxID: "00.000.000/0001-00",
    });
  });
  it("usa apenas dados configurados e omite campos ausentes", () => {
    const data = buildOrganizationJsonLd(siteConfig);
    expect(data["@type"]).toBe("FinancialService");
    expect(data.telephone).toBe("+5569993540460");
    expect(data).not.toHaveProperty("taxID");
    expect(data.address).toBe("Av. Campos Sales, nº 2437 – Centro, Porto Velho – RO");
    expect(data.sameAs).toEqual(["https://www.instagram.com/cxpinvestimentos/"]);
  });
  it("inclui CNPJ e endereço quando preenchidos", () => {
    const data = buildOrganizationJsonLd(complete);
    expect(data).toMatchObject({ taxID: "00.000.000/0001-00", address: "Rua Exemplo, 1" });
  });
  it("omite endereço quando não informado", () => {
    const data = buildOrganizationJsonLd({ ...complete, contact: { ...complete.contact, address: null } });
    expect(data).not.toHaveProperty("address");
  });
  it("omite sameAs sem Instagram", () => {
    expect(buildOrganizationJsonLd({ ...complete, social: { instagram: null } })).not.toHaveProperty("sameAs");
  });
});

describe("dados do Portfólio Comercial 3.0", () => {
  it("contatos oficiais", () => {
    expect(siteConfig.contact.whatsapp).toBe("5569993540460");
    expect(siteConfig.team.map((p) => [p.name, p.whatsapp])).toEqual([
      ["Pedro Fonseca", "5569993540460"],
      ["Matheus Torrente", "5569992162700"],
    ]);
    expect(siteConfig.social.instagram?.handle).toBe("@cxpinvestimentos");
  });
  it("todos os telefones da equipe são válidos", () => {
    for (const person of siteConfig.team) expect(normalizeBrazilianPhone(person.whatsapp)).toBe(person.whatsapp);
  });
});
