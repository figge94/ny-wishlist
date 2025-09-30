// app/wishlist/page.tsx
import Link from "next/link";
import HowTo from "@/components/HowTo";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function WishlistIndexPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  // Om utloggad kan du välja att redirecta, eller visa tom vy
  if (!userId) {
    return (
      <section className="mx-auto max-w-5xl py-8">
        <h1 className="text-2xl font-bold mb-4">Önskelistor</h1>
        <p className="text-gray-500">Logga in för att se dina listor.</p>
      </section>
    );
  }

  const lists = await prisma.wishlist.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } }
  });

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

      {/* Visa HowTo ENDAST om inga listor finns */}
      {lists.length === 0 && (
        <div className="mb-8">
          <HowTo />
        </div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {lists.map((l) => (
          <li key={l.id}>
            <Link
              href={`/wishlist/${l.id}`}
              className="block rounded-md backdrop-blur bg-white p-4 shadow-md hover:shadow-lg dark:border-gray-800 dark:bg-neutral-900">
              <h2 className="font-semibold">{l.name}</h2>
              <p className="text-sm text-gray-500">{l._count.items} saker</p>
            </Link>
          </li>
        ))}
      </ul>

      {lists.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed p-8 text-center text-gray-500">
          Inga listor ännu. Skapa din första!
        </div>
      )}
    </section>
  );
}
