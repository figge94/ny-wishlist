"use client";
import { FilterButton } from "@/components/FilterButton";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

type Filter = "upcoming" | "all" | "done";

type Props = {
  mounted: boolean;
  filter: Filter;
  setFilter: (f: Filter) => void;
  selectedDate: string | null;
  clearSelectedDate: () => void;
};

export function RemindersToolbar({
  mounted,
  filter,
  setFilter,
  selectedDate,
  clearSelectedDate
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <FilterButton
        active={filter === "upcoming"}
        onClick={() => setFilter("upcoming")}>
        Kommande
      </FilterButton>
      <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
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
        {mounted && selectedDate ? `Valt datum: ${selectedDate}` : "Alla datum"}
      </span>

      {mounted && selectedDate && (
        <button
          type="button"
          onClick={clearSelectedDate}
          className="px-2.5 py-1 rounded-md border bg-rose-500 hover:bg-rose-400 text-white border-rose-600 shadow-sm cursor-pointer">
          Rensa
        </button>
      )}
    </div>
  );
}
