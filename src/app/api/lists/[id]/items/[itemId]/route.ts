// app/api/lists/[id]/items/[itemId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

// Uppdatera ett item
export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string; itemId: string }> }
) {
  const { id, itemId } = await ctx.params;
  const data = (await req.json()) as Partial<{
    title: string;
    url: string | null;
    priceInCents: number | null;
    done: boolean;
  }>;

  // Säkerställ att item tillhör listan
  const exists = await prisma.item.findFirst({
    where: { id: itemId, wishlistId: id },
    select: { id: true }
  });
  if (!exists)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const item = await prisma.item.update({
    where: { id: itemId },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.url !== undefined ? { url: data.url } : {}),
      ...(data.priceInCents !== undefined
        ? { priceInCents: data.priceInCents }
        : {}),
      ...(data.done !== undefined ? { done: data.done } : {})
    }
  });

  return NextResponse.json(item);
}

// Ta bort ett item
export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string; itemId: string }> }
) {
  const { id, itemId } = await ctx.params;

  const exists = await prisma.item.findFirst({
    where: { id: itemId, wishlistId: id },
    select: { id: true }
  });
  if (!exists)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.item.delete({ where: { id: itemId } });
  return NextResponse.json({ ok: true });
}
