// src/hooks/useSignup.ts
"use client";
import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";

type FormFields = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export function useSignup() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as unknown as FormFields;

    if (data.password.length < 8) {
      setError("Lösenord måste vara minst 8 tecken.");
      return;
    }
    if (data.password !== data.confirm) {
      setError("Lösenorden matchar inte.");
      return;
    }

    try {
      setLoading(true);

      // 1) Skapa konto i ditt API
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });

      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "Kunde inte skapa konto");

      // 2) Autologin
      const login = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (login?.ok) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/login";
      }

      form.reset();
    } catch (err: any) {
      setError(err?.message ?? "Ett fel uppstod.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { onSubmit, showPw, setShowPw, loading, error };
}
