import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User as UserPrisma } from "@prisma/client";
import NextAuth from "next-auth";
import "next-auth/jwt"

declare module "next-auth" {
    interface User extends UserPrisma { }
}

declare module "next-auth/jwt" {
    interface JWT extends UserPrisma { }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    trustHost: true,
    pages: {
        signIn: "/sign-in",
        error: "/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            if (!user.id) return false;

            const existingUser = await getUserById(user.id);

            if (!existingUser?.emailVerified) return "user-not-verified";

            return true
        },
        async session({ token, session }) {
            if (!token) return session;

            const { name, sub, role } = token

            return {
                ...session,
                user: {
                    ...session.user,
                    id: sub,
                    name,
                    role,
                },
            }
        },
        async jwt({ token }) {

            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const { name, role } = existingUser

            return {
                ...token,
                role,
                name,

            }
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})