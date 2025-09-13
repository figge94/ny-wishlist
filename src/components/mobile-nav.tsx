"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const PREFIX = "/dashboard";

const items = [
  { href: `${PREFIX}`, label: "Översikt" },
  { href: `${PREFIX}/wishlist`, label: "Listor" },
  { href: `${PREFIX}/friends`, label: "Vänner" },
  { href: `${PREFIX}/settings`, label: "Inställningar" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Öppna meny"
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-56 rounded-xl border bg-white shadow-lg p-2">
          {items.map((it) => {
            const active = pathname === it.href || pathname.startsWith(it.href + "/");
            return (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className={[
                  "block rounded-lg px-3 py-2 text-sm",
                  active ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                ].join(" ")}
              >
                {it.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
