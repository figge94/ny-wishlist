// src/lib/index.ts
import { prisma } from "./db";

export * from "./news";
export * from "./storage";
export * from "./definitions";
export * from "./date";
export * from "./data";
export * from "./db";
export * from "./id";
export * from "./styles";
export * from "./news";

export const api = {
  // Wishlists (redan klart hos dig)
  listAll: () =>
    prisma.wishlist.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true, _count: { select: { items: true } } }
    }),

  // Reminders
  listReminders: () =>
    prisma.reminder.findMany({
      orderBy: [{ done: "asc" }, { dueAt: "asc" }, { createdAt: "desc" }]
    }),

  toggleReminder: (id: string, next: boolean) =>
    prisma.reminder.update({ where: { id }, data: { done: next } }),

  deleteReminder: (id: string) => prisma.reminder.delete({ where: { id } })
};
