// app/users/actions.ts
"use server";
import { prisma } from "@/lib/db";
// importera din auth, härled fromUserId på servern
export async function sendFriendRequestAction(formData: FormData) {
  const toUserId = String(formData.get("toUserId") ?? "");
  const fromUserId = "derive-from-session"; // t.ex. via cookies/session
  if (!toUserId || fromUserId === toUserId) return { ok: false, error: "bad" };
  await prisma.friendRequest.upsert({
    where: { fromUserId_toUserId: { fromUserId, toUserId } },
    update: {},
    create: { fromUserId, toUserId }
  });
  return { ok: true };
}
