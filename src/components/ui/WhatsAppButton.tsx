import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/links";
import { Icon } from "./Icon";

type Variant = "solid" | "dark" | "outline" | "ghost";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Identificador para análise de conversão (data-cta). */
  trackingId: string;
  showIcon?: boolean;
};

const variants: Record<Variant, string> = {
  solid:
    "bg-gold text-ink hover:bg-gold-soft shadow-[0_10px_40px_-12px_rgba(201,163,94,0.55)] hover:shadow-[0_18px_50px_-14px_rgba(201,163,94,0.75)]",
  dark: "bg-ink text-gold-soft hover:bg-graphite hover:text-ivory",
  outline: "border border-gold/60 text-gold-soft hover:border-gold hover:bg-gold/10",
  ghost: "text-ivory hover:text-gold-soft",
};

const sizes = {
  sm: "h-10 px-4 text-[0.7rem]",
  md: "h-12 px-6 text-[0.74rem]",
  lg: "h-14 px-7 sm:h-16 sm:px-9 text-[0.76rem] sm:text-[0.8rem]",
};

/** Link para o WhatsApp oficial. Abre em nova aba com segurança. */
export function WhatsAppButton({
  children,
  href = whatsappUrl,
  variant = "solid",
  size = "md",
  className,
  trackingId,
  showIcon = true,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={trackingId}
      className={cn(
        "group relative inline-flex select-none items-center justify-center gap-3 overflow-hidden rounded-full font-semibold uppercase tracking-[0.2em]",
        "transition-[background-color,box-shadow,border-color,color,transform] duration-300 ease-[var(--ease-out-expo)]",
        "active:scale-[0.97] focus-visible:outline-offset-4",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {showIcon && (
        <Icon
          name="whatsapp"
          className="size-[1.15em] shrink-0 transition-transform duration-500 group-hover:-rotate-12"
        />
      )}
      <span className="relative">{children}</span>
      <span className="sr-only"> (abre o WhatsApp em uma nova aba)</span>
    </a>
  );
}
