// app/wishlist/[id]/edit/page.tsx
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { toCents } from "@/utils/currency";

export const runtime = "nodejs";

// Helpers
function fmtPrice(cents?: number | null) {
  if (cents == null) return "";
  return (cents / 100).toLocaleString("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0
  });
}

// Lägg till nytt item
async function addItem(formData: FormData) {
  "use server";
  const wishlistId = String(formData.get("wishlistId") || "");
  const title = String(formData.get("title") || "").trim();
  const url = String(formData.get("url") || "").trim() || null;
  const priceInCents = toCents(formData.get("price"));
  if (!wishlistId || !title) return;

  await prisma.item.create({ data: { title, url, priceInCents, wishlistId } });
  revalidatePath(`/wishlist/${wishlistId}`);
  redirect(`/wishlist/${wishlistId}/edit`);
}

// EN action: uppdatera ELLER ta bort
async function itemAction(formData: FormData) {
  "use server";
  const action = String(formData.get("_action") || "");
  const id = String(formData.get("id") || "");
  const wishlistId = String(formData.get("wishlistId") || "");

  if (!id || !wishlistId) return;

  if (action === "delete") {
    await prisma.item.delete({ where: { id } });
  } else if (action === "update") {
    const title = String(formData.get("title") || "").trim();
    const url = String(formData.get("url") || "").trim() || null;
    const priceInCents = toCents(formData.get("price"));
    if (!title) return;
    await prisma.item.update({
      where: { id },
      data: { title, url, priceInCents }
    });
  }

  revalidatePath(`/wishlist/${wishlistId}`);
  redirect(`/wishlist/${wishlistId}/edit`);
}

export default async function EditWishlistPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 👈 viktigt

  const wl = await prisma.wishlist.findUnique({
    where: { id },
    include: { items: { orderBy: { createdAt: "desc" } } }
  });
  if (!wl) notFound();

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{wl.name}</h1>
          <p className="text-xs text-gray-500">Redigera din önskelista</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/wishlist/${wl.id}`} className="text-sm underline">
            Visa
          </Link>
          <Link href="/wishlist" className="text-sm underline">
            Tillbaka
          </Link>
        </div>
      </header>

      {/* Lägg till nytt */}
      <form
        action={addItem}
        className="grid gap-2 sm:grid-cols-[1fr,1fr,140px,auto] sm:items-end rounded border p-3">
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
          <label className="block text-xs text-gray-600">URL (valfritt)</label>
          <input
            name="url"
            placeholder="https://…"
            className="w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Pris (SEK)</label>
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

      {/* Lista + en form per item: update/delete via _action */}
      <ul className="space-y-3">
        {wl.items.map((i) => (
          <li key={i.id} className="rounded border p-3">
            <form
              action={itemAction}
              className="grid gap-2 sm:grid-cols-[1fr,1fr,120px,auto,auto] sm:items-end">
              <input type="hidden" name="id" value={i.id} />
              <input type="hidden" name="wishlistId" value={wl.id} />

              <input
                name="title"
                defaultValue={i.title}
                required
                className="w-full rounded border px-2 py-1.5 text-sm"
              />
              <input
                name="url"
                defaultValue={i.url ?? ""}
                className="w-full rounded border px-2 py-1.5 text-sm"
              />
              <input
                name="price"
                defaultValue={
                  i.priceInCents != null
                    ? (i.priceInCents / 100).toString().replace(".", ",")
                    : ""
                }
                className="w-full rounded border px-2 py-1.5 text-sm"
              />

              {/* Skickar _action=update */}
              <button
                type="submit"
                name="_action"
                value="update"
                className="rounded bg-slate-600 px-3 py-1.5 text-white text-sm cursor-pointer">
                Spara
              </button>

              {/* Skickar _action=delete */}
              <button
                type="submit"
                name="_action"
                value="delete"
                className="rounded bg-rose-600 px-3 py-1.5 text-white text-sm cursor-pointer">
                Ta bort
              </button>
            </form>

            {/* Liten förhandsvisning */}
            <div className="mt-2 text-xs text-gray-600">
              {i.priceInCents != null && (
                <span>{fmtPrice(i.priceInCents)}</span>
              )}
              {i.url && (
                <>
                  {i.priceInCents != null && <span className="mx-1">·</span>}
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
          </li>
        ))}
        {wl.items.length === 0 && (
          <li className="text-gray-500">Inga saker ännu.</li>
        )}
      </ul>
    </section>
  );
}
