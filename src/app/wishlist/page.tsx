// app/wishlist/page.tsx
import Link from "next/link";
import { api } from "@/lib";
import HowTo from "@/components/HowTo";

// TODO: ersätt med data från DB
const mockLists = [
  { id: "a1", name: "Jul 2025", items: 4 },
  { id: "b2", name: "Födelsedag", items: 2 }
];

export default async function WishlistIndexPage() {
  const lists = api.listAll();
  return (
    <section className="mx-auto max-w-5xl">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Önskelistor</h1>
        <Link
          href="/wishlist/new"
          className="rounded-lg bg-violet-600 px-3 py-1.5 text-sm text-white hover:bg-violet-700">
          Ny lista
        </Link>
      </header>
      <div className="mb-8">
        {/* Tipsruta */}
        <HowTo />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {mockLists.map((l) => (
          <li key={l.id}>
            <Link
              href={`/wishlist/${l.id}`}
              className="block rounded-md backdrop-blur bg-white p-4 shadow-md hover:shadow-lg dark:border-gray-800 dark:bg-neutral-900">
              <h2 className="font-semibold">{l.name}</h2>
              <p className="text-sm text-gray-500">{l.items} saker</p>
            </Link>
          </li>
        ))}
      </ul>

      {mockLists.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed p-8 text-center text-gray-500">
          Inga listor ännu. Skapa din första!
        </div>
      )}
    </section>
  );
}
