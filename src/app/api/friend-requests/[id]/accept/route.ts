import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Din logik – ex: ta bort vänskap eller neka förfrågan
  await prisma.friend.delete({
    where: { id }
  });

  return new NextResponse(null, { status: 204 });
}
