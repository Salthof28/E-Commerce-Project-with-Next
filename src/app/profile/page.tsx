'use client'
import { signOut } from "next-auth/react";
import Navbar from "@/components/navbar";
import { User, Mail } from "lucide-react";
import useAuthCustomer from "../../hooks/useAuthCustomer";

export default function Profile () {
    // custom hook customer authenticated
    const { session, router } = useAuthCustomer()
    return (
        <div className="bg-amber-700 overflow-x-hidden min-h-screen">
            <Navbar />
            <main className="flex flex-col gap-[1rem] lg:gap-[2rem] items-center min-h-screen mx-[6%] md:mx-[12%]">
                {/* Welcom section */}
                <section className="flex flex-col justify-center items-center gap-[1rem] bg-amber-200 p-[1rem] mt-[8rem] w-full rounded-[1rem]">
                    <img className="w-[6rem] md:w-[8rem] lg:w-[10rem] xl:w-[12rem] h-[6rem] md:h-[8rem] lg:h-[10rem] xl:h-[12rem] rounded-[50%] border border-gray-600" src={session?.user.avatar} />
                    <h1 className="max-lg:text-center text-[0.8rem] md:text-[1rem] lg:text-[1.5rem] xl:text-[2rem] font-extrabold">Welcome {session?.user?.name}, Enjoy Your Shopping</h1>
                </section>
                {/* Profile and history section */}
                <section className="flex flex-col lg:flex-row w-full max-lg:gap-[1rem] max-lg:items-center justify-center lg:justify-between">
                    {/* Profile */}
                    <section className="flex flex-col bg-amber-200 p-[1rem] rounded-[1rem] w-[100%] lg:w-[35%] gap-[1rem] h-full">
                        <h1 className="text-center lg:text-start text-[0.8rem] md:text-[1rem] lg:text-[1.5rem] xl:text-[2rem] font-bold">Profile Information</h1>
                        <div className="flex max-lg:justify-center flex-row lg:flex-col gap-[1rem] md:gap-[2rem] lg:gap-[0.5rem] xl:gap-[1rem] border-b-[0.1rem] p-[0.1rem] xl:p-[1rem]">
                            <div className="flex flex-row items-center gap-[0.2rem] md:gap-[0.5rem]">
                                <div className="bg-amber-50 rounded-[50%] p-[0.2rem]"><User className="w-[0.8rem] md:w-[1.3rem] xl:w-[1.5rem] h-[0.8rem] md:h-[1.3rem] xl:h-[1.5rem]" /></div>
                                <p className="text-[0.6rem] md:text-[1rem] xl:text-[1.2rem]">{session?.user?.name}</p>
                            </div>
                            <div className="flex flex-row items-center gap-[0.2rem] md:gap-[0.5rem]">
                                <div className="bg-amber-50 rounded-[50%] p-[0.2rem]"><Mail className="w-[0.8rem] md:w-[1.3rem] xl:w-[1.5rem] h-[0.8rem] md:h-[1.3rem] xl:h-[1.5rem]" /></div>
                                <p className="text-[0.6rem] md:text-[1rem] xl:text-[1.2rem]">{session?.user?.email}</p>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-col items-center max-lg:justify-center gap-[0.2rem] md:gap-[1rem]">
                            <div className="flex flex-row gap-[0.2rem] md:gap-[1rem]">
                                <button onClick={() => router.push("/profile/edit")} className="bg-emerald-500 p-[0.3rem] xl:p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200 text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] w-[6rem] md:w-[7rem] xl:w-[10rem]">Change Profile</button>
                                <button onClick={() => router.push("/profile/editPass")} className="bg-emerald-500 p-0 xl:p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200 text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] w-[6rem] md:w-[7rem] xl:w-[10rem]">Change Password</button>
                            </div>
                            <button onClick={() => signOut({callbackUrl: "/login"})} className="bg-emerald-500 p-[0.3rem] xl:p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200 text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] w-[6rem] md:w-[7rem] xl:w-[10rem]">Sign Out</button>
                        </div>
                    </section>
                    {/* History */}
                    <section className="flex flex-col items-center bg-amber-200 p-[1rem] rounded-[1rem] w-[100%] lg:w-[63%] gap-[1rem] min-h-[20rem] xl:min-h-[40rem]">
                        <h1 className="text-[0.8rem] md:text-[1rem] lg:text-[1.5rem] xl:text-[2rem] font-bold">History What You Buy</h1>
                        <div className="h-full flex items-center">
                            <h1 className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] opacity-50">You don&apos;t buy Anything</h1>
                        </div>
                    </section>
                </section>
            </main>
        </div>
    )
}