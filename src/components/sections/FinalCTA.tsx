import { siteConfig } from "@/config/site";
import { formatPhoneBR } from "@/lib/format";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function FinalCTA() {
  const { founder } = siteConfig.images;
  const instagram = siteConfig.social.instagram;
  return (
    <section id="contato" aria-labelledby="cta-title" className="relative overflow-hidden bg-graphite">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_36rem_at_75%_40%,rgba(201,163,94,0.14),transparent_65%)]"
      />
      <div className="container-x relative grid items-center gap-14 py-24 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <figure className="relative">
            <div aria-hidden className="absolute -inset-px bg-gradient-to-b from-gold/70 via-gold/10 to-transparent" />
            <SmartImage
              src={founder.src}
              width={founder.width}
              height={founder.height}
              alt={`${siteConfig.people.founder}, fundador da CXP Crédito & Investimentos, sentado à mesa em seu escritório`}
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 92vw"
              quality={85}
              wrapperClassName="relative aspect-[4/5] w-full"
              className="h-full w-full object-cover object-[50%_22%] transition-transform duration-[1.6s] hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/90 to-transparent"
            />
            <figcaption className="absolute bottom-6 left-6 right-6">
              <span className="block font-serif text-2xl text-ivory">{siteConfig.people.founder}</span>
              <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.26em] text-gold-soft">
                Fundador · +20 anos no mercado financeiro
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            <p className="eyebrow text-gold-soft">Contato</p>
            <h2 id="cta-title" className="display mt-8 text-[clamp(2.4rem,5.6vw,5rem)] text-ivory">
              Seu próximo passo financeiro merece uma estratégia <em className="italic text-gold-soft">à altura.</em>
            </h2>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ivory/70 sm:text-lg">
              Converse com a equipe CXP e descubra quais soluções fazem sentido para seus objetivos e para o momento do
              seu patrimônio.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <WhatsAppButton trackingId="cta-final" size="lg" className="w-full sm:w-auto">
              Conversar com a equipe no WhatsApp
            </WhatsAppButton>
          </Reveal>
          <Reveal delay={0.16}>
            <ul className="mt-12 grid gap-6 border-t border-white/10 pt-8 text-sm sm:grid-cols-3">
              <li>
                <span className="block text-[0.66rem] uppercase tracking-[0.24em] text-ivory/60">WhatsApp</span>
                <span className="mt-2 block text-ivory">{formatPhoneBR(siteConfig.contact.whatsapp)}</span>
              </li>
              <li>
                <span className="block text-[0.66rem] uppercase tracking-[0.24em] text-ivory/60">E-mail</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-2 inline-flex items-center gap-2 break-all text-ivory transition-colors hover:text-gold-soft"
                >
                  <Icon name="mail" className="size-4 shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              {instagram && (
                <li>
                  <span className="block text-[0.66rem] uppercase tracking-[0.24em] text-ivory/60">Instagram</span>
                  <a
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-ivory transition-colors hover:text-gold-soft"
                  >
                    <Icon name="instagram" className="size-4" />
                    {instagram.handle}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
