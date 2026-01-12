import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      jwt: string;
      email?: string | null;
      name?: string | null;
      firstName?: string;
      lastName?: string;
    };
  }

  interface User {
    id: string;
    jwt: string;
    name?: string | null;
    firstName?: string;
    lastName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    jwt: string;
    name?: string | null;
    firstName?: string;
    lastName?: string;
  }
}
