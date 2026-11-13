import { Reveal } from "../ui/Reveal";

const pillars = [
  {
    n: "01",
    title: "Soluções estratégicas e personalizadas",
    text: "Acesso a soluções pensadas para o crescimento sólido e eficiente do seu patrimônio.",
  },
  {
    n: "02",
    title: "Educação e consciência financeira",
    text: "Para empresários, empresas e força de trabalho: conhecimento, segurança e transparência.",
  },
  {
    n: "03",
    title: "Planejamento e inteligência financeira",
    text: "Para que nossos clientes construam e multipliquem seu patrimônio com método.",
  },
  {
    n: "04",
    title: "Consórcios e cartas contempladas",
    text: "Ferramentas inteligentes para alavancar conquistas, maximizar oportunidades e otimizar recursos.",
  },
];

export function PurposeSection() {
  return (
    <section aria-labelledby="purpose-title" className="grain relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 size-[38rem] rounded-full border border-gold/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-32 size-[28rem] rounded-full border border-rose/10"
      />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow text-gold-soft">Propósito CXP Crédito &amp; Investimentos</p>
          <h2 id="purpose-title" className="display mt-8 max-w-[18ch] text-[clamp(2.4rem,6vw,5.4rem)] text-ivory">
            Realizando os sonhos da sua <em className="italic text-gold-soft">família</em> e impulsionando seu{" "}
            <em className="italic text-gold-soft">patrimônio.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <Reveal delay={0.08} className="lg:col-span-5">
            <blockquote className="border-l border-gold/60 pl-6 text-lg leading-relaxed text-ivory/80 sm:text-xl">
              Nosso propósito é transformar os sonhos financeiros e objetivos individuais de nossos clientes em{" "}
              <span className="text-gold-soft">conquistas reais</span>.
            </blockquote>
          </Reveal>

          <ol className="grid gap-px overflow-hidden bg-white/[0.08] sm:grid-cols-2 lg:col-span-7">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.n} as="li" delay={0.08 * index} className="group bg-ink p-7 sm:p-9">
                <span className="font-serif text-sm italic text-gold">{pillar.n}</span>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-ivory">{pillar.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/60">{pillar.text}</p>
                <span
                  aria-hidden
                  className="mt-7 block h-px w-10 bg-gold/60 transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-24"
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
