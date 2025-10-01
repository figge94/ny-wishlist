import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export type QuickLinkProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
};

export function QuickLink({ href, icon, children }: QuickLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-md dark:border-zinc-800 bg-blue-50 dark:bg-zinc-900 shadow-sm px-4 py-2 text-sm hover:bg-blue-100  dark:hover:bg-zinc-800 hover:drop-shadow-md transition focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-black/50 active:scale-95">
      <span className="grid h-5 w-5 place-items-center">{icon}</span>
      <span>{children}</span>
      <ChevronRight className="ml-auto h-4 w-4 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  );
}
