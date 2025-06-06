'use client'
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { Users } from "@/types/interfaces";
// import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fetchUsers } from "@/services/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Register () {
    const { data: session, status } = useSession();
    const [statusCreated, setStatusCreated] = useState<string>("Processing...");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    // const { router } = useAuthCustomer();
    useEffect(() => {
        if (status === "unauthenticated") {
        router.push("/register");
        } else if (session?.user?.role === "customer") {
        router.push("/profile");
        }
    }, [status, session, router]);

    useEffect(() => {
        const timeProcess = setTimeout (() => {
            router.push(statusCreated === "User Created" ? "/login": "/register")
            setLoading(false);
            setStatusCreated("Processing...");
        }, 1000);
        return () => clearTimeout(timeProcess);
    }, [statusCreated])

    const handleregister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget); // get all value in input element who has a name
        // formData.entries() generate [key, value]
        const inputData = await Object.fromEntries(formData.entries()); // convert formData to object 
        setLoading(true);
        if(!inputData.name || !inputData.email || !inputData.password) return setStatusCreated("Please fill all data");
        console.log(inputData);
        const data: Users[] = await fetchUsers();
        
        const isEmailAvailabe = data.some(user => user.email === inputData.email);
        if(isEmailAvailabe){
            setStatusCreated('email already registered');
        }
        else{
            const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: inputData.name,
                    email: inputData.email,
                    password: inputData.password,
                    avatar: "https://www.freeiconspng.com/uploads/profile-icon-9.png",
                })
            });
            if(!response.ok) return setStatusCreated("User Failed to create");
            return setStatusCreated("User Created");
        } 
    }
    return (
        <div className="bg-amber-700 min-h-screen overflow-x-hidden">
            <Navbar/>
            <main className="flex flex-col justify-center items-center min-h-screen">
                {!loading && (
                    <form onSubmit={handleregister} className="flex flex-col bg-amber-100 p-[2rem] pt-[1rem] gap-[1rem] rounded-[1rem] w-[15rem] lg:w-[25rem] text-black">
                        <Link href="/login"><ArrowLeft /></Link>
                        <h1 className="font-extrabold text-[1rem] lg:text-[2.5rem]">Register Page</h1>
                        <input data-testid="inptName" type="text" name="name" placeholder="name" className="border p-[0.2rem] lg:p-[0.5rem] rounded-[0.6rem] text-[1rem] lg:text-[1.5rem]"/>
                        <input data-testid="inptEmail" type="email" name="email" placeholder="email@mail.com" className="border p-[0.2rem] lg:p-[0.5rem] rounded-[0.6rem] text-[1rem] lg:text-[1.5rem]"/>
                        <input data-testid="inptPassword" type="password" name="password" placeholder="Passsword" className="border p-[0.2rem] lg:p-[0.5rem] rounded-[0.6rem] text-[1rem] lg:text-[1.5rem]"/>
                        <button data-testid="btnRegister" type="submit" className="bg-emerald-500 rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200 p-[0.2rem] lg:p-[0.5rem]" >Register</button>
                    </form>
                )}
                {loading && (
                    <section className="bg-amber-100 min-w-[15rem] min-h-[4rem] flex justify-center items-center rounded-[1rem]">
                        <h1>{statusCreated}</h1>
                    </section>
                )}

            </main>
        </div>
    );
}