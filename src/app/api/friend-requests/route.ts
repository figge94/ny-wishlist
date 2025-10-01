import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/friend-requests?userId=...&in=received|sent
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const me = searchParams.get("userId");
  const scope = searchParams.get("in") ?? "received";
  if (!me) return new NextResponse("userId required", { status: 400 });

  const where =
    scope === "sent"
      ? { fromUserId: me, status: "pending" }
      : { toUserId: me, status: "pending" };

  const items = await prisma.friendRequest.findMany({
    where,
    select: {
      id: true,
      createdAt: true,
      fromUser: { select: { id: true, name: true, email: true } },
      toUser: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(items);
}
