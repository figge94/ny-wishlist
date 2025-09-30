// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!email || !password)
    return NextResponse.json({ error: "Saknar fält" }, { status: 400 });

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() }
  });
  if (existing)
    return NextResponse.json(
      { error: "E-post används redan" },
      { status: 409 }
    );

  const hash = await bcrypt.hash(password, 12);
  const u = await prisma.user.create({
    data: {
      email: email.toLowerCase().trim(),
      name: name?.trim() || null,
      password: hash
    },
    select: { id: true }
  });
  return NextResponse.json({ id: u.id }, { status: 201 });
}
