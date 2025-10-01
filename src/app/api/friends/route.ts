// app/api/friends/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const friends = await prisma.friend.findMany({
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(friends);
}

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return new NextResponse("Email is required", { status: 400 });
  }
  // Skapa en förfrågan i FriendRequest i stället för att direkt lägga till som vän
  await prisma.friendRequest.create({
    data: { email, name: email.split("@")[0] }
  });
  return NextResponse.json({ message: "Invited" }, { status: 201 });
}
