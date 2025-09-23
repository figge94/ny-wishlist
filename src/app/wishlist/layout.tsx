// app/wishlist/layout.tsx
import Link from "next/link";

export default function WishlistLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Brödsmulor" className="mb-6 text-sm text-gray-600">
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="text-blue-600 hover:underline hover:underline-offset-4">
              Hem
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/wishlist" className="text-black font-medium">
              Önskelistor
            </Link>
          </li>
        </ol>
      </nav>
      {children}
    </main>
  );
}
