import Link from "next/link";
import { ChevronRight, ListChecks } from "lucide-react";
import { S } from "@/lib/styles";
import type { Wishlist } from "@/lib/types";

export function RecentLists({ lists }: { lists: Wishlist[] }) {
  const recent = lists.slice(0, 3);
  return (
    <div className={`${S.card} ${S.cardP} lg:col-span-2`}>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-medium">Senaste önskelistor</h2>
        <Link
          href="/dashboard/wishlists"
          className="text-sm py-0.5 px-1.5 text-sky-500 hover:underline underline-offset-4">
          Visa alla
        </Link>
      </header>

      {recent.length ? (
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {recent.map((l) => (
            <li key={l.id} className={S.listRow}>
              <div className="min-w-0">
                <Link
                  href={`/wishlist/${l.id}`}
                  className="font-medium hover:underline underline-offset-4 block truncate"
                  title={l.name}>
                  {l.name}
                </Link>
                <div className={S.listMeta}>{l.items.length} saker</div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/wishlist/${l.id}`}
                  className={`${S.btn} ${S.btnOutline}`}>
                  Öppna <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/wishlist/${l.id}/edit`}
                  className={`${S.btn} ${S.btnPrimary}`}>
                  Redigera
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-md p-8 text-center">
          <div className="mx-auto mb-3 h-14 w-14 rounded-full grid place-items-center bg-indigo-50 dark:bg-indigo-900/30">
            <ListChecks className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
          </div>
          <p className="text-muted-foreground">Inga listor ännu.</p>
          <Link
            href="/wishlist/new"
            className={`mt-3 ${S.btn} ${S.btnPrimary}`}>
            Skapa din första lista
          </Link>
        </div>
      )}
    </div>
  );
}
