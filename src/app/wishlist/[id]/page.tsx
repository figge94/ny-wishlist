// app/wishlist/[id]/page.tsx
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { api } from "@/lib";

async function addItemAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const title = String(formData.get("title") || "").trim();
  const url = String(formData.get("url") || "").trim() || undefined;
  const price = formData.get("price")
    ? Number(formData.get("price"))
    : undefined;
  await api.addItem(id, { title, url, price });
  revalidatePath(`/wishlist/${id}`);
  redirect(`/wishlist/${id}`);
}

export default async function WishlistDetailPage({
  params
}: {
  params: { id: string };
}) {
  const wl = await api.getList(params.id);
  if (!wl) return notFound();

  return (
    <section className="mx-auto max-w-5xl">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{wl.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/wishlist/${wl.id}/edit`}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
            Redigera
          </Link>
          <Link
            href="/wishlist"
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50">
            Till listorna
          </Link>
        </div>
      </header>

      <article className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-neutral-900">
        <h2 className="font-semibold mb-2">Saker</h2>
        {wl.items.length ? (
          <ul className="space-y-2">
            {wl.items.map((it) => (
              <li
                key={it.id}
                className="flex items-center justify-between rounded-lg border px-3 py-2">
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-xs text-gray-500">
                    {it.url && (
                      <a className="underline" href={it.url} target="_blank">
                        Länk
                      </a>
                    )}{" "}
                    {it.price ? `• ${it.price} kr` : ""}
                  </div>
                </div>
                {/* små actions kan läggas senare (toggle done, delete) */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Inga saker ännu.</p>
        )}

        {/* Lägg till sak */}
        <form action={addItemAction} className="mt-4 grid gap-2 sm:grid-cols-4">
          <input type="hidden" name="id" value={wl.id} />
          <input
            name="title"
            placeholder="Titel"
            required
            className="rounded-lg border px-3 py-2 sm:col-span-2"
          />
          <input
            name="url"
            placeholder="URL (valfritt)"
            className="rounded-lg border px-3 py-2"
          />
          <input
            name="price"
            type="number"
            step="1"
            placeholder="Pris"
            className="rounded-lg border px-3 py-2"
          />
          <button className="sm:col-span-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Lägg till
          </button>
        </form>
      </article>
    </section>
  );
}
