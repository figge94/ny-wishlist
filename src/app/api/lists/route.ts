// app/api/lists/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

// Lista alla listor för inloggad user
export async function GET() {
  const session = await getServerSession(authOptions);
  const uid = session?.user?.id;
  if (!uid)
    return NextResponse.json({ error: "Inte inloggad" }, { status: 401 });

  const lists = await prisma.wishlist.findMany({
    where: { ownerId: uid },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } }
  });

  return NextResponse.json(lists);
}

// Skapa ny lista för inloggad user
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const uid = session?.user?.id;
  if (!uid)
    return NextResponse.json({ error: "Inte inloggad" }, { status: 401 });

  const { name } = (await req.json()) as { name?: string };
  if (!name?.trim()) {
    return NextResponse.json({ error: "name krävs" }, { status: 400 });
  }

  const wl = await prisma.wishlist.create({
    data: { name: name.trim(), ownerId: uid }
  });

  return NextResponse.json(wl, { status: 201 });
}
