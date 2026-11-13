"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/links";
import { Icon } from "./Icon";

/** Atalho discreto para o WhatsApp: aparece após a hero e some na seção de contato. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contato");
    if (!hero || !contact) return;
    const state = { heroVisible: true, contactVisible: false };
    const update = () => setVisible(!state.heroVisible && !state.contactVisible);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) state.heroVisible = entry.isIntersecting;
        if (entry.target === contact) state.contactVisible = entry.isIntersecting;
      }
      update();
    });
    observer.observe(hero);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="flutuante"
      inert={!visible}
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-gold text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] transition-[opacity,transform,background-color] duration-500 ease-[var(--ease-out-expo)] hover:bg-gold-soft active:scale-95 sm:bottom-8 sm:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <Icon name="whatsapp" className="size-6" />
      <span className="sr-only">Falar com a CXP pelo WhatsApp (abre em nova aba)</span>
    </a>
  );
}
