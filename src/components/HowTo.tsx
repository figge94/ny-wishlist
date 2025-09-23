// app/wishlist/HowTo.tsx
import Link from "next/link";

export default function HowTo() {
  return (
    <aside className="relative mt-6 overflow-hidden rounded-2xl">
      {/* Bakgrundsgradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-600" />

      {/* Dekorativ blur */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

      {/* Innehåll (glass-card) */}
      <div className="relative grid gap-5 p-6 sm:p-8 backdrop-blur-md bg-white/10 ring-1 ring-white/20 shadow-xl">
        <header className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 ring-1 ring-white/30 text-white">
            {/* ikon */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}>
              <path d="M12 6v12M6 12h12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Så skapar du en önskelista
          </h2>
        </header>

        <ol className="list-decimal pl-6 space-y-2 text-white/90">
          <li>
            Klicka på <span className="font-semibold text-white">Ny lista</span>{" "}
            eller gå till sidan nedan.
          </li>
          <li>Ge listan ett namn och (valfritt) en beskrivning.</li>
          <li>Lägg till saker efter att listan skapats.</li>
        </ol>

        <div>
          <Link
            href="/wishlist/new"
            className="inline-flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-medium text-gray-900 shadow hover:bg-white transition">
            Skapa första listan
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
