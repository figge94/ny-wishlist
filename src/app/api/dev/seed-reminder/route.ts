import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // härifrån exporterar du din config

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { title, dueAt } = await req.json();
  if (!title || !dueAt) {
    return NextResponse.json(
      { error: "title och dueAt krävs" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  const uid = session?.user?.id;
  if (!uid) {
    return NextResponse.json({ error: "Inte inloggad" }, { status: 401 });
  }

  const dt = new Date(dueAt);
  if (Number.isNaN(dt.getTime())) {
    return NextResponse.json(
      { error: "dueAt ogiltigt datum" },
      { status: 400 }
    );
  }

  const r = await prisma.reminder.create({
    data: {
      title: String(title).trim(),
      dueAt: dt,
      user: { connect: { id: uid } } // relationen fixas här
    }
  });

  return NextResponse.json(r, { status: 201 });
}
