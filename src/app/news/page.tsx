// app/news/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { getAllNewsSorted } from "@/lib/news";

export const metadata: Metadata = {
  title: "Nyheter",
  description: "Senaste uppdateringarna och funktionerna."
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default function NewsPage() {
  const items = getAllNewsSorted(); // sorterat, senaste först

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-3xl mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Nyheter</h1>
        <p className="mt-2 text-gray-600">Senaste nytt i appen.</p>
      </header>

      <section className="mx-auto max-w-5xl">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/news/${item.slug}`}
                className="group block h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-neutral-900">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h2>
                <div className="mt-1 text-xs text-gray-500">
                  {formatDate(item.date)}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {items.length === 0 && (
          <div className="mt-10 rounded-xl border border-dashed p-8 text-center text-gray-500 dark:border-gray-700">
            Inga nyheter ännu.
          </div>
        )}
      </section>
    </main>
  );
}
