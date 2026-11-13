import { PRESS_OUTLET, pressArticles } from "@/content/press";
import { cn } from "@/lib/cn";
import { formatDateLong, formatDateShort, parseIsoDate } from "@/lib/format";
import { sortByDateDesc } from "@/lib/press";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { PressCarousel } from "./PressCarousel";

export function PressSection() {
  const articles = sortByDateDesc(pressArticles);
  return (
    <section
      id="imprensa"
      aria-labelledby="press-title"
      className="grain relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-40"
    >
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow text-gold-soft">Na imprensa</p>
            <h2
              id="press-title"
              className="mt-8 max-w-[22ch] text-[clamp(1.6rem,3.3vw,2.9rem)] font-semibold uppercase leading-[1.08] tracking-[0.04em] text-ivory"
            >
              Matérias publicadas no jornal{" "}
              <span className="font-serif font-medium normal-case italic tracking-normal text-gold-soft">
                News Rondônia
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="text-[1.02rem] leading-relaxed text-ivory/65">
              Educação financeira, encontros com empresários e estratégias patrimoniais da CXP na cobertura da imprensa
              de Rondônia.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 lg:mt-20">
          <PressCarousel count={articles.length}>
            {articles.map((article, index) => {
              const featured = index === 0;
              const wide = index === articles.length - 1;
              const { day, month } = parseIsoDate(article.date);
              return (
                <li
                  key={article.id}
                  className={cn(
                    "w-[84%] shrink-0 snap-start sm:w-[58%] lg:w-auto",
                    featured && "lg:col-span-1 lg:row-span-2",
                    wide && "lg:col-span-3",
                  )}
                >
                  <Reveal className="h-full" delay={0.06 * (index % 3)}>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-press={article.id}
                      className={cn(
                        "group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden border p-7 transition-[transform,border-color,box-shadow,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:p-8",
                        featured
                          ? "border-gold/40 bg-ivory text-ink hover:shadow-[0_40px_80px_-30px_rgba(201,163,94,0.45)] lg:min-h-full"
                          : "border-white/[0.09] bg-coal text-ivory hover:border-gold/60 hover:bg-graphite",
                        wide && "lg:min-h-0 lg:flex-row lg:items-end lg:gap-16",
                      )}
                    >
                      <div className={cn(wide && "lg:max-w-3xl lg:flex-1")}>
                        <div
                          className={cn(
                            "flex items-center justify-between border-b pb-4 text-[0.66rem] font-semibold uppercase tracking-[0.28em]",
                            featured ? "border-ink/15 text-ink/70" : "border-white/10 text-ivory/55",
                          )}
                        >
                          <span>{article.outlet}</span>
                          <time dateTime={article.date}>{formatDateShort(article.date)}</time>
                        </div>
                        {featured && (
                          <p
                            aria-hidden
                            className="mt-8 font-serif text-[6.5rem] leading-[0.8] tracking-[-0.04em] text-gold-deep"
                          >
                            {String(day).padStart(2, "0")}
                            <span className="text-ink/20">.</span>
                            {String(month).padStart(2, "0")}
                          </p>
                        )}
                        <h3
                          className={cn(
                            "font-serif leading-[1.15] transition-colors duration-500",
                            featured
                              ? "mt-8 text-[clamp(1.7rem,2.4vw,2.3rem)]"
                              : "mt-7 text-[1.45rem] group-hover:text-gold-soft",
                          )}
                        >
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="mt-4 text-sm leading-relaxed opacity-70">{article.excerpt}</p>
                        )}
                      </div>
                      <span
                        className={cn(
                          "mt-10 inline-flex shrink-0 items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em]",
                          featured ? "text-ink" : "text-gold-soft",
                        )}
                      >
                        Ler matéria
                        <span
                          className={cn(
                            "inline-flex size-9 items-center justify-center rounded-full border transition-[transform,background-color,color] duration-500 group-hover:rotate-45",
                            featured
                              ? "border-ink/30 group-hover:bg-ink group-hover:text-ivory"
                              : "border-gold/40 group-hover:bg-gold group-hover:text-ink",
                          )}
                        >
                          <Icon name="arrow-up-right" className="size-4" />
                        </span>
                        <span className="sr-only">
                          : {article.title}, publicada em {formatDateLong(article.date)} no {PRESS_OUTLET} (abre em nova
                          aba)
                        </span>
                      </span>
                    </a>
                  </Reveal>
                </li>
              );
            })}
          </PressCarousel>
        </div>
      </div>
    </section>
  );
}
