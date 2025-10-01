"use client";
import React from "react";

type Props = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

// samma btn-funktion som du redan har
function btn(active: boolean) {
  return [
    "px-3 py-1 rounded-full border transition shadow-sm",
    "focus:outline-none focus:ring-2 focus:ring-white/60 focus:shadow-md",
    active
      ? "bg-violet-600/60 text-white border-violet-500 shadow-md"
      : "bg-white/70 hover:bg-white border-slate-200 text-slate-700"
  ].join(" ");
}

export function FilterButton({ active, onClick, children }: Props) {
  return (
    <button type="button" onClick={onClick} className={btn(active)}>
      {children}
    </button>
  );
}
