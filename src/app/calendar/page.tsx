'use client'
import { useEffect, useMemo, useState } from 'react'

type Reminder = {
  id: string
  title: string
  date: string        // ISO (yyyy-mm-dd)
  time?: string       // HH:mm (valfritt)
  list?: string       // koppling till önskelista (valfritt)
  done?: boolean
}

const LS_KEY = 'reminders:v1'
const uid = () => Math.random().toString(36).slice(2, 10)

export default function CalendarPage() {
  const [items, setItems] = useState<Reminder[]>([])
  const [filter, setFilter] = useState<'upcoming'|'all'|'done'>('upcoming')
  const todayIso = new Date().toISOString().slice(0,10)

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) setItems(JSON.parse(raw))
    else {
      const seed: Reminder[] = [
        { id: uid(), title: 'Köp present – Anna', date: todayIso, time: '18:00', list: 'Födelsedag' },
        { id: uid(), title: 'Beställ hoodie', date: addDays(todayIso, 2), list: 'Min första lista' },
      ]
      setItems(seed)
      localStorage.setItem(LS_KEY, JSON.stringify(seed))
    }
  }, [])
  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify(items)) }, [items])

  const upcoming = useMemo(() => {
    const now = new Date()
    return [...items]
      .filter(r => !r.done && toDate(r.date, r.time) >= stripTime(now))
      .sort((a,b)=> toDate(a.date,a.time).getTime() - toDate(b.date,b.time).getTime())
  }, [items])

  const filtered = filter === 'all' ? items
    : filter === 'done' ? items.filter(i=>i.done)
    : upcoming

  function addReminder(data: Omit<Reminder,'id'|'done'>) {
    setItems(prev => [{ id: uid(), done:false, ...data }, ...prev])
  }
  function toggleDone(id: string, v: boolean) {
    setItems(prev => prev.map(r => r.id===id ? { ...r, done:v } : r))
  }
  function remove(id: string) { setItems(prev => prev.filter(r=>r.id!==id)) }
  function snooze(id: string, days = 1) {
    setItems(prev => prev.map(r => r.id===id ? { ...r, date: addDays(r.date, days) } : r))
  }

  return (
    <main className="grid gap-6 p-6 md:grid-cols-[320px,1fr]">
      {/* Skapa påminnelse */}
      <aside className="bg-white rounded-2xl shadow p-4 h-fit">
        <h1 className="text-lg font-semibold mb-4">Kalender & Påminnelser</h1>
        <NewReminderForm onCreate={addReminder} />
        <div className="mt-4 flex gap-2 text-sm">
          <button onClick={()=>setFilter('upcoming')} className={btn(filter==='upcoming')}>Kommande</button>
          <button onClick={()=>setFilter('all')} className={btn(filter==='all')}>Alla</button>
          <button onClick={()=>setFilter('done')} className={btn(filter==='done')}>Klarmarkerade</button>
        </div>
      </aside>

      {/* Lista */}
      <section className="bg-white rounded-2xl shadow p-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500">Inga poster.</p>
        ) : (
          <ul className="divide-y">
            {filtered.map(r => (
              <li key={r.id} className="py-3 flex items-center gap-3">
                <input type="checkbox" checked={!!r.done} onChange={e=>toggleDone(r.id, e.target.checked)} />
                <div className="flex-1">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-gray-500">
                    {formatDateTime(r.date, r.time)}
                    {r.list ? <> • Lista: <span className="italic">{r.list}</span></> : null}
                  </div>
                </div>
                {!r.done && (
                  <>
                    <button onClick={()=>snooze(r.id, 1)} className="text-sm text-blue-600 hover:underline">Snooza 1d</button>
                    <button onClick={()=>snooze(r.id, 7)} className="text-sm text-blue-600 hover:underline">Snooza 7d</button>
                  </>
                )}
                <button onClick={()=>remove(r.id)} className="text-sm text-red-600 hover:underline">Ta bort</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

function NewReminderForm({ onCreate }: { onCreate: (r: Omit<Reminder,'id'|'done'>) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const f = e.currentTarget
        const title = (f.elements.namedItem('title') as HTMLInputElement).value.trim()
        const date = (f.elements.namedItem('date') as HTMLInputElement).value
        const time = (f.elements.namedItem('time') as HTMLInputElement).value
        const list = (f.elements.namedItem('list') as HTMLInputElement).value.trim()
        if (title && date) onCreate({ title, date, time: time || undefined, list: list || undefined })
        f.reset()
      }}
      className="grid gap-2"
    >
      <input name="title" placeholder="Titel (t.ex. Köp present)" className="border rounded px-3 py-2" />
      <div className="grid grid-cols-2 gap-2">
        <input name="date" type="date" className="border rounded px-3 py-2" />
        <input name="time" type="time" className="border rounded px-3 py-2" />
      </div>
      <input name="list" placeholder="Koppla till lista (valfritt)" className="border rounded px-3 py-2" />
      <button className="bg-blue-600 text-white rounded px-4 py-2">Lägg till</button>
    </form>
  )
}

/* ---- små helpers ---- */
function btn(active: boolean) {
  return `px-3 py-1.5 rounded-xl border ${active ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`
}
function toDate(d: string, t?: string) {
  return new Date(t ? `${d}T${t}:00` : `${d}T00:00:00`)
}
function addDays(isoDate: string, days: number) {
  const d = new Date(isoDate); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10)
}
function stripTime(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
function formatDateTime(d: string, t?: string) {
  return t ? `${d} kl ${t}` : d
}
