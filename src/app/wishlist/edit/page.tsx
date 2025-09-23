// app/wishlist/[id]/edit/page.tsx
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { api } from "@/lib";
import { DeleteButton } from "./DeleteButton";

async function updateAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (!id || !name) throw new Error("Id och namn krävs");
  await api.renameList(id, name);
  // (sparar inte description i din fakeDB nu – lägg till fältet om du vill)
  revalidatePath("/wishlist");
  revalidatePath(`/wishlist/${id}`);
  redirect(`/wishlist/${id}`);
}

async function deleteAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  await api.deleteList(id);
  revalidatePath("/wishlist");
  redirect("/wishlist");
}

export default async function EditWishlistPage({
  params
}: {
  params: { id: string };
}) {
  const wl = await api.getList(params.id);
  if (!wl) redirect("/wishlist");

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Redigera önskelista</h1>

      <form action={updateAction} className="space-y-4">
        <input type="hidden" name="id" value={wl.id} />
        <div>
          <label className="block text-sm font-medium">Namn</label>
          <input
            name="name"
            defaultValue={wl.name}
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Beskrivning</label>
          <textarea
            name="description"
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Spara
          </button>
          <Link
            href={`/wishlist/${wl.id}`}
            className="rounded-lg border px-4 py-2 hover:bg-gray-50">
            Avbryt
          </Link>
        </div>
      </form>

      <form action={deleteAction} className="mt-6">
        <input type="hidden" name="id" value={wl.id} />
        <DeleteButton />
      </form>
    </main>
  );
}
