// src/lib/storage.ts
import { addDays } from "./date";

export type UiReminder = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string | null; // "HH:MM" (valfritt)
  list?: string | null;
  done: boolean;
};

const LS_KEY = "reminders:v1";

export function loadReminders(): UiReminder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as UiReminder[]) : [];
  } catch {
    return [];
  }
}

export function saveReminders(items: UiReminder[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  } catch {}
}

export function seedReminders(todayIso: string): UiReminder[] {
  return [
    {
      id: cryptoRandom(),
      title: "Köp present – Anna",
      date: todayIso,
      time: "18:00",
      list: "Födelsedag",
      done: false
    },
    {
      id: cryptoRandom(),
      title: "Beställ hoodie",
      date: addDays(todayIso, 2),
      list: "Min första lista",
      done: false
    }
  ];
}

function cryptoRandom() {
  try {
    return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  } catch {
    return Math.random().toString(36).slice(2, 10);
  }
}
