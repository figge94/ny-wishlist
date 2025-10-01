// app/friends/_components/FriendsGrid.tsx
"use client";
import React from "react";
import type { Friend } from "../_types";
import { FriendCard } from "./FriendCard";

type Props = {
  items: Friend[];
  onRemove: (id: string) => void;
};

export function FriendsGrid({ items, onRemove }: Props) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-500">Inga vänner matchar din sökning.</p>
    );
  }
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((f) => (
        <FriendCard key={f.id} data={f} onRemove={onRemove} />
      ))}
    </ul>
  );
}
