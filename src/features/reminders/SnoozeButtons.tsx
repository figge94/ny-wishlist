"use client";

type Props = {
  onSnooze: (days: number) => void;
};

export function SnoozeButtons({ onSnooze }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-sm font-medium opacity-0 group-hover:opacity-100 transition">
        Snooza
      </p>
      <button
        type="button"
        onClick={() => onSnooze(1)}
        className="text-sm rounded-sm bg-sky-200 w-20 h-6 hover:bg-sky-100 opacity-0 group-hover:opacity-100 transition">
        1 dag
      </button>
      <button
        type="button"
        onClick={() => onSnooze(7)}
        className="text-sm rounded-sm bg-sky-200 w-20 h-6 hover:bg-sky-100 opacity-0 group-hover:opacity-100 transition">
        7 dagar
      </button>
    </div>
  );
}
