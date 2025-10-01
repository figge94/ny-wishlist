// app/api/friends/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function DELETE(
_req: Request,
{ params }: { params: { id: string } }
) {
const res = await prisma.friend.delete({ where: { id: params.id } }).catch(() => null);
if (!res) return new NextResponse("Not found", { status: 404 });
return NextResponse.json({ removed: params.id });