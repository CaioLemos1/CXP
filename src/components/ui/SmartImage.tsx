"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Imagem com skeleton elegante enquanto o arquivo real carrega.
 * O container reserva o espaço (sem layout shift).
 */
export function SmartImage({ className, wrapperClassName, ...props }: ImageProps & { wrapperClassName?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)} data-loaded={loaded}>
      <div
        aria-hidden
        className={cn("skeleton absolute inset-0 transition-opacity duration-700", loaded && "opacity-0")}
      />
      <Image
        {...props}
        className={cn(
          "transition-[opacity,transform] duration-1000 ease-[var(--ease-out-expo)]",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
