import { PRESS_OUTLET, pressArticles } from "@/content/press";
import { formatDateLong, formatDateShort } from "@/lib/format";
import { sortByDateDesc } from "@/lib/press";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

export function PressSection() {
  const articles = sortByDateDesc(pressArticles);
  return (
    <section id="imprensa" aria-labelledby="press-title" className="bg-cream py-20 sm:py-24">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow text-navy">Na imprensa</p>
          <h2 id="press-title" className="heading mt-4 text-[clamp(1.8rem,3.2vw,2.5rem)] text-navy">
            Matérias publicadas no jornal News Rondônia
          </h2>
          <span className="gold-rule mx-auto mt-5" />
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Reveal as="li" key={article.id} delay={0.05 * (index % 3)} className="flex">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                data-press={article.id}
                className="group flex w-full flex-col justify-between rounded-xl border border-navy/10 bg-paper p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_20px_40px_-24px_rgba(14,27,44,0.45)]"
              >
                <div>
                  <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
                    <span>{article.outlet}</span>
                    <time dateTime={article.date}>{formatDateShort(article.date)}</time>
                  </p>
                  <h3 className="heading mt-4 text-[1.12rem] font-semibold text-navy">{article.title}</h3>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-navy">
                  Ler matéria
                  <Icon
                    name="arrow-up-right"
                    className="size-4 text-gold-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
                <span className="sr-only">
                  : {article.title}, publicada em {formatDateLong(article.date)} no {PRESS_OUTLET} (abre em nova aba)
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
