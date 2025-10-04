// app/signup/actions.ts
"use server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react"; // om du vill autologga in via client, annars v5 kräver annan signIn
import { redirect } from "next/navigation";

export async function createUser(_: any, formData: FormData) {
  const email = String(formData.get("email") || "")
    .toLowerCase()
    .trim();
  const name = String(formData.get("name") || "").trim();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Fyll i alla fält." };

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { error: "E-post används redan." };

  const hash = await bcrypt.hash(password, 12);
  await prisma.user.create({ data: { email, name, password: hash } });

  // Antingen redirect till login:
  redirect("/login?created=1");
}
