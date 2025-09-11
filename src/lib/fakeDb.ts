export type WishItem = { id: string; title: string; url?: string; price?: number; done?: boolean }
export type WishList = { id: string; name: string; items: WishItem[] }
const uid = () => Math.random().toString(36).slice(2, 10)

export const db: { lists: WishList[] } = {
  lists: [{
    id: uid(),
    name: 'Min första lista',
    items: [
      { id: uid(), title: 'Nya hörlurar', url: 'https://exempel.se', price: 799 },
      { id: uid(), title: 'Hoodie', price: 399 },
    ],
  }],
}
export const api = {
  listAll: () => db.lists,
  createList: (name: string) => { const l={ id: uid(), name, items:[] }; db.lists=[l,...db.lists]; return l },
  getList: (id: string) => db.lists.find(l=>l.id===id),
  renameList: (id: string, name: string) => { const l=db.lists.find(x=>x.id===id); if(!l) return; l.name=name; return l },
  deleteList: (id: string) => { db.lists = db.lists.filter(l=>l.id!==id) },
  addItem: (listId: string, d: Partial<WishItem>) => { const l=api.getList(listId)!; const it={ id: uid(), title: d.title||'Ny sak', url:d.url, price:d.price, done:false }; l.items=[it,...l.items]; return it },
  updateItem: (listId: string, itemId: string, d: Partial<WishItem>) => { const l=api.getList(listId)!; const it=l.items.find(i=>i.id===itemId)!; Object.assign(it,d); return it },
  deleteItem: (listId: string, itemId: string) => { const l=api.getList(listId)!; l.items = l.items.filter(i=>i.id!==itemId) },
}
