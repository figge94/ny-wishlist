"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Parisienne } from "next/font/google";

const parisienne = Parisienne({ subsets: ["latin"], weight: "400" });

const links = [
  { href: "/", label: "Hem" },
  { href: "/news", label: "Nyheter" },
  { href: "/calendar", label: "Kalender" },
  { href: "/dashboard", label: "Översikt" },
  { href: "/wishlist", label: "Önskelistor" }
];

function cx(...cls: (string | false | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur border-b border-gray-200 shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cx("text-2xl text-slate-600", parisienne.className)}>
              WishList
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "relative text-sm text-slate-700 hover:text-slate-900 transition",
                    active && "text-slate-900"
                  )}>
                  {l.label}
                  {/* underline animation */}
                  <span
                    className={cx(
                      "absolute -bottom-1 left-0 h-0.5 w-0 bg-violet-600 transition-all",
                      active ? "w-full" : "group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-700 hover:text-gray-900">
              Logga in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 shadow">
              Skapa konto
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Öppna meny"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100  cursor-pointer">
            {/* enkel hamburger/close */}
            <svg
              className={cx("h-6 w-6", open && "hidden")}
              viewBox="0 0 24 24"
              fill="none">
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={cx("h-6 w-6", !open && "hidden")}
              viewBox="0 0 24 24"
              fill="none">
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M6 6l12 12M18 6l-12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="space-y-1">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cx(
                      "block rounded-md px-3 py-2 text-base cursor-pointer",
                      active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                    aria-current={active ? "page" : undefined}>
                    {l.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md border bg-slate-50 border-slate-100 px-3 py-2 text-center shadow-sm text-sm text-gray-700 hover:bg-slate-100">
                Logga in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md bg-slate-600 px-3 py-2 text-center text-sm text-white  hover:bg-slate-700 shadow-sm">
                Skapa konto
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
