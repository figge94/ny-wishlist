// app/api/wishlist/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json([], { status: 200 });

  const userId = (session.user as any).id as string;
  const lists = await prisma.wishlist.findMany({
    where: { ownerId: userId },
    include: { items: true, _count: { select: { items: true } } },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(lists);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  if (!name?.trim())
    return NextResponse.json({ error: "Namn krävs" }, { status: 400 });

  const userId = (session.user as any).id as string;

  const wl = await prisma.wishlist.create({
    data: { name: name.trim(), ownerId: userId } // 👈 viktigt
  });

  return NextResponse.json(wl, { status: 201 });
}
