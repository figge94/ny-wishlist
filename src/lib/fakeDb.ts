// fakeDb.ts
export type WishItem = {
  id: string;
  title: string;
  url?: string;
  price?: number;
  done?: boolean;
};
export type WishList = { id: string; name: string; items: WishItem[] };
export type Reminder = {
  [x: string]: any;
  id: string;
  title: string;
  dueAt: string;
  done?: boolean;
};

const uid = () => Math.random().toString(36).slice(2, 10);

export const db: { lists: WishList[]; reminders: Reminder[] } = {
  lists: [
    {
      id: uid(),
      name: "Min första lista",
      items: [
        {
          id: uid(),
          title: "Nya hörlurar",
          url: "https://exempel.se",
          price: 799
        },
        { id: uid(), title: "Hoodie", price: 399 }
      ]
    },
    {
      id: uid(),
      name: "Födelsedag",
      items: [{ id: uid(), title: "Blommor", price: 199 }]
    },
    { id: uid(), name: "Jul 2025", items: [] }
  ],
  reminders: [
    {
      id: uid(),
      title: "Köp present till Alex",
      dueAt: "2025-10-01T09:00:00Z"
    },
    { id: uid(), title: "Boka tandläkare", dueAt: "2025-10-05T13:30:00Z" },
    { id: uid(), title: "Betala medlemsavgift", dueAt: "2025-09-30T23:00:00Z" }
  ]
};

export const api = {
  // Wishlists
  listAll: () => db.lists,
  getList: (id: string) => db.lists.find((l) => l.id === id) ?? null,
  createList: (name: string) => {
    const l = { id: uid(), name, items: [] };
    db.lists = [l, ...db.lists];
    return l;
  },
  renameList: (id: string, name: string) => {
    const l = db.lists.find((x) => x.id === id);
    if (!l) return null;
    l.name = name;
    return l;
  },
  deleteList: (id: string) => {
    db.lists = db.lists.filter((l) => l.id !== id);
  },
  addItem: (listId: string, d: Partial<WishItem>) => {
    const l = db.lists.find((x) => x.id === listId)!;
    const it = {
      id: uid(),
      title: d.title || "Ny sak",
      url: d.url,
      price: d.price,
      done: false
    };
    l.items = [it, ...l.items];
    return it;
  },
  updateItem: (listId: string, itemId: string, d: Partial<WishItem>) => {
    const l = db.lists.find((x) => x.id === listId)!;
    const it = l.items.find((i) => i.id === itemId)!;
    Object.assign(it, d);
    return it;
  },
  deleteItem: (listId: string, itemId: string) => {
    const l = db.lists.find((x) => x.id === listId)!;
    l.items = l.items.filter((i) => i.id !== itemId);
  },

  // Reminders
  listReminders: () => db.reminders,
  addReminder: (title: string, dueAt: string) => {
    const r = { id: uid(), title, dueAt, done: false };
    db.reminders = [r, ...db.reminders];
    return r;
  },
  toggleReminder: (id: string, done: boolean) => {
    const r = db.reminders.find((x) => x.id === id);
    if (!r) return null;
    r.done = done;
    return r;
  },
  deleteReminder: (id: string) => {
    db.reminders = db.reminders.filter((r) => r.id !== id);
  }
};
