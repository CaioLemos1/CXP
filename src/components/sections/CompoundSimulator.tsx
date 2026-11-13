"use client";

import { useId, useMemo, useState } from "react";
import { LIMITS, purchasingPower, simulateCompound } from "@/lib/finance";
import { formatCurrencyBRL } from "@/lib/format";

const W = 640;
const H = 260;
const PAD = { top: 16, right: 12, bottom: 28, left: 12 };

function buildPath(values: number[], max: number): string {
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  return values
    .map((value, index) => {
      const x = PAD.left + (index / Math.max(values.length - 1, 1)) * innerW;
      const y = PAD.top + innerH - (value / max) * innerH;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  kind,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
  kind: "range" | "money";
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ivory/60">
          {label}
        </label>
        {kind === "range" && (
          <output htmlFor={id} className="font-serif text-xl text-gold-soft">
            {value}
            {suffix}
          </output>
        )}
      </div>
      {kind === "range" ? (
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-4 w-full accent-[#c9a35e]"
        />
      ) : (
        <div className="mt-3 flex items-center border-b border-white/20 focus-within:border-gold">
          <span className="text-ivory/60">R$</span>
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full bg-transparent px-2 py-2 font-serif text-2xl text-ivory outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      )}
    </div>
  );
}

/** Simulador EDUCATIVO de juros compostos e inflação. Taxas hipotéticas definidas pelo visitante. */
export function CompoundSimulator() {
  const [initial, setInitial] = useState(10_000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(15);
  const [inflation, setInflation] = useState(4);

  const points = useMemo(
    () => simulateCompound({ initial, monthly, annualRatePercent: rate, years }),
    [initial, monthly, rate, years],
  );
  const last = points[points.length - 1] ?? { invested: 0, total: 0, year: 0 };
  const max = Math.max(last.total, last.invested, 1);
  const totalPath = buildPath(
    points.map((p) => p.total),
    max,
  );
  const investedPath = buildPath(
    points.map((p) => p.invested),
    max,
  );
  const areaPath = `${totalPath} L${W - PAD.right},${H - PAD.bottom} L${PAD.left},${H - PAD.bottom} Z`;
  const realValue = purchasingPower(last.total, inflation, last.year);

  return (
    <div className="grid overflow-hidden rounded-sm bg-ink text-ivory lg:grid-cols-12">
      <div className="space-y-8 border-b border-white/[0.08] p-8 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-gold">Simulação ilustrativa</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight">O tempo a favor dos juros compostos</h3>
        </div>
        <Field
          label="Valor inicial"
          kind="money"
          value={initial}
          onChange={setInitial}
          min={LIMITS.initial.min}
          max={LIMITS.initial.max}
          step={500}
          suffix=""
        />
        <Field
          label="Aporte mensal"
          kind="money"
          value={monthly}
          onChange={setMonthly}
          min={LIMITS.monthly.min}
          max={LIMITS.monthly.max}
          step={50}
          suffix=""
        />
        <Field
          label="Taxa hipotética ao ano"
          kind="range"
          value={rate}
          onChange={setRate}
          min={0}
          max={20}
          step={0.5}
          suffix="%"
        />
        <Field label="Prazo" kind="range" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" anos" />
        <Field
          label="Inflação hipotética ao ano"
          kind="range"
          value={inflation}
          onChange={setInflation}
          min={0}
          max={15}
          step={0.5}
          suffix="%"
        />
      </div>

      <div className="flex flex-col p-8 sm:p-10 lg:col-span-7">
        <dl className="grid grid-cols-2 gap-6" aria-live="polite">
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-ivory/60">Valor simulado em {last.year} anos</dt>
            <dd
              className="mt-2 font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none text-gold-soft"
              data-testid="sim-total"
            >
              {formatCurrencyBRL(last.total)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-ivory/60">Total aportado</dt>
            <dd className="mt-2 font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none text-ivory">
              {formatCurrencyBRL(last.invested)}
            </dd>
          </div>
        </dl>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-8 h-auto w-full"
          role="img"
          aria-label={`Gráfico ilustrativo: total aportado de ${formatCurrencyBRL(last.invested)} e valor simulado de ${formatCurrencyBRL(last.total)} após ${last.year} anos.`}
        >
          <defs>
            <linearGradient id="sim-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#c9a35e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#c9a35e" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={PAD.left}
              x2={W - PAD.right}
              y1={PAD.top + (H - PAD.top - PAD.bottom) * f}
              y2={PAD.top + (H - PAD.top - PAD.bottom) * f}
              stroke="rgba(255,255,255,0.06)"
            />
          ))}
          <path d={areaPath} fill="url(#sim-fill)" />
          <path d={investedPath} fill="none" stroke="rgba(244,239,230,0.55)" strokeWidth="1.5" strokeDasharray="4 5" />
          <path d={totalPath} fill="none" stroke="#e6cf9c" strokeWidth="2" />
          <text x={PAD.left} y={H - 6} fill="rgba(244,239,230,0.45)" fontSize="12">
            Ano 0
          </text>
          <text x={W - PAD.right} y={H - 6} fill="rgba(244,239,230,0.45)" fontSize="12" textAnchor="end">
            Ano {last.year}
          </text>
        </svg>
        <div className="mt-3 flex flex-wrap gap-5 text-xs text-ivory/60">
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-0.5 w-5 bg-gold-soft" />
            Valor simulado
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-0 w-5 border-t border-dashed border-ivory/60" />
            Total aportado
          </span>
        </div>

        <p className="mt-8 border-t border-white/[0.08] pt-6 text-sm leading-relaxed text-ivory/70">
          Com inflação hipotética de <span className="text-ivory">{inflation}% ao ano</span>, o valor simulado
          equivaleria a{" "}
          <span className="text-gold-soft" data-testid="sim-real">
            {formatCurrencyBRL(realValue)}
          </span>{" "}
          em poder de compra de hoje.
        </p>
        <p className="mt-4 text-xs leading-relaxed text-ivory/60">
          Simulação matemática com taxa constante escolhida por você, sem impostos, custos ou oscilações. Não representa
          rentabilidade de nenhum produto, não é recomendação nem promessa de resultado.
        </p>
      </div>
    </div>
  );
}
