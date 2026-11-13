import { differentials } from "@/content/solutions";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

export function DifferentialsSection() {
  return (
    <section id="diferenciais" aria-labelledby="diff-title" className="bg-paper py-20 sm:py-24">
      <div className="container-x text-center">
        <Reveal>
          <h2 id="diff-title" className="heading text-[clamp(2rem,3.6vw,2.75rem)] text-navy">
            Por que escolher a CXP?
          </h2>
          <span className="gold-rule mx-auto mt-5" />
        </Reveal>
        <ul className="mt-14 grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-navy/10">
          {differentials.map((item, index) => (
            <Reveal as="li" key={item.id} delay={0.06 * index} className="group px-4">
              <Icon
                name={item.icon}
                className="mx-auto size-11 text-gold transition-transform duration-500 group-hover:scale-110"
              />
              <h3 className="heading mt-4 text-[1.15rem] font-semibold leading-snug text-navy">{item.title}</h3>
              <p className="mt-1 text-sm text-slate">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
