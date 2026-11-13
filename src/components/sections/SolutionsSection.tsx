import { solutions } from "@/content/solutions";
import { whatsappTopicUrl } from "@/lib/links";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

export function SolutionsSection() {
  return (
    <section id="servicos" aria-labelledby="solutions-title" className="bg-paper py-20 sm:py-24">
      <div className="container-x text-center">
        <Reveal>
          <h2 id="solutions-title" className="heading text-[clamp(2rem,3.6vw,2.75rem)] text-navy">
            Nossas Soluções
          </h2>
          <span className="gold-rule mx-auto mt-5" />
          <p className="mt-6 text-[1.02rem] text-slate">
            Ferramentas estratégicas para cada momento do seu patrimônio.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-navy/10">
          {solutions.map((item, index) => (
            <Reveal as="li" key={item.id} delay={0.08 * index} className="px-6">
              <a
                href={whatsappTopicUrl(item.title.toLowerCase())}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`solucao-${item.id}`}
                className="group block rounded-lg px-2 py-4 transition-colors duration-300 hover:bg-cream/70"
              >
                <Icon
                  name={item.icon}
                  className="mx-auto size-12 text-gold transition-transform duration-500 group-hover:-translate-y-1"
                />
                <h3 className="heading mt-5 text-[1.45rem] font-semibold text-navy">{item.title}</h3>
                <p className="mx-auto mt-3 max-w-[17rem] text-[0.95rem] leading-relaxed text-slate">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-deep transition-colors group-hover:text-navy">
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
