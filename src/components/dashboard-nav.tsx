"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings } from "lucide-react";

const BASE = "/dashboard";
const links = [
  { href: `${BASE}`, label: "Översikt", icon: LayoutDashboard },
  { href: `${BASE}/friends`, label: "Vänner", icon: Users },
  { href: `${BASE}/settings`, label: "Inställningar", icon: Settings }
];

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="p-3 space-y-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={[
              "group flex items-center gap-3 rounded-full px-3 py-2 text-sm transition",
              active
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            ].join(" ")}>
            <Icon
              className={[
                "h-4 w-4",
                active
                  ? "text-indigo-700"
                  : "text-gray-500 group-hover:text-gray-700"
              ].join(" ")}
            />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
