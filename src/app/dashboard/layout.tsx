// app/(dashboard)/layout.tsx
import { getUser } from "@/lib/data";
import { UserName } from "@/components/UserName";
import MobileNav from "@/components/mobile-nav";
import { Search } from "lucide-react";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getUser("1"); // fejk tills vidare

  return (
    <div className="min-h-dvh grid md:grid-cols-[240px,1fr]">
      {/* Sidebar (md+) */}
      <aside className="hidden md:flex flex-col border-r bg-white">
        <div className="p-5 text-lg font-semibold text-slate-800 border-b border-gray-200">
          Översikt
        </div>
        <MobileNav variant="inline" className="p-3" />
      </aside>

      {/* Main */}
      <div className="flex min-h-dvh flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-zinc-200">
          <div className="px-4 md:px-6 py-3 flex items-center gap-3">
            {/* Mobile menu (endast < md) */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            <h1 className="text-base md:text-lg font-semibold text-slate-800">
              Översikt
            </h1>

            {/* Search (dölj på xs, visa från md) */}
            <div className="ml-auto hidden md:block">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  placeholder="Sök…"
                  className="w-64 border border-zinc-200 rounded-md pl-9 pr-3 py-1.5 text-sm bg-white text-zinc-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
              </div>
            </div>

            {/* User (dölj på xs) */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-sky-100 text-slate-900 grid place-items-center text-sm font-medium shadow">
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </span>
              <UserName user={user.name} />
            </div>
          </div>

          {/* Sökfält under header på mobil (valfritt) */}
          <div className="px-4 pb-3 md:hidden">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                placeholder="Sök…"
                className="w-full border border-zinc-200 rounded-md pl-9 pr-3 py-2 text-sm inset-shadow-sm bg-white text-zinc-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
