import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { z } from "zod";
import { prisma } from "@/lib";

const Body = z.object({
  name: z.string().trim().min(1, "Namn får inte vara tomt"),
  email: z.string().email("Ogiltig e-post")
});

export async function PATCH(req: Request) {
  // 1. Kolla vem som är inloggad
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2. Läs request body och validera
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // 3. Uppdatera i databasen med Prisma
  const { name, email } = parsed.data;
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { name, email },
    select: { id: true, name: true, email: true }
  });

  // 4. Returnera JSON
  return NextResponse.json({ ok: true, user: updated });
}
