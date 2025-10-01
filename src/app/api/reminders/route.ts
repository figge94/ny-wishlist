import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/get-user-id";
import { z } from "zod";

const createReminderSchema = z.object({
  title: z.string().min(1),
  dueAt: z.string().min(1) // ISO från client (datetime-local ger "YYYY-MM-DDTHH:mm")
});

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reminders = await prisma.reminder.findMany({
    where: { userId },
    orderBy: [{ done: "asc" }, { dueAt: "asc" }]
  });

  return NextResponse.json(reminders);
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = createReminderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, dueAt } = parsed.data;
  const reminder = await prisma.reminder.create({
    data: { title, dueAt: new Date(dueAt), userId }
  });

  return NextResponse.json(reminder, { status: 201 });
}
