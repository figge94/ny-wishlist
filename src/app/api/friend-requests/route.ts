import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { fromUserId, toUserId } = await req.json();
  if (!fromUserId || !toUserId) {
    return new NextResponse("fromUserId och toUserId krävs", { status: 400 });
  }
  if (fromUserId === toUserId) {
    return new NextResponse("Kan inte skicka till dig själv", { status: 400 });
  }

  // OBS: Detta kräver FriendRequest-modellen kopplad till User (fromUserId/toUserId)
  // Om du inte har det ännu: kör migrationen jag visade tidigare med fromUserId/toUserId + @@unique.
  const [from, to] = await Promise.all([
    prisma.user.findUnique({ where: { id: fromUserId } }),
    prisma.user.findUnique({ where: { id: toUserId } })
  ]);
  if (!from || !to) return new NextResponse("User not found", { status: 404 });

  const fr = await prisma.friendRequest.upsert({
    where: { fromUserId_toUserId: { fromUserId, toUserId } },
    update: {},
    create: { fromUserId, toUserId, status: "pending" }
  });

  return NextResponse.json(fr, { status: 201 });
}
