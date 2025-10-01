"use client";
import { ReminderItem } from "./ReminderItem";

type Props = {
  items: any[];
  onToggleDone: (id: string, value: boolean) => void;
  onRemove: (id: string) => void;
  onSnooze: (id: string, days: number) => void;
};

export function ReminderList({
  items,
  onToggleDone,
  onRemove,
  onSnooze
}: Props) {
  if (!items || items.length === 0) {
    return (
      <p className="text-zinc-400 italic mt-3 text-sm">Inga poster ännu.</p>
    );
  }

  return (
    <ul className="grid gap-3 mt-4">
      {items.map((r) => (
        <ReminderItem
          key={r.id}
          item={r}
          onToggleDone={onToggleDone}
          onRemove={onRemove}
          onSnooze={onSnooze}
        />
      ))}
    </ul>
  );
}
