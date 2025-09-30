// src/actions/actions.ts
"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toCents } from "@/utils/currency";

export async function addItemAction(formData: FormData) {
  const wishlistId = String(formData.get("wishlistId") || "");
  const title = String(formData.get("title") || "").trim();
  const url = String(formData.get("url") || "").trim() || null;
  const priceInCents = toCents(formData.get("price"));
  if (!wishlistId || !title) return;

  await prisma.item.create({ data: { title, url, priceInCents, wishlistId } });
  revalidatePath(`/wishlist/${wishlistId}`);
  redirect(`/wishlist/${wishlistId}`);
}
