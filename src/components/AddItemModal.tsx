// components/AddItemModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { addItemAction } from "@/actions/actions";

export default function AddItemModal({ wishlistId }: { wishlistId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Fokusera första fältet när modalen öppnas
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ESC för att stänga
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, loading]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (loading) return; // lås medan vi sparar
    if (e.target === e.currentTarget) setOpen(false);
  }

  async function onSubmit(fd: FormData) {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Normalisera pris: tillåt "299,90" → "299.90"
      const priceRaw = String(fd.get("price") ?? "").trim();
      if (priceRaw) {
        fd.set("price", priceRaw.replace(",", "."));
      }

      // Skicka vidare till server action
      // Rekommendation: låt addItemAction returnera { ok: boolean, error?: string }
      const res = await addItemAction(fd);

      if (typeof res === "object" && res && "ok" in res && !res.ok) {
        setErrorMsg((res as any).error ?? "Något gick fel. Försök igen.");
        return;
      }

      // Lyckat: töm formuläret + stäng
      formRef.current?.reset();
      setOpen(false);
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Kunde inte spara. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded bg-violet-600 px-3 py-2 text-white cursor-pointer active:scale-95">
        + Lägg till
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onMouseDown={handleBackdropClick}
          aria-hidden={false}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-item-title"
            className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg max-w-md w-full p-7 relative"
            onMouseDown={(e) => e.stopPropagation()} // förhindra att klick bubblar till backdrop
          >
            <button
              type="button"
              onClick={() => !loading && setOpen(false)}
              className="absolute top-3 right-3.5 text-gray-500 hover:text-gray-700"
              aria-label="Stäng"
              disabled={loading}>
              ✕
            </button>

            <h2 id="add-item-title" className="font-medium mb-4 uppercase">
              Lägg till i listan
            </h2>

            {errorMsg && (
              <div className="mb-3 rounded border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-sm">
                {errorMsg}
              </div>
            )}

            <form
              ref={formRef}
              action={async (fd) => {
                fd.set("wishlistId", wishlistId);
                await onSubmit(fd);
              }}
              className="grid gap-3"
              aria-busy={loading}>
              {/* Hidden fält behövs ej när vi sätter i action, men låter det stå kvar om du vill */}
              <input type="hidden" name="wishlistId" value={wishlistId} />

              <div className="space-y-0.5">
                <label className="block text-xs text-gray-600" htmlFor="title">
                  Titel
                </label>
                <input
                  id="title"
                  name="title"
                  ref={firstFieldRef}
                  required
                  disabled={loading}
                  className="w-full rounded border border-stone-200 px-3 py-2 disabled:opacity-60"
                />
              </div>

              <div className="space-y-0.5">
                <label className="block text-xs text-gray-600" htmlFor="url">
                  URL
                </label>
                <input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="https://www.exempel.se/"
                  disabled={loading}
                  className="w-full rounded border border-stone-200 px-3 py-2 disabled:opacity-60"
                />
              </div>

              <div className="space-y-0.5">
                <label className="block text-xs text-gray-600" htmlFor="price">
                  Pris (SEK)
                </label>
                <input
                  id="price"
                  name="price"
                  inputMode="decimal"
                  placeholder="t.ex. 299 eller 299,90"
                  disabled={loading}
                  className="w-full rounded border border-stone-200 px-3 py-2 disabled:opacity-60"
                />
              </div>

              <div className="mt-2 flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-violet-600 px-3 py-2 text-white cursor-pointer active:scale-95 disabled:opacity-60">
                  {loading ? "Sparar…" : "Lägg till"}
                </button>

                <button
                  type="button"
                  onClick={() => !loading && setOpen(false)}
                  className="rounded-md bg-neutral-200 px-3 py-2 text-neutral-800 hover:bg-neutral-300 disabled:opacity-60"
                  disabled={loading}>
                  Avbryt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
