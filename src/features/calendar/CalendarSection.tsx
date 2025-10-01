"use client";
import { MonthCalendar } from "@/components/MonthCalendar";

type Props = {
  items: any[];
  selectedDate: string | null;
  onPickDate: (iso: string | null) => void;
};

export function CalendarSection({ items, selectedDate, onPickDate }: Props) {
  return (
    <section className="relative rounded-md overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-fuchsia-300 to-violet-600" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_15%,white_.6px,transparent_1.2px),radial-gradient(circle_at_80%_40%,white_.6px,transparent_1.2px)] bg-[length:18px_18px]" />
      <div className="relative p-5">
        <header className="mb-4">
          <h1 className="text-xl font-medium text-white tracking-tight">
            Kalender
          </h1>
        </header>
        <div className="rounded-md p-3 backdrop-blur-md bg-white/10 border border-white/20 drop-shadow-md">
          <MonthCalendar
            items={items}
            selectedDate={selectedDate}
            onPickDate={(iso) => onPickDate(iso)}
          />
        </div>
      </div>
    </section>
  );
}
