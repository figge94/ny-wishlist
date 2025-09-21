"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import type { Reminder } from "@/lib/types";
import { toIso } from "@/lib/date";

const MONTHS_SV = [
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

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

const glassBase =
  "backdrop-blur-md bg-white/10 border border-white/20 shadow-lg shadow-black/10 text-white";
const glassHover = "hover:bg-white/30";
const glassToday = "ring-2 ring-white/70";
const glassSelected = "bg-blue-600/70 text-white border-blue-300/40";
const glassBtn = `${glassBase} ${glassHover} text-white rounded-sm px-3 py-2 transition`;
const glassBtnIcon = `${glassBtn} leading-none select-none`;

export function MonthCalendar({
  items,
  selectedDate,
  onPickDate
}: {
  items: Reminder[];
  selectedDate: string | null;
  onPickDate: (iso: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [cursor, setCursor] = useState(() => {
    // initiera neutral (undvik server-klient-skillnad)
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  useEffect(() => setMounted(true), []);

  // ❗ Viktigt: räkna detta bara efter mount så SSR/CSR matchar
  const todayIso = useMemo(() => {
    if (!mounted) return ""; // rendera utan “idag”-ring på SSR
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }, [mounted]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = (firstDay.getDay() + 6) % 7; // måndag=0

  const cells: Array<{ iso?: string; day?: number }> = [];
  for (let i = 0; i < startWeekday; i++) cells.push({});
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ iso: toIso(year, month, d), day: d });

  const countByDate = useMemo(() => {
    return items.reduce<Record<string, number>>((acc, r) => {
      acc[r.date] = (acc[r.date] || 0) + 1;
      return acc;
    }, {});
  }, [items]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className={glassBtnIcon}
          aria-label="Föregående månad">
          ◀
        </button>

        <div className="font-medium text-white" suppressHydrationWarning>
          {MONTHS_SV[month]} {year}
        </div>

        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className={glassBtnIcon}
          aria-label="Nästa månad">
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-white/80 mb-1 select-none font-semibold">
        {["MÅ", "TI", "ON", "TO", "FR", "LÖ", "SÖ"].map((w) => (
          <div key={w} className="p-1 text-center">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((c, i) => {
          const isToday = mounted && c.iso === todayIso;
          const isSelected = !!selectedDate && c.iso === selectedDate;
          const has = c.iso ? countByDate[c.iso] || 0 : 0;

          return (
            <button
              key={i}
              type="button"
              disabled={!c.iso}
              onClick={() => c.iso && onPickDate(c.iso)}
              className={[
                "h-16 rounded-lg flex flex-col items-center justify-center transition",
                c.iso
                  ? `${glassBase} ${glassHover} ${focusRing}`
                  : "opacity-0 cursor-default", // osynlig
                isToday ? glassToday : "",
                isSelected ? glassSelected : ""
              ].join(" ")}
              title={c.iso || ""}>
              <span className="text-sm">{c.day ?? ""}</span>
              {has > 0 && (
                <span className="text-[10px] mt-1 px-1.5 py-0.5 rounded-full border border-white/30 bg-white/10 text-white/90 focus:ring-2 focus-visible:ring-white/80">
                  {has}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
