// app/wishlist/new/page.tsx
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { api } from "@/lib";

async function createAction(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Namn krävs");
  const wl = await api.createList(name);
  revalidatePath("/wishlist");
  redirect(`/wishlist/${wl.id}`);
}

export default function NewWishlistPage() {
  return (
    <section className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Ny önskelista</h1>
      <form action={createAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Namn</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Skapa
        </button>
      </form>
    </section>
  );
}
