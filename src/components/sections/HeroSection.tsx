import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Icon } from "../ui/Icon";

/** Linhas curvas douradas decorativas (como no modelo de referência). */
function GoldCurves({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1200 600" fill="none" preserveAspectRatio="none">
      <path d="M-50 560C220 470 420 520 640 360S980 60 1260 40" stroke="url(#g1)" strokeWidth="1.2" />
      <path d="M-50 600C260 540 480 580 700 430S1010 150 1260 120" stroke="url(#g1)" strokeWidth="0.8" opacity="0.6" />
      <defs>
        <linearGradient id="g1" x1="0" x2="1200" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c8a462" stopOpacity="0" />
          <stop offset="0.45" stopColor="#c8a462" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c8a462" stopOpacity="0.05" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function HeroSection() {
  const photo = siteConfig.images.hero;
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[radial-gradient(48rem_36rem_at_8%_0%,#1c3350_0%,#0e1b2c_60%)] text-white"
    >
      <GoldCurves className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Foto: coluna direita no desktop, topo no mobile */}
      <div className="relative h-[62vh] min-h-[22rem] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={`${siteConfig.people.founder}, fundador da CXP Crédito & Investimentos, em seu escritório`}
          priority
          quality={85}
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="h-full w-full object-cover object-[50%_25%]"
        />
        {/* fusão da foto com o fundo azul */}
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(to top, #0e1b2c 0%, rgba(14,27,44,0.35) 35%, rgba(14,27,44,0) 60%)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, #0e1b2c 0%, rgba(14,27,44,0.75) 18%, rgba(14,27,44,0.15) 45%, rgba(14,27,44,0) 65%), linear-gradient(to top, rgba(14,27,44,0.55) 0%, rgba(14,27,44,0) 30%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32"
          style={{ background: "linear-gradient(to bottom, rgba(14,27,44,0.85), rgba(14,27,44,0))" }}
        />
      </div>

      <div className="container-x relative">
        <div className="-mt-24 max-w-xl pb-16 lg:mt-0 lg:flex lg:min-h-[44rem] lg:flex-col lg:justify-center lg:pb-0 lg:pt-28">
          <p className="eyebrow animate-[fade-up_0.9s_var(--ease-out-expo)_both] text-white/85">
            CXP Crédito &amp; Investimentos
          </p>
          <h1
            id="hero-title"
            className="heading mt-5 animate-[fade-up_0.9s_var(--ease-out-expo)_0.1s_both] text-[clamp(2.4rem,5vw,3.9rem)]"
          >
            Estratégia, experiência e <em className="font-semibold italic text-gold">patrimônio</em>
          </h1>
          <p className="mt-6 max-w-md animate-[fade-up_0.9s_var(--ease-out-expo)_0.2s_both] text-[1.05rem] leading-relaxed text-white/80">
            Consórcios, cartas contempladas e educação financeira para construir e multiplicar o seu patrimônio com
            planejamento.
          </p>
          <a
            href="#servicos"
            className="group mt-9 inline-flex h-13 w-fit animate-[fade-up_0.9s_var(--ease-out-expo)_0.3s_both] items-center gap-3 rounded-md bg-gradient-to-b from-gold-soft to-gold px-7 py-3.5 font-semibold text-navy shadow-[0_10px_30px_-12px_rgba(200,164,98,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Conheça nossas soluções
            <Icon name="arrow-right" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
