import { describe, expect, it } from "vitest";
import { isSafeExternalUrl, sortByDateDesc, urlMatchesDate } from "@/lib/press";

describe("sortByDateDesc", () => {
  it("ordena da mais recente para a mais antiga sem mutar o original", () => {
    const items = [{ date: "2025-02-11" }, { date: "2025-03-11" }, { date: "2025-02-28" }, { date: "2025-02-28" }];
    const copy = [...items];
    expect(sortByDateDesc(items).map((i) => i.date)).toEqual(["2025-03-11", "2025-02-28", "2025-02-28", "2025-02-11"]);
    expect(items).toEqual(copy);
  });
  it("inverte uma lista em ordem crescente", () => {
    const asc = ["2025-01-01", "2025-01-02", "2025-01-03", "2025-01-04"].map((date) => ({ date }));
    expect(sortByDateDesc(asc).map((i) => i.date)).toEqual(["2025-01-04", "2025-01-03", "2025-01-02", "2025-01-01"]);
  });
  it("mantém a ordem original entre datas iguais", () => {
    const same = [
      { id: "a", date: "2025-01-01" },
      { id: "b", date: "2025-01-01" },
      { id: "c", date: "2025-01-01" },
    ];
    expect(sortByDateDesc(same).map((i) => i.id)).toEqual(["a", "b", "c"]);
  });
});

describe("urlMatchesDate", () => {
  it("confere a data com o caminho da URL", () => {
    expect(urlMatchesDate({ date: "2025-03-11", url: "https://x.com/noticias/2025/03/11/titulo/" })).toBe(true);
    expect(urlMatchesDate({ date: "2025-03-12", url: "https://x.com/noticias/2025/03/11/titulo/" })).toBe(false);
    expect(urlMatchesDate({ date: "2025-02-01", url: "https://x.com/noticias/2025/2/1/titulo/" })).toBe(false);
    expect(urlMatchesDate({ date: "2025-02-01", url: "https://x.com/noticias/2025/02/01/titulo/" })).toBe(true);
  });
});

describe("isSafeExternalUrl", () => {
  const hosts = ["newsrondonia.com.br"];
  it("aceita apenas https nos hosts permitidos", () => {
    expect(isSafeExternalUrl("https://newsrondonia.com.br/a", hosts)).toBe(true);
    expect(isSafeExternalUrl("http://newsrondonia.com.br/a", hosts)).toBe(false);
    expect(isSafeExternalUrl("https://evil.com/newsrondonia.com.br", hosts)).toBe(false);
    expect(isSafeExternalUrl("javascript:alert(1)", hosts)).toBe(false);
    expect(isSafeExternalUrl("não é url", hosts)).toBe(false);
  });
});
