// components/AuthButton.tsx

"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="text-gray-500 text-sm">Laddar…</span>;
  }

  if (session) {
    // Inloggad
    return (
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-md bg-slate-600 text-white px-3 py-1.5 hover:bg-slate-700 cursor-pointer">
        Logga ut
      </button>
    );
  }

  // Inte inloggad
  return (
    <Link
      href="/login"
      className="rounded-md bg-sky-600 text-white px-3 py-1.5 hover:bg-sky-700">
      Logga in
    </Link>
  );
}
