"use client";
import { useEffect, useMemo, useState } from "react";

type WishItem = {
  id: string;
  title: string;
  url?: string;
  price?: number;
  done?: boolean;
};
type WishList = { id: string; name: string; items: WishItem[] };

const glass =
  "backdrop-blur-lg bg-white/90 border border-white/30 drop-shadow-md shadow-black/40";

export default function WishlistPage() {
  const [lists, setLists] = useState<WishList[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Ladda initialt
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/lists", { cache: "no-store" });
      const data: WishList[] = await res.json();
      setLists(data);
      setActiveId(data[0]?.id ?? null);
      setLoading(false);
    })();
  }, []);

  const active = useMemo(
    () => lists.find((l) => l.id === activeId) ?? null,
    [lists, activeId]
  );

  // List-CRUD
  async function createList(name: string) {
    const res = await fetch("/api/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    const newList: WishList = await res.json();
    setLists((prev) => [newList, ...prev]);
    setActiveId(newList.id);
  }
  async function renameList(id: string, name: string) {
    const res = await fetch(`/api/lists/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    const updated: WishList = await res.json();
    setLists((prev) => prev.map((l) => (l.id === id ? updated : l)));
  }
  async function deleteList(id: string) {
    await fetch(`/api/lists/${id}`, { method: "DELETE" });
    setLists((prev) => prev.filter((l) => l.id !== id));
    if (activeId === id)
      setActiveId((prev) => lists.find((l) => l.id !== id)?.id ?? null);
  }

  // Item-CRUD
  async function addItem(listId: string, data: Partial<WishItem>) {
    const res = await fetch(`/api/lists/${listId}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const newItem: WishItem = await res.json();
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId ? { ...l, items: [newItem, ...l.items] } : l
      )
    );
  }
  async function updateItem(
    listId: string,
    itemId: string,
    data: Partial<WishItem>
  ) {
    const res = await fetch(`/api/lists/${listId}/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const updated: WishItem = await res.json();
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? {
              ...l,
              items: l.items.map((it) => (it.id === itemId ? updated : it))
            }
          : l
      )
    );
  }
  async function deleteItem(listId: string, itemId: string) {
    await fetch(`/api/lists/${listId}/items/${itemId}`, { method: "DELETE" });
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, items: l.items.filter((it) => it.id !== itemId) }
          : l
      )
    );
  }

  if (loading) return <p className="p-6 text-gray-500">Laddar…</p>;

  return (
    <main className="grid gap-6 p-6 md:grid-cols-[280px,1fr]">
      {/* Sidebar */}
      <aside className={`${glass} rounded-lg p-4 h-fit`}>
        <h2 className="font-semibold mb-3 text-slate-800">Önskelistor</h2>
        <NewListForm onCreate={createList} />
        <ul className="space-y-2">
          {lists.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                className={`w-full text-left px-3 py-2 rounded-md transition cursor-pointer
            ${
              activeId === l.id
                ? "bg-slate-500 text-white"
                : "hover:bg-white/40 text-slate-800"
            }`}
                onClick={() => setActiveId(l.id)}>
                {l.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Innehåll */}
      <section className={`${glass} rounded-2xl p-4`}>
        {!active ? (
          <p className="text-gray-600">Ingen lista vald.</p>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <input
                value={active.name}
                onChange={(e) => renameList(active.id, e.target.value)}
                className="text-lg font-semibold rounded-md px-3 py-1 hover:bg-white/70 hover:border hover:border-gray-200"
              />
              <button
                type="button"
                onClick={() => deleteList(active.id)}
                className="ml-auto bg-rose-500 text-white rounded-md px-3 py-2 hover:bg-rose-400 transition cursor-pointer">
                Ta bort lista
              </button>
            </div>

            <AddItemForm onAdd={(data) => addItem(active.id, data)} />

            <ul className="grid gap-2">
              {active.items.length === 0 && (
                <li className="p-4 text-gray-700">Tom lista.</li>
              )}
              {active.items.map((item) => (
                <li key={item.id} className={`${glass} rounded-lg p-2`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 "
                      checked={!!item.done}
                      onChange={(e) =>
                        updateItem(active.id, item.id, {
                          done: e.target.checked
                        })
                      }
                    />
                    <input
                      className={`flex-1 rounded-md px-2 py-1 bg-white ${
                        item.done ? "line-through text-gray-400" : ""
                      }`}
                      value={item.title}
                      onChange={(e) =>
                        updateItem(active.id, item.id, {
                          title: e.target.value
                        })
                      }
                    />
                    <input
                      className="w-70 hover:border hover:border-gray-200 italic rounded-md px-2 py-1 hover:bg-white"
                      placeholder="https://länk"
                      value={item.url ?? ""}
                      onChange={(e) =>
                        updateItem(active.id, item.id, { url: e.target.value })
                      }
                    />
                    <input
                      className="w-20 border hover:border-gray-200 rounded-md px-2 py-1 hover:bg-white"
                      type="number"
                      placeholder="Pris"
                      value={item.price ?? ""}
                      onChange={(e) =>
                        updateItem(active.id, item.id, {
                          price: Number(e.target.value) || undefined
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => deleteItem(active.id, item.id)}
                      className=" text-rose-600 rounded-md px-2 py-1 hover:underline hover:underline-offset-4 transition cursor-pointer">
                      Ta bort
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}

function NewListForm({
  onCreate
}: {
  onCreate: (name: string) => void | Promise<void>;
}) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const el = e.currentTarget.elements.namedItem(
          "name"
        ) as HTMLInputElement;
        const name = el.value.trim();
        if (name) await onCreate(name);
        e.currentTarget.reset();
      }}
      className="flex flex-wrap mb-3">
      <div className="flex w-full h-15">
        <input
          name="name"
          placeholder="Ny lista…"
          className="border border-gray-200 rounded-s-md px-3 py-2 w-full inset-shadow-sm inset-shadow-gray-200 bg-white"
        />
        <button
          type="button"
          className="bg-teal-500 text-white rounded-e-md px-3 py-2 hover:bg-teal-400 transition cursor-pointer">
          Lägg till
        </button>
      </div>
    </form>
  );
}

function AddItemForm({
  onAdd
}: {
  onAdd: (data: Partial<WishItem>) => void | Promise<void>;
}) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const f = e.currentTarget;
        const title = (
          f.elements.namedItem("title") as HTMLInputElement
        ).value.trim();
        const url = (
          f.elements.namedItem("url") as HTMLInputElement
        ).value.trim();
        const priceRaw = (f.elements.namedItem("price") as HTMLInputElement)
          .value;
        const price = priceRaw ? Number(priceRaw) : undefined;
        if (title) await onAdd({ title, url: url || undefined, price });
        f.reset();
      }}
      className="flex flex-wrap gap-2 mb-4">
      <input
        name="title"
        placeholder="Lägg till sak…"
        className="border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-48 bg-white inset-shadow-sm inset-shadow-gray-200"
      />
      <input
        name="url"
        placeholder="Länk (valfritt)"
        className="border border-gray-300 rounded-md px-3 py-2 w-64 bg-white inset-shadow-sm inset-shadow-gray-200"
      />
      <input
        name="price"
        type="number"
        placeholder="Pris"
        className="border border-gray-300 rounded-md px-3 py-2 w-32 bg-white inset-shadow-sm inset-shadow-gray-200"
      />
      <button
        type="button"
        className="bg-teal-500 text-white rounded-md shadow-sm px-4 cursor-pointer py-2 hover:bg-teal-400 transition">
        Lägg till
      </button>
    </form>
  );
}
