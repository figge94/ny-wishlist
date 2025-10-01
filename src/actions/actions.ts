// actions/actions.ts (server)
"use server";

import { prisma } from "@/lib";
import { z } from "zod";

const Body = z.object({
  wishlistId: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url().optional().or(z.literal("")),
  price: z.string().optional() // parse till number på serversidan
});

export async function addItemAction(fd: FormData) {
  const payload = Object.fromEntries(fd.entries());
  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, error: "Ogiltiga fält." };
  }

  const { wishlistId, title, url, price } = parsed.data;
  // Konvertera price-string → ören (int) om du vill spara i cents
  const priceInCents =
    price && price.trim()
      ? Math.round(Number(price.replace(",", ".")) * 100)
      : null;

  try {
    await prisma.item.create({
      data: {
        title,
        url: url || null,
        priceInCents,
        wishlistId
      }
    });
    return { ok: true };
  } catch (e) {
    console.error("addItemAction error:", e);
    return { ok: false, error: "Kunde inte spara. Försök igen." };
  }
}
