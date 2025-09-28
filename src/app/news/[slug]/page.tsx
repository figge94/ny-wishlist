// app/news/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNewsBySlug, getAllSlugs } from "@/lib/news";
import ShareButton from "@/components/ShareButton";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  // getAllSlugs() ska returnera [{ slug: "vanner" }, ...]
  return getAllSlugs();
}

const formatFullDate = (date: string) =>
  new Date(date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "Nyhet saknas" };

  const dateStr = formatFullDate(item.date);
  const desc = `${item.content.slice(0, 140)} (${dateStr})`;

  return {
    title: item.title,
    description: desc,
    openGraph: {
      type: "article",
      title: item.title,
      description: desc,
      publishedTime: item.date
    },
    twitter: { card: "summary", title: item.title, description: desc }
  };
}

export default async function NewsDetailPage({
  params
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return notFound();

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Brödsmulor" className="mb-6 text-sm text-gray-600">
        <ol className="flex items-center">
          <li>
            <Link
              href="/news"
              className="text-sky-400 hover:underline hover:underline-offset-4">
              Nyheter
            </Link>
          </li>
          <li className="px-2" aria-hidden>
            /
          </li>
          <li className="font-medium text-gray-800">{item.title}</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-5xl">
        <div className="rounded-md bg-sky-50/50 drop-shadow-xs shadow p-6 dark:border-gray-800 dark:bg-neutral-900">
          <header>
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {formatFullDate(item.date)}
            </p>
          </header>

          <article className="prose max-w-none mt-4 dark:prose-invert">
            <p>{item.content}</p>
          </article>

          <div className="mt-6 flex gap-3">
            <Link
              href="/news"
              className="inline-flex items-center rounded-sm bg-stone-950 text-white shadow px-3 py-1.5 text-sm hover:bg-stone-950/90 dark:border-gray-700 dark:hover:bg-neutral-800 active:scale-95 transition">
              ← Tillbaka till tidslinjen
            </Link>
            <ShareButton title={item.title} />
          </div>
        </div>
      </section>
    </main>
  );
}
