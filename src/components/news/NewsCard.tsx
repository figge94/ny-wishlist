// components/news/NewsCard.tsx
import Link from "next/link";

type NewsItem = {
  slug: string;
  title: string;
  date: string;
};

type Props = {
  item: NewsItem;
  side: "left" | "right";
};

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function NewsCard({ item, side }: Props) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className={cx(
        "group w-full rounded-md bg-white p-4 drop-shadow transition hover:-translate-y-0.5 hover:shadow-md",
        "dark:bg-neutral-900 dark:border-zinc-800",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600",
        "sm:w-80",
        side === "left" ? "sm:col-start-1" : "sm:col-start-3"
      )}>
      <h4 className="text-base font-medium">{item.title}</h4>
      <p className="font-light mt-1 text-sm text-muted-foreground opacity-0 transition group-hover:opacity-100">
        Läs mer →
      </p>
    </Link>
  );
}
