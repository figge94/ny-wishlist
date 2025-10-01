// src/hooks/useReminders.ts
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { addDays, stripTime, toDate } from "@/lib/date";
import { loadReminders, saveReminders, seedReminders } from "@/lib/storage";
import type { UiReminder } from "@/lib/storage";

type Filter = "upcoming" | "all" | "done";

const UI_KEY = "reminders:ui:v1";

// === Viktigt: gör unionen disjunkt ===
type AddByParts = {
  title: string;
  date: string; // "YYYY-MM-DD"
  time?: string | null; // "HH:mm" (valfritt)
  list?: string | null;
};

type AddByDueAt = {
  title: string;
  dueAt: string; // "YYYY-MM-DDTHH:mm"
  list?: string | null;
};

export type UseRemindersApi = {
  items: UiReminder[];
  filtered: UiReminder[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  selectedDate: string | null;
  setSelectedDate: (d: string | null) => void;
  addReminder: (
    r:
      | Omit<UiReminder, "id" | "done">
      | { title: string; dueAt: string; list?: string | null }
  ) => void;
  toggleDone: (id: string, v: boolean) => void;
  removeReminder: (id: string) => void;
  snooze: (id: string, days?: number) => void;
  todayIso: string;
};

// Lokal hjälpare: bygg "YYYY-MM-DDTHH:mm" från date/time
function buildDueAt(date: string, time?: string | null): string {
  const hhmm = time?.trim() || "00:00";
  return `${date}T${hhmm}`;
}

export function useReminders(): UseRemindersApi {
  const [items, setItems] = useState<UiReminder[]>([]);
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const todayIso = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const loaded = loadReminders();
    if (loaded.length) {
      setItems(loaded);
    } else {
      const seed = seedReminders(todayIso);
      setItems(seed);
      saveReminders(seed);
    }
    try {
      const raw = localStorage.getItem(UI_KEY);
      if (raw) {
        const ui = JSON.parse(raw) as {
          filter?: Filter;
          selectedDate?: string | null;
        };
        if (ui.filter) setFilter(ui.filter);
        if (ui.selectedDate !== undefined) setSelectedDate(ui.selectedDate);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveReminders(items);
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(UI_KEY, JSON.stringify({ filter, selectedDate }));
    } catch {}
  }, [filter, selectedDate]);

  const upcoming = useMemo(() => {
    const now = new Date();
    return [...items]
      .filter(
        (r) => !r.done && toDate(r.date, r.time ?? undefined) >= stripTime(now)
      )
      .sort(
        (a, b) =>
          toDate(a.date, a.time ?? undefined).getTime() -
          toDate(b.date, b.time ?? undefined).getTime()
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

  function genId(): string {
    const buf = new Uint32Array(1);
    if (globalThis.crypto?.getRandomValues) {
      globalThis.crypto.getRandomValues(buf);
      return buf[0].toString(36);
    }
    return Math.random().toString(36).slice(2, 10);
  }

  // === Fixad addReminder ===
  const addReminder = useCallback((data: AddByParts | AddByDueAt) => {
    let payload: Omit<UiReminder, "id" | "done">;

    if ("dueAt" in data) {
      // Variant med dueAt (AddByDueAt)
      const [date, time] = data.dueAt.split("T");
      payload = {
        title: data.title,
        date,
        time: time ?? null,
        dueAt: data.dueAt,
        list: data.list ?? null
      };
    } else {
      // Variant med date/time (AddByParts)
      const dueAt = buildDueAt(data.date, data.time ?? null);
      payload = {
        title: data.title,
        date: data.date,
        time: data.time ?? null,
        dueAt,
        list: data.list ?? null
      };
    }

    const newReminder: UiReminder = { id: genId(), done: false, ...payload };
    setItems((prev) => [newReminder, ...prev]);
  }, []);

  const toggleDone = useCallback((id: string, v: boolean) => {
    setItems((p) => p.map((r) => (r.id === id ? { ...r, done: v } : r)));
  }, []);

  const removeReminder = useCallback((id: string) => {
    setItems((p) => p.filter((r) => r.id !== id));
  }, []);

  // FIX: snooze uppdaterar både date och dueAt (behåller time)
  const snooze = useCallback((id: string, days = 1) => {
    setItems((p) =>
      p.map((r) => {
        if (r.id !== id) return r;
        const newDate = addDays(r.date, days);
        return {
          ...r,
          date: newDate,
          dueAt: buildDueAt(newDate, r.time ?? null)
        };
      })
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
