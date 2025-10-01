// app/api/friends/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// TEMP: vi skickar userId via query ?userId=...
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const me = searchParams.get("userId");
  if (!me) return new NextResponse("userId required", { status: 400 });

  // vänner = alla accepted friendRequests där jag är from/to
  const accepted = await prisma.friendRequest.findMany({
    where: {
      status: "accepted",
      OR: [{ fromUserId: me }, { toUserId: me }]
    },
    select: {
      fromUserId: true,
      toUserId: true,
      fromUser: { select: { id: true, name: true, email: true } },
      toUser: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  const items = accepted.map((r) =>
    r.fromUserId === me ? r.toUser : r.fromUser
  );
  return NextResponse.json(items);
}
