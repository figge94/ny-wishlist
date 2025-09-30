// app/(dashboard)/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import MobileNav from "@/components/mobile-nav";
import { Search } from "lucide-react";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login"); // 🔒 skydda dashboard

  const user = session.user;

  return (
    <div className="min-h-dvh grid md:grid-cols-[240px,1fr]">
      {/* Sidebar (md+) */}
      <aside className="hidden md:flex flex-col bg-white">
        <MobileNav variant="inline" className="p-3" />
      </aside>

      {/* Main */}
      <div className="flex min-h-dvh flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-zinc-200">
          <div className="px-4 md:px-6 py-3 flex items-center gap-3">
            {/* Mobile menu */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            <h1 className="text-base md:text-lg font-medium text-slate-800">
              Översikt
            </h1>

            {/* Search */}
            <div className="ml-auto hidden md:block">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  placeholder="Sök…"
                  className="w-full border border-zinc-200 rounded-md pl-9 pr-3 py-2 text-sm inset-shadow-sm bg-white text-zinc-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
              </div>
            </div>

            {/* User */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-9 w-9 rounded-full bg-slate-600 text-white grid place-items-center text-sm font-medium shadow">
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </span>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-slate-500">
                  {user.email ?? "Ingen e-post"}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile search */}
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
