import { Reminder } from "@/lib";

const LS_KEY = "reminders:v1";

export function loadReminders(): Reminder[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveReminders(items: Reminder[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export function seedReminders(todayIso: string): Reminder[] {
  return [
    {
      id: cryptoRandom(),
      title: "Köp present – Anna",
      date: todayIso,
      time: "18:00",
      list: "Födelsedag",
      dueAt: ""
    },
    {
      id: cryptoRandom(),
      title: "Beställ hoodie",
      date: addDays(todayIso, 2),
      list: "Min första lista",
      dueAt: ""
    }
  ];
}

function cryptoRandom() {
  try {
    // lite bättre uid än Math.random om tillgängligt
    return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  } catch {
    return Math.random().toString(36).slice(2, 10);
  }
}

// lokalt import-behov
import { addDays } from "./date";
