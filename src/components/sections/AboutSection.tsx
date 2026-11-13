import Image from "next/image";
import { siteConfig } from "@/config/site";
import { timeline } from "@/content/solutions";
import { Reveal } from "../ui/Reveal";
import { TeamCards } from "./TeamCards";

export function AboutSection() {
  const photo = siteConfig.images.about;
  return (
    <section id="sobre" aria-labelledby="about-title" className="overflow-x-clip bg-cream py-20 sm:py-24">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <div
              aria-hidden
              className="absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-2xl border border-gold/70 sm:-bottom-5 sm:-left-5"
            />
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={`${siteConfig.people.founder} lendo em seu escritório na CXP`}
              sizes="(min-width: 1024px) 34vw, 24rem"
              quality={80}
              className="relative aspect-[4/5] w-full rounded-2xl object-cover object-[50%_30%] shadow-[0_30px_60px_-30px_rgba(14,27,44,0.55)]"
            />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="eyebrow text-navy">Quem Somos</p>
            <h2 id="about-title" className="heading mt-4 text-[clamp(2rem,3.6vw,2.75rem)] text-navy">
              Conhecimento que vira patrimônio
            </h2>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-slate">
              A CXP Crédito &amp; Investimentos nasceu com o propósito de transformar conhecimento financeiro em
              oportunidades de crescimento e construção patrimonial.
            </p>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-slate">
              Mais do que oferecer produtos financeiros, buscamos orientar decisões inteligentes.
            </p>
            <span className="gold-rule mt-8" />
            <h3 className="heading mt-6 text-xl font-semibold text-navy">Nossa Trajetória</h3>
            <ol className="mt-5 grid max-w-xl gap-5 sm:grid-cols-3">
              {timeline.map((step) => (
                <li key={step.id} className="border-l-2 border-gold pl-4">
                  <span className="heading block text-xl font-semibold text-navy">{step.label}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate">{step.text}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <TeamCards />
      </div>
    </section>
  );
}
