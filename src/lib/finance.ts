/**
 * Funções de SIMULAÇÃO EDUCATIVA. Não representam rentabilidade de produto algum.
 * Todas as taxas são hipotéticas e informadas pelo próprio visitante.
 */

export type CompoundInput = {
  initial: number;
  monthly: number;
  /** Taxa anual hipotética em % (ex.: 8 = 8% a.a.). */
  annualRatePercent: number;
  years: number;
};

export type CompoundPoint = { year: number; invested: number; total: number };

export const LIMITS = {
  initial: { min: 0, max: 10_000_000 },
  monthly: { min: 0, max: 1_000_000 },
  annualRatePercent: { min: 0, max: 30 },
  years: { min: 1, max: 40 },
} as const;

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

/** Converte taxa anual em taxa mensal equivalente (capitalização composta). */
export function annualToMonthlyRate(annualRatePercent: number): number {
  return (1 + annualRatePercent / 100) ** (1 / 12) - 1;
}

export function sanitizeCompoundInput(input: CompoundInput): CompoundInput {
  return {
    initial: clamp(input.initial, LIMITS.initial.min, LIMITS.initial.max),
    monthly: clamp(input.monthly, LIMITS.monthly.min, LIMITS.monthly.max),
    annualRatePercent: clamp(input.annualRatePercent, LIMITS.annualRatePercent.min, LIMITS.annualRatePercent.max),
    years: Math.round(clamp(input.years, LIMITS.years.min, LIMITS.years.max)),
  };
}

/**
 * Série anual de juros compostos com aportes mensais no fim de cada mês.
 * Retorna um ponto por ano, começando no ano 0.
 */
export function simulateCompound(raw: CompoundInput): CompoundPoint[] {
  const { initial, monthly, annualRatePercent, years } = sanitizeCompoundInput(raw);
  const rate = annualToMonthlyRate(annualRatePercent);
  const points: CompoundPoint[] = [{ year: 0, invested: initial, total: initial }];
  let total = initial;
  let invested = initial;
  for (let month = 1; month <= years * 12; month++) {
    total = total * (1 + rate) + monthly;
    invested += monthly;
    if (month % 12 === 0) points.push({ year: month / 12, invested, total });
  }
  return points;
}

/** Poder de compra de um valor após N anos de inflação hipotética constante. */
export function purchasingPower(amount: number, inflationPercent: number, years: number): number {
  return amount / (1 + inflationPercent / 100) ** Math.max(0, years);
}
