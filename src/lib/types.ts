// src/lib/types.ts
export type ReminderId = string;

export type Reminder = {
  id: ReminderId;
  title: string;
  /** ISO 8601 i lokal tid, t.ex. "2025-10-01T14:00" (utan tidszonssuffix) */
  dueAt: string;
  list?: string | null;
  done: boolean;
};

export type NewReminderInput = Omit<Reminder, "id" | "done"> & {
  /** tillåter att dueAt saknas i form, parent fyller i */
  dueAt?: string;
};
