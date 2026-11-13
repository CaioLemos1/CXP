import { educationConcepts, stockMarketTopics } from "@/content/education";
import { whatsappTopicUrl } from "@/lib/links";
import { Reveal } from "../ui/Reveal";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { CompoundSimulator } from "./CompoundSimulator";

export function InvestmentEducation() {
  return (
    <section
      id="investimentos"
      aria-labelledby="education-title"
      className="relative bg-ivory py-24 text-ink sm:py-32 lg:py-40"
    >
      <div className="container-x">
        <Reveal className="max-w-5xl">
          <p className="eyebrow text-gold-deep">Educação financeira</p>
          <h2 id="education-title" className="display mt-8 text-[clamp(2.3rem,5.4vw,4.8rem)]">
            O futuro financeiro que você deseja começa nas decisões que{" "}
            <em className="italic text-gold-deep">toma hoje.</em>
          </h2>
          <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-[#4a463f]">
            “A saúde financeira impacta diretamente o bem-estar, a produtividade e a qualidade de vida das pessoas.” Por
            isso, antes de qualquer produto, vem o entendimento.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-x-10 gap-y-12 border-t border-ink/10 pt-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {educationConcepts.map((concept, index) => (
            <Reveal as="li" key={concept.id} delay={0.05 * (index % 4)} className="group">
              <span className="font-serif text-sm italic text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-serif text-2xl leading-tight">{concept.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[#4a463f]">{concept.text}</p>
              <span
                aria-hidden
                className="mt-5 block h-px w-8 bg-gold-deep/60 transition-[width] duration-700 group-hover:w-20"
              />
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-20 lg:mt-28">
          <CompoundSimulator />
        </Reveal>

        {/* Bolsa de valores */}
        <div className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold-deep">Bolsa de valores</p>
            <h3 className="display mt-6 text-[clamp(2rem,3.8vw,3.4rem)]">
              Renda variável pede <em className="italic text-gold-deep">conhecimento</em>, não pressa.
            </h3>
            <p className="mt-6 text-[1rem] leading-relaxed text-[#4a463f]">
              A bolsa pode fazer parte de uma estratégia de longo prazo e diversificada. Os preços oscilam, podem cair e
              não há retorno garantido — por isso, entender os fundamentos vem antes de investir.
            </p>
            <p className="mt-6 text-xs leading-relaxed text-mute-dark">
              Conteúdo educativo. Operações com valores mobiliários são realizadas por meio de instituições autorizadas
              pela CVM.
            </p>
          </Reveal>
          <dl className="grid gap-px overflow-hidden bg-ink/10 sm:grid-cols-2 lg:col-span-7">
            {stockMarketTopics.map((topic, index) => (
              <Reveal
                key={topic.id}
                delay={0.05 * index}
                className={index === stockMarketTopics.length - 1 ? "bg-ivory p-7 sm:col-span-2" : "bg-ivory p-7"}
              >
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold-deep">
                  {topic.title}
                </dt>
                <dd className="mt-3 text-[0.97rem] leading-relaxed text-[#3d3a35]">{topic.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-ink/10 pt-12 lg:flex-row lg:items-center">
          <p className="max-w-xl font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight">
            Quais são os seus objetivos para os próximos anos? Vamos conversar sobre eles.
          </p>
          <WhatsAppButton
            trackingId="educacao"
            href={whatsappTopicUrl("os meus objetivos financeiros e como planejar o meu patrimônio")}
            size="lg"
            variant="dark"
          >
            Conversar sobre meus objetivos
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}
