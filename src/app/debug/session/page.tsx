import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // justera path om din authOptions ligger någon annanstans
import Link from "next/link";

export default async function DebugSessionPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Debug – Session</h1>

      {!session ? (
        <p className="text-red-600">
          ❌ Ingen användare inloggad.{" "}
          <Link href="/login" className="underline text-blue-600">
            Logga in
          </Link>
        </p>
      ) : (
        <div className="rounded-md border p-4 space-y-2 bg-gray-50">
          <p>
            ✅ Inloggad som <strong>{session.user?.email}</strong>
          </p>
          <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
