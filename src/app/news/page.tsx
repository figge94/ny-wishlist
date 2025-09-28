// app/news/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { getAllNewsSorted, formatDate } from "@/lib";
import NewsCard from "@/components/news/NewsCard";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Nyheter",
  description: "Senaste uppdateringarna och funktionerna."
};

type NewsItem = { slug: string; title: string; date: string };
type YearGroup = Record<string, NewsItem[]>;

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

function groupByYear(items: NewsItem[]) {
  return items.reduce<Record<string, NewsItem[]>>((acc, it) => {
    const y = new Date(it.date).getFullYear().toString();
    (acc[y] ||= []).push(it);
    return acc;
  }, {});
}

export default function NewsPage() {
  const items = getAllNewsSorted(); // senaste först
  const byYear = groupByYear(items);
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-5xl mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Nyheter</h1>
        <p className="mt-2 text-muted-foreground">Tidslinje på nyheter.</p>
      </header>

      <div className="mx-auto max-w-5xl grid gap-10">
        <section aria-labelledby="sidled">
          <h2 id="sidled" className="mb-4 text-lg font-medium">
            Datum
          </h2>

          {years.map((y) => (
            <section key={y} className="relative mb-12">
              <header className="mb-6 flex items-center gap-3">
                <h3 className="text-xl font-semibold">{y}</h3>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
              </header>

              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-14 bottom-0 -translate-x-1/2 w-px bg-violet-400 dark:bg-zinc-700"
              />

              <ul className="relative">
                {byYear[y].map((item, i) => {
                  const leftSide = i % 2 === 0;

                  return (
                    <li
                      key={item.slug}
                      className="relative grid grid-cols-1 sm:grid-cols-[1fr,3rem,1fr] gap-2 sm:gap-6">
                      {/* Kort: fullbredd på mobil, sida på desktop */}
                      <NewsCard
                        item={item}
                        side={leftSide ? "left" : "right"}
                      />

                      <div className="relative hidden sm:block sm:col-start-1/2 self-stretch">
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-gradient-to-r from-violet-400 to-sky-400 ring-2 ring-white dark:ring-neutral-900 shadow"
                        />
                        <div
                          className={[
                            "absolute top-1 flex items-center gap-1",
                            leftSide
                              ? "right-[calc(35%+2rem)]"
                              : "left-[calc(56%+2rem)] flex-row-reverse text-right"
                          ].join(" ")}>
                          <span
                            aria-hidden
                            className={[
                              "inline-block w-0 h-0",
                              leftSide
                                ? "border-y-[6px] border-y-transparent border-l-[6px] border-l-violet-200 dark:border-l-violet-800"
                                : "border-y-[6px] border-y-transparent border-r-[6px] border-r-violet-200 dark:border-r-violet-800"
                            ].join(" ")}
                          />

                          <time
                            dateTime={item.date}
                            title={formatDate(item.date)}
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums whitespace-nowrap bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200 dark:bg-violet-900/30 dark:text-violet-200 dark:ring-violet-800">
                            {formatDate(item.date)}
                          </time>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          {items.length === 0 && <EmptyState message="Inga nyheter ännu." />}
        </section>
      </div>
    </main>
  );
}
