"use client";
import { useEffect, useMemo, useState } from "react";
import { MonthCalendar } from "@/components/MonthCalendar";
import { NewReminderForm } from "@/components/NewReminderForm";
import { nextTopOfHourLocalFor, formatDateTimeLocal } from "@/lib/date";
import { useReminders } from "@/hooks/useReminders";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import { FilterButton } from "@/components/FilterButton";

export default function CalendarPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    items,
    filtered,
    filter,
    setFilter,
    selectedDate,
    setSelectedDate,
    addReminder,
    toggleDone,
    removeReminder,
    snooze
  } = useReminders();

  // Förfyll formuläret med vald dag (nästa heltimme). Ändras när selectedDate ändras.
  const defaultDueAt = useMemo(
    () => nextTopOfHourLocalFor(selectedDate),
    [selectedDate]
  );

  return (
    <div className="mx-auto max-w-6xl p-6 grid gap-6 lg:grid-cols-2">
      {/* Vänster: Kalender (utan extra “valt datum”-badge och rensa-knapp = mindre dubbletter) */}
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
              onPickDate={(iso) => setSelectedDate(iso)}
            />
          </div>
        </div>
      </section>

      {/* Höger: Påminnelser */}
      <section className="bg-white rounded-md drop-shadow-xl p-6">
        <header className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-medium text-black tracking-tight">
            Påminnelser
          </h2>

          {/* EN gemensam toolbar: filter + valt datum + rensa */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <FilterButton
              active={filter === "upcoming"}
              onClick={() => setFilter("upcoming")}>
              Kommande
            </FilterButton>

            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}>
              Alla
            </FilterButton>

            <FilterButton
              active={filter === "done"}
              onClick={() => setFilter("done")}>
              Klarmarkerade
            </FilterButton>

            <span className="mx-2 h-5 w-px bg-slate-200" />

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-slate-700">
              <CalendarDaysIcon className="size-4 text-slate-400" />
              {mounted && selectedDate
                ? `Valt datum: ${selectedDate}`
                : "Alla datum"}
            </span>

            {mounted && selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate(null)}
                className="px-2.5 py-1 rounded-md border bg-rose-500 hover:bg-rose-400 text-white border-rose-600 shadow-sm cursor-pointer">
                Rensa
              </button>
            )}
          </div>
        </header>

        {/* Skapa – förfyll med valt datum */}
        <div className="rounded-md border border-slate-200/70 p-4 bg-violet-50">
          <NewReminderForm
            onCreate={(p) => {
              addReminder?.(p as any); // om din hook har detta; annars ta bort
            }}
            defaultDueAt={defaultDueAt}
          />
        </div>

        {/* Lista */}
        <div className="mt-4">
          {filtered.length === 0 ? (
            <p className="text-zinc-400 italic mt-3 text-sm">
              Inga poster ännu.
            </p>
          ) : (
            <ul className="grid gap-3 mt-4">
              {filtered.map((r) => {
                // Antag att r har ett enda datumfält (t.ex. r.dueAt)
                const when = new Date(r.dueAt ?? r.date ?? r.time);
                return (
                  <li
                    key={r.id}
                    className="group rounded-md border border-slate-100 bg-white p-3 shadow hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!r.done}
                        onChange={(e) => toggleDone(r.id, e.target.checked)}
                        className="h-5 w-5 border border-slate-200 text-violet-600 focus:ring-violet-400 cursor-pointer"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-black truncate">
                          {r.title}
                        </div>

                        {/* En samlad tidsrad i stället för separat datum/tid */}
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <CalendarDaysIcon className="size-4 text-slate-400 shrink-0" />
                          <span>
                            {isNaN(when.getTime())
                              ? "—"
                              : formatDateTimeLocal(when)}
                          </span>
                        </div>

                        {r.list && (
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <span className="italic">Lista:</span>
                            <span className="flex flex-wrap italic">
                              {r.list}
                            </span>
                          </div>
                        )}
                      </div>

                      {!r.done && (
                        <div className="flex flex-col items-center gap-1">
                          <p className="text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                            Snooza
                          </p>
                          <button
                            type="button"
                            onClick={() => snooze(r.id, 1)}
                            className="text-sm rounded-sm bg-sky-200 w-20 h-6 hover:bg-sky-100 opacity-0 group-hover:opacity-100 transition">
                            1 dag
                          </button>
                          <button
                            type="button"
                            onClick={() => snooze(r.id, 7)}
                            className="text-sm rounded-sm bg-sky-200 w-20 h-6 hover:bg-sky-100 opacity-0 group-hover:opacity-100 transition">
                            7 dagar
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => removeReminder(r.id)}
                        className="text-sm rounded-sm bg-rose-600 hover:bg-rose-500 px-3 py-2 text-white opacity-0 group-hover:opacity-100 transition">
                        Ta bort
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
