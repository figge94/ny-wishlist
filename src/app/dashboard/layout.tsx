import Link from "next/link"
import { getUser } from "@/lib/data"
import { UserName } from "@/components/user-name"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser("1") // fejk tills vidare

  return (
    <div className="min-h-screen grid md:grid-cols-[220px,1fr] bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col border-r bg-white">
        <div className="p-5 font-bold text-lg border-b">Dashboard</div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <NavItem href="/dashboard">Översikt</NavItem>
          <NavItem href="/wishlist">Önskelistor</NavItem>
          <NavItem href="/calendar">Kalender & Påminnelser</NavItem>
          <NavItem href="/blog">Blogg</NavItem>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
          <div className="px-5 py-3 flex items-center gap-3">
            <h1 className="text-lg font-semibold">Välkommen tillbaka 👋</h1>
            <div className="ml-auto flex items-center gap-4">
              <input
                placeholder="Sök…"
                className="border rounded-xl px-3 py-1.5 text-sm"
              />
              <UserName user={user.name} />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-xl hover:bg-gray-100 transition"
    >
      {children}
    </Link>
  )
}
