import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function middleware(req: NextRequestWithAuth) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthenticated = !!token;
    const role = token?.role;
    const authPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');
    const limitAccessPage = req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/profile');

    if(isAuthenticated && authPage) {    
        const redirectLogin = role === 'admin' ? '/dashboard' : '/profile';
        return NextResponse.redirect(new URL(redirectLogin, req.url));
    }
    if(!isAuthenticated && limitAccessPage) return NextResponse.redirect(new URL('/login', req.url));
    
    if(isAuthenticated && req.nextUrl.pathname.startsWith('/dashboard')) {
        if (role !== 'admin') {
            return NextResponse.redirect(new URL('/profile', req.url));
        }
    }    
    return NextResponse.next();   
} 
