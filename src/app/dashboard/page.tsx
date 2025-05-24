'use client'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function dashboard () {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect (() => {
        if(status === "unauthenticated"){
            router.push('/login');
        }
    }, [router, status])
    console.log(session);

    return (
        <div>
            <h1>{session?.user?.name}</h1>
            <h1>{session?.user?.role}</h1>
            <button onClick={() => signOut({callbackUrl: "/login"})} className="bg-emerald-500 p-[0.5rem] rounded-[0.4rem]">Out</button>
        </div>
    )
}