"use client";

import { useCallback, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function useLogin() {
  const sp = useSearchParams();
  const callbackUrl = useMemo(() => sp.get("callbackUrl") ?? "/", [sp]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
        const fd = new FormData(e.currentTarget);
        const email = String(fd.get("email") || "");
        const password = String(fd.get("password") || "");

        // NextAuth hanterar redirect själv om redirect: true
        const res = await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl
        });

        // OBS: vid redirect kommer vi inte tillbaka hit.
        if (res?.error) setError("Fel e-post eller lösenord.");
      } catch (err) {
        setError("Något gick fel. Försök igen.");
      } finally {
        setLoading(false);
      }
    },
    [callbackUrl]
  );

  const signInWithGoogle = () => signIn("google", { callbackUrl });
  const signInWithGitHub = () => signIn("github", { callbackUrl });

  return { onSubmit, loading, error, signInWithGoogle, signInWithGitHub };
}
