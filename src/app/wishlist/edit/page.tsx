import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

// helpers
function toCents(v: FormDataEntryValue | null): number | null {
  if (!v) return null;
  const n = Number(String(v).replace(",", "."));
  return Number.isNaN(n) ? null : Math.round(n * 100);
}
function fmtSEK(cents?: number | null) {
  if (cents == null) return "";
  return (cents / 100).toLocaleString("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0
  });
}

// server action – add
async function addItemAction(formData: FormData) {
  "use server";
  const wishlistId = String(formData.get("wishlistId") || "");
  const title = String(formData.get("title") || "").trim();
  const url = String(formData.get("url") || "").trim() || null;
  const priceInCents = toCents(formData.get("price"));
  if (!wishlistId || !title) return;

  await prisma.item.create({ data: { title, url, priceInCents, wishlistId } });
  revalidatePath(`/wishlist/${wishlistId}`);
  redirect(`/wishlist/${wishlistId}`);
}

export default async function WishlistDetailPage({
  params
}: {
  params: { id: string };
}) {
  const wl = await prisma.wishlist.findUnique({
    where: { id: params.id },
    include: { items: { orderBy: { createdAt: "desc" } } }
  });
  if (!wl) notFound();

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{wl.name}</h1>
        <div className="flex items-center gap-3">
          <Link href={`/wishlist/${wl.id}/edit`} className="text-sm underline">
            Redigera
          </Link>
          <Link href="/wishlist" className="text-sm underline">
            Tillbaka
          </Link>
        </div>
      </header>

      {/* 2 kolumner: vänster = lista, höger = lägg till */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Vänster: befintliga saker */}
        <div className="space-y-3">
          {wl.items.length === 0 ? (
            <div className="rounded border border-dashed p-8 text-center text-gray-500">
              Inga saker ännu.
            </div>
          ) : (
            <ul className="space-y-3">
              {wl.items.map((i) => (
                <li
                  key={i.id}
                  className="rounded border p-4 bg-white dark:bg-neutral-900">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium break-words">{i.title}</div>
                      <div className="text-sm text-gray-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                        {i.priceInCents != null && (
                          <span>{fmtSEK(i.priceInCents)}</span>
                        )}
                        {i.url && (
                          <>
                            {i.priceInCents != null && <span>·</span>}
                            <a
                              href={i.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline break-all">
                              {i.url}
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/wishlist/${wl.id}/edit`}
                      className="text-xs rounded border px-2 py-1 hover:bg-gray-50"
                      title="Redigera denna sak">
                      Ändra
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Höger: “Lägg till” panel som fälls ut */}
        <aside className="lg:sticky lg:top-20 h-max">
          <div className="rounded border bg-white dark:bg-neutral-900 p-4">
            <details>
              <summary className="cursor-pointer select-none list-none">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Lägg till i listan</h2>
                  <span className="text-sm text-gray-500">
                    klicka för att öppna
                  </span>
                </div>
              </summary>

              <div className="mt-4 space-y-3">
                <form action={addItemAction} className="grid gap-3">
                  <input type="hidden" name="wishlistId" value={wl.id} />

                  <div>
                    <label className="block text-xs text-gray-600">Titel</label>
                    <input
                      name="title"
                      required
                      placeholder="Namn på saken"
                      className="w-full rounded border px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600">
                      URL (valfritt)
                    </label>
                    <input
                      name="url"
                      placeholder="https://…"
                      className="w-full rounded border px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600">
                      Pris (SEK, valfritt)
                    </label>
                    <input
                      name="price"
                      inputMode="decimal"
                      placeholder="t.ex. 299 eller 299,90"
                      className="w-full rounded border px-3 py-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded bg-violet-600 px-3 py-2 text-white cursor-pointer">
                    Lägg till
                  </button>
                </form>
              </div>
            </details>
          </div>
        </aside>
      </div>
    </section>
  );
}
