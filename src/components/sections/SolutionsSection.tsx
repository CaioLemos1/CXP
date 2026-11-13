import { consortiumSteps, solutions } from "@/content/solutions";
import { whatsappTopicUrl } from "@/lib/links";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

const distinctions = [
  {
    title: "Consórcio",
    text: "Autofinanciamento em grupo para aquisição de bens. Não é investimento com rendimento e não tem contemplação garantida em data definida.",
  },
  {
    title: "Crédito",
    text: "Recurso de terceiros com custo (juros, tarifas, encargos). Exige análise e aprovação, e deve caber no seu orçamento.",
  },
  {
    title: "Investimento",
    text: "Aplicação de recursos em busca de retorno, sempre sujeita a riscos. Rentabilidade passada não garante resultados futuros.",
  },
];

export function SolutionsSection() {
  return (
    <section id="solucoes" aria-labelledby="solutions-title" className="relative bg-coal py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow text-gold-soft">Soluções</p>
            <h2 id="solutions-title" className="display mt-8 text-[clamp(2.3rem,5.2vw,4.6rem)] text-ivory">
              Soluções inteligentes para diferentes momentos do seu{" "}
              <em className="italic text-gold-soft">patrimônio.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="text-[1.02rem] leading-relaxed text-ivory/65">
              Do primeiro bem à expansão do patrimônio da sua empresa: cada estratégia começa pelo seu objetivo, seu
              prazo e o seu momento financeiro.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-sm bg-white/[0.08] sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <Reveal as="li" key={solution.id} delay={0.06 * (index % 3)} className="flex">
              <article
                id={`solucao-${solution.id}`}
                className="group relative flex w-full flex-col bg-coal p-8 transition-colors duration-500 hover:bg-graphite sm:p-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-soft to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/30 text-gold-soft transition-[transform,border-color,background-color] duration-500 group-hover:-translate-y-1 group-hover:border-gold group-hover:bg-gold/10">
                    <Icon name={solution.icon} className="size-6" />
                  </span>
                  <span aria-hidden className="font-serif text-sm italic text-ivory/50">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-10 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
                  {solution.kicker}
                </p>
                <h3 className="mt-3 font-serif text-[1.9rem] leading-tight text-ivory">{solution.title}</h3>
                <p className="mt-4 text-[0.97rem] leading-relaxed text-ivory/65">{solution.description}</p>
                <ul className="mt-6 space-y-2.5 text-sm text-ivory/70">
                  {solution.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-gold/70" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappTopicUrl(solution.topic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={`solucao-${solution.id}`}
                  className="mt-auto inline-flex items-center gap-3 pt-10 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-gold-soft transition-colors hover:text-ivory"
                >
                  Conversar sobre isso
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform duration-500 group-hover:translate-x-1.5"
                  />
                  <span className="sr-only">: {solution.title} (abre o WhatsApp em uma nova aba)</span>
                </a>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Como funciona o consórcio */}
        <div className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-gold-soft">Consórcio, passo a passo</p>
            <h3 className="display mt-6 text-[clamp(2rem,3.6vw,3rem)] text-ivory">
              Entenda antes de <em className="italic text-gold-soft">decidir.</em>
            </h3>
            <p className="mt-6 text-[0.97rem] leading-relaxed text-ivory/60">
              Taxa de administração, fundo de reserva, seguro, regras de lance e prazo estão no contrato de cada grupo e
              variam conforme a administradora. Leia tudo com atenção — nós ajudamos a interpretar.
            </p>
          </Reveal>
          <ol className="grid gap-px bg-white/[0.08] sm:grid-cols-2 lg:col-span-8">
            {consortiumSteps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={0.07 * index} className="bg-coal p-8">
                <span className="font-serif text-4xl italic text-gold/80">{index + 1}</span>
                <h4 className="mt-4 text-base font-semibold text-ivory">{step.title}</h4>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-ivory/60">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-20 border border-white/[0.08] p-8 sm:p-10">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-gold">Transparência</p>
          <dl className="mt-6 grid gap-8 md:grid-cols-3">
            {distinctions.map((item) => (
              <div key={item.title}>
                <dt className="font-serif text-xl text-ivory">{item.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ivory/60">{item.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
