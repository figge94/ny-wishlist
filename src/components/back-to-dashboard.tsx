import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToDashboard({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Link
      href="/dashboard"
      className={`inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:underline ${className}`}
      aria-label="Tillbaka till dashboard">
      <ArrowLeft className="h-4 w-4" />
      Tillbaka till översikten
    </Link>
  );
}
