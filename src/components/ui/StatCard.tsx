import type { ComponentType } from "react";
import { S } from "./styles";

export type StatCardProps = {
  label: string;
  value: number | string;
  icon: ComponentType<{ className?: string }>;
  gradient?: boolean; // slå av/på gradientbakgrund
};

export function StatCard({
  label,
  value,
  icon: Icon,
  gradient = true
}: StatCardProps) {
  return (
    <div
      className={`${S.card} ${S.cardHover} overflow-hidden ${
        gradient ? "bg-gradient-to-br from-purple-200 to-sky-200" : ""
      }`}
      role="status"
      aria-label={`${label}: ${value}`}>
      <div className="flex items-center gap-3 p-3">
        <div className="grid h-12 w-12 place-items-center rounded-sm bg-white/70 dark:bg-indigo-900/30">
          <Icon className="h-5 w-5 text-slate-700 dark:text-indigo-300" />
        </div>
        <div>
          <div className="text-sm text-slate-700/80">{label}</div>
          <div className="text-2xl font-semibold leading-tight">{value}</div>
        </div>
      </div>
    </div>
  );
}
