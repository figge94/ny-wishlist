// components/NewsLetter.tsx
import Link from "next/link";
import { news } from "@/lib";

export default function NewsLetter() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nyheter</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li className="font-bold">Senaste nytt:</li>
        {news.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/news/${item.slug}`}
              className="text-blue-600 hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
