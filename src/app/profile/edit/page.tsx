'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import Navbar from "@/app/components/navbar";
import React, { useState, useEffect } from "react";


export default function editProfile () {
        const { data: session } = useSession();
        const [statusEdit, setStatusEdit] = useState<string>("Processing ....");
        const [loading, setLoading] = useState<boolean>(false);
        const [formData, setFormData] = useState({
            name: session?.user.name || "",
            email: session?.user.email,
            avatar: session?.user.avatar
        })
        const router = useRouter();
        // if page refresh, input still content data profile
        useEffect(() => {
            if (session?.user) {
                setFormData({
                name: session.user.name || "",
                email: session.user.email || "",
                avatar: session.user.avatar || ""
            });
        }
        }, [session]);
        // delay process edit data
        useEffect(() => {
            const timeProcess = setTimeout (() => {
                router.push(statusEdit === "Data User Success Update" ? '/profile' : '/profile/edit')
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
        const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);
            // console.log(formData);
            // console.log(session?.user?.id);
            // console.log(session?.accessToken)
            const response = await fetch(`https://api.escuelajs.co/api/v1/users/${session?.user.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },     
                body: JSON.stringify({ 
                    name: formData.name,
                    email: formData.email,
                    avatar: formData.avatar,
                 }),
            });
            const result = await response.json();
            console.log(result.password);
            console.log(response.status)
            if(!response.ok) return setStatusEdit('Data User Failed Update');
            setStatusEdit('Data User Success Update');
            await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: session?.user.password
            });
        };

    return (
        <div className="bg-amber-700 overflow-x-hidden min-h-screen">
            <Navbar />
            <main className={`flex flex-col gap-[2rem] items-center ${!loading && 'mt-[10rem]'} text-black ${loading && 'min-h-screen justify-center mt-[0rem]'} `}>
                {!loading && (
                    <form onSubmit={handlesubmit} className="flex flex-col bg-amber-200 p-[1rem] rounded-[1rem] gap-[0.5rem] w-[50%]">
                        <h1 className="text-center text-[2rem] font-bold">Edit Profile</h1>
                        <label>Name:</label>
                        <input onChange={handleChange} type="text" name="name" className="bg-amber-100 rounded-[0.5rem] border border-gray-300 p-[0.3rem]" value={formData.name} />
                        <label>Email:</label>
                        <input onChange={handleChange} type="email" name="email" className="bg-amber-100 rounded-[0.5rem] border border-gray-300 p-[0.3rem]" value={formData.email} />
                        <label>Image url:</label>
                        <input onChange={handleChange} type="text" name="avatar" className="bg-amber-100 rounded-[0.5rem] border border-gray-300 p-[0.3rem]" value={formData.avatar} />
                        <div className="flex flex-row items-center gap-[0.5rem]">
                            <img className="border w-[4rem] h-[4rem] rounded-[50%]" src={session?.user.avatar}></img>
                            <span>Preview</span>
                        </div>
                        <div className="flex flex-row justify-end gap-[0.5rem]">
                            <button onClick={() => router.push('/profile')} type="button" className="bg-emerald-500 p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200">Cancel</button>
                            <button type="submit" className="bg-emerald-500 p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200">Save</button>
                        </div>
                    </form>
                )}
                {loading && (
                    <section className="bg-amber-100 min-w-[15rem] min-h-[4rem] flex justify-center items-center rounded-[1rem]">
                        <h1>{statusEdit}</h1>
                    </section>
                )}
            </main>
        </div>
    )
}