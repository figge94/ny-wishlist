import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

type Creds = { email?: string; password?: string };

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(c) {
        const { email, password } = (c ?? {}) as Creds;
        if (!email || !password) return null;

        const normalized = email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
          where: { email: normalized },
          select: { id: true, email: true, name: true, password: true } // ✅ hämta hash
        });

        // OAuth-användare saknar hash → avbryt
        if (!user || !user.password) return null;

        const ok = await bcrypt.compare(password, user.password); // ✅ nu är det en string
        return ok
          ? { id: user.id, email: user.email, name: user.name ?? undefined }
          : null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).id = token.uid as string;
      return session;
    }
  }
};

export default NextAuth(authOptions);
