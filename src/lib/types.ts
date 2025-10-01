// src/lib/types.ts
export type ReminderId = string;

export type Reminder = {
  id: ReminderId;
  title: string;
  dueAt: Date | string;
  list?: string | null;
  done: boolean;
};

export type NewReminderInput = Omit<Reminder, "id" | "done"> & {
  /** tillåter att dueAt saknas i form, parent fyller i */
  dueAt?: string;
};

export type WishlistItem = {
  id: string;
  title: string;
  done: boolean;
};

export type Wishlist = {
  id: string;
  name: string;
  items: WishlistItem[];
};
