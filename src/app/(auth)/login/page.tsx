// app/(auth)/login/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Parisienne } from "next/font/google";

const parisienne = Parisienne({ subsets: ["latin"], weight: "400" });

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as {
      email: string;
      password: string;
      remember?: string;
    };

    try {
      setLoading(true);
      // TODO: Byt till ditt riktiga endpoint
      // const res = await fetch("/api/login", { method:"POST", body: JSON.stringify(data) });
      // if (!res.ok) throw new Error("Fel e-post eller lösenord");
      alert("Skulle logga in här ✅");
      // router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Kunde inte logga in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid place-items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl drop-shadow-sm p-8">
        <h1
          className={`text-3xl text-slate-600 text-center ${parisienne.className}`}>
          WishList
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Önskelistor utan krångel.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">Logga in</h2>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-slate-700">
              E-post
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-slate-700">
              Lösenord
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                required
                type={showPw ? "text" : "password"}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute inset-y-0 right-2 my-auto text-sm text-gray-500 hover:text-gray-700"
                aria-label={showPw ? "Dölj lösenord" : "Visa lösenord"}>
                {showPw ? "Dölj" : "Visa"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                name="remember"
                className="rounded border-gray-100"
              />
              Kom ihåg mig
            </label>
            <Link
              href="/forgot"
              className="text-sm text-sky-600 hover:underline">
              Glömt lösenord?
            </Link>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-slate-600 text-white py-2.5 font-medium hover:bg-slate-700 disabled:opacity-60">
            {loading ? "Loggar in…" : "Logga in"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Ny här?{" "}
            <Link href="/signup" className="text-sky-600 hover:underline">
              Skapa konto
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
