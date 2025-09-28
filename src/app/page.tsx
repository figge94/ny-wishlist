import Link from "next/link";
import { Parisienne } from "next/font/google";
import { glassCard } from "@/lib";

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400"
});

export default function Home() {
  const cards = [
    { href: "/calendar", title: "Kalender", text: "Visa kalendern" },
    { href: "/dashboard", title: "Översikt", text: "Din översikt" },
    { href: "/wishlist", title: "Önskelistor", text: "Dina önskelistor" }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        {/* Hero */}
        <h1 className="text-5xl md:text-6xl text-slate-900 drop-shadow-md mb-3 text-center">
          <span className={parisienne.className}>WishList</span>
        </h1>
        <p className="mt-1 text-base sm:text-lg text-slate-700 italic tracking-wide text-center">
          Önskelistor utan krångel.
        </p>

        {/* Intro */}
        <div className="rounded-xl p-0 sm:p-6 mt-6 text-slate-800">
          <p className="text-base sm:text-lg px-2 sm:px-8 text-center">
            Gör presentplaneringen enkel 🎁 Samla alla önskelistor på ett ställe
            – snyggt, smidigt och delbart.
          </p>

          {/* Stats / CTA */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
            <div className={`${glassCard} p-6`}>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {[
                  { n: 4, t: "Önskelistor" },
                  { n: 7, t: "Påminnelser" },
                  { n: 5, t: "Vänner" }
                ].map((s) => (
                  <div
                    key={s.t}
                    className="rounded-md p-4 bg-white/50 dark:bg-neutral-800/40 backdrop-blur-sm border border-white/20">
                    <div className="text-3xl sm:text-4xl font-semibold leading-none">
                      {s.n}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                      {s.t}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="w-full flex flex-col sm:flex-row gap-3 sm:items-center mt-4">
                <Link
                  href="/calendar"
                  className="w-full sm:w-auto inline-flex justify-center items-center rounded-md px-5 py-2.5 min-h-[44px]
                             shadow-lg shadow-violet-500/20 bg-gradient-to-br from-violet-500/20 to-violet-700/20
                             text-white backdrop-blur-md hover:from-violet-500/30 hover:to-violet-700/30
                             active:scale-95 transition focus-visible:outline-none
                             focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2
                             motion-reduce:transition-none">
                  🚀 Kom igång
                </Link>
                <Link
                  href="/wishlist"
                  className="w-full sm:w-auto inline-flex justify-center items-center rounded-md px-5 py-2.5 min-h-[44px]
                             shadow-lg shadow-violet-500/20 bg-gradient-to-br from-violet-500/20 to-violet-700/20
                             text-white backdrop-blur-md hover:from-violet-500/30 hover:to-violet-700/30
                             active:scale-95 transition focus-visible:outline-none
                             focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2
                             motion-reduce:transition-none">
                  Visa listor
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Navigationskort */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`${glassCard} group p-5 sm:p-6 hover:bg-white/30 transition block
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2
                          motion-reduce:transition-none`}>
              <h2 className="text-lg sm:text-xl font-semibold">{c.title}</h2>
              <p className="text-slate-700 text-sm mt-1">{c.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-md bg-violet-200/70 border border-white/30 text-slate-800 px-4 py-2">
                Öppna
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <Feature
            title="👤 Din egen lista"
            desc="Skapa listor för födelsedagar, jul eller andra tillfällen. Uppdatera när du vill."
          />
          <Feature
            title="🤝 Dela med andra"
            desc="Bjud in familj och vänner till dina listor – och se vad de önskar sig."
          />
          <Feature
            title="✅ Kryssa av"
            desc="Markera när du köpt något från någons lista. Ingen risk för dubbletter!"
          />
        </div>
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className={`${glassCard} p-6`}>
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <p className="text-slate-700">{desc}</p>
    </div>
  );
}
