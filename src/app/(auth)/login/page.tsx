import Link from "next/link";
import { Parisienne } from "next/font/google";
import { LoginForm } from "@/components/LoginForm";
import { CreatedBanner } from "@/components/CreatedBanner";

const parisienne = Parisienne({ subsets: ["latin"], weight: "400" });

export default function LoginPage() {
  return (
    <main className="grid place-items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl drop-shadow-sm p-8">
        <h1
          className={`text-3xl text-slate-600 text-center ${parisienne.className}`}>
          WishList
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Önskelistor utan krångel.
        </p>

        <CreatedBanner />

        <LoginForm />

        <p className="text-sm text-gray-600 text-center mt-4">
          Ny här?{" "}
          <Link
            href="/signup"
            className="text-sky-600 hover:underline hover:underline-offset-4">
            Skapa konto
          </Link>
        </p>
      </div>
    </main>
  );
}
