import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export type AppUser = {
  id: string;
  name: string | null;
  email: string | null;
};

/** Returnerar inloggad användare eller null */
export async function getUser(): Promise<AppUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  return {
    id: (session.user as any).id ?? "",
    name: session.user.name ?? null,
    email: session.user.email ?? null
  };
}
