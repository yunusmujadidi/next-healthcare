import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [google],
  adapter: PrismaAdapter(prisma),
});
