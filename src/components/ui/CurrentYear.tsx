"use client";

import { useEffect, useState } from "react";

/** Ano corrente calculado no navegador (correto mesmo em builds estáticos antigos). */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{year}</span>;
}
