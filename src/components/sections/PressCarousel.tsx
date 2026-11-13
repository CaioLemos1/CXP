"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";

/**
 * No mobile/tablet a lista vira um carrossel com scroll-snap (gesto nativo)
 * e botões acessíveis. No desktop (lg+) a mesma lista é exibida em grid editorial.
 */
export function PressCarousel({ children, count }: { children: React.ReactNode; count: number }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const first = track.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 16;
      setIndex(Math.min(count - 1, Math.round(track.scrollLeft / step)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [count]);

  const go = (direction: 1 | -1) => {
    const track = trackRef.current;
    const item = track?.children[Math.max(0, Math.min(count - 1, index + direction))] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <div>
      <ul
        ref={trackRef}
        aria-label="Matérias publicadas"
        className="no-scrollbar -mx-[clamp(1.25rem,4vw,3.5rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[clamp(1.25rem,4vw,3.5rem)] px-[clamp(1.25rem,4vw,3.5rem)] pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {children}
      </ul>
      <div className="mt-8 flex items-center justify-between lg:hidden">
        <p className="text-xs uppercase tracking-[0.24em] text-ivory/60" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Matéria anterior"
            className="inline-flex size-12 items-center justify-center rounded-full border border-white/20 text-ivory transition-colors hover:border-gold disabled:opacity-30"
          >
            <Icon name="chevron-left" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index >= count - 1}
            aria-label="Próxima matéria"
            className="inline-flex size-12 items-center justify-center rounded-full border border-white/20 text-ivory transition-colors hover:border-gold disabled:opacity-30"
          >
            <Icon name="chevron-right" className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
