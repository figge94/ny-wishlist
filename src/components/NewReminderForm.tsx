"use client";
import React, { useState } from "react";

type Props = {
  onCreate?: (input: {
    title: string;
    dueAt?: string;
    list?: string | null;
  }) => void;
  defaultDueAt?: string;
};

export function NewReminderForm({ onCreate, defaultDueAt }: Props) {
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState<string>(defaultDueAt ?? "");
  const [list, setList] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    // Om användaren inte fyllt i fältet, använd defaultDueAt
    const effectiveDueAt = dueAt || defaultDueAt;
    if (!effectiveDueAt) return; // säkerhet

    onCreate?.({
      title: title.trim(),
      dueAt: effectiveDueAt,
      list: list.trim() || undefined
    });

    // återställ formuläret
    setTitle("");
    setList("");
    setDueAt(defaultDueAt ?? "");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <input
        className="border rounded-md px-3 py-2"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="datetime-local"
        className="border rounded-md px-3 py-2"
        value={dueAt}
        onChange={(e) => setDueAt(e.target.value)}
        required
      />

      <input
        className="border rounded-md px-3 py-2"
        placeholder="Lista (valfritt)"
        value={list}
        onChange={(e) => setList(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-500">
          Lägg till
        </button>
      </div>
    </form>
  );
}
