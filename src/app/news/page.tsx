// app/news/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { getAllNewsSorted } from "@/lib/news";

export const metadata: Metadata = {
  title: "Nyheter",
  description: "Senaste uppdateringarna och funktionerna."
};

type NewsItem = { slug: string; title: string; date: string };

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

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
          <h2 id="sidled" className="mb-4 text-lg font-semibold">
            Datum
          </h2>

          {years.map((y) => (
            <section key={y} className="relative mb-12">
              {/* Årsrubrik */}
              <header className="mb-6 flex items-center gap-3">
                <h3 className="text-xl font-semibold">{y}</h3>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
              </header>

              {/* En enda vertikal linje för hela året (börjar under rubriken) */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-14 bottom-0 -translate-x-1/2 w-px bg-violet-400 dark:bg-zinc-700"
              />

              <ul className="space-y-10">
                {byYear[y].map((item, i) => {
                  const leftSide = i % 2 === 0;

                  return (
                    <li
                      key={item.slug}
                      className="relative grid grid-cols-1 sm:grid-cols-[1fr,3rem,1fr] gap-2 sm:gap-6">
                      {/* Kort – placering vänster/höger på desktop, fullbredd på mobil */}
                      <Link
                        href={`/news/${item.slug}`}
                        className={[
                          "group rounded-md border w-80 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-neutral-900 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600",
                          leftSide ? "sm:col-start-1" : "sm:col-start-3"
                        ].join(" ")}>
                        <h4 className="text-base font-semibold">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition">
                          Läs mer →
                        </p>
                      </Link>

                      {/* Mittkolumn – dot + datum-badge + pil (desktop) */}
                      <div className="relative hidden sm:block sm:col-start-1/2 self-stretch">
                        {/* Dot exakt på linjen */}
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-gradient-to-r from-violet-500 to-sky-500 ring-2 ring-white dark:ring-neutral-900 shadow"
                        />
                        {/* Badge + pil – läggs åt vänster/höger om linjen */}
                        <div
                          className={[
                            "absolute top-1 flex items-center gap-1.5",
                            leftSide
                              ? "right-[calc(35%+2rem)]"
                              : "left-[calc(56%+2rem)] flex-row-reverse text-right"
                          ].join(" ")}>
                          {/* Piltriangel (pekar mot dotten) */}
                          <span
                            aria-hidden
                            className={[
                              "inline-block w-0 h-0",
                              leftSide
                                ? "border-y-[6px] border-y-transparent border-l-[6px] border-l-indigo-200 dark:border-l-indigo-800"
                                : "border-y-[6px] border-y-transparent border-r-[6px] border-r-indigo-200 dark:border-r-indigo-800"
                            ].join(" ")}
                          />
                          {/* Datum-badge */}
                          <time
                            dateTime={item.date}
                            title={formatDate(item.date)}
                            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums whitespace-nowrap
                             bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200
                             dark:bg-indigo-900/30 dark:text-indigo-200 dark:ring-indigo-800">
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

          {items.length === 0 && <EmptyState />}
        </section>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-xl border border-dashed p-8 text-center text-muted-foreground dark:border-zinc-700">
      Inga nyheter ännu.
    </div>
  );
}
