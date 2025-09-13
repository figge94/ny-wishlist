import Link from "next/link";
import { getUser } from "@/lib/data";
import { UserName } from "@/components/user-name";
import DashboardNav from "@/components/dashboard-nav";
import MobileNav from "@/components/mobile-nav";
import { Search } from "lucide-react";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getUser("1"); // fejk tills vidare

  return (
    <div className="min-h-screen grid md:grid-cols-[240px,1fr] bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col border-r bg-white">
        <div className="p-5 text-lg font-semibold text-gray-800 border-b border-gray-200">
          Dashboard
        </div>
        <DashboardNav />
      </aside>

      {/* Main */}
      <div className="flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200 shadow-sm">
          <div className="px-4 md:px-6 py-3 flex items-center gap-3">
            {/* Mobile menu */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            <h1 className="text-base md:text-lg font-semibold text-gray-800">
              Din översikt
            </h1>

            {/* Search */}
            <div className="ml-auto w-full max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  placeholder="Sök…"
                  className="w-full border border-gray-200 rounded-full pl-9 pr-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* User */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center text-sm font-medium">
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </span>
              <UserName user={user.name} />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
