"use client";
import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      const data = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      ) as {
        email: string;
        password: string;
      };

      try {
        setLoading(true);
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false
        });

        if (res?.ok) {
          router.push("/dashboard");
        } else {
          setError("Fel e-post eller lösenord.");
        }
      } catch (err: any) {
        setError(err?.message ?? "Kunde inte logga in.");
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return { onSubmit, error, loading };
}
