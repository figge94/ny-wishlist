// components/ShareButton.tsx
"use client";
import { useCallback, useMemo } from "react";

export default function ShareButton({ title }: { title: string }) {
  const canShare = useMemo(
    () => typeof navigator !== "undefined" && "share" in navigator,
    []
  );

  const onShare = useCallback(async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      // TS-safe access till share
      if (canShare) {
        await (navigator as any).share?.({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Länk kopierad 🎉");
      }
    } catch {
      // Fallback: kopiera länk
      try {
        const url = typeof window !== "undefined" ? window.location.href : "";
        await navigator.clipboard.writeText(url);
        alert("Länk kopierad 🎉");
      } catch {}
    }
  }, [canShare, title]);

  return (
    <button
      type="button"
      onClick={onShare}
      className="inline-flex items-center gap-2 rounded-sm bg-blue-600 shadow-sm px-3 py-1 text-sm text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition">
      Dela
    </button>
  );
}
