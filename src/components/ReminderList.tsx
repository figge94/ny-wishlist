"use client";

import { useEffect, useState } from "react";
import type { Reminder } from "@prisma/client";

export function ReminderList() {
  const [data, setData] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);

  async function load() {
    setLoading(true);
    setNeedsLogin(false);
    const res = await fetch("/api/reminders", { cache: "no-store" });

    if (res.status === 401) {
      setNeedsLogin(true);
      setLoading(false);
      return;
    }

    if (res.ok) {
      const json = await res.json();
      setData(json as Reminder[]);
    } else {
      console.error(await res.json());
      alert("Kunde inte hämta påminnelser.");
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleDone(id: string, done: boolean) {
    const res = await fetch(`/api/reminders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done })
    });
    if (res.ok) load();
    else alert("Kunde inte uppdatera påminnelsen.");
  }

  async function remove(id: string) {
    if (!confirm("Ta bort påminnelsen?")) return;
    const res = await fetch(`/api/reminders/${id}`, { method: "DELETE" });
    if (res.ok) load();
    else alert("Kunde inte ta bort påminnelsen.");
  }

  if (loading) return <p>Laddar…</p>;
  if (needsLogin) {
    return (
      <p>
        Du måste vara inloggad för att se dina påminnelser.{" "}
        <a className="underline" href="/api/auth/signin?callbackUrl=/reminders">
          Logga in
        </a>
      </p>
    );
  }
  if (!data.length) return <p>Inga påminnelser ännu.</p>;

  return (
    <ul className="mt-4 space-y-2">
      {data.map((r) => (
        <li
          key={r.id}
          className="border rounded p-3 flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={r.done}
              onChange={(e) => toggleDone(r.id, e.target.checked)}
            />
            <div>
              <div className={r.done ? "line-through opacity-60" : ""}>
                {r.title}
              </div>
              <div className="text-xs opacity-70">
                Förfaller: {new Date(r.dueAt).toLocaleString()}
              </div>
            </div>
          </label>
          <button
            onClick={() => remove(r.id)}
            className="text-sm opacity-70 hover:opacity-100">
            Ta bort
          </button>
        </li>
      ))}
    </ul>
  );
}
