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
        <h2 id="cta-title" className="heading mx-auto max-w-2xl text-[clamp(1.9rem,3.4vw,2.6rem)]">
          Vamos construir o próximo capítulo do seu patrimônio?
        </h2>
        <WhatsAppButton trackingId="cta-final" size="lg" arrow className="mt-9">
          Fale com a CXP
        </WhatsAppButton>
      </Reveal>
    </section>
  );
}
