// app/wishlist/[id]/not-found.tsx
import Link from "next/link";
import { Ban } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-violet-400">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
          Listan hittades inte
        </h1>{" "}
        <Ban className="w-12 h-12 text-violet-500 mt-4 mx-auto" />
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Ojdå! Vi kunde inte hitta den här önskelistan. Kontrollera länken
          eller gå tillbaka till alla önskelistor.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/wishlist"
            className="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Till önskelistor
          </Link>
        </div>
      </div>
    </main>
  );
}
