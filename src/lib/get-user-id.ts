import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

/** Returnerar inloggad användares id eller null om inte inloggad */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  const uid = (session?.user as any)?.id as string | undefined;
  return uid ?? null;
}
