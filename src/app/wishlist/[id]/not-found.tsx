// app/wishlist/[id]/not-found.tsx
import Link from "next/link";
import { Ban } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-2xl font-bold mb-2">Listan hittades inte</h1>{" "}
      <Ban className="w-12 h-12 text-rose-500 mb-4" />
      <p className="text-gray-600 mb-6">
        Ojdå! Vi kunde inte hitta den här önskelistan. Kontrollera länken eller
        gå tillbaka till alla önskelistor.
      </p>
      <Link
        href="/wishlist"
        className="px-6 py-2 bg-black text-white rounded-md shadow-lg drop-shadow-2xl hover:bg-rose-600 transition hover:drop-shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600">
        Till önskelistor
      </Link>
    </div>
  );
}
