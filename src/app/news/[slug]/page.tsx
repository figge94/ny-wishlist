// app/news/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNewsBySlug, getAllSlugs } from "@/lib/news";
import ShareButton from "@/components/ShareButton";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  // getAllSlugs() bör returnera: [{ slug: "vanner" }, ...]
  return getAllSlugs();
}

function formatFullDate(date: string) {
  return new Date(date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getNewsBySlug(params.slug);
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
    twitter: {
      card: "summary",
      title: item.title,
      description: desc
    }
  };
}

export default function NewsDetailPage({ params }: Props) {
  const item = getNewsBySlug(params.slug);
  if (!item) return notFound();

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav aria-label="Brödsmulor" className="mb-6 text-sm text-gray-600">
        <ol className="flex items-center">
          <li>
            <Link href="/news" className="text-blue-600 hover:underline">
              Nyheter
            </Link>
          </li>
          <li className="px-2" aria-hidden>
            /
          </li>
          <li className="font-medium text-gray-800">{item.title}</li>
        </ol>
      </nav>

      {/* Innehåll */}
      <section className="mx-auto max-w-3xl">
        <div className="rounded-2xl border bg-white shadow-sm p-6 dark:border-gray-800 dark:bg-neutral-900">
          <header>
            <h1 className="text-2xl sm:text-3xl font-bold">{item.title}</h1>
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
              className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-neutral-800">
              ← Till alla nyheter
            </Link>
            <ShareButton title={item.title} />
          </div>
        </div>
      </section>
    </main>
  );
}
