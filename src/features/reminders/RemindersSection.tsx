"use client";
import { NewReminderForm } from "@/components/NewReminderForm";
import { RemindersToolbar } from "./RemindersToolbar";
import { ReminderList } from "./ReminderList";

type Filter = "upcoming" | "all" | "done";

type Props = {
  mounted: boolean;
  filter: Filter;
  setFilter: (f: Filter) => void;
  selectedDate: string | null;
  clearSelectedDate: () => void;
  defaultDueAt: Date;
  filtered: any[];
  onCreate: (payload: unknown) => void;
  onToggleDone: (id: string, value: boolean) => void;
  onRemove: (id: string) => void;
  onSnooze: (id: string, days: number) => void;
};

export function RemindersSection({
  mounted,
  filter,
  setFilter,
  selectedDate,
  clearSelectedDate,
  defaultDueAt,
  filtered,
  onCreate,
  onToggleDone,
  onRemove,
  onSnooze
}: Props) {
  return (
    <section className="bg-white rounded-md drop-shadow-xl p-6">
      <header className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-medium text-black tracking-tight">
          Påminnelser
        </h2>
        <RemindersToolbar
          mounted={mounted}
          filter={filter}
          setFilter={setFilter}
          selectedDate={selectedDate}
          clearSelectedDate={clearSelectedDate}
        />
      </header>

      <div className="rounded-md border border-slate-200/70 p-4 bg-violet-50">
        <NewReminderForm
          onCreate={(p) => onCreate(p)}
          defaultDueAt={defaultDueAt.toISOString()}
        />
      </div>

      <div className="mt-4">
        <ReminderList
          items={filtered}
          onToggleDone={onToggleDone}
          onRemove={onRemove}
          onSnooze={onSnooze}
        />
      </div>
    </section>
  );
}
