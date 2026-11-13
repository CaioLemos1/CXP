"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";

/** Carrega apenas o pacote mínimo de animações e respeita prefers-reduced-motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
