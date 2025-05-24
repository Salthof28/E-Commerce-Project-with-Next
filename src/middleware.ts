import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function middleware(req: NextRequestWithAuth) {
    // const isLogin = true;
    // if(!isLogin) {
    //     return NextResponse.redirect(new URL("/login", req.url))
    // }
    // else {
    //     return NextResponse.next();
    // }
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthenticated = token;
    const authPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');
    const limitAccessPage = req.nextUrl.pathname.startsWith('/dashboard');

    if(isAuthenticated && authPage) {
        const role = token.role;
        const redirectLogin = role === 'admin' ? '/dashboard' : '/dashboard';
        return NextResponse.redirect(new URL(redirectLogin, req.url));
    }
    if(!isAuthenticated && limitAccessPage) return NextResponse.redirect(new URL('/login', req.url));
    

} 
