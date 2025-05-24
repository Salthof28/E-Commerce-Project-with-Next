import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        accessToken?: string
        user: {
        email?: string;
        role?: string; // tambahkan role di sini
        } & DefaultSession["user"];
    };
    interface User {
        role?: string;
        accessToken?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
        accessToken?: string
    }
}