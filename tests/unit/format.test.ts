import { describe, expect, it } from "vitest";
import { formatCurrencyBRL, formatDateLong, formatDateShort, formatPhoneBR, parseIsoDate } from "@/lib/format";

describe("parseIsoDate", () => {
  it("lê datas válidas", () => {
    expect(parseIsoDate("2025-03-11")).toEqual({ year: 2025, month: 3, day: 11 });
    expect(parseIsoDate("2024-02-29")).toEqual({ year: 2024, month: 2, day: 29 });
  });
  it.each(["2025-3-11", "11/03/2025", "2025-03-11T00:00", " 2025-03-11", "abcd-ef-gh"])("rejeita formato %s", (v) => {
    expect(() => parseIsoDate(v)).toThrowError(/Data inválida/);
  });
  it.each(["2025-02-30", "2025-13-01", "2025-00-10", "2025-04-31", "2025-02-29", "2025-01-00"])(
    "rejeita data inexistente %s",
    (v) => {
      expect(() => parseIsoDate(v)).toThrowError(/inexistente/);
    },
  );
});

describe("formatDate", () => {
  it("formata data curta com zeros à esquerda", () => {
    expect(formatDateShort("2025-02-01")).toBe("01/02/2025");
    expect(formatDateShort("2025-12-31")).toBe("31/12/2025");
  });
  it("formata data por extenso", () => {
    expect(formatDateLong("2025-03-11")).toBe("11 de março de 2025");
    expect(formatDateLong("2025-01-01")).toBe("1 de janeiro de 2025");
    expect(formatDateLong("2025-12-25")).toBe("25 de dezembro de 2025");
  });
});

describe("formatPhoneBR", () => {
  it.each([
    ["5569992579620", "(69) 99257-9620"],
    ["69992579620", "(69) 99257-9620"],
    ["551133334444", "(11) 3333-4444"],
    ["1133334444", "(11) 3333-4444"],
  ])("%s -> %s", (input, expected) => {
    expect(formatPhoneBR(input)).toBe(expected);
  });
  it("devolve o valor original quando não reconhece o formato", () => {
    expect(formatPhoneBR("12345")).toBe("12345");
    expect(formatPhoneBR("55123")).toBe("55123");
  });
  it("só remove o DDI quando o número começa com 55", () => {
    expect(formatPhoneBR("991234567890")).toBe("991234567890");
  });
  it("não remove 55 que faz parte do DDD", () => {
    expect(formatPhoneBR("55999990000")).toBe("(55) 99999-0000");
  });
});

describe("formatCurrencyBRL", () => {
  it("formata reais sem centavos", () => {
    expect(formatCurrencyBRL(12500)).toBe("R$ 12.500");
    expect(formatCurrencyBRL(1234.6)).toBe("R$ 1.235");
    expect(formatCurrencyBRL(0)).toBe("R$ 0");
  });
  it("usa travessão para valores não finitos", () => {
    expect(formatCurrencyBRL(Number.NaN)).toBe("—");
    expect(formatCurrencyBRL(Number.POSITIVE_INFINITY)).toBe("—");
  });
});
