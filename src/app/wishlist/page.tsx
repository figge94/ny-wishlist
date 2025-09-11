'use client'
import { useEffect, useMemo, useState } from 'react'

type WishItem = { id: string; title: string; url?: string; price?: number; done?: boolean }
type WishList = { id: string; name: string; items: WishItem[] }

export default function WishlistPage() {
  const [lists, setLists] = useState<WishList[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Ladda initialt
  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/lists', { cache: 'no-store' })
      const data: WishList[] = await res.json()
      setLists(data)
      setActiveId(data[0]?.id ?? null)
      setLoading(false)
    })()
  }, [])

  const active = useMemo(() => lists.find(l => l.id === activeId) ?? null, [lists, activeId])

  // List-CRUD
  async function createList(name: string) {
    const res = await fetch('/api/lists', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) })
    const newList: WishList = await res.json()
    setLists(prev => [newList, ...prev]); setActiveId(newList.id)
  }
  async function renameList(id: string, name: string) {
    const res = await fetch(`/api/lists/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) })
    const updated: WishList = await res.json()
    setLists(prev => prev.map(l => (l.id === id ? updated : l)))
  }
  async function deleteList(id: string) {
    await fetch(`/api/lists/${id}`, { method: 'DELETE' })
    setLists(prev => prev.filter(l => l.id !== id))
    if (activeId === id) setActiveId(prev => (lists.find(l => l.id !== id)?.id ?? null))
  }

  // Item-CRUD
  async function addItem(listId: string, data: Partial<WishItem>) {
    const res = await fetch(`/api/lists/${listId}/items`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    const newItem: WishItem = await res.json()
    setLists(prev => prev.map(l => (l.id === listId ? { ...l, items: [newItem, ...l.items] } : l)))
  }
  async function updateItem(listId: string, itemId: string, data: Partial<WishItem>) {
    const res = await fetch(`/api/lists/${listId}/items/${itemId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    const updated: WishItem = await res.json()
    setLists(prev => prev.map(l => (l.id === listId ? { ...l, items: l.items.map(it => (it.id === itemId ? updated : it)) } : l)))
  }
  async function deleteItem(listId: string, itemId: string) {
    await fetch(`/api/lists/${listId}/items/${itemId}`, { method: 'DELETE' })
    setLists(prev => prev.map(l => (l.id === listId ? { ...l, items: l.items.filter(it => it.id !== itemId) } : l)))
  }

  if (loading) return <p className="p-6 text-gray-500">Laddar…</p>

  return (
    <main className="grid gap-6 p-6 md:grid-cols-[280px,1fr]">
      {/* Sidebar */}
      <aside className="bg-white rounded-2xl shadow p-4 h-fit">
        <h2 className="font-semibold mb-3">Önskelistor</h2>
        <NewListForm onCreate={createList} />
        <ul className="space-y-1">
          {lists.map(l => (
            <li key={l.id}>
              <button
                className={`w-full text-left px-3 py-2 rounded ${activeId === l.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveId(l.id)}
              >
                {l.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Innehåll */}
      <section className="bg-white rounded-2xl shadow p-4">
        {!active ? (
          <p className="text-gray-500">Ingen lista vald.</p>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <input
                value={active.name}
                onChange={(e) => renameList(active.id, e.target.value)}
                className="text-xl font-semibold border rounded px-3 py-1"
              />
              <button onClick={() => deleteList(active.id)} className="ml-auto text-red-600 hover:underline">Ta bort lista</button>
            </div>

            <AddItemForm onAdd={(data) => addItem(active.id, data)} />

            <ul className="divide-y">
              {active.items.length === 0 && <li className="p-4 text-gray-500">Tom lista.</li>}
              {active.items.map(item => (
                <li key={item.id} className="py-3 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!item.done}
                    onChange={(e) => updateItem(active.id, item.id, { done: e.target.checked })}
                  />
                  <input
                    className={`flex-1 border rounded px-2 py-1 ${item.done ? 'line-through text-gray-400' : ''}`}
                    value={item.title}
                    onChange={(e) => updateItem(active.id, item.id, { title: e.target.value })}
                  />
                  <input
                    className="w-56 border rounded px-2 py-1"
                    placeholder="https://länk"
                    value={item.url ?? ''}
                    onChange={(e) => updateItem(active.id, item.id, { url: e.target.value })}
                  />
                  <input
                    className="w-24 border rounded px-2 py-1"
                    type="number"
                    placeholder="Pris"
                    value={item.price ?? ''}
                    onChange={(e) => updateItem(active.id, item.id, { price: Number(e.target.value) || undefined })}
                  />
                  <button onClick={() => deleteItem(active.id, item.id)} className="text-red-600 hover:underline">Ta bort</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  )
}

function NewListForm({ onCreate }: { onCreate: (name: string) => void | Promise<void> }) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const el = e.currentTarget.elements.namedItem('name') as HTMLInputElement
        const name = el.value.trim()
        if (name) await onCreate(name)
        e.currentTarget.reset()
      }}
      className="flex gap-2 mb-3"
    >
      <input name="name" placeholder="Ny lista…" className="border rounded px-3 py-2 w-full" />
      <button className="bg-blue-500 text-white rounded px-3">Lägg till</button>
    </form>
  )
}

function AddItemForm({ onAdd }: { onAdd: (data: Partial<WishItem>) => void | Promise<void> }) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const f = e.currentTarget
        const title = (f.elements.namedItem('title') as HTMLInputElement).value.trim()
        const url = (f.elements.namedItem('url') as HTMLInputElement).value.trim()
        const priceRaw = (f.elements.namedItem('price') as HTMLInputElement).value
        const price = priceRaw ? Number(priceRaw) : undefined
        if (title) await onAdd({ title, url: url || undefined, price })
        f.reset()
      }}
      className="flex flex-wrap gap-2 mb-4"
    >
      <input name="title" placeholder="Lägg till sak…" className="border rounded px-3 py-2 flex-1 min-w-48" />
      <input name="url" placeholder="Länk (valfritt)" className="border rounded px-3 py-2 w-64" />
      <input name="price" type="number" placeholder="Pris" className="border rounded px-3 py-2 w-32" />
      <button className="bg-blue-500 text-white rounded px-4">Lägg till</button>
    </form>
  )
}
