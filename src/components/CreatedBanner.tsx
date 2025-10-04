"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function CreatedBanner() {
  const sp = useSearchParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sp.get("created") === "1") {
      setVisible(true);
      // göm efter 5 sekunder (valfritt)
      const t = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(t);
    }
  }, [sp]);

  if (!visible) return null;

  return (
    <div className="mb-4 rounded-lg bg-green-100 text-green-800 border border-green-200 px-4 py-3 text-sm text-center">
      🎉 Konto skapat! Du kan logga in nu.
    </div>
  );
}
