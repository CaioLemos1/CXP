import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  const { src, width, height } = siteConfig.images.logo;
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={siteConfig.name}
      priority={priority}
      sizes="160px"
      className={cn("w-auto", className)}
    />
  );
}
