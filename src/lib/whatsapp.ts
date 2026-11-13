/** Remove tudo que não for dígito. */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Normaliza um telefone brasileiro para o formato internacional exigido pelo wa.me
 * (DDI 55 + DDD + número). Retorna `null` quando o número é inválido.
 */
export function normalizeBrazilianPhone(raw: string): string | null {
  let digits = onlyDigits(raw);
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`;
  if (!digits.startsWith("55")) return null;
  const national = digits.slice(2);
  if (national.length !== 10 && national.length !== 11) return null;
  // DDDs brasileiros vão de 11 a 99 (dois dígitos, sem zero inicial).
  if (Number(national.slice(0, 2)) < 11) return null;
  // Celulares (11 dígitos) começam com 9 após o DDD.
  if (national.length === 11 && national[2] !== "9") return null;
  return digits;
}

export type WhatsAppLinkOptions = {
  phone: string;
  message?: string;
};

/**
 * Monta a URL do WhatsApp (wa.me) com mensagem pré-preenchida.
 * Lança erro quando o telefone é inválido, para que falhas de configuração
 * apareçam no build e nos testes, nunca silenciosamente para o visitante.
 */
export function buildWhatsAppUrl({ phone, message }: WhatsAppLinkOptions): string {
  const normalized = normalizeBrazilianPhone(phone);
  if (!normalized) {
    throw new Error(`Número de WhatsApp inválido na configuração: "${phone}"`);
  }
  const base = `https://wa.me/${normalized}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Mensagem contextual para CTAs de seções específicas. */
export function buildTopicMessage(topic: string, fallback: string): string {
  const clean = topic.trim();
  if (!clean) return fallback;
  return `Olá! Conheci a CXP pelo site e gostaria de conversar com a equipe sobre ${clean}.`;
}
