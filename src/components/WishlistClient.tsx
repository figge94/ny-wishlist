"use client";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  title: string;
  url?: string | null;
  createdAt: string;
};
type Wishlist = { id: string; name: string; createdAt: string; items: Item[] };

export default function WishlistClient() {
  const [lists, setLists] = useState<Wishlist[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/wishlists", { cache: "no-store" });
      if (!res.ok) throw new Error("Kunde inte hämta");
      setLists(await res.json());
    } catch (e: any) {
      setError(e.message ?? "Fel vid hämtning");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addList(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError(null);

    // Optimistisk uppdatering
    const tempId = "tmp-" + Date.now();
    const optimistic = {
      id: tempId,
      name,
      createdAt: new Date().toISOString(),
      items: [] as Item[]
    };
    setLists((prev) => [optimistic, ...prev]);

    try {
      const res = await fetch("/api/wishlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      if (!res.ok) throw new Error("Kunde inte skapa lista");
      const created: Wishlist = await res.json();
      // ersätt temp med ”riktiga”
      setLists((prev) => prev.map((l) => (l.id === tempId ? created : l)));
      setName("");
    } catch (e: any) {
      // rulla tillbaka
      setLists((prev) => prev.filter((l) => l.id !== tempId));
      setError(e.message ?? "Fel vid skapande");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <form onSubmit={addList} className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ny wishlist…"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="border rounded px-4 py-2" disabled={saving}>
          {saving ? "Sparar…" : "Lägg till"}
        </button>
      </form>

      {loading ? <p>Laddar…</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}

      <ul className="space-y-2">
        {lists.map((l) => (
          <li key={l.id} className="border rounded p-3">
            <div className="font-medium">{l.name}</div>
            <div className="text-sm opacity-70">
              {new Date(l.createdAt).toLocaleString()}
            </div>
            {/* här kan du länka till /w/[id] senare */}
          </li>
        ))}
        {!loading && lists.length === 0 && <li>Inga listor ännu.</li>}
      </ul>
    </div>
  );
}
