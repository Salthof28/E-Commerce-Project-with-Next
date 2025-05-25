'use client'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import Navbar from "../components/navbar";
import { User, Mail } from "lucide-react";

export default function profile () {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect (() => {
        if(status === "unauthenticated"){
            router.push('/login');
        }
        if(session?.user?.role === 'admin'){
            router.push('/dashboard');
        }
    }, [router, status])
    console.log(session);

    return (
        <div className="bg-amber-700 overflow-x-hidden min-h-screen">
            <Navbar />
            <main className="flex flex-col gap-[2rem] pt-15 items-center min-h-screen mx-[12%]">
                {/* Welcom section */}
                <section className="flex flex-col justify-center items-center gap-[1rem] bg-amber-200 p-[1rem] mt-[8rem] w-full rounded-[1rem]">
                    <img className="w-[12rem] rounded-[50%]" src={session?.user.avatar} />
                    <h1 className="text-[2rem] font-extrabold">Welcome {session?.user?.name}, Enjoy Your Shopping</h1>
                </section>
                {/* Profile and history section */}
                <section className="flex flex-row w-full justify-between">
                    {/* Profile */}
                    <section className="flex flex-col bg-amber-200 p-[1rem] rounded-[1rem] w-[35%] gap-[1rem] h-full">
                        <h1 className="text-[2rem] font-bold">Profile Information</h1>
                        <div className="flex flex-col gap-[1rem] border-b-[0.1rem] p-[1rem]">
                            <div className="flex flex-row items-center gap-[0.5rem]">
                                <div className="bg-amber-50 rounded-[50%] p-[0.2rem]"><User className="w-[1.5rem] h-[1.5rem]" /></div>
                                <p className="text-[1.2rem]">{session?.user?.name}</p>
                            </div>
                            <div className="flex flex-row items-center gap-[0.5rem]">
                                <div className="bg-amber-50 rounded-[50%] p-[0.2rem]"><Mail className="w-[1.5rem] h-[1.5rem]" /></div>
                                <p className="text-[1.2rem]">{session?.user?.email}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-[1rem]">
                            <div className="flex flex-row gap-[1rem]">
                                <button onClick={() => router.push("/profile/edit")} className="bg-emerald-500 p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200 w-[12rem]">Change Profile</button>
                                <button onClick={() => router.push("/profile/editPass")} className="bg-emerald-500 p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200 w-[12rem]">Change Password</button>
                            </div>
                            <button onClick={() => signOut({callbackUrl: "/login"})} className="bg-emerald-500 p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200 w-[12rem]">Sign Out</button>
                        </div>
                    </section>
                    {/* History */}
                    <section className="flex flex-col items-center bg-amber-200 p-[1rem] rounded-[1rem] w-[63%] gap-[1rem] min-h-[40rem]">
                        <h1 className="text-[2rem] font-bold">History What You Buy</h1>
                        <div className="h-full flex items-center">
                            <h1 className="opacity-50">You don't buy Anything</h1>
                        </div>
                    </section>
                </section>
                {/* <section className="flex flex-col items-center bg-amber-200 p-[1rem] rounded-[1rem] w-[50rem] gap-[1rem]">
                    <h1 className="text-[2rem]">History What You Buy</h1>
                    <div>
                        <h1 className="opacity-50">You don't buy Anything</h1>
                    </div>
                    <button onClick={() => signOut({callbackUrl: "/login"})} className="bg-emerald-500 p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200">Sign Out</button>
                </section> */}
            </main>
        </div>
    )
}