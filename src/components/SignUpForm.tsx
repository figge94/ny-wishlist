// src/components/SignUpForm.tsx
"use client";
import Link from "next/link";
import { useSignup } from "@/hooks/useSignup";

export function SignUpForm() {
  const { onSubmit, showPw, setShowPw, loading, error } = useSignup();

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-slate-700">
          Namn
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-slate-700">
          E-post
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
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
            minLength={8}
            type={showPw ? "text" : "password"}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="absolute inset-y-0 right-2 my-auto text-sm text-sky-600 hover:text-slate-700"
            aria-label={showPw ? "Dölj lösenord" : "Visa lösenord"}>
            {showPw ? "Dölj" : "Visa"}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirm" className="block text-sm text-slate-700">
          Upprepa lösenord
        </label>
        <input
          id="confirm"
          name="confirm"
          required
          minLength={8}
          type={showPw ? "text" : "password"}
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="w-full rounded-lg bg-slate-600 text-white py-2.5 font-medium hover:bg-slate-700 disabled:opacity-60">
        {loading ? "Skapar konto…" : "Skapa konto"}
      </button>

      <p className="text-sm text-gray-600 text-center">
        Har du redan ett konto?{" "}
        <Link href="/login" className="text-sky-600 hover:underline">
          Logga in
        </Link>
      </p>
    </form>
  );
}
