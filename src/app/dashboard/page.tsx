// app/dashboard/page.tsx
import Link from "next/link";
import { api } from "@/lib";
import { Card, CardTitle, CardValue } from "@/components/card";
import { PlusCircle, Calendar, UserPlus } from "lucide-react";

function fmt(d: string) {
  return new Date(d).toLocaleString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function DashboardPage() {
  // Data
  const lists = api.listAll();
  const reminders = api
    .listReminders()
    .slice()
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt))
    .slice(0, 3);

  // Stats
  const allItems = lists.flatMap((l) => l.items);
  const doneCount = allItems.filter((i) => i.done).length;
  const todoCount = allItems.length - doneCount;

  const stats = [
    { label: "Önskelistor", value: lists.length },
    { label: "Klarmarkerade", value: doneCount },
    { label: "Att göra", value: todoCount }
  ];

  // “Senaste” listor = topp 3 i fakeDB
  const recentLists = lists.slice(0, 3);

  return (
    <div className="grid gap-6">
      {/* Stat-kort */}
      <section aria-labelledby="stats" className="grid gap-4 lg:grid-cols-3">
        <h2 id="stats" className="sr-only">
          Statistik
        </h2>
        {stats.map((s) => (
          <Card key={s.label} className="overflow-hidden">
            <CardTitle>{s.label}</CardTitle>
            <CardValue>{s.value}</CardValue>
          </Card>
        ))}
      </section>

      {/* Två kolumner: senaste + snabbåtgärder */}
      <section aria-labelledby="latest" className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <header className="mb-3 flex items-center justify-between">
            <h2 id="latest" className="text-lg font-semibold">
              Senaste önskelistor
            </h2>
            <Link
              href="/dashboard/wishlists"
              className="text-sm text-blue-600 hover:underline underline-offset-4">
              Visa alla
            </Link>
          </header>

          {recentLists.length ? (
            <ul className="divide-y">
              {recentLists.map((l) => (
                <li
                  key={l.id}
                  className="py-2 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/wishlist/${l.id}`}
                      className="font-medium hover:underline underline-offset-4 block truncate"
                      title={l.name}>
                      {l.name}
                    </Link>
                    <div className="text-xs text-gray-500">
                      {l.items.length} saker
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/wishlist/${l.id}`}
                      className="rounded-md border shadow-sm px-2 py-1 text-xs hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600">
                      Öppna
                    </Link>
                    <Link
                      href={`/wishlist/${l.id}/edit`}
                      className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600">
                      Redigera
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-md border border-dashed p-6 text-center">
              <p className="text-gray-600">Inga listor ännu.</p>
              <Link
                href="/wishlist/new"
                className="mt-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                Skapa din första lista
              </Link>
            </div>
          )}
        </Card>

        <Card aria-labelledby="quick">
          <h2 id="quick" className="text-lg font-semibold mb-3">
            Snabbåtgärder
          </h2>
          <div className="grid gap-2">
            <Link
              href="/wishlist/new"
              className="rounded-md border border-slate-100 bg-slate-50 shadow-sm px-4 py-2 text-sm hover:bg-slate-100 hover:drop-shadow-lg transition focus-visible:outline-2  focus-visible:ring-2 focus-visible:ring-slate-600 text-center">
              Skapa ny lista
            </Link>
            <Link
              href="/calendar"
              className="rounded-md border border-slate-100 bg-slate-50 shadow-sm px-4 py-2 text-sm hover:bg-slate-100 hover:drop-shadow-lg transition focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-slate-600 text-center">
              Gå till kalendern
            </Link>
            <Link
              href="/dashboard/friends"
              className="rounded-md border border-slate-100 bg-slate-50 shadow-sm px-4 py-2 text-sm hover:bg-slate-100 hover:drop-shadow-lg transition focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-slate-600 text-center">
              Lägg till vän
            </Link>
            <Link
              href="/dashboard/reminders"
              className="rounded-md border border-slate-100 bg-slate-50 shadow-sm px-4 py-2 text-sm hover:bg-slate-100 hover:drop-shadow-lg transition focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-slate-600 text-center">
              Lägg till påminnelse
            </Link>
            <Link
              href="/dashboard/settings"
              className="rounded-md border border-slate-100 bg-slate-50 shadow-sm px-4 py-2 text-sm hover:bg-slate-100 hover:drop-shadow-lg transition focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-slate-600 text-center">
              Ändra inställningar
            </Link>
          </div>
        </Card>
      </section>

      {/* Kommande påminnelser */}
      <section
        aria-labelledby="reminders"
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-neutral-900">
        <header className="mb-3 flex items-center justify-between">
          <h2 id="reminders" className="text-lg font-semibold">
            Kommande påminnelser
          </h2>
          <Link
            href="/dashboard/reminders"
            className="text-sm text-blue-600 hover:underline underline-offset-4">
            Visa alla
          </Link>
        </header>

        {reminders.length ? (
          <ul className="divide-y">
            {reminders.map((r) => (
              <li
                key={r.id}
                className="py-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate" title={r.title}>
                    {r.title}
                  </div>
                  <div className="text-xs text-gray-500">{fmt(r.dueAt)}</div>
                </div>
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-xs ring-1 ring-inset",
                    r.done
                      ? "bg-green-50 text-green-700 ring-green-200"
                      : "bg-amber-50 text-amber-700 ring-amber-200"
                  ].join(" ")}>
                  {r.done ? "Klar" : "Planerad"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-md border border-dashed p-6 text-center text-gray-600">
            Inga påminnelser ännu.
          </div>
        )}
      </section>
    </div>
  );
}
