import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Reveal } from "../ui/Reveal";

export function AboutSection() {
  const photo = siteConfig.images.about;
  const { founder, cofounder } = siteConfig.people;
  return (
    <section id="sobre" aria-labelledby="about-title" className="overflow-x-clip bg-cream py-20 sm:py-24">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden
            className="absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-2xl border border-gold/70 sm:-bottom-5 sm:-left-5"
          />
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={`${founder} lendo em seu escritório na CXP`}
            sizes="(min-width: 1024px) 34vw, 24rem"
            quality={80}
            className="relative aspect-[4/5] w-full rounded-2xl object-cover object-[50%_30%] shadow-[0_30px_60px_-30px_rgba(14,27,44,0.55)]"
          />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <p className="eyebrow text-navy">Sobre a CXP</p>
          <h2 id="about-title" className="heading mt-4 text-[clamp(2rem,3.6vw,2.75rem)] text-navy">
            Experiência que gera valor
          </h2>
          <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-slate">
            Fundada por {founder} e {cofounder}, a CXP nasceu da CP Assessoria. O “X” da sigla representa a
            diversificação: novas frentes para construir e multiplicar patrimônio.
          </p>
          <span className="gold-rule mt-8" />
          <h3 className="heading mt-6 text-xl font-semibold text-navy">Sobre o Fundador</h3>
          <p className="mt-2 max-w-xl leading-relaxed text-slate">
            {founder} acumula mais de 20 anos de experiência no mercado financeiro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
