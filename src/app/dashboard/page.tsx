// app/dashboard/page.tsx
import Link from "next/link";
import { api } from "@/lib";
import { Card, CardTitle, CardValue } from "@/components/card";
import {
  PlusCircle,
  Calendar,
  UserPlus,
  ChevronRight,
  ListChecks,
  CheckCircle2,
  Clock
} from "lucide-react";

function fmt(d: string) {
  return new Date(d).toLocaleString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Lokala stil-konstanter (fortfarande 100% Tailwind)
const S = {
  decoTop:
    "pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full blur-3xl opacity-25 " +
    "[background:radial-gradient(60%_60%_at_50%_50%,rgba(167,139,250,.65)_0%,rgba(167,139,250,0)_70%)]",
  decoBtm:
    "pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full blur-3xl opacity-20 " +
    "[background:radial-gradient(60%_60%_at_50%_50%,rgba(147,197,253,.6)_0%,rgba(147,197,253,0)_70%)]",

  card: "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition",
  cardHover: "hover:shadow-md",
  cardP: "p-5",

  btn:
    "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 active:scale-95",
  btnPrimary: "bg-indigo-600 text-white hover:bg-indigo-500",
  btnOutline:
    "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800",

  badge: "rounded-full px-3 py-1 text-xs ring-1 ring-inset",
  badgeGreen:
    "bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-800",
  badgeAmber:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-800",

  listRow: "py-2 flex items-center justify-between gap-3",
  listMeta: "text-xs text-muted-foreground"
};

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
    { label: "Önskelistor", value: lists.length, Icon: ListChecks },
    { label: "Klarmarkerade", value: doneCount, Icon: CheckCircle2 },
    { label: "Att göra", value: todoCount, Icon: Clock }
  ];

  const recentLists = lists.slice(0, 3);

  return (
    <div className="relative">
      {/* Dekorativa gradienter */}
      <div aria-hidden className={S.decoTop} />
      <div aria-hidden className={S.decoBtm} />

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Översikt</h1>
        <p className="text-sm text-muted-foreground">
          Snabb koll på listor, påminnelser och genvägar.
        </p>
      </header>

      <div className="grid gap-6">
        {/* Stats */}
        <section aria-labelledby="stats" className="grid gap-4 lg:grid-cols-3">
          <h2 id="stats" className="sr-only">
            Statistik
          </h2>
          {stats.map(({ label, value, Icon }) => (
            <Card
              key={label}
              className={`${S.card} ${S.cardHover} overflow-hidden`}>
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl bg-gradient-to-br from-indigo-400 to-blue-400" />
              <div className="flex items-center gap-3 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                  <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                </div>
                <div>
                  <CardTitle>{label}</CardTitle>
                  <CardValue>{value}</CardValue>
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* Senaste + snabbåtgärder */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Senaste */}
          <div className={`${S.card} ${S.cardP} lg:col-span-2`}>
            <header className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Senaste önskelistor</h2>
              <Link
                href="/dashboard/wishlists"
                className="text-sm bg-indigo-50 py-0.5 px-1.5 text-indigo-600 hover:underline underline-offset-4">
                Visa alla
              </Link>
            </header>

            {recentLists.length ? (
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {recentLists.map((l) => (
                  <li key={l.id} className={S.listRow}>
                    <div className="min-w-0">
                      <Link
                        href={`/wishlist/${l.id}`}
                        className="font-medium hover:underline underline-offset-4 block truncate"
                        title={l.name}>
                        {l.name}
                      </Link>
                      <div className={S.listMeta}>{l.items.length} saker</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/wishlist/${l.id}`}
                        className={`${S.btn} ${S.btnOutline}`}>
                        Öppna <ChevronRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/wishlist/${l.id}/edit`}
                        className={`${S.btn} ${S.btnPrimary}`}>
                        Redigera
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-md border border-dashed p-8 text-center">
                <div className="mx-auto mb-3 h-14 w-14 rounded-full grid place-items-center bg-indigo-50 dark:bg-indigo-900/30">
                  <ListChecks className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                </div>
                <p className="text-muted-foreground">Inga listor ännu.</p>
                <Link
                  href="/wishlist/new"
                  className={`mt-3 ${S.btn} ${S.btnPrimary}`}>
                  <PlusCircle className="h-4 w-4" />
                  Skapa din första lista
                </Link>
              </div>
            )}
          </div>

          {/* Snabbåtgärder */}
          <div className={`${S.card} ${S.cardP}`}>
            <h2 className="text-lg font-semibold mb-3">Snabbåtgärder</h2>
            <div className="grid gap-2">
              <QuickLink
                href="/wishlist/new"
                icon={<PlusCircle className="h-4 w-4" />}>
                Skapa ny lista
              </QuickLink>
              <QuickLink
                href="/calendar"
                icon={<Calendar className="h-4 w-4" />}>
                Gå till kalendern
              </QuickLink>
              <QuickLink
                href="/dashboard/friends"
                icon={<UserPlus className="h-4 w-4" />}>
                Lägg till vän
              </QuickLink>
              <QuickLink
                href="/dashboard/reminders"
                icon={<Clock className="h-4 w-4" />}>
                Lägg till påminnelse
              </QuickLink>
              <QuickLink
                href="/dashboard/settings"
                icon={<ChevronRight className="h-4 w-4" />}>
                Ändra inställningar
              </QuickLink>
            </div>
          </div>
        </section>

        {/* Påminnelser */}
        <section aria-labelledby="reminders" className={`${S.card} ${S.cardP}`}>
          <header className="mb-3 flex items-center justify-between">
            <h2 id="reminders" className="text-lg font-semibold">
              Kommande påminnelser
            </h2>
            <Link
              href="/dashboard/reminders"
              className="text-sm text-indigo-600 hover:underline underline-offset-4">
              Visa alla
            </Link>
          </header>

          {reminders.length ? (
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {reminders.map((r) => (
                <li key={r.id} className={S.listRow}>
                  <div className="min-w-0">
                    <div className="font-medium truncate" title={r.title}>
                      {r.title}
                    </div>
                    <div className={S.listMeta}>{fmt(r.dueAt)}</div>
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
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  children
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 shadow-sm px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-zinc-800 hover:shadow-md transition focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-black/50 active:scale-95">
      <span className="grid h-5 w-5 place-items-center">{icon}</span>
      <span>{children}</span>
      <ChevronRight className="ml-auto h-4 w-4 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  );
}
