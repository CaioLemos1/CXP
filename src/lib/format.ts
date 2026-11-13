const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
] as const;

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Converte "2025-03-11" em partes numéricas, validando a data. */
export function parseIsoDate(iso: string): { year: number; month: number; day: number } {
  const match = ISO_DATE.exec(iso);
  if (!match) throw new Error(`Data inválida: "${iso}"`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const probe = new Date(Date.UTC(year, month - 1, day));
  // Datas inexistentes (ex.: 30/02) "transbordam" para outro mês no construtor de Date.
  if (probe.getUTCMonth() !== month - 1) {
    throw new Error(`Data inexistente: "${iso}"`);
  }
  return { year, month, day };
}

/** "2025-03-11" -> "11/03/2025" */
export function formatDateShort(iso: string): string {
  const { year, month, day } = parseIsoDate(iso);
  return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
}

/** "2025-03-11" -> "11 de março de 2025" */
export function formatDateLong(iso: string): string {
  const { year, month, day } = parseIsoDate(iso);
  return `${day} de ${MONTHS[month - 1]} de ${year}`;
}

/** "5569992579620" -> "(69) 99257-9620" */
export function formatPhoneBR(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) digits = digits.slice(2);
  if (digits.length === 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return phone;
}

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** Formata valores em reais sem centavos (ex.: "R$ 12.500"). */
export function formatCurrencyBRL(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return BRL.format(Math.round(value)).replace(/ /g, " ");
}
