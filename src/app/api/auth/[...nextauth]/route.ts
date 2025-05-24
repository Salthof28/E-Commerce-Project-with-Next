// import NextAuth from "next-auth";
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { signIn } from "next-auth/react";


// const users = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     password: "password123",
//     role: "user",
//   },
//   {
//     id: "2",
//     name: "Admin User",
//     email: "admin@example.com",
//     password: "admin123",
//     role: "admin",
//   },
// ];

// export const authOptions: NextAuthOptions = {
//     session: {
//         strategy: 'jwt',
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     providers: [
//         CredentialsProvider({
//             // inialitation input login
//             name: "Credentials",
//             credentials: {
//                 email: {label: "Email", type: "email", placeholder: 'blabla@gmail.com'},
//                 password: {label: "Password", type: "password"},
//             },
//             // prosess submit login
//             async authorize(credentials) {
//                 if (!credentials?.email && !credentials?.password) {
//                     return null
//                 }
//                 else {
//                     const { email, password } = credentials as {
//                         email: string,
//                         password: string
//                     };
//                     const user: any = users.find(user => user.email === credentials.email && user.password === credentials.password);
//                     if (user) {
//                         return user;
//                     }
//                     else {
//                         return null;
//                     }
//                 }

//             }
//         }),
//     ],
//     callbacks: {
//         jwt({ token, account, user }) {
//             if (account?.provider === "credentials") {
//                 token.email = user.email;
//             }
//             return token;
//         },
//         async session ({ session, token }: any) {
//             if("email" in token) {
//                 session.user.email = token.email;
//             }
//             return session
//         }
//     },
//     pages: {
//         signIn: '/login'
//     },
// }

import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };