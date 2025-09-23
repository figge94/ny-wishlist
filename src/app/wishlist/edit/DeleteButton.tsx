// app/wishlist/[id]/edit/DeleteButton.tsx
"use client";
import { useFormStatus } from "react-dom";

export function DeleteButton() {
  const { pending } = useFormStatus();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!confirm("Är du säker på att du vill radera listan?")) {
      e.preventDefault();
    }
  };

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={pending}
      className="rounded-lg border border-red-200 text-red-700 px-4 py-2 hover:bg-red-50 disabled:opacity-50">
      {pending ? "Raderar..." : "Radera lista"}
    </button>
  );
}
