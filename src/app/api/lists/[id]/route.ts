// app/api/lists/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

// Hämta en lista
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const list = await prisma.wishlist.findUnique({
    where: { id },
    include: {
      items: { orderBy: { createdAt: "desc" } },
      _count: { select: { items: true } }
    }
  });

  if (!list) return NextResponse.json({ error: "saknas" }, { status: 404 });
  return NextResponse.json(list);
}

// Byt namn på lista
export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const { name } = (await req.json()) as { name?: string };

  if (!name?.trim()) {
    return NextResponse.json({ error: "name krävs" }, { status: 400 });
  }

  try {
    const updated = await prisma.wishlist.update({
      where: { id },
      data: { name: name.trim() },
      select: { id: true, name: true, createdAt: true }
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "saknas" }, { status: 404 });
  }
}

// Ta bort lista (och dess items)
export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  // Radera items först om du inte har ON DELETE CASCADE i schema
  await prisma.item.deleteMany({ where: { wishlistId: id } });
  await prisma.wishlist.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
