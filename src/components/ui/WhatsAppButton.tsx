import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/links";
import { Icon } from "./Icon";

type Props = {
  children: React.ReactNode;
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Identificador para análise de conversão (data-cta). */
  trackingId: string;
  arrow?: boolean;
};

const sizes = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

/** Botão dourado que abre o WhatsApp oficial em nova aba. */
export function WhatsAppButton({
  children,
  href = whatsappUrl,
  size = "md",
  className,
  trackingId,
  arrow = false,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={trackingId}
      className={cn(
        "group inline-flex select-none items-center justify-center gap-3 rounded-md bg-gradient-to-b from-gold-soft to-gold font-semibold text-navy",
        "shadow-[0_10px_30px_-12px_rgba(200,164,98,0.7)] transition-[transform,box-shadow,filter] duration-300 ease-[var(--ease-out-expo)]",
        "hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(200,164,98,0.85)] hover:brightness-105 active:translate-y-0 active:scale-[0.98]",
        sizes[size],
        className,
      )}
    >
      <span>{children}</span>
      {arrow && (
        <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
      <span className="sr-only"> (abre o WhatsApp em uma nova aba)</span>
    </a>
  );
}
