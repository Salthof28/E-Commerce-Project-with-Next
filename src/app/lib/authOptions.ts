// import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: "kwYsLxik+FEx0VC+1GWPpA==",
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
                        if(!response.ok) {
                            console.error(`Login Failed: ${await response.text()}`)
                            return null;
                        };
                        const data = await response.json();
                        console.log('data: ',data);

                        // get data user
                        const profileResponse = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
                            method: "GET",
                            headers: {
                                    Authorization: `Bearer ${data.access_token}`,
                            },
                        });
                        if(!profileResponse.ok) {
                            console.error(`Login Failed: ${await profileResponse.text()}`)
                            return null;
                        };
                        const profile = await profileResponse.json();
                        console.log('profile: ', profile);
                        return {
                            id: profile.id,
                            name: profile.name,
                            email: profile.email,
                            password: profile.password,
                            avatar: profile.avatar,
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
                token.id = user.id;
                token.email = user.email;
                token.password = user.password;
                token.role = user.role;
                token.avatar = user.avatar;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session ({ session, token }) {
            if(token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.password = token.password
                session.user.role = token.role;
                session.user.avatar = token.avatar;
                session.accessToken = token.accessToken;
            }
            return session
        }
    },
    pages: {
        signIn: '/login'
    },
}