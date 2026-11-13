import { describe, expect, it } from "vitest";
import { PRESS_HOSTS, pressArticles } from "@/content/press";
import { differentials, solutions } from "@/content/solutions";
import { isSafeExternalUrl, urlMatchesDate } from "@/lib/press";

describe("matérias do News Rondônia", () => {
  it("contém exatamente as seis matérias obrigatórias", () => {
    expect(pressArticles).toHaveLength(6);
    expect(new Set(pressArticles.map((a) => a.url)).size).toBe(6);
    expect(new Set(pressArticles.map((a) => a.id)).size).toBe(6);
  });

  it.each(pressArticles.map((a) => [a.id, a] as const))("%s tem URL segura e data coerente", (_, article) => {
    expect(isSafeExternalUrl(article.url, PRESS_HOSTS)).toBe(true);
    expect(urlMatchesDate(article)).toBe(true);
    expect(article.outlet).toBe("News Rondônia");
    expect(article.title.length).toBeGreaterThan(20);
  });

  it("não usa imagens de capa sem autorização", () => {
    expect(pressArticles.every((a) => a.image === undefined)).toBe(true);
  });
});

describe("comunicação financeira responsável", () => {
  const forbidden = [/garantid/i, /lucro certo/i, /sem riscos?/i, /enriqueça/i, /aprovação garantida/i];
  it("os textos de soluções não fazem promessas proibidas", () => {
    const text = [...solutions, ...differentials].flatMap((s) => [s.title, s.text]).join(" ");
    for (const pattern of forbidden) expect(text).not.toMatch(pattern);
  });
});
