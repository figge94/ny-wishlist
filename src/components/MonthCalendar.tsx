"use client";

import {
  useCountsByDate,
  useMonthCursor,
  useCalendarGrid,
  useMounted,
  useTodayIso
} from "@/hooks/calendar";
import type { Reminder } from "@/lib";
import { month_sv } from "@/lib/date";
import {
  focusRing,
  glassBase,
  glassHover,
  glassToday,
  glassSelected,
  glassBtnIcon
} from "@/lib/styles";

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function MonthCalendar({
  items,
  selectedDate,
  onPickDate
}: {
  items: Reminder[];
  selectedDate: string | null;
  onPickDate: (iso: string) => void;
}) {
  const mounted = useMounted();
  const { year, month, prev, next } = useMonthCursor();
  const { cells } = useCalendarGrid(year, month);
  const rows = chunk(cells, 7);
  const todayIso = useTodayIso(mounted);
  const countByDate = useCountsByDate(items, (r) => r.date);

  return (
    <div>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          className={glassBtnIcon}
          aria-label="Föregående månad">
          ◀
        </button>
        <div className="font-medium text-white" suppressHydrationWarning>
          {month_sv[month]} {year}
        </div>
        <button
          type="button"
          onClick={next}
          className={glassBtnIcon}
          aria-label="Nästa månad">
          ▶
        </button>
      </div>

      {/* Veckodagar */}
      <div className="mb-1 grid select-none grid-cols-7 text-xs font-medium text-white">
        {["MÅ", "TI", "ON", "TO", "FR", "LÖ", "SÖ"].map((w) => (
          <div key={w} className="p-1 text-center">
            {w}
          </div>
        ))}
      </div>

      {/* Datumgrid med ARIA */}
      <div role="grid" aria-label="Kalender" className="grid gap-1">
        {rows.map((row, rIdx) => (
          <div key={rIdx} role="row" className="grid grid-cols-7 gap-1">
            {row.map((c, i) => {
              const isToday = mounted && c.iso === todayIso;
              const isSelected = !!selectedDate && c.iso === selectedDate;
              const has = c.iso ? countByDate[c.iso] || 0 : 0;

              return (
                <div
                  key={i}
                  role="gridcell"
                  tabIndex={c.iso ? 0 : -1}
                  aria-selected={isSelected ? "true" : "false"}
                  aria-disabled={c.iso ? "false" : "true"}
                  aria-label={c.iso || undefined}
                  onClick={() => c.iso && onPickDate(c.iso)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && c.iso) {
                      e.preventDefault();
                      onPickDate(c.iso);
                    }
                  }}
                  className={[
                    "h-16 rounded-md flex flex-col items-center justify-center transition",
                    c.iso
                      ? `${glassBase} ${glassHover} ${focusRing} cursor-pointer`
                      : "opacity-0 cursor-default",
                    isToday ? glassToday : "",
                    isSelected ? glassSelected : ""
                  ].join(" ")}>
                  <span className="text-sm">{c.day ?? ""}</span>
                  {has > 0 && (
                    <span className="mt-1 rounded-full border bg-white/40 px-2 py-0.5 text-[12px] text-white/90">
                      {has}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
