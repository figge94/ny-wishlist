import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

type Creds = { email?: string; password?: string };

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(c) {
        const { email, password } = (c ?? {}) as Creds;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase().trim() }
        });
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.password);
        return ok
          ? { id: user.id, email: user.email, name: user.name ?? undefined }
          : null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = (user as any).id; // lägg userId i token
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).id = token.uid as string; // bubbla upp id till sessionen
      return session;
    }
  }
};
