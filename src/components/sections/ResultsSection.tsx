import { results } from "@/content/solutions";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

export function ResultsSection() {
  return (
    <section id="resultados" aria-labelledby="results-title" className="bg-paper py-20 sm:py-24">
      <div className="container-x text-center">
        <Reveal>
          <h2 id="results-title" className="heading text-[clamp(2rem,3.6vw,2.75rem)] text-navy">
            Nossos Resultados
          </h2>
          <span className="gold-rule mx-auto mt-5" />
        </Reveal>
        <ul className="mt-14 grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-navy/10">
          {results.map((item, index) => (
            <Reveal as="li" key={item.id} delay={0.06 * index} className="group px-4">
              <Icon
                name={item.icon}
                className="mx-auto size-10 text-gold transition-transform duration-500 group-hover:scale-110"
              />
              <p className="mt-4 text-navy">
                {item.prefix && item.prefix !== "+" && (
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                    {item.prefix}
                  </span>
                )}
                <span className="heading block text-[clamp(2.6rem,5vw,3.6rem)] font-semibold leading-none">
                  {item.prefix === "+" && <span className="text-gold">+</span>}
                  {item.value}
                </span>
                {item.unit && (
                  <span className="mt-2 block text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                    {item.unit}
                  </span>
                )}
              </p>
              <p className="mx-auto mt-3 max-w-[14rem] text-sm leading-relaxed text-slate">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
