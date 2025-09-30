// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "500"]
});

export const metadata: Metadata = {
  title: "WishList",
  description: "Önskelistor utan krångel.",
  icons: { icon: "/favicon.ico" }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sv"
      className={lexend.className}
      data-scroll-behavior="smooth"
      suppressHydrationWarning>
      <body
        className="font-light min-h-screen bg-white text-slate-900 antialiased dark:bg-neutral-950 dark:text-white
          selection:bg-violet-300/60 dark:selection:bg-violet-500/40">
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-5xl px-4 sm:px-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
