'use client'
import { signIn } from "next-auth/react";
import useAuthCustomer from "@/hooks/useAuthCustomer";
import Navbar from "@/components/navbar";
import React, { useState, useEffect } from "react";

export default function editPass () {
    // const { data: session } = useSession();
    // custom hook customer authenticated
    const { session, router } = useAuthCustomer()
    const [statusEdit, setStatusEdit] = useState<string>("Processing ....");
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
    })
    // const router = useRouter();
    // delay process edit data
    useEffect(() => {
        const timeProcess = setTimeout (() => {
            router.push(statusEdit === "Password Success Update" ? '/profile' : '/profile/editPass')
            setLoading(false);
            setStatusEdit("Processing ...")
        }, 1000);
    return () => clearTimeout(timeProcess);
    }, [statusEdit]);
    // get data input base on name
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // use split object
        setFormData(prev => ({...prev, [name]: value }));
    };
    // Process change password when user click save
    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // request update user
        if (formData.oldPassword !== session?.user.password) return setStatusEdit('Your Old Password False')
        const response = await fetch(`https://api.escuelajs.co/api/v1/users/${session?.user.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },    
            body: JSON.stringify({ 
                password: formData.newPassword,
                }),
        });
        // if request update user failed
        if(!response.ok) return setStatusEdit('Password Failed Update');
        // success request update user
        setStatusEdit('Password Success Update');
        // relogin after update user
        await signIn('credentials', {
            redirect: false,
            email: session?.user.email,
            password: formData.newPassword
        });
    };
    return (
        <div className="bg-amber-700 overflow-x-hidden min-h-screen">
            <Navbar />
            <main className={`flex flex-col gap-[2rem] items-center ${!loading && 'mt-[10rem]'} text-black ${loading && 'min-h-screen justify-center mt-[0rem]'} `}>
                {/* form edit password section */}
                {!loading && (
                    <form onSubmit={handlesubmit} className="flex flex-col bg-amber-200 p-[1rem] rounded-[1rem] gap-[0.5rem] w-[80%] xl:w-[50%]">
                        <h1 className="text-center text-[1.2rem] md:text-[1.5rem] xl:text-[2rem] font-bold">Edit Password</h1>
                        <label className="text-[1rem]">Old Password:</label>
                        <input onChange={handleChange} type="password" name="oldPassword" className="bg-amber-100 rounded-[0.5rem] border border-gray-300 p-[0.3rem]" />
                        <label className="text-[1rem]">New Password:</label>
                        <input onChange={handleChange} type="password" name="newPassword" className="bg-amber-100 rounded-[0.5rem] border border-gray-300 p-[0.3rem]" />
                        <div className="flex flex-row justify-end gap-[0.5rem]">
                            <button onClick={() => router.push('/profile')} type="button" className="bg-emerald-500 p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200">Cancel</button>
                            <button type="submit" className="bg-emerald-500 p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200">Save</button>
                        </div>
                    </form>
                )}
                {/* loading section */}
                {loading && (
                    <section className="bg-amber-100 min-w-[15rem] min-h-[4rem] flex justify-center items-center rounded-[1rem]">
                        <h1 className="font-bold">{statusEdit}</h1>
                    </section>
                )}
            </main>
        </div>
    )
}