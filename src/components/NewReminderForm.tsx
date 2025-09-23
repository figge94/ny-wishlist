"use client";
import React from "react";
import { Reminder } from "@/lib";

export function NewReminderForm({
  onCreate
}: {
  onCreate: (r: Omit<Reminder, "id" | "done">) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = e.currentTarget;
        const title = (
          f.elements.namedItem("title") as HTMLInputElement
        ).value.trim();
        const date = (f.elements.namedItem("date") as HTMLInputElement).value;
        const time = (f.elements.namedItem("time") as HTMLInputElement).value;
        const list = (
          f.elements.namedItem("list") as HTMLInputElement
        ).value.trim();
        if (title && date)
          onCreate({
            title,
            date,
            time: time || undefined,
            list: list || undefined
          });
        f.reset();
      }}
      className="grid gap-3">
      <input
        name="title"
        placeholder="Titel (t.ex. köp present)"
        className="rounded-sm text-slate-800 border border-slate-300 px-3 py-2 bg-white inset-shadow-sm inset-shadow-stone-200 text-sm focus-visible:ring-2 focus-visible:ring-slate-400"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          name="date"
          type="date"
          className="rounded-sm border text-slate-800 border-slate-300 px-3 py-2 bg-white inset-shadow-sm inset-shadow-stone-200 text-sm focus-visible:ring-2 focus:ring-slate-400"
        />
        <input
          name="time"
          type="time"
          className="rounded-sm border text-slate-800 border-slate-300 px-3 py-2 bg-white inset-shadow-sm inset-shadow-stone-200 text-sm focus-visible:ring-2 focus:ring-slate-400"
        />
      </div>
      <input
        name="list"
        placeholder="Koppla påminnelse till lista (valfritt) "
        className="rounded-sm border text-slate-800 border-slate-300 bg-white px-3 py-2 inset-shadow-sm inset-shadow-stone-200 text-sm focus-visible:ring-2 focus:ring-slate-400"
      />
      <button
        type="button"
        className="bg-violet-600/80 text-white rounded px-3 py-3 uppercase text-sm font-semibold hover:bg-violet-600 transition cursor-pointer">
        Lägg till
      </button>
    </form>
  );
}
