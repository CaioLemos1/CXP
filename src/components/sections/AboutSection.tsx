import { siteConfig } from "@/config/site";
import { Reveal } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";

function CouplePhoto() {
  const photo = siteConfig.images.couple;
  const { founder, cofounder } = siteConfig.people;
  if (photo) {
    return (
      <SmartImage
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={`${founder} e ${cofounder}, fundadores da CXP Crédito & Investimentos`}
        sizes="(min-width: 1024px) 42vw, 92vw"
        wrapperClassName="aspect-[4/5] w-full sm:aspect-square"
        className="h-full w-full object-cover object-[50%_30%]"
      />
    );
  }
  // Espaço reservado TEMPORÁRIO: substitua definindo `images.couple` em src/config/site.ts.
  return (
    <div
      role="img"
      aria-label={`Espaço reservado para a fotografia de ${founder} e ${cofounder}`}
      data-placeholder="casal"
      className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden bg-coal text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(30rem_24rem_at_50%_35%,rgba(201,163,94,0.16),transparent_70%)]" />
      <span className="relative font-serif text-[7rem] italic leading-none text-gold-soft/80">P&amp;C</span>
      <span className="relative mt-6 text-xs uppercase tracking-[0.3em] text-ivory/60">
        {founder} · {cofounder}
      </span>
      <span className="absolute bottom-5 left-5 right-5 border border-dashed border-gold/40 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-gold-soft/80">
        Foto do casal — aguardando arquivo oficial
      </span>
    </div>
  );
}

export function AboutSection() {
  const { founder, cofounder } = siteConfig.people;
  return (
    <section id="quem-somos" aria-labelledby="about-title" className="relative overflow-x-clip bg-paper text-ink">
      <div className="container-x grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-10 lg:py-40">
        <div className="lg:col-span-6 lg:pr-10 xl:col-span-6">
          <Reveal>
            <p className="eyebrow text-gold-deep">Por trás de cada estratégia, existe um propósito</p>
            <h2 id="about-title" className="mt-6 text-[0.95rem] font-semibold uppercase tracking-[0.42em] text-ink">
              Quem Somos
            </h2>
            <p className="display mt-8 text-[clamp(2.2rem,4.6vw,4rem)] text-ink">
              Uma trajetória construída <em className="italic text-gold-deep">a dois</em>, com mais de duas décadas de
              mercado.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-6 text-[1.05rem] leading-[1.8] text-[#3d3a35]">
            <p>
              <strong className="font-semibold text-ink">{founder}</strong> acumula mais de 20 anos de experiência no
              mercado financeiro. Há 9 anos, ele e sua companheira{" "}
              <strong className="font-semibold text-ink">{cofounder}</strong> fundaram a CP Assessoria.
            </p>
            <p>
              Com a expansão dos serviços, a empresa evoluiu, agregando novas frentes de atuação. Foi então que o “X”
              foi incorporado à sigla CP, simbolizando essa diversificação e dando origem à{" "}
              <strong className="font-semibold text-ink">CXP Crédito &amp; Investimentos</strong>.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <figure className="mt-12 flex items-center gap-6 border-t border-ink/10 pt-8">
              <div aria-hidden className="flex items-baseline font-serif text-5xl leading-none text-ink sm:text-6xl">
                C<span className="mx-1 italic text-gold-deep">x</span>P
              </div>
              <figcaption className="max-w-xs text-sm leading-relaxed text-mute-dark">
                O “X” representa a diversificação: novas frentes de atuação somadas à essência da CP Assessoria.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
          <figure className="relative">
            <div
              aria-hidden
              className="absolute -inset-2 translate-x-3 translate-y-3 border border-gold/50 sm:-inset-4 sm:translate-x-5 sm:translate-y-5"
            />
            <div className="relative shadow-[0_40px_80px_-40px_rgba(10,10,11,0.55)]">
              <CouplePhoto />
            </div>
            <figcaption className="relative mt-10 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-mute-dark">
              <span>
                {founder} &amp; {cofounder}
              </span>
              <span className="text-gold-deep">Fundadores</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
