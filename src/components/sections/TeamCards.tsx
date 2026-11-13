import Image from "next/image";
import { siteConfig } from "@/config/site";
import { formatPhoneBR } from "@/lib/format";
import { whatsappPersonUrl } from "@/lib/links";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

/** Quem conduz a CXP: dados do Portfólio Comercial 3.0. */
export function TeamCards() {
  return (
    <ul className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-2">
      {siteConfig.team.map((person, index) => (
        <Reveal
          as="li"
          key={person.id}
          delay={0.08 * index}
          className="flex flex-col rounded-2xl border border-navy/10 bg-paper p-7 shadow-[0_24px_50px_-36px_rgba(14,27,44,0.5)] sm:p-8"
        >
          <div className="flex items-center gap-5">
            <Image
              src={person.photo.src}
              width={person.photo.width}
              height={person.photo.height}
              alt={`Retrato de ${person.name}`}
              sizes="88px"
              className="size-[5.5rem] shrink-0 rounded-full object-cover ring-2 ring-gold ring-offset-4 ring-offset-paper"
            />
            <div>
              <h3 className="heading text-[1.6rem] font-semibold text-navy">{person.name}</h3>
              <p className="mt-1 text-[0.8rem] font-semibold leading-relaxed text-gold-deep">
                {person.roles.join(" · ")}
              </p>
            </div>
          </div>
          <p className="mt-6 text-[0.97rem] leading-relaxed text-slate">{person.bio}</p>
          <blockquote className="heading mt-5 border-l-2 border-gold pl-4 text-[1.05rem] italic text-navy">
            “{person.quote}”
          </blockquote>
          {person.credentials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {person.credentials.map((credential) => (
                <li
                  key={credential}
                  className="rounded-full border border-gold/60 px-3 py-1 text-xs font-semibold text-navy"
                >
                  {credential}
                </li>
              ))}
            </ul>
          )}
          <a
            href={whatsappPersonUrl(person.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`equipe-${person.id}`}
            className="mt-auto inline-flex w-fit items-center gap-2.5 pt-7 text-sm font-semibold text-navy transition-colors hover:text-gold-deep"
          >
            <Icon name="whatsapp" className="size-4 text-gold-deep" />
            {formatPhoneBR(person.whatsapp)}
            <span className="sr-only"> — falar com {person.name} no WhatsApp (abre em nova aba)</span>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
