export const S = {
  card: "rounded-md border border-white/10 dark:border-zinc-800 bg-white dark:bg-zinc-900 drop-shadow-md transition",
  cardHover: "hover:drop-shadow-md",
  cardP: "p-6",

  btn:
    "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm drop-shadow-xs shadow-xs transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 active:scale-95",
  btnPrimary: "bg-sky-600 text-white hover:bg-sky-500",
  btnOutline:
    "border border-zinc-100 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800",

  badge: "rounded-full px-3 py-1 text-xs ring-1 ring-inset",
  badgeGreen:
    "bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-800",
  badgeAmber:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-800",

  listRow: "py-2 flex items-center justify-between gap-3",
  listMeta: "text-xs text-muted-foreground"
} as const;
