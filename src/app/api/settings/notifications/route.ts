// app/api/settings/notifications/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { z } from "zod";
import { prisma } from "@/lib";

const Body = z.object({
  emailInvites: z.boolean().optional().default(false),
  listUpdates: z.boolean().optional().default(false),
  purchaseMarks: z.boolean().optional().default(false)
});

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { emailInvites, listUpdates, purchaseMarks } = parsed.data;

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { emailInvites, listUpdates, purchaseMarks },
    select: {
      id: true,
      emailInvites: true,
      listUpdates: true,
      purchaseMarks: true
    }
  });

  return NextResponse.json({ ok: true, notifications: updated });
}
