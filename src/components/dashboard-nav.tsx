// components/dashboard-nav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav-items";

export default function DashboardNav() {
  const pathname = usePathname();

  const activeHref =
    NAV_ITEMS.map((i) => i.href)
      .filter((h) => pathname === h || pathname.startsWith(h + "/"))
      .sort((a, b) => b.length - a.length)[0] ?? pathname;

  return (
    <nav className="p-2 space-y-1">
      {NAV_ITEMS.map((it) => {
        const active = it.href === activeHref;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={[
              "block rounded-md px-3 py-2 text-sm",
              active
                ? "bg-sky-50 text-sky-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            ].join(" ")}>
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
