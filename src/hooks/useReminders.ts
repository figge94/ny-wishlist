// hooks/useReminders.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { addDays, stripTime, toDate } from "@/lib/date";
import type { Reminder } from "@/lib/types";
import { loadReminders, saveReminders, seedReminders } from "@/lib/storage";

type Filter = "upcoming" | "all" | "done";
const UI_KEY = "reminders:UI:v1"; // för filter + selectedDate

export type UseRemindersApi = {
  items: Reminder[];
  filtered: Reminder[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  selectedDate: string | null;
  setSelectedDate: (d: string | null) => void;
  addReminder: (r: Omit<Reminder, "id" | "done">) => void;
  toggleDone: (id: string, v: boolean) => void;
  removeReminder: (id: string) => void;
  snooze: (id: string, days?: number) => void;
  todayIso: string;
};

export function useReminders() {
  const [items, setItems] = useState<Reminder[]>([]);
  const [filter, setFilter] = useState<Filter>("upcoming"); // ⬅️ deterministiskt
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // ⬅️ deterministiskt

  const todayIso = new Date().toISOString().slice(0, 10);

  // Data: läs/så efter mount
  useEffect(() => {
    const loaded = loadReminders(); // din storage.ts bör redan vara SSR-safe
    if (loaded.length) setItems(loaded);
    else {
      const seed = seedReminders(todayIso);
      setItems(seed);
      saveReminders(seed);
    }
    // Läs UI-state EFTER mount (inte i initializer)
    try {
      const raw = localStorage.getItem(UI_KEY);
      if (raw) {
        const ui = JSON.parse(raw);
        if (ui.filter) setFilter(ui.filter);
        if (ui.selectedDate) setSelectedDate(ui.selectedDate);
      }
    } catch {}
  }, []);

  // Spara items
  useEffect(() => {
    saveReminders(items);
  }, [items]);

  // Spara UI-state
  useEffect(() => {
    try {
      localStorage.setItem(UI_KEY, JSON.stringify({ filter, selectedDate }));
    } catch {}
  }, [filter, selectedDate]);

  const upcoming = useMemo(() => {
    const now = new Date();
    return [...items]
      .filter((r) => !r.done && toDate(r.date, r.time) >= stripTime(now))
      .sort(
        (a, b) =>
          toDate(a.date, a.time).getTime() - toDate(b.date, b.time).getTime()
      );
  }, [items]);

  const baseFiltered =
    filter === "all"
      ? items
      : filter === "done"
      ? items.filter((i) => i.done)
      : upcoming;
  const filtered = selectedDate
    ? baseFiltered.filter((r) => r.date === selectedDate)
    : baseFiltered;

  const addReminder = useCallback((data: Omit<Reminder, "id" | "done">) => {
    const id =
      globalThis.crypto
        ?.getRandomValues?.(new Uint32Array(1))[0]
        ?.toString(36) ?? Math.random().toString(36).slice(2, 10);
    setItems((prev) => [{ id, done: false, ...data }, ...prev]);
  }, []);

  const toggleDone = useCallback((id: string, v: boolean) => {
    setItems((p) => p.map((r) => (r.id === id ? { ...r, done: v } : r)));
  }, []);
  const removeReminder = useCallback((id: string) => {
    setItems((p) => p.filter((r) => r.id !== id));
  }, []);
  const snooze = useCallback((id: string, days = 1) => {
    setItems((p) =>
      p.map((r) => (r.id === id ? { ...r, date: addDays(r.date, days) } : r))
    );
  }, []);

  return {
    items,
    filtered,
    filter,
    setFilter,
    selectedDate,
    setSelectedDate,
    addReminder,
    toggleDone,
    removeReminder,
    snooze,
    todayIso
  };
}
