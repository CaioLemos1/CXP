"use client";

import { useEffect, useRef } from "react";

const LETTERS = [
  { char: "C", depth: 18 },
  { char: "X", depth: 34 },
  { char: "P", depth: 24 },
] as const;

/**
 * Letras "CXP" monumentais que respondem ao cursor com parallax 3D.
 * - Interpolação (lerp) a cada frame, apenas transform (GPU).
 * - O loop para sozinho quando o movimento assenta.
 * - Desativado em telas de toque e com prefers-reduced-motion (versão estática).
 */
export function InteractiveCXP() {
  const stageRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const host = stage?.closest<HTMLElement>("[data-hero]");
    if (!stage || !host) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let running = false;

    const render = () => {
      current.x += (target.x - current.x) * 0.075;
      current.y += (target.y - current.y) * 0.075;
      stage.style.transform = `perspective(1400px) rotateY(${current.x * 7}deg) rotateX(${-current.y * 5}deg)`;
      LETTERS.forEach((letter, index) => {
        const el = letterRefs.current[index];
        if (el)
          el.style.transform = `translate3d(${current.x * letter.depth}px, ${current.y * letter.depth * 0.6}px, ${letter.depth}px)`;
      });
      host.style.setProperty("--spot-x", `${50 + current.x * 30}%`);
      host.style.setProperty("--spot-y", `${45 + current.y * 25}%`);
      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      if (settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      start();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={stageRef}
        data-cxp-stage
        className="absolute left-1/2 top-[5.5rem] flex -translate-x-1/2 select-none items-end leading-none [transform-style:preserve-3d] will-change-transform motion-safe:max-lg:animate-[float-soft_9s_ease-in-out_infinite] lg:left-auto lg:right-[-2vw] lg:top-auto lg:bottom-[6vh] lg:translate-x-0"
      >
        {LETTERS.map((letter, index) => (
          <span
            key={letter.char}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            className="relative block font-serif text-[38vw] font-medium tracking-[-0.06em] will-change-transform lg:text-[31vw] 3xl:text-[27vw]"
          >
            {/* contorno dourado (camada de profundidade) */}
            <span className="absolute inset-0 translate-x-[0.6vw] translate-y-[0.6vw] text-transparent [-webkit-text-stroke:1px_rgba(201,163,94,0.35)]">
              {letter.char}
            </span>
            <span className="relative bg-gradient-to-b from-white/[0.13] via-white/[0.05] to-transparent bg-clip-text text-transparent [-webkit-text-stroke:1px_rgba(230,207,156,0.22)]">
              {letter.char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
