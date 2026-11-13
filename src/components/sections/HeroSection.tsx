import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { InteractiveCXP } from "./InteractiveCXP";

const facts = [
  { value: "+20 anos", label: "de experiência de Pedro Fonseca no mercado financeiro" },
  { value: "Consórcios", label: "e cartas contempladas como ferramentas de alavancagem patrimonial" },
  { value: "6 matérias", label: "publicadas no jornal News Rondônia" },
];

export function HeroSection() {
  return (
    <section
      id="inicio"
      data-hero
      aria-labelledby="hero-title"
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink [--spot-x:50%] [--spot-y:45%]"
    >
      {/* luz ambiente que acompanha o cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_var(--spot-x)_var(--spot-y),rgba(201,163,94,0.13),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent"
      />
      <InteractiveCXP />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-start pb-6 pt-[calc(5.5rem+31vw)] lg:justify-center lg:pb-0 lg:pt-28">
        <p className="eyebrow animate-[fade-up_1s_var(--ease-out-expo)_both] text-gold-soft">
          Crédito & Investimentos · {siteConfig.region}
        </p>

        <h1 id="hero-title" className="display mt-6 max-w-[16ch] text-[clamp(2.4rem,6.6vw,6.2rem)] text-ivory">
          <span className="block animate-[fade-up_1.1s_var(--ease-out-expo)_0.08s_both]">Seu patrimônio não</span>
          <span className="block animate-[fade-up_1.1s_var(--ease-out-expo)_0.16s_both]">cresce por acaso.</span>
          <span className="block animate-[fade-up_1.1s_var(--ease-out-expo)_0.24s_both]">
            Cresce com <em className="font-normal italic text-gold-soft">estratégia.</em>
          </span>
        </h1>

        <p className="mt-7 max-w-[34rem] animate-[fade-up_1.1s_var(--ease-out-expo)_0.36s_both] text-[1.02rem] leading-relaxed text-ivory/70 sm:text-lg">
          Consórcios, cartas contempladas, planejamento de crédito e educação financeira para transformar seus objetivos
          em conquistas reais — com planejamento e inteligência financeira.
        </p>

        <div className="mt-9 flex animate-[fade-up_1.1s_var(--ease-out-expo)_0.46s_both] flex-col gap-4 sm:flex-row sm:items-center">
          <WhatsAppButton trackingId="hero" size="lg">
            Fale com um especialista
          </WhatsAppButton>
          <a
            href="#quem-somos"
            className="group inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/20 px-7 text-[0.76rem] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:border-gold/70 hover:text-gold-soft sm:h-16 sm:px-9"
          >
            Conheça a CXP
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </div>

      <div className="container-x relative z-10 mt-8 pb-8 lg:mt-0 lg:pb-10">
        <div className="hairline mb-6 opacity-60" />
        <dl className="grid gap-5 sm:grid-cols-3 sm:gap-8">
          {facts.map((fact, index) => (
            <div
              key={fact.value}
              className="flex animate-[fade-up_1.1s_var(--ease-out-expo)_both] items-baseline gap-4 sm:block"
              style={{ animationDelay: `${0.6 + index * 0.08}s` }}
            >
              <dt className="shrink-0 font-serif text-2xl text-gold-soft sm:text-[1.7rem]">{fact.value}</dt>
              <dd className="text-sm leading-snug text-ivory/60 sm:mt-1.5 sm:max-w-[16rem]">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
