// app/(auth)/signup/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Parisienne } from "next/font/google";

const parisienne = Parisienne({ subsets: ["latin"], weight: "400" });

export default function SignUpPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as {
      name: string; email: string; password: string; confirm: string;
    };

    if (data.password.length < 8) return setError("Lösenord måste vara minst 8 tecken.");
    if (data.password !== data.confirm) return setError("Lösenorden matchar inte.");

    try {
      setLoading(true);
      // TODO: Byt till ditt API-endpoint
      // const res = await fetch("/api/signup", { method:"POST", body: JSON.stringify(data) });
      // if (!res.ok) throw new Error("Kunde inte skapa konto");
      // Router push etc.
      alert("Skulle registrera användare här ✅");
      form.reset();
    } catch (err: any) {
      setError(err.message ?? "Ett fel uppstod.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className={`text-3xl text-indigo-600 text-center ${parisienne.className}`}>WishTogether</h1>
        <p className="text-center text-gray-500 mt-1">Önskelistor utan krångel.</p>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">Skapa konto</h2>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700">Namn</label>
            <input id="name" name="name" type="text" required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">E-post</label>
            <input id="email" name="email" type="email" required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700">Lösenord</label>
            <div className="relative">
              <input
                id="password" name="password" required
                type={showPw ? "text" : "password"}
                minLength={8}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="button"
                onClick={() => setShowPw(s => !s)}
                className="absolute inset-y-0 right-2 my-auto text-sm text-gray-500 hover:text-gray-700"
                aria-label={showPw ? "Dölj lösenord" : "Visa lösenord"}>
                {showPw ? "Dölj" : "Visa"}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm text-gray-700">Upprepa lösenord</label>
            <input id="confirm" name="confirm" required type={showPw ? "text" : "password"} minLength={8}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 disabled:opacity-60">
            {loading ? "Skapar konto…" : "Skapa konto"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Har du redan ett konto?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline">Logga in</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
