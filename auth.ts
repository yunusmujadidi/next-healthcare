import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [google],
});
