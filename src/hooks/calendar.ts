// hooks/calendar.ts
import { useEffect, useMemo, useState } from "react";
import { toIso } from "@/lib/date";

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function useTodayIso(enabled: boolean) {
  return useMemo(() => {
    if (!enabled) return "";
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }, [enabled]);
}

export function useMonthCursor(initial?: Date) {
  const [cursor, setCursor] = useState<Date>(() => {
    const d = initial ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const prev = () => setCursor(new Date(year, month - 1, 1));
  const next = () => setCursor(new Date(year, month + 1, 1));

  return { cursor, year, month, prev, next, setCursor };
}

export type CalendarCell = { iso?: string; day?: number };

export function useCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = (firstDay.getDay() + 6) % 7; // måndag=0

  const cells: CalendarCell[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push({});
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ iso: toIso(year, month, d), day: d });

  return { cells, daysInMonth, startWeekday };
}

export function useCountsByDate<T>(items: T[], getDate: (item: T) => string) {
  return useMemo(() => {
    return items.reduce<Record<string, number>>((acc, r) => {
      const d = getDate(r);
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {});
  }, [items, getDate]);
}
