"use client";
import { useEffect, useState } from "react";
import { MonthCalendar } from "@/components/MonthCalendar";
import { NewReminderForm } from "@/components/NewReminderForm";
import { formatDateTime } from "@/lib/date";
import { useReminders } from "@/hooks/useReminders";

function btn(active: boolean) {
  return [
    "px-3 py-1 rounded-full border transition shadow-sm",
    "focus:outline-none focus:ring-2 focus:ring-white/60 focus:shadow-md",
    active
      ? "bg-violet-600/60 text-white border-violet-500 shadow-md"
      : "bg-white/70 hover:bg-white border-slate-200 text-slate-700"
  ].join(" ");
}

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

  return (
    <div className="mx-auto max-w-6xl p-6 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      {/* Vänster: Kalender (glas ovan färgad bakgrund) */}
      <section className="relative rounded-xl overflow-hidden shadow-2xl">
        {/* färgad bakgrund för kontrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-fuchsia-300 to-violet-600" />
        {/* svag textur */}
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_15%,white_.6px,transparent_1.2px),radial-gradient(circle_at_80%_40%,white_.6px,transparent_1.2px)] bg-[length:18px_18px]" />
        <div className="relative p-5">
          <header className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Kalender
            </h1>
            {mounted &&
              selectedDate && ( // ⬅️ viktig
                <span className="text-xs text-white bg-white/30 border border-white/20 rounded-lg px-2 py-1 backdrop-blur-md">
                  {selectedDate}
                </span>
              )}
          </header>

          <div className="rounded-xl p-3 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <MonthCalendar
              items={items}
              selectedDate={selectedDate}
              onPickDate={(iso) => setSelectedDate(iso)}
            />
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              className="px-3 py-1.5 rounded-xl border text-white/90
                  backdrop-blur-md bg-white/30 border-white/20 hover:bg-white/20
                  focus:outline-none focus:ring-2 focus:ring-white/50 transition hover:cursor-pointer">
              Rensa datumfilter
            </button>
          </div>
        </div>
      </section>

      {/* Höger: Påminnelser (ljus kortlayout) */}
      <section className="bg-white rounded-xl shadow-2xl p-6">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black tracking-tight">
            Påminnelser
          </h2>
        </header>

        <div className="rounded-lg border border-slate-200/70 p-4 bg-violet-50">
          <NewReminderForm onCreate={addReminder} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            onClick={() => setFilter("upcoming")}
            className={btn(filter === "upcoming")}>
            Kommande
          </button>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={btn(filter === "all")}>
            Alla
          </button>
          <button
            type="button"
            onClick={() => setFilter("done")}
            className={btn(filter === "done")}>
            Klarmarkerade
          </button>
        </div>

        <div>
          <div className="mt-4 w-full items-center gap-2 text-sm inline-flex p-2 rounded-sm border-b border-slate-200">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-slate-700 ">
              {mounted && selectedDate
                ? `Valt datum: ${selectedDate}`
                : "Alla datum"}
            </span>
            {mounted && selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate(null)}
                className="inline-flex items-center rounded-lg gap-1 border px-2.5 py-1 bg-rose-500 hover:bg-rose-400 text-white border-rose-600 shadow-sm cursor-pointer">
                Rensa datum
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="text-zinc-400 italic mt-3 text-sm">
              Inga poster ännu.
            </p>
          ) : (
            <ul className="grid gap-3 mt-4">
              {filtered.map((r) => (
                <li
                  key={r.id}
                  className="group rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!r.done}
                      onChange={(e) => toggleDone(r.id, e.target.checked)}
                      className="h-5 w-5 border-slate-200 text-blue-600 focus:ring-blue-400"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-black">{r.title}</div>
                      <div className="text-xs text-slate-500">
                        {formatDateTime(r.date, r.time)}
                        {r.list ? (
                          <>
                            {" "}
                            Lista:{" "}
                            <span className="flex flex-wrap italic">
                              {r.list}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </div>
                    {!r.done && (
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-sm font-semibold cursor-pointer opacity-0 group-hover:opacity-100 transition">
                          Snooza
                        </p>
                        <button
                          type="button"
                          onClick={() => snooze(r.id, 1)}
                          className="text-sm rounded-sm bg-sky-200 w-20 h-8 hover:bg-sky-100 cursor-pointer opacity-0 group-hover:opacity-100 transition">
                          1 dag
                        </button>
                        <button
                          type="button"
                          onClick={() => snooze(r.id, 7)}
                          className="text-sm rounded-sm bg-sky-200 w-20 h-8 hover:bg-sky-100 cursor-pointer opacity-0 group-hover:opacity-100 transition">
                          7 dagar
                        </button>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeReminder(r.id)}
                      className="text-sm  rounded-sm bg-rose-600 hover:bg-rose-500 p-3 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition">
                      Ta bort
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
