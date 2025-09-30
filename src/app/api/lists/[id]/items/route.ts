// app/api/lists/[id]/items/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toCents } from "@/utils/currency";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const body = (await req.json()) as {
      title: string;
      url?: string | null;
      price?: string | number | null;
    };

    const title = body.title?.trim();
    if (!title) {
      return NextResponse.json({ error: "title krävs" }, { status: 400 });
    }

    const url = body.url?.toString().trim() || null;
    const priceInCents = toCents(
      typeof body.price === "number" ? String(body.price) : body.price ?? null
    );

    // (valfritt) säkerställ att listan finns
    const exists = await prisma.wishlist.findUnique({
      where: { id },
      select: { id: true }
    });
    if (!exists)
      return NextResponse.json({ error: "Listan finns inte" }, { status: 404 });

    const item = await prisma.item.create({
      data: { title, url, priceInCents, wishlistId: id }
    });

    return NextResponse.json(item, { status: 201 });
  } catch (e: any) {
    console.error("POST /api/lists/[id]/items error:", e);
    return NextResponse.json({ error: "Serverfel" }, { status: 500 });
  }
}
