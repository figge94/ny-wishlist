// src/app/api/friend-requests/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const fromUserId = searchParams.get("fromUserId") ?? undefined;
  const toUserId = searchParams.get("toUserId") ?? undefined;

  const statusParam = searchParams.get("status") ?? undefined;

  // Hämta enumvärden från Prisma om de finns, annars fallback till schema-listan
  const enumObj = (Prisma as any).FriendRequestStatus as
    | Record<string, string>
    | undefined;

  const allowed = enumObj
    ? Object.values(enumObj)
    : (["pending", "accepted", "declined"] as const);

  const status =
    statusParam && (allowed as readonly string[]).includes(statusParam)
      ? statusParam
      : undefined;

  const where: Prisma.FriendRequestWhereInput = {
    ...(fromUserId ? { fromUserId } : {}),
    ...(toUserId ? { toUserId } : {}),
    ...(status ? { status: status as any } : {}) // cast pga olika Prisma-typer mellan versioner
  };

  const items = await prisma.friendRequest.findMany({
    where,
    select: {
      id: true,
      createdAt: true,
      fromUserId: true,
      toUserId: true,
      status: true
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(items);
}
