"use client";
import { formatDateTimeLocal } from "@/lib/date";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { SnoozeButtons } from "./SnoozeButtons";

type Reminder = {
  id: string;
  title: string;
  done?: boolean;
  dueAt?: string | Date;
  date?: string | Date;
  time?: string | Date;
  list?: string | null;
};

type Props = {
  item: Reminder;
  onToggleDone: (id: string, value: boolean) => void;
  onRemove: (id: string) => void;
  onSnooze: (id: string, days: number) => void;
};

export function ReminderItem({
  item,
  onToggleDone,
  onRemove,
  onSnooze
}: Props) {
  const when = new Date((item as any).dueAt ?? item.date ?? item.time);
  const hasValidDate = !isNaN(when.getTime());

  return (
    <li className="group rounded-md border border-slate-100 bg-white p-3 shadow hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={!!item.done}
          onChange={(e) => onToggleDone(item.id, e.target.checked)}
          className="h-5 w-5 border border-slate-200 text-violet-600 focus:ring-violet-400 cursor-pointer"
        />

        <div className="flex-1 min-w-0">
          <div className="font-medium text-black truncate">{item.title}</div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <CalendarDaysIcon className="size-4 text-slate-400 shrink-0" />
            <span>{hasValidDate ? formatDateTimeLocal(when) : "—"}</span>
          </div>
          {!!item.list && (
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <span className="italic">Lista:</span>
              <span className="flex flex-wrap italic">{item.list}</span>
            </div>
          )}
        </div>

        {!item.done && (
          <SnoozeButtons onSnooze={(days) => onSnooze(item.id, days)} />
        )}

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="text-sm rounded-sm bg-rose-600 hover:bg-rose-500 px-3 py-2 text-white opacity-0 group-hover:opacity-100 transition">
          Ta bort
        </button>
      </div>
    </li>
  );
}
