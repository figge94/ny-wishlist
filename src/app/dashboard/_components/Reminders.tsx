import Link from "next/link";
import { fmtSv } from "@/lib/date";
import { S } from "@/lib/styles";
import type { Reminder } from "@/lib/types";

export function Reminders({ reminders }: { reminders: Reminder[] }) {
  const list = reminders
    .slice()
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
    .slice(0, 3);

  return (
    <section aria-labelledby="reminders" className={`${S.card} ${S.cardP}`}>
      <header className="mb-3 flex items-center justify-between">
        <h2 id="reminders" className="text-lg font-medium">
          Kommande påminnelser
        </h2>
        <Link
          href="/dashboard/reminders"
          className="text-sm text-sky-500 hover:underline underline-offset-4">
          Visa alla
        </Link>
      </header>

      {list.length ? (
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {list.map((r) => (
            <li key={r.id} className={S.listRow}>
              <div className="min-w-0">
                <div className="font-medium truncate" title={r.title}>
                  {r.title}
                </div>
                <div className={S.listMeta}>{fmtSv(r.dueAt)}</div>
              </div>
              <span
                className={`${S.badge} ${
                  r.done ? S.badgeGreen : S.badgeAmber
                }`}>
                {r.done ? "Klar" : "Planerad"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
          Inga påminnelser ännu.
        </div>
      )}
    </section>
  );
}
