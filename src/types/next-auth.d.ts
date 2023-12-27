import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
