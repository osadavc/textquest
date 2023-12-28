import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/utils/prisma";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // @ts-ignore
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          ...user,
        };
      }

      return token;
    },
    async signIn({
      user,
    }: {
      user: {
        id: string;
        name: string;
        email: string;
        image: string;
      };
    }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        if (existingUser) return true;

        await prisma.user.create({
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            profilePicture: user.image,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, token }: any) {
      session.id = token.id;
      session.error = token.error;

      return session;
    },
  },
};

// @ts-ignore
export default NextAuth(authOptions);
