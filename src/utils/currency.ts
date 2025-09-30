// src/utils/currency.ts

export function toCents(input: FormDataEntryValue | null): number | null {
  if (!input) return null;
  const n = Number(String(input).replace(",", "."));
  if (Number.isNaN(n)) return null;
  const cents = Math.round(n * 100);
  return cents >= 0 ? cents : null;
}

export function fmtSEK(cents?: number | null) {
  if (cents == null) return "";
  return (cents / 100).toLocaleString("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0
  });
}
