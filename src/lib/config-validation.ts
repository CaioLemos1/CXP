import type { SiteConfig } from "@/config/site";
import { normalizeBrazilianPhone } from "./whatsapp";

export type ConfigIssue = { field: string; severity: "error" | "pending"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida a configuração central. `error` impede a publicação;
 * `pending` indica informação oficial ausente que deve ser preenchida.
 */
export function validateSiteConfig(config: SiteConfig): ConfigIssue[] {
  const issues: ConfigIssue[] = [];
  if (!normalizeBrazilianPhone(config.contact.whatsapp)) {
    issues.push({ field: "contact.whatsapp", severity: "error", message: "Número de WhatsApp inválido." });
  } else if (!config.contact.whatsappConfirmed) {
    issues.push({
      field: "contact.whatsappConfirmed",
      severity: "pending",
      message: "Confirmar se o telefone do portfólio é o WhatsApp oficial.",
    });
  }
  if (!EMAIL.test(config.contact.email)) {
    issues.push({ field: "contact.email", severity: "error", message: "E-mail de contato inválido." });
  }
  if (!EMAIL.test(config.legal.privacyEmail)) {
    issues.push({ field: "legal.privacyEmail", severity: "error", message: "E-mail de privacidade inválido." });
  }
  if (!/^https?:\/\//.test(config.url)) {
    issues.push({ field: "url", severity: "error", message: "URL do site deve começar com http(s)://." });
  } else if (config.url.includes("localhost")) {
    issues.push({ field: "url", severity: "pending", message: "Definir NEXT_PUBLIC_SITE_URL com o domínio oficial." });
  }
  if (config.legal.cnpj === null) {
    issues.push({ field: "legal.cnpj", severity: "pending", message: "CNPJ não informado." });
  } else if (config.legal.cnpj.replace(/\D/g, "").length !== 14) {
    issues.push({ field: "legal.cnpj", severity: "error", message: "CNPJ deve ter 14 dígitos." });
  }
  if (config.legal.dataProtectionOfficer === null) {
    issues.push({
      field: "legal.dataProtectionOfficer",
      severity: "pending",
      message: "Encarregado(a) LGPD não informado.",
    });
  }
  if (config.contact.address === null) {
    issues.push({ field: "contact.address", severity: "pending", message: "Endereço comercial não informado." });
  }
  if (config.images.couple === null) {
    issues.push({ field: "images.couple", severity: "pending", message: "Fotografia do casal não recebida." });
  }
  return issues;
}

export function hasBlockingIssues(issues: readonly ConfigIssue[]): boolean {
  return issues.some((issue) => issue.severity === "error");
}
