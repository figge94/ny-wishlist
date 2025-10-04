"use client";
import { useState } from "react";
import { Parisienne } from "next/font/google";
import { SignUpForm } from "@/components/SignUpForm";

const parisienne = Parisienne({ subsets: ["latin"], weight: "400" });

export default function SignUpPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/signup/submit", {
      // eller använd server action direkt i form.action i Next 15
      method: "POST",
      body: fd
    });
    if (!res.ok) setError("Kunde inte skapa konto.");
    // servern kan redirecta vid success
    setBusy(false);
  }

  return (
    <main className="grid place-items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl drop-shadow-sm p-8">
        <h1
          className={`text-3xl text-slate-700 text-center ${parisienne.className}`}>
          WishList
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Önskelistor utan krångel.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-slate-800">
          Skapa konto
        </h2>
        <SignUpForm />
      </div>
    </main>
  );
}
