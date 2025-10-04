// app/signup/submit/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "")
      .toLowerCase()
      .trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (!name || !email || !password || !confirm) {
      return NextResponse.json({ error: "Fyll i alla fält." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Lösenordet måste ha minst 8 tecken." },
        { status: 400 }
      );
    }
    if (password !== confirm) {
      return NextResponse.json(
        { error: "Lösenorden matchar inte." },
        { status: 400 }
      );
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { error: "E-post används redan." },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 12);
    await prisma.user.create({ data: { email, name, password: hash } });

    // Lyckat -> vidare till login med “created”-flagga
    return NextResponse.redirect(new URL("/login?created=1", req.url));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Serverfel." }, { status: 500 });
  }
}
