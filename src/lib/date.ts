// /lib/date.ts
export function toDate(date: string, time?: string | null): Date {
  if (!time) return new Date(date + "T00:00");
  return new Date(`${date}T${time}`);
}

export function addDays(dateIso: string, days: number): string {
  const d = new Date(dateIso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function formatDateTime(d: string, t?: string) {
  return t ? `${d} kl ${t}` : d;
}

export function toIso(y: number, m0: number, d: number) {
  const dt = new Date(y, m0, d);
  const y2 = dt.getFullYear();
  const m2 = String(dt.getMonth() + 1).padStart(2, "0");
  const d2 = String(dt.getDate()).padStart(2, "0");
  return `${y2}-${m2}-${d2}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

// Svenska månader
export const month_sv = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december"
];

/** "YYYY-MM-DD" (+ ev. nu) → default "YYYY-MM-DDTHH:mm" (nästa heltimme) */
export function nextTopOfHourLocalFor(dateIso?: string | null) {
  const base = dateIso ? new Date(dateIso + "T00:00") : new Date();
  base.setMinutes(0, 0, 0);
  base.setHours(base.getHours() + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${base.getFullYear()}-${pad(base.getMonth() + 1)}-${pad(
    base.getDate()
  )}T${pad(base.getHours())}:${pad(base.getMinutes())}`;
}

/** Samlad visning: t.ex. "tis 3 sep, 14:00" */
export function formatDateTimeLocal(d: Date) {
  return d.toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function fmtSv(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
