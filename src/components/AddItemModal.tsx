// components/AddItemModal.tsx

"use client";

import { useState } from "react";
import { addItemAction } from "@/actions/actions";

export default function AddItemModal({ wishlistId }: { wishlistId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded bg-violet-600 px-3 py-2 text-white cursor-pointer">
        + Lägg till
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg max-w-md w-full p-7 relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3.5 text-gray-500 hover:text-gray-700">
              ✕
            </button>

            <h2 className="font-medium mb-4 uppercase">Lägg till i listan</h2>
            <form
              action={async (fd) => {
                await addItemAction(fd);
                setOpen(false);
              }}
              className="grid gap-3">
              <input type="hidden" name="wishlistId" value={wishlistId} />

              <div className="space-y-0.5">
                <label className="block text-xs text-gray-600">Titel</label>
                <input
                  name="title"
                  required
                  className="w-full rounded border border-stone-200 inset-shadow-sm px-3 py-2"
                />
              </div>

              <div className="space-y-0.5">
                <label className="block text-xs text-gray-600">URL</label>
                <input
                  name="url"
                  placeholder="https://www.exempel.se/"
                  className="w-full rounded border border-stone-200 inset-shadow-sm px-3 py-2"
                />
              </div>

              <div className="space-y-0.5">
                <label className="block text-xs text-gray-600">
                  Pris (SEK)
                </label>
                <input
                  name="price"
                  inputMode="decimal"
                  placeholder="t.ex. 299 eller 299,90"
                  className="w-full rounded border border-stone-200 inset-shadow-sm px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="rounded-md bg-violet-600 px-3 py-2 text-white cursor-pointer active:scale-95">
                Lägg till
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
