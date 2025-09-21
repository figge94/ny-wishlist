import Link from "next/link";
import { Parisienne } from "next/font/google";

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

  const glass =
    "backdrop-blur-lg bg-white/90 border border-white/30 drop-shadow-md shadow-black/40";

  return (
    <main className="min-h-screen relative overflow-hidden">
      <section className="w-full max-w-5xl mx-auto px-6 pt-16 pb-8">
        {/* Hero */}
        <h1 className="text-5xl md:text-6xl text-slate-900 drop-shadow-md mb-3 text-center">
          <span className={parisienne.className}>WishList</span>
        </h1>
        <p className="mt-1 text-lg text-slate-700 italic tracking-wide text-center">
          Önskelistor utan krångel.
        </p>

        <div className={`rounded-xl p-6 mt-6 text-slate-800`}>
          <p className="text-base px-8 text-center md:text-lg">
            Gör presentplaneringen enkel 🎁 Samla alla önskelistor på ett ställe
            – snyggt, smidigt och delbart. Dela med familj och vänner, kryssa av
            köpta saker och undvik dubbelköp.
          </p>

          {/* Stats / CTA */}
          <section className="w-full max-w-5xl mx-auto px-6 mt-8">
            <div
              className={`${glass} rounded-xl p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8`}>
              {/* Stats */}
              <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-semibold">4</div>
                  <div className="text-slate-600 text-sm">Önskelistor</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">7</div>
                  <div className="text-slate-600 text-sm">Påminnelser</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">5</div>
                  <div className="text-slate-600 text-sm">Vänner</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4">
                <Link
                  href="/calendar"
                  className="inline-flex items-center rounded-full px-5 py-2.5 shadow-lg bg-violet-600 text-white border border-violet-500 hover:bg-violet-500 transition">
                  🚀 Kom igång
                </Link>
                <Link
                  href="/wishlist"
                  className={`${glass} inline-flex items-center rounded-full px-5 py-2.5  text-slate-800 border border-white/30 hover:bg-white/50 transition`}>
                  Visa listor
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Navigationskort */}
        <div className="grid gap-6 sm:grid-cols-3 mt-10">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`${glass} rounded-xl p-6  hover:bg-white/20 transition block`}>
              <h2 className="text-xl font-semibold mb-1">{c.title}</h2>
              <p className="text-slate-700 text-sm">{c.text}</p>
              <span className="inline-flex items-center justify-center mt-4 rounded-sm bg-violet-200 border border-white/30 text-slate-800 px-4 py-2">
                Öppna
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
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
  const card =
    "backdrop-blur-md bg-white/80 border border-white/20 drop-shadow-md shadow-black/20";
  return (
    <div className={`${card} rounded-2xl p-6 hover:bg-white/20 transition`}>
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <p className="text-slate-700">{desc}</p>
    </div>
  );
}
