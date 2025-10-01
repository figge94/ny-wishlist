"use client";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

type Props = { title?: string };

export function LoginForm({ title = "Logga in" }: Props) {
  const { onSubmit, error, loading } = useLogin();
  const [showPw, setShowPw] = useState(false);

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

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

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="w-full rounded-lg bg-slate-600 text-white py-2.5 font-medium hover:bg-slate-700 disabled:opacity-60">
        {loading ? "Loggar in…" : "Logga in"}
      </button>
    </form>
  );
}
