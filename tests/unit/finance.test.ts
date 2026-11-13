import { describe, expect, it } from "vitest";
import {
  annualToMonthlyRate,
  clamp,
  LIMITS,
  purchasingPower,
  sanitizeCompoundInput,
  simulateCompound,
} from "@/lib/finance";

describe("clamp", () => {
  it("limita ao intervalo", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
  it("trata NaN como mínimo", () => {
    expect(clamp(Number.NaN, 3, 10)).toBe(3);
  });
});

describe("annualToMonthlyRate", () => {
  it("é equivalente em capitalização composta", () => {
    const monthly = annualToMonthlyRate(12);
    expect((1 + monthly) ** 12).toBeCloseTo(1.12, 10);
    expect(annualToMonthlyRate(0)).toBe(0);
  });
});

describe("sanitizeCompoundInput", () => {
  it("aplica limites e arredonda anos", () => {
    expect(sanitizeCompoundInput({ initial: -5, monthly: 2e9, annualRatePercent: 99, years: 2.6 })).toEqual({
      initial: LIMITS.initial.min,
      monthly: LIMITS.monthly.max,
      annualRatePercent: LIMITS.annualRatePercent.max,
      years: 3,
    });
    expect(sanitizeCompoundInput({ initial: 1e12, monthly: -1, annualRatePercent: -3, years: 0 })).toEqual({
      initial: LIMITS.initial.max,
      monthly: 0,
      annualRatePercent: 0,
      years: 1,
    });
    expect(sanitizeCompoundInput({ initial: 100, monthly: 10, annualRatePercent: 5, years: 99 }).years).toBe(40);
  });
});

describe("simulateCompound", () => {
  it("sem juros, o total é igual ao aportado", () => {
    const points = simulateCompound({ initial: 1000, monthly: 100, annualRatePercent: 0, years: 2 });
    expect(points).toEqual([
      { year: 0, invested: 1000, total: 1000 },
      { year: 1, invested: 2200, total: 2200 },
      { year: 2, invested: 3400, total: 3400 },
    ]);
  });

  it("aplica juros compostos anuais equivalentes sobre o valor inicial", () => {
    const points = simulateCompound({ initial: 1000, monthly: 0, annualRatePercent: 10, years: 3 });
    expect(points).toHaveLength(4);
    expect(points[1]?.total).toBeCloseTo(1100, 6);
    expect(points[3]?.total).toBeCloseTo(1331, 6);
    expect(points[3]?.invested).toBe(1000);
  });

  it("aportes mensais no fim do mês seguem a fórmula de série uniforme", () => {
    const rate = annualToMonthlyRate(12);
    const points = simulateCompound({ initial: 0, monthly: 100, annualRatePercent: 12, years: 1 });
    const expected = (100 * ((1 + rate) ** 12 - 1)) / rate;
    expect(points[1]?.total).toBeCloseTo(expected, 6);
    expect(points[1]?.invested).toBe(1200);
  });

  it("gera um ponto por ano e o total cresce com o tempo", () => {
    const points = simulateCompound({ initial: 10000, monthly: 500, annualRatePercent: 8, years: 15 });
    expect(points.map((p) => p.year)).toEqual(Array.from({ length: 16 }, (_, i) => i));
    for (let i = 1; i < points.length; i++) {
      expect(points[i]?.total).toBeGreaterThan(points[i - 1]?.total ?? 0);
    }
  });
});

describe("purchasingPower", () => {
  it("desconta a inflação composta", () => {
    expect(purchasingPower(1000, 10, 2)).toBeCloseTo(1000 / 1.21, 8);
    expect(purchasingPower(1000, 0, 5)).toBe(1000);
  });
  it("prazo zero ou negativo não altera o valor", () => {
    expect(purchasingPower(1000, 10, 0)).toBe(1000);
    expect(purchasingPower(1000, 10, -2)).toBe(1000);
  });
});
