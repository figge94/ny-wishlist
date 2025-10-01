// app/friends/_components/SearchBox.tsx (oförändrad)
"use client";
import React from "react";

type Props = { value?: string; onChange?: (v: string) => void };
export function SearchBox({ value = "", onChange = () => {} }: Props) {
  return (
    <div className="ml-auto w-full max-w-xs">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Sök vän…"
        className="w-full border border-slate-300 rounded-md inset-shadow-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white"
      />
    </div>
  );
}
