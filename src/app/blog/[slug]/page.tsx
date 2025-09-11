// Fejkdata
const fakePosts = [
  { slug: "forsta-inlagget", title: "Första inlägget", content: "Hej världen!" },
  { slug: "onskelista", title: "Önskelista", content: "Här kommer min lista..." },
  { slug: "nyheter", title: "Nyheter", content: "Lite uppdateringar." },
]

// Generera paths för SSG
export async function generateStaticParams() {
  return fakePosts.map(post => ({ slug: post.slug }))
}

// Sidan för ett inlägg
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = fakePosts.find(p => p.slug === params.slug)

  if (!post) {
    return <h1 className="p-6 text-red-500">Inlägget hittades inte</h1>
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
