"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const BASE = "/dashboard";
const items = [
  { href: `${BASE}`, label: "Översikt" },
  { href: `/wishlist`, label: "Listor" },
  { href: `${BASE}/friends`, label: "Vänner" },
  { href: `${BASE}/settings`, label: "Inställningar" }
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Öppna meny"
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute left-0 mt-1 w-56 rounded-md border border-gray-200 bg-white drop-shadow-md p-1">
          {items.map((it) => {
            const active =
              pathname === it.href || pathname.startsWith(it.href + "/");
            return (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className={[
                  "block px-3 py-2 text-sm",
                  active
                    ? "bg-sky-50 text-sky-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                ].join(" ")}>
                {it.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
