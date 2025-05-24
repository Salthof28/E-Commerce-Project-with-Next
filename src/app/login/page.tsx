'use client'

import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { signIn } from "next-auth/react";



export default function login () {
    const router: AppRouterInstance = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || ('/dashboard');
    const errorType = searchParams.get('error')
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if(errorType){
            switch (errorType) {
                case "CredentialsSignin":
                setError("Invalid email or password");
                break;
                case "SessionRequired":
                setError("You need to be signed in to access this page");
                break;
                default:
                setError("An authentication error occurred");
            }
        }
    }, [errorType])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const user = await signIn('credentials', {email, password, redirect: false});
        if(user?.error){
            setError('Invalid Email or Password');
            setLoading(false);
        }
        else{
            router.push(redirect);
        }
    }
    // console.log(error);
    // console.log(`email: ${email}`);
    // console.log(`password: ${password}`);

    return (
        <div className="bg-amber-700 min-h-screen overflow-x-hidden">
            <Navbar/>
            <main className="flex flex-col justify-center items-center min-h-screen">
                <form onSubmit={handleSubmit} className="flex flex-col bg-amber-100 p-[2rem] gap-[1rem] rounded-[1rem] w-[15rem]">
                    <h1 className="font-extrabold ">Login Page</h1>
                    <input type="email" placeholder="email@mail.com" className="border p-[0.2rem]" onChange={mail => setEmail(mail.target.value)}/>
                    <input type="password" placeholder="Passsword" className="border p-[0.2rem]" onChange={pass => setPassword(pass.target.value)}/>
                    <button type="submit" className="bg-emerald-500 rounded-[0.4rem]" disabled={loading}>Sign In</button>
                    <p>{error}</p>
                </form>
            </main>
        </div>
    );
}