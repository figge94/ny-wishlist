import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const { title, dueAt } = await req.json();
  const r = await prisma.reminder.create({
    data: { title, dueAt: new Date(dueAt) }
  });
  return NextResponse.json(r, { status: 201 });
}
