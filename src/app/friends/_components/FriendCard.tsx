// app/friends/_components/FriendCard.tsx (oförändrad)
"use client";
import React from "react";
import type { Friend } from "../_types";

type Props = { data: Friend; onRemove: (id: string) => void };
export function FriendCard({ data, onRemove }: Props) {
  return (
    <li className="flex items-center gap-3 rounded-md border border-slate-100 bg-white p-3 shadow-sm">
      <div className="h-9 w-9 rounded-md bg-sky-200 text-sky-800 grid place-items-center text-sm font-medium">
        {data.name[0]}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-800 truncate">{data.name}</p>
        <p className="text-xs text-slate-500 truncate">{data.email}</p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(data.id)}
        className="ml-auto text-xs text-rose-600 cursor-pointer hover:underline hover:underline-offset-4">
        Ta bort
      </button>
    </li>
  );
}
