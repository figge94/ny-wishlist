"use client";
import { useEffect, useMemo, useState } from "react";
import { nextTopOfHourLocalFor } from "@/lib/date";
import { useReminders } from "@/hooks/useReminders";
import { CalendarSection } from "@/features/calendar/CalendarSection";
import { RemindersSection } from "@/features/reminders/RemindersSection";

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

  const defaultDueAt = useMemo(
    () => new Date(nextTopOfHourLocalFor(selectedDate)),
    [selectedDate]
  );

  return (
    <div className="mx-auto max-w-6xl p-6 grid gap-6 lg:grid-cols-2">
      <CalendarSection
        items={items}
        selectedDate={selectedDate}
        onPickDate={setSelectedDate}
      />
      <RemindersSection
        mounted={mounted}
        filter={filter}
        setFilter={setFilter}
        selectedDate={selectedDate}
        clearSelectedDate={() => setSelectedDate(null)}
        defaultDueAt={defaultDueAt}
        filtered={filtered}
        onCreate={addReminder as any}
        onToggleDone={toggleDone}
        onRemove={removeReminder}
        onSnooze={snooze}
      />
    </div>
  );
}
