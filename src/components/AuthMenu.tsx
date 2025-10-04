// components/AuthMenu.tsx
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AuthMenu() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <Link
        href="/login"
        className="rounded-lg border px-3 py-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-700">
        Logga in
      </Link>
    );
  }
  return (
    <form action="/api/auth/signout" method="post">
      <button className="rounded-lg border px-3 py-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-700">
        Logga ut
      </button>
    </form>
  );
}
