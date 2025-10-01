// app/friends/_components/RequestsList.tsx (oförändrad)
"use client";
import React from "react";
import type { Friend } from "../_types";

type Props = {
  requests: Friend[];
  onAccept: (id: string) => void | Promise<void>;
  onDecline: (id: string) => void | Promise<void>;
};

export function RequestsList({ requests, onAccept, onDecline }: Props) {
  if (requests.length === 0) {
    return (
      <p className="text-sm text-gray-500">Inga väntande förfrågningar.</p>
    );
  }
  return (
    <ul className="space-y-2">
      {requests.map((r) => (
        <li
          key={r.id}
          className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="h-8 w-8 rounded-full bg-gray-100 grid place-items-center text-xs font-medium">
            {r.name[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {r.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{r.email}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => onAccept(r.id)}
              className="text-sm text-white bg-teal-600 border border-teal-600 shadow-sm cursor-pointer px-4 py-2 rounded-md hover:bg-teal-700">
              Acceptera
            </button>
            <button
              type="button"
              onClick={() => onDecline(r.id)}
              className="text-sm text-white bg-rose-600 border border-rose-600 shadow-sm cursor-pointer px-4 py-2 rounded-md hover:bg-rose-500">
              Avböj
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
