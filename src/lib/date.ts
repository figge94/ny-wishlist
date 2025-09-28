// /lib/date.ts
export function toDate(d: string, t?: string) {
  return new Date(t ? `${d}T${t}:00` : `${d}T00:00:00`);
}

export function addDays(isoDate: string, days: number) {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function stripTime(d: Date) {
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
