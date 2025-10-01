import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/get-user-id";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  dueAt: z.string().min(1).optional(),
  done: z.boolean().optional()
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 förändringen
) {
  const { id } = await params; // 👈 vänta in params
  const userId = await getCurrentUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const found = await prisma.reminder.findUnique({ where: { id } });
  if (!found || found.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.reminder.update({
    where: { id },
    data: {
      ...(parsed.data.title !== undefined ? { title: parsed.data.title } : {}),
      ...(parsed.data.dueAt !== undefined
        ? { dueAt: new Date(parsed.data.dueAt) }
        : {}),
      ...(parsed.data.done !== undefined ? { done: parsed.data.done } : {})
    }
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 förändringen
) {
  const { id } = await params; // 👈 vänta in params
  const userId = await getCurrentUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const found = await prisma.reminder.findUnique({ where: { id } });
  if (!found || found.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.reminder.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
