"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Parisienne } from "next/font/google";
import { useEffect } from "react";

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

  // 🔒 Lås body-scroll när mobilmenyn är öppen
  useEffect(() => {
    // skydd vid SSR
    if (typeof document === "undefined") return;
    const body = document.body;
    if (open) body.classList.add("overflow-hidden");
    else body.classList.remove("overflow-hidden");
    // städa upp om komponenten unmountas medan menyn är öppen
    return () => body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border-b border-violet-100/40 shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cx(
                "text-3xl font-bold text-slate-900",
                parisienne.className
              )}>
              WishList
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex gap-6">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "group relative text-sm font-medium transition-colors",
                    active
                      ? "text-violet-600"
                      : "text-gray-700 hover:text-violet-600"
                  )}>
                  {l.label}
                  {/* underline animation */}
                  <span
                    className={cx(
                      "absolute -bottom-1 left-0 h-0.5 bg-violet-600 transition-all duration-300 ease-out",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400 drop-shadow active:scale-95 transition-all duration-200">
              Logga in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-slate-500 drop-shadow active:scale-95 transition-all duration-200">
              Skapa konto
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Öppna meny"
            className="md:hidden overflow-hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <svg
              className={cx("h-6 w-6 ", open && "hidden")}
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
        <div
          className={cx(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            open
              ? "max-h-96 opacity-100 delay-75" // öppning → lite delay på opacity
              : "max-h-0 opacity-0 delay-0" // stängning → ingen delay
          )}>
          <div className="pb-4 transition-opacity duration-300">
            <div className="space-y-1">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cx(
                      "block rounded-md px-3 py-2 text-base cursor-pointer transition-colors",
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
                className="flex-1 rounded-md bg-slate-600 px-3 py-2 text-center text-sm text-white hover:bg-slate-700 shadow-sm">
                Skapa konto
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
