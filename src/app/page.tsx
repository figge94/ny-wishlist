import Link from "next/link";

export default function Home() {
  const cards = [
    { href: "/blog", title: "Blogg", text: "Nyheter & inlägg" },
    { href: "/calendar", title: "Kalender", text: "Kalender" },
    { href: "/dashboard", title: "Översikt", text: "Din översikt" },
    { href: "/wishlist", title: "Önskelistor", text: "Dina önskelistor" }
  ];

  return (
    <main className="min-h-screen grid place-items-center p-8">
      <section className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
        Välkommen till <span className="text-indigo-600">WishTogether</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Den smarta önskeliste-planeraren 🎁  
        Skapa egna listor, dela med vänner och familj, se andras listor och kryssa i det du köpt – så slipper ni dubbletter.
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