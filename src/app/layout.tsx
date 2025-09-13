import Link from "next/link"
import "./globals.css";

export const metadata = { title: "WistList" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow px-6 py-3 flex gap-6">
          <Link href="/" className="font-bold hover:underline">
            Hem
          </Link>
          <Link href="/wishlist" className="hover:underline">
            Önskelista
          </Link>
          <Link href="/blog" className="hover:underline">
            Blogg
          </Link>
          <Link href="/calendar" className="hover:underline">
            Kalender
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Översikt
          </Link>
        </nav>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}