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
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="container-x grid gap-12 py-14 md:grid-cols-3">
        <div>
          <Logo className="h-14" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{siteConfig.name}</p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={`${prefix}${item.href}`} className="text-white/75 transition-colors hover:text-gold-soft">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/politica-de-privacidade" className="text-white/75 transition-colors hover:text-gold-soft">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos-e-condicoes" className="text-white/75 transition-colors hover:text-gold-soft">
                Termos e Condições
              </Link>
            </li>
          </ul>
        </nav>

        <ul className="space-y-3 text-sm">
          <li>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="rodape"
              className="inline-flex items-center gap-3 text-white/80 transition-colors hover:text-gold-soft"
            >
              <Icon name="whatsapp" className="size-4" />
              {formatPhoneBR(siteConfig.contact.whatsapp)}
              <span className="sr-only"> no WhatsApp (abre em nova aba)</span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-3 break-all text-white/80 transition-colors hover:text-gold-soft"
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
                className="inline-flex items-center gap-3 text-white/80 transition-colors hover:text-gold-soft"
              >
                <Icon name="instagram" className="size-4" />
                {instagram.handle}
                <span className="sr-only"> no Instagram (abre em nova aba)</span>
              </a>
            </li>
          )}
          {siteConfig.contact.address && <li className="text-white/70">{siteConfig.contact.address}</li>}
        </ul>
      </div>

      <div className="container-x border-t border-white/10 py-8 text-xs leading-relaxed text-white/60">
        <p>
          Conteúdo informativo, sem recomendação de investimento, oferta de crédito ou promessa de rentabilidade.
          Consórcio não é investimento e a contemplação, por sorteio ou lance, não tem data garantida. Investimentos
          envolvem riscos.
        </p>
        <p className="mt-4">
          © <CurrentYear buildYear={new Date().getFullYear()} /> {siteConfig.legal.legalName}. Todos os direitos
          reservados.
          {siteConfig.legal.cnpj && ` CNPJ ${siteConfig.legal.cnpj}.`}
        </p>
      </div>
    </footer>
  );
}
