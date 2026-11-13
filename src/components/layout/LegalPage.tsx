import { siteConfig } from "@/config/site";
import { formatDateLong } from "@/lib/format";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Pending({ children }: { children: React.ReactNode }) {
  return <span className="pending">[{children}]</span>;
}

/** Layout compartilhado das páginas legais. */
export function LegalPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <>
      <Header variant="inner" />
      <main id="conteudo" className="bg-paper text-ink">
        <div className="bg-navy pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
          <div className="container-x max-w-4xl">
            <p className="eyebrow text-gold-soft">Documento legal</p>
            <h1 className="heading mt-6 text-[clamp(2.4rem,5vw,4.2rem)]">{title}</h1>
            <p className="mt-6 max-w-2xl text-white/75">{intro}</p>
            <p className="mt-8 text-xs uppercase tracking-[0.22em] text-white/60">
              Última atualização: {formatDateLong(siteConfig.legal.lastUpdated)}
            </p>
          </div>
        </div>
        <article className="container-x prose-legal max-w-4xl py-16 sm:py-24">
          <p className="!mt-0 border border-gold/40 bg-[#f3ead8] p-5 text-sm">
            Minuta elaborada para o site da {siteConfig.name}. Este documento deve passar por revisão jurídica antes da
            publicação definitiva. Os trechos entre colchetes dependem de informações oficiais ainda não fornecidas.
          </p>
          {children}
        </article>
      </main>
      <Footer variant="inner" />
    </>
  );
}
