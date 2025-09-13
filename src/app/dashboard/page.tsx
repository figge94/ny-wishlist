// app/dashboard/page.tsx
import Link from "next/link";
import { Card, CardTitle, CardValue } from "@/components/card";

export default function DashboardPage() {
  const stats = [
    { label: "Listor", value: 3 },
    { label: "Objekt totalt", value: 14 },
    { label: "Klarmarkerade", value: 5 },
    { label: "Att göra", value: 9 },
  ];

  const recent = [
    { title: "Hörlurar", list: "Min första lista", ts: "Idag 10:12" },
    { title: "Hoodie", list: "Min första lista", ts: "Igår 18:20" },
    { title: "Presentkort", list: "Födelsedag", ts: "2 dgr sedan" },
  ];

  const cards = [
    { href: "/dashboard", title: "Översikt", text: "Din översikt" },
    {
      href: "/dashboard/wishlist",
      title: "Önskelistor",
      text: "Dina önskelistor",
    },
    { href: "/dashboard/friends", title: "Vänner", text: "Hantera vänner" },
    {
      href: "/dashboard/settings",
      title: "Inställningar",
      text: "Profil & säkerhet",
    },
  ];

  return (
    <div className="grid gap-5">
      {/* Stat-kort */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardTitle>{s.label}</CardTitle>
            <CardValue>{s.value}</CardValue>
          </Card>
        ))}
      </section>

      {/* Snabblänkar/kort */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border bg-white p-6 shadow hover:shadow-lg hover:-translate-y-0.5 transition">
            <h2 className="text-lg font-semibold">{c.title}</h2>
            <p className="text-sm text-gray-600">{c.text}</p>
            <span className="inline-block mt-4 rounded-full bg-blue-500 text-white px-4 py-1.5 text-sm">
              Öppna
            </span>
          </Link>
        ))}
      </section>

      {/* Två kolumner: senaste + snabbåtgärder */}
      <section className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Senaste aktiviteter</h2>
            <Link
              href="/dashboard/wishlist"
              className="text-blue-600 text-sm hover:underline">
              Visa alla
            </Link>
          </div>
          <ul className="divide-y">
            {recent.map((r, i) => (
              <li key={i} className="py-3 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1" />
                <div className="flex-1">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-gray-500">
                    {r.list} • {r.ts}
                  </div>
                </div>
                <Link
                  href="/dashboard/wishlist"
                  className="text-sm text-blue-600 hover:underline">
                  Öppna
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-3">Snabbåtgärder</h2>
          <div className="grid gap-2">
            <Link
              href="/dashboard/wishlist/new"
              className="rounded-xl border px-4 py-2 hover:bg-gray-50">
              Skapa ny lista
            </Link>
            <Link
              href="/calendar"
              className="rounded-xl border px-4 py-2 hover:bg-gray-50">
              Gå till kalendern
            </Link>
            <Link
              href="/news"
              className="rounded-xl border px-4 py-2 hover:bg-gray-50">
              Läs de senaste nyheterna
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
