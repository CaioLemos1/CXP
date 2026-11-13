import { siteConfig } from "@/config/site";
import { whatsappPersonUrl } from "@/lib/links";
import { Reveal } from "../ui/Reveal";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function FinalCTA() {
  return (
    <section
      id="contato"
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-[radial-gradient(60rem_30rem_at_50%_0%,#1c3350_0%,#0e1b2c_70%)] py-20 text-center text-white sm:py-24"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 300"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M-40 260C200 120 360 60 520 40" stroke="#c8a462" strokeOpacity="0.3" />
        <path d="M760 300C900 180 1060 120 1240 110" stroke="#c8a462" strokeOpacity="0.3" />
      </svg>
      <Reveal className="container-x relative">
        <p className="eyebrow text-gold-soft">Fale Conosco</p>
        <h2 id="cta-title" className="heading mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.2vw,3.2rem)]">
          Não vendemos consórcios. <em className="font-semibold italic text-gold">Multiplicamos futuros.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-white/80">
          Vamos conversar sobre os seus objetivos e encontrar a melhor solução para você ou para o seu negócio.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {siteConfig.team.map((person, index) => (
            <WhatsAppButton
              key={person.id}
              trackingId={index === 0 ? "cta-final" : `cta-final-${person.id}`}
              href={whatsappPersonUrl(person.whatsapp)}
              size="lg"
              arrow
              className="w-full sm:w-auto"
            >
              Falar com {person.name.split(" ")[0]}
            </WhatsAppButton>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
