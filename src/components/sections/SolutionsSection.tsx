import { solutions } from "@/content/solutions";
import { whatsappTopicUrl } from "@/lib/links";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

export function SolutionsSection() {
  return (
    <section id="solucoes" aria-labelledby="solutions-title" className="bg-paper py-20 sm:py-24">
      <div className="container-x text-center">
        <Reveal>
          <h2 id="solutions-title" className="heading text-[clamp(2rem,3.6vw,2.75rem)] text-navy">
            Nossas Soluções
          </h2>
          <span className="gold-rule mx-auto mt-5" />
          <p className="mt-6 text-[1.02rem] text-slate">
            Soluções em crédito, consórcios, educação e planejamento financeiro.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-navy/10">
          {solutions.map((item, index) => (
            <Reveal as="li" key={item.id} delay={0.07 * index} className="flex px-3">
              <a
                href={whatsappTopicUrl(item.title)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`solucao-${item.id}`}
                className="group flex w-full flex-col items-center rounded-lg px-3 py-4 transition-colors duration-300 hover:bg-cream/70"
              >
                <Icon
                  name={item.icon}
                  className="size-12 text-gold transition-transform duration-500 group-hover:-translate-y-1"
                />
                <h3 className="heading mt-5 text-[1.3rem] font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 max-w-[17rem] text-[0.93rem] leading-relaxed text-slate">{item.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-gold-deep transition-colors group-hover:text-navy">
                  Saiba mais
                  <Icon name="arrow-right" className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="sr-only"> sobre {item.title} no WhatsApp (abre em nova aba)</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
