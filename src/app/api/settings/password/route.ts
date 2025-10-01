import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { z } from "zod";
import { prisma } from "@/lib";
import bcrypt from "bcryptjs";

const Body = z.object({
  current: z.string().min(1, "Nuvarande lösenord krävs"),
  pw: z.string().min(8, "Minst 8 tecken")
});

export async function POST(req: Request) {
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

  const { current, pw } = parsed.data;

  // 1. Hämta användaren från DB
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.password) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 2. Verifiera nuvarande lösenord
  const valid = await bcrypt.compare(current, user.password);
  if (!valid) {
    return NextResponse.json(
      { error: "Fel nuvarande lösenord" },
      { status: 400 }
    );
  }

  // 3. Hasha och spara nytt lösenord
  const hash = await bcrypt.hash(pw, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hash }
  });

  return NextResponse.json({ ok: true });
}
