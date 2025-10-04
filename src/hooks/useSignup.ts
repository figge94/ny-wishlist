// src/hooks/useSignup.ts
"use client";

import { useState, useCallback } from "react";

export function useSignup() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const fd = new FormData(e.currentTarget);

      // Snabb klientvalidering (samma som server gör)
      const password = String(fd.get("password") || "");
      const confirm = String(fd.get("confirm") || "");
      if (password !== confirm) {
        setError("Lösenorden matchar inte.");
        setLoading(false);
        return;
      }

      const res = await fetch("/signup/submit", {
        method: "POST",
        body: fd
      });

      if (!res.ok) {
        // Försök läsa serverfel
        let msg = "Kunde inte skapa konto.";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        setError(msg);
      }
      // Vid 3xx redirect sköter Next/route handler navigeringen själv.
    } catch {
      setError("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { onSubmit, showPw, setShowPw, loading, error };
}
