"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/config/site";
import { cn } from "@/lib/cn";
import { Icon } from "../ui/Icon";
import { Logo } from "../ui/Logo";
import { WhatsAppButton } from "../ui/WhatsAppButton";

/** Na home usa âncoras; nas páginas internas aponta para "/#secao". */
export function Header({ variant = "home" }: { variant?: "home" | "inner" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#inicio");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const prefix = variant === "home" ? "" : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca o item de menu da seção visível.
  useEffect(() => {
    if (variant !== "home") return;
    const sections = navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [variant]);

  // Menu mobile: trava a rolagem, fecha com Esc e mantém o foco dentro do painel.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-white/[0.07] bg-ink/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link
          href={`${prefix}#inicio`}
          className="relative z-10 shrink-0"
          aria-label="CXP Crédito & Investimentos — início"
        >
          <Logo priority className="h-11 lg:h-12" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navigation.map((item) => {
              const isActive = variant === "home" && active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={`${prefix}${item.href}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-3 py-2 text-[0.8rem] tracking-[0.06em] transition-colors duration-300",
                      isActive ? "text-gold-soft" : "text-ivory/70 hover:text-ivory",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)]",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <WhatsAppButton trackingId="header" size="sm">
              WhatsApp
            </WhatsAppButton>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-ivory transition-colors hover:border-gold/70 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] h-[calc(100dvh-4.5rem)] overflow-y-auto bg-ink px-6 pb-10 pt-8 lg:hidden"
      >
        <nav aria-label="Menu mobile">
          <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <a
                  href={`${prefix}${item.href}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 font-serif text-[1.9rem] leading-none text-ivory transition-colors hover:text-gold-soft"
                >
                  {item.label}
                  <span className="font-sans text-xs tracking-[0.2em] text-mute">0{index + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <WhatsAppButton trackingId="menu-mobile" size="lg" className="mt-10 w-full">
          Fale com um especialista
        </WhatsAppButton>
      </div>
    </header>
  );
}
