// @ts-nocheck
import type { DefaultSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import { v4 } from "uuid"
import { db, tableCreator, schema, eq, and } from "@acme/db";

export type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export * from "next-auth/react";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: DrizzleAdapter(db, tableCreator),
  providers: [
    Google,
    Github,

    CredentialsProvider({
      name: "Guest User",
      credentials: {
      },
      async authorize(credentials) {

        const userExists = await db.select().from(schema.users).where(and(eq(schema.users.name, "Guest User"), eq(schema.users.image, "/login/user.svg"), eq(schema.users.email, "guest@user.again")));

        if (!userExists[0]) {
          const temp = await db.insert(schema.users).values({ id: `${v4()}`, name: "Guest User", image: "/login/user.svg", email: "guest@user.again" }).returning()
          return temp[0]
        }

        const returner = userExists[0]
        return returner as any
      }
    })
  ],
  callbacks: {
    session: async ({ session }) => {
      const sessionUsers = await db.select().from(schema.users).where(and(eq(schema.users.name, session?.user?.name as string), eq(schema.users.image, session?.user?.image as string), eq(schema.users.email, session?.user?.email as string)));
      const sessionUser = sessionUsers[0]
      return ({
        ...session,
        user: {
          ...session.user,
          id: sessionUser?.id,
        },
      }) as any
    },
    // signIn: async ({ profile, user }) => {
    //   console.log(user, profile, "signIn")
    //   return true
    // }
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60 // 4 hours
  },
});
