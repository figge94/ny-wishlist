// app/friends/_components/InviteForm.tsx
"use client";
import React from "react";

type Props = {
  email: string;
  setEmail: (v: string) => void;
  onInvite: (e: React.FormEvent) => Promise<void> | void;
};

export function InviteForm({ email, setEmail, onInvite }: Props) {
  return (
    <section className="rounded-md shadow-sm bg-white p-4">
      <h2 className="text-sm font-semibold text-gray-700">Bjud in vän</h2>
      <form
        onSubmit={onInvite}
        className="mt-3 flex flex-col sm:flex-row gap-2">
        <div className="flex-1 flex">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="namn@exempel.se"
            className="flex-1 border border-gray-200 rounded-s-md inset-shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <button
            type="submit"
            className="bg-amber-400 text-white rounded-e-md px-4 py-2 text-sm cursor-pointer hover:bg-amber-300">
            Skicka inbjudan
          </button>
        </div>
      </form>
    </section>
  );
}
