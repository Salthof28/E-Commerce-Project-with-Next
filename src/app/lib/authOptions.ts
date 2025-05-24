// import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { signIn } from "next-auth/react";



// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     password: "password123",
//     role: "user",
//   },
//   {
//     id: 2,
//     name: "Admin User",
//     email: "admin@example.com",
//     password: "admin123",
//     role: "admin",
//   },
// ];

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            // inialitation input login
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: 'blabla@gmail.com'},
                password: {label: "Password", type: "password"},
            },
            // prosess submit login
            async authorize(credentials) {
                if (!credentials?.email && !credentials?.password) {
                    return null
                }
                else {
                    // const { email, password } = credentials as {
                    //     email: string,
                    //     password: string
                    // };

                    // const user: any = users.find((user) => user.email === credentials.email && user.password === credentials.password);
                    // if (user && user.password === credentials.password) {
                    //     return user
                    // }
                    // else {
                    //     return null;
                    // }
                    try{
                        // auth login
                        const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({email: credentials.email, password: credentials.password})
                        });
                        // email or password false return null
                        if(!response.ok) return null;
                        const data = await response.json();
                        console.log('data: ',data);

                        // get data user
                        const profileResponse = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
                            method: "GET",
                            headers: {
                                    Authorization: `Bearer ${data.access_token}`,
                            },
                        });
                        if(!profileResponse.ok) return null;
                        const profile = await profileResponse.json();
                        console.log('profile: ', profile);
                        return {
                            id: profile.id,
                            name: profile.name,
                            email: profile.email,
                            role: profile.role, // misal default role, kamu bisa ubah sesuai isi profile
                            accessToken: data.access_token,
                        }
                    }
                    catch (error) {
                        console.error("Authorize error: ", error);
                        return null;
                    }
                }

            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.role = user.role;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session ({ session, token }) {
            if(token) {
                session.user.email = token.email as string;
                session.user.role = token.role as string;
                session.accessToken = token.accessToken as string;
            }
            return session
        }
    },
    pages: {
        signIn: '/login'
    },
}