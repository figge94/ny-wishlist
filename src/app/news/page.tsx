// Lista alla inlägg
const fakePosts = [
  { slug: "forsta-inlagget", title: "Första inlägget" },
  { slug: "onskelista", title: "Önskelista" },
  { slug: "nyheter", title: "Nyheter" },
]

export default function BlogPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blogg</h1>
      <ul className="list-disc pl-6 space-y-2">
        {fakePosts.map(post => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
