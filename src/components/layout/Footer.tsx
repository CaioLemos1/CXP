import Link from "next/link";
import { navigation, siteConfig } from "@/config/site";
import { formatPhoneBR } from "@/lib/format";
import { whatsappUrl } from "@/lib/links";
import { CurrentYear } from "../ui/CurrentYear";
import { Icon } from "../ui/Icon";
import { Logo } from "../ui/Logo";

export function Footer({ variant = "home" }: { variant?: "home" | "inner" }) {
  const prefix = variant === "home" ? "" : "/";
  const instagram = siteConfig.social.instagram;
  return (
    <footer className="border-t border-white/[0.08] bg-ink text-ivory">
      <div className="container-x grid gap-14 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="h-14" />
          <p className="mt-6 font-serif text-xl">{siteConfig.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
            Educação e consciência financeira, consórcios e cartas contempladas como ferramentas estratégicas para
            construir e multiplicar patrimônio com planejamento.
          </p>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-2 lg:col-start-6">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-gold">Navegação</p>
          <ul className="mt-6 space-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={`${prefix}${item.href}`} className="text-ivory/70 transition-colors hover:text-gold-soft">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-gold">Contato oficial</p>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="rodape"
                className="inline-flex items-center gap-3 text-ivory/80 transition-colors hover:text-gold-soft"
              >
                <Icon name="whatsapp" className="size-4" />
                {formatPhoneBR(siteConfig.contact.whatsapp)}
                <span className="sr-only"> no WhatsApp (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-3 break-all text-ivory/80 transition-colors hover:text-gold-soft"
              >
                <Icon name="mail" className="size-4 shrink-0" />
                {siteConfig.contact.email}
              </a>
            </li>
            {instagram && (
              <li>
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-ivory/80 transition-colors hover:text-gold-soft"
                >
                  <Icon name="instagram" className="size-4" />
                  {instagram.handle}
                  <span className="sr-only"> no Instagram (abre em nova aba)</span>
                </a>
              </li>
            )}
            {siteConfig.contact.address && <li className="text-ivory/60">{siteConfig.contact.address}</li>}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-gold">Legal</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <Link href="/politica-de-privacidade" className="text-ivory/70 transition-colors hover:text-gold-soft">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos-e-condicoes" className="text-ivory/70 transition-colors hover:text-gold-soft">
                Termos e Condições
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x">
        <div className="hairline opacity-40" />
        <div className="grid gap-4 py-10 text-xs leading-relaxed text-ivory/60 lg:grid-cols-3 lg:gap-10">
          <p>
            As informações deste site têm caráter exclusivamente informativo e educativo. Não constituem recomendação de
            investimento, oferta de crédito ou promessa de rentabilidade.
          </p>
          <p>
            Consórcio não é investimento: a contemplação ocorre por sorteio ou lance, sem data garantida, e as condições
            dependem do contrato de cada administradora. Operações de crédito estão sujeitas a análise e aprovação.
          </p>
          <p>
            Investimentos envolvem riscos, inclusive de perda do capital investido. Rentabilidade passada não é garantia
            de rentabilidade futura. Simulações do site são ilustrativas.
          </p>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/[0.06] py-8 text-xs text-ivory/60 sm:flex-row sm:justify-between">
          <p>
            © <CurrentYear buildYear={new Date().getFullYear()} /> {siteConfig.legal.legalName}. Todos os direitos
            reservados.
          </p>
          {siteConfig.legal.cnpj && <p>CNPJ {siteConfig.legal.cnpj}</p>}
        </div>
      </div>
    </footer>
  );
}
