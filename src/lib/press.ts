import { parseIsoDate } from "./format";

export type PressArticle = {
  id: string;
  title: string;
  /** Data ISO (AAAA-MM-DD). */
  date: string;
  outlet: string;
  url: string;
  /** Resumo apenas quando confirmado pela matéria. */
  excerpt?: string;
  /** Imagem apenas quando o uso estiver autorizado. */
  image?: { src: string; alt: string };
};

/** Ordena da mais recente para a mais antiga sem mutar o array original. */
export function sortByDateDesc<T extends { date: string }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Verifica se a data informada coincide com a data presente no caminho da URL (/AAAA/MM/DD/). */
export function urlMatchesDate(article: Pick<PressArticle, "url" | "date">): boolean {
  const { year, month, day } = parseIsoDate(article.date);
  const expected = `/${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}/`;
  return new URL(article.url).pathname.includes(expected);
}

export function isSafeExternalUrl(url: string, allowedHosts: readonly string[]): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && allowedHosts.includes(parsed.hostname);
  } catch {
    return false;
  }
}
