// src/app/api/friends/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type IdParams = { id: string };

// DELETE /api/friends/:id
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<IdParams> }
) {
  try {
    const { id } = await params;

    const res = await prisma.friend.delete({ where: { id } });
    return NextResponse.json({ removed: res.id });
  } catch (err) {
    // Om posten inte finns returnerar Prisma oftast 2025 (record not found).
    return new NextResponse("Not found", { status: 404 });
  }
}
