// components/BackToDashboard.tsx

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToDashboard({
  className = ""
}: {
  className?: string;
}) {
  return (
    <Link
      href="/dashboard"
      className={`inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:underline hover:underline-offset-4 ${className}`}
      aria-label="Tillbaka till dashboard">
      <ArrowLeft className="h-3 w-3" />
      Tillbaka till översikten
    </Link>
  );
}
