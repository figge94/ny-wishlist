import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import AddItemModal from "@/components/AddItemModal";

import { fmtSEK } from "@/utils/currency"; // ✅ bara denna behövs här

export const runtime = "nodejs";

export default async function WishlistDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 👈 vänta in params

  const wl = await prisma.wishlist.findUnique({
    where: { id }, // 👈 använd id här
    include: { items: { orderBy: { createdAt: "desc" } } }
  });
  if (!wl) notFound();

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{wl.name}</h1>
        <Link href="/wishlist" className="text-sm underline underline-offset-4">
          Tillbaka
        </Link>
      </header>

      <div className="space-y-6">
        {/* Lägg till-panel överst */}
        <div>
          <AddItemModal wishlistId={wl.id} />
        </div>

        {/* Divider (valfritt) */}
        <div className="h-px bg-gray-200 dark:bg-gray-700" />

        {/* Listan */}
        <div>
          <ul className="space-y-2">
            {wl.items.map((i) => (
              <li
                key={i.id}
                className="rounded-md bg-stone-50 drop-shadow-xs shadow border border-stone-100 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{i.title}</div>
                  {i.priceInCents != null && (
                    <div className="text-sm text-gray-700">
                      {fmtSEK(i.priceInCents)}
                    </div>
                  )}
                </div>
                {i.url && (
                  <a
                    href={i.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline break-all">
                    {i.url}
                  </a>
                )}
              </li>
            ))}
            {wl.items.length === 0 && (
              <li className="text-gray-500">Inga saker ännu.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
