// app/wishlist/new/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewWishlistPage() {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    setBusy(false);
    if (!res.ok) return alert("Kunde inte skapa lista");
    router.push("/wishlist");
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-3 p-4">
      <h1 className="text-xl font-semibold">Ny önskelista</h1>
      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Namn på lista"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        disabled={busy}
        className="rounded bg-violet-600 px-3 py-2 text-white cursor-pointer">
        {busy ? "Skapar…" : "Skapa"}
      </button>
    </form>
  );
}
