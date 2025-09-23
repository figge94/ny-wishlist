// components/mobile-nav.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav-items";

type Props = {
  variant?: "popup" | "inline";
  className?: string;
};

export default function MobileNav({
  variant = "popup",
  className = ""
}: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const activeHref =
    NAV_ITEMS.map((i) => i.href)
      .filter((h) => pathname === h || pathname.startsWith(h + "/"))
      .sort((a, b) => b.length - a.length)[0] ?? pathname;

  const Item = ({ href, label }: { href: string; label: string }) => {
    const active = href === activeHref;
    return (
      <Link
        href={href}
        onClick={variant === "popup" ? () => setOpen(false) : undefined}
        className={[
          "block px-3 py-2 text-sm rounded-md",
          active
            ? "bg-sky-50 text-sky-700"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        ].join(" ")}>
        {label}
      </Link>
    );
  };

  if (variant === "inline") {
    return (
      <nav className={["p-2 space-y-1", className].join(" ")}>
        {NAV_ITEMS.map((it) => (
          <Item key={it.href} {...it} />
        ))}
      </nav>
    );
  }

  // popup-varianten
  return (
    <div className={["relative", className].join(" ")}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Stäng meny" : "Öppna meny"}
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-200">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div
          className="absolute left-0 mt-1 w-56 rounded-md border border-gray-200 bg-white drop-shadow-md p-1 z-50"
          role="menu">
          {NAV_ITEMS.map((it) => (
            <Item key={it.href} {...it} />
          ))}
        </div>
      )}
    </div>
  );
}
