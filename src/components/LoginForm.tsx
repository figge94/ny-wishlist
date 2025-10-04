"use client";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

type Props = { title?: string };

export function LoginForm({ title = "Logga in" }: Props) {
  const { onSubmit, error, loading, signInWithGoogle, signInWithGitHub } =
    useLogin();
  const [showPw, setShowPw] = useState(false);

  return (
    <>
      {/* OAuth */}
      <div className="mt-6 grid gap-3">
        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50 disabled:opacity-60">
          Fortsätt med Google
        </button>
        <button
          type="button"
          onClick={signInWithGitHub}
          disabled={loading}
          className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50 disabled:opacity-60">
          Fortsätt med GitHub
        </button>
      </div>

      {/* Avdelare */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-neutral-500">eller</span>
        </div>
      </div>

      {/* Credentials-form */}
      <form onSubmit={onSubmit} className="space-y-4">
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
            disabled={loading}
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
              disabled={loading}
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
    </>
  );
}
