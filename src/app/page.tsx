import Link from "next/link";
import { Parisienne  } from "next/font/google";

const parisienne  = Parisienne ({
  subsets: ["latin"],
  weight: "400", 
});

export default function Home() {
  const cards = [
    { href: "/news", title: "Nyheter", text: "De senaste nyheterna" },
    { href: "/calendar", title: "Kalender", text: "Visa kalendern" },
    { href: "/dashboard", title: "Översikt", text: "Din översikt" },
    { href: "/wishlist", title: "Önskelistor", text: "Dina önskelistor" }
  ];

  return (
    <main className="min-h-screen grid place-items-center p-8">
      <section className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl text-slate-800 mb-6">
          <span className={`${parisienne.className}`}>
            WishList
          </span>
         
        </h1> 
        
        <p className="mt-2 text-md text-slate-500 italic font-light tracking-wide">
          Önskelistor utan krångel.
        </p>
        
        <p className="text-lg text-slate-600 max-w-2xl mb-8">
          Gör presentplaneringen enkel 🎁  
          Med WishList samlar du alla dina önskelistor på ett ställe – snyggt, smidigt och delbart.  
          Dela med familj och vänner, kryssa av det som är köpt och undvik dubbelköp.  
          Enklare kan det inte bli!
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          {cards.map(c => (
            <Link key={c.href} href={c.href}
              className="rounded-2xl bg-white shadow p-6 hover:shadow-lg transition block">
              <h2 className="text-xl font-semibold mb-1">{c.title}</h2>
              <p className="text-gray-600 text-sm">{c.text}</p>
              <span className="inline-block mt-4 rounded-full bg-blue-500 text-white px-4 py-2">
                Öppna
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex gap-4 mb-12">
        <a
          href="/signup"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
        >
          Skapa konto
        </a>
        <a
          href="/wishlist"
          className="bg-white border px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-50 transition"
        >
          Utforska listor
        </a>
      </div>

      <section className="grid md:grid-cols-3 gap-8 max-w-5xl">
        <Feature
          title="👤 Din egen lista"
          desc="Skapa önskelistor för födelsedagar, jul eller andra tillfällen. Uppdatera när du vill."
        />
        <Feature
          title="🤝 Dela med andra"
          desc="Bjud in familj och vänner till dina listor – och se vad de önskar sig."
        />
        <Feature
          title="✅ Kryssa av"
          desc="Markera när du köpt något från någons lista. Ingen risk för dubbletter!"
        />
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
      <h2 className="font-bold text-xl mb-3">{title}</h2>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}