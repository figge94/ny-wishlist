// Lista alla inlägg
const fakePosts = [
  { slug: "oversikt", title: "Man kan se en översikt." },
  { slug: "kalender", title: "Kalender tillagd." },
  { slug: "onskelista", title: "Du kan nu börja skapa dina önskelistor." }
];

export default function NewsLetter() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nyheter</h1>
      <ul className="list-disc pl-6 space-y-2">
        {fakePosts.map((post) => (
          <li key={post.slug}>
            <a
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
