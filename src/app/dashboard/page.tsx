import { Card, CardTitle, CardValue } from "@/components/card"

export default function DashboardPage() {
  // Fejkdata – byt mot riktig data senare
  const stats = [
    { label: "Listor", value: 3 },
    { label: "Objekt totalt", value: 14 },
    { label: "Klarmarkerade", value: 5 },
    { label: "Att göra", value: 9 },
  ]
  const recent = [
    { title: "Hörlurar", list: "Min första lista", ts: "Idag 10:12" },
    { title: "Hoodie", list: "Min första lista", ts: "Igår 18:20" },
    { title: "Presentkort", list: "Födelsedag", ts: "2 dgr sedan" },
  ]

  return (
    <div className="grid gap-5">
      {/* Stat-kort */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardTitle>{s.label}</CardTitle>
            <CardValue>{s.value}</CardValue>
          </Card>
        ))}
      </section>

      {/* Två kolumner: senaste + snabbåtgärder */}
      <section className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Senaste aktiviteter</h2>
            <a href="/wishlist" className="text-blue-600 text-sm hover:underline">Visa alla</a>
          </div>
          <ul className="divide-y">
            {recent.map((r, i) => (
              <li key={i} className="py-3 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1" />
                <div className="flex-1">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-gray-500">{r.list} • {r.ts}</div>
                </div>
                <a href="/wishlist" className="text-sm text-blue-600 hover:underline">Öppna</a>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-3">Snabbåtgärder</h2>
          <div className="grid gap-2">
            <a href="/wishlist" className="rounded-xl border px-4 py-2 hover:bg-gray-50">Skapa ny lista</a>
            <a href="/shop" className="rounded-xl border px-4 py-2 hover:bg-gray-50">Gå till shop</a>
            <a href="/blog" className="rounded-xl border px-4 py-2 hover:bg-gray-50">Skriv inlägg</a>
          </div>
        </Card>
      </section>
    </div>
  )
}
