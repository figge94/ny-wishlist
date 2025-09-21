import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = { title: "WistList" };

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
