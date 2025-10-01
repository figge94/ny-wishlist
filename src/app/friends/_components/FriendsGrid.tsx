// app/friends/_components/FriendsGrid.tsx (med sökfilter via prop)
"use client";
import React, { useMemo, useState } from "react";
import type { Friend } from "../_types";
import { FriendCard } from "./FriendCard";

type Props = { items: Friend[]; onRemove: (id: string) => void };
export function FriendsGrid({ items, onRemove }: Props) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      items.filter((f) =>
        [f.name, f.email].some((v) =>
          v.toLowerCase().includes(query.toLowerCase())
        )
      ),
    [items, query]
  );

  return (
    <>
      <div className="mb-3 max-w-xs">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök vän…"
          className="w-full border border-slate-300 rounded-md inset-shadow-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white"
        />
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">
          Inga vänner matchar din sökning.
        </p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((f) => (
            <FriendCard key={f.id} data={f} onRemove={onRemove} />
          ))}
        </ul>
      )}
    </>
  );
}
