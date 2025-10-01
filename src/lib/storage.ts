// src/lib/storage.ts
import { addDays } from "./date";

export type UiReminder = {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  time?: string | null; // "HH:MM" (valfritt)
  dueAt: string; // "YYYY-MM-DDTHH:mm"
  list?: string | null;
  done: boolean;
};

const LS_KEY = "reminders:v1";

/** Bygg "YYYY-MM-DDTHH:mm" från date + (ev) time. */
function buildDueAt(date: string, time?: string | null): string {
  const hhmm = (time && time.trim()) || "00:00";
  return `${date}T${hhmm}`;
}

/** Dela upp dueAt till {date,time}. */
function splitDueAt(dueAt: string): { date: string; time: string } {
  const [date, time = "00:00"] = dueAt.split("T");
  return { date, time };
}

/** Säkerställ att dueAt finns (migration för gamla poster). */
function ensureDueAt(r: any): UiReminder {
  // date/time → dueAt
  if (!r.dueAt && r.date) {
    const dueAt = buildDueAt(r.date, r.time ?? null);
    return { ...r, dueAt };
  }
  // dueAt → date/time (ifall du vill ha dem konsekvent satta)
  if (r.dueAt && !r.date) {
    const { date, time } = splitDueAt(r.dueAt);
    return { ...r, date, time };
  }
  return r as UiReminder;
}

export function loadReminders(): UiReminder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    const items = raw ? (JSON.parse(raw) as any[]) : [];
    // Migration: fyll i saknad dueAt/date/time
    const normalized = items.map(ensureDueAt);
    // Spara tillbaka om något normaliserades
    const changed = JSON.stringify(items) !== JSON.stringify(normalized);
    if (changed) {
      localStorage.setItem(LS_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return [];
  }
}

export function saveReminders(items: UiReminder[]) {
  if (typeof window === "undefined") return;
  try {
    // håll fälten i synk innan vi sparar
    const synced = items.map((r) => {
      const withDueAt = r.dueAt
        ? r
        : { ...r, dueAt: buildDueAt(r.date, r.time ?? null) };
      if (!withDueAt.date || !withDueAt.time) {
        const { date, time } = splitDueAt(withDueAt.dueAt);
        return { ...withDueAt, date, time };
      }
      return withDueAt;
    });
    localStorage.setItem(LS_KEY, JSON.stringify(synced));
  } catch {}
}

export function seedReminders(todayIso: string): UiReminder[] {
  const aDate = todayIso;
  const aTime = "18:00";
  const bDate = addDays(todayIso, 2);
  // bTime utelämnad med flit

  return [
    {
      id: cryptoRandom(),
      title: "Köp present – Anna",
      date: aDate,
      time: aTime,
      dueAt: buildDueAt(aDate, aTime),
      list: "Födelsedag",
      done: false
    },
    {
      id: cryptoRandom(),
      title: "Beställ hoodie",
      date: bDate,
      time: null,
      dueAt: buildDueAt(bDate, null),
      list: "Min första lista",
      done: false
    }
  ];
}

function cryptoRandom(): string {
  try {
    return (
      globalThis.crypto?.getRandomValues(new Uint32Array(1))[0] ?? Date.now()
    ).toString(36);
  } catch {
    return Math.random().toString(36).slice(2, 10);
  }
}
