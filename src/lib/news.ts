export type NewsItem = {
  slug: string;
  title: string;
  content: string;
  date: string; // ISO-format
};

export const news: NewsItem[] = [
  {
    slug: "vanner",
    title: "Lägg till vänner",
    content: "Här kan du nu lägga till vänner...",
    date: "2025-09-10"
  },
  {
    slug: "ny-look",
    title: "Nytt utseende på startsidan!",
    content: "Vi har uppdaterat designen...",
    date: "2025-09-12"
  },
  {
    slug: "paminnelse",
    title: "Påminnelser går att lägga till.",
    content: "Du kan skapa påminnelser...",
    date: "2025-09-14"
  },
  {
    slug: "oversikt",
    title: "Man kan se en översikt.",
    content: "Översiktssidan samlar allt...",
    date: "2025-09-16"
  },
  {
    slug: "kalender",
    title: "Kalender tillagd.",
    content: "Kalendern låter dig planera...",
    date: "2025-09-18"
  },
  {
    slug: "onskelista",
    title: "Du kan nu börja skapa dina önskelistor.",
    content: "Skapa och dela önskelistor...",
    date: "2025-09-20"
  }
];

export function getNewsBySlug(slug: string): NewsItem | null {
  return news.find((item) => item.slug === slug) ?? null;
}

// ✅ Lägg till denna export
export function getAllSlugs() {
  // app-router kräver { slug: string }
  return news.map((n) => ({ slug: n.slug }));
}

export function getAllNewsSorted(): NewsItem[] {
  return [...news].sort((a, b) => b.date.localeCompare(a.date));
}
