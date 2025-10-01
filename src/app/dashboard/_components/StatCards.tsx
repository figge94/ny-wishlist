import { Card, CardTitle, CardValue } from "@/components/card";
import { S } from "@/lib/styles";
import { ListChecks, CheckCircle2, Clock } from "lucide-react";
import type { Wishlist } from "@/lib/types";

function getStats(lists: Wishlist[]) {
  const all = lists.flatMap((l) => l.items);
  const done = all.filter((i) => i.done).length;
  const todo = all.length - done;
  return [
    { label: "Önskelistor", value: lists.length, Icon: ListChecks },
    { label: "Klarmarkerade", value: done, Icon: CheckCircle2 },
    { label: "Att göra", value: todo, Icon: Clock }
  ] as const;
}

export function StatCards({ lists }: { lists: Wishlist[] }) {
  const stats = getStats(lists);
  return (
    <section aria-labelledby="stats" className="grid gap-3 lg:grid-cols-3">
      {stats.map(({ label, value, Icon }) => (
        <Card
          key={label}
          className={`${S.card} ${S.cardHover} overflow-hidden bg-gradient-to-br from-purple-200 to-sky-200`}>
          <div className="flex items-center gap-3 p-3">
            <div className="grid h-12 w-12 place-items-center rounded-sm bg-white/70 dark:bg-indigo-900/30">
              <Icon className="h-5 w-5 text-slate-700 dark:text-indigo-300" />
            </div>
            <div>
              <CardTitle>{label}</CardTitle>
              <CardValue>{value}</CardValue>
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}
