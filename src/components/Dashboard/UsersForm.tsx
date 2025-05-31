import { Users, FormDataUsers } from "@/types/interfaces";
import { useEffect, useState } from "react";

interface UsersFormProps {
    user: Users | undefined,
    onSubmit: (data: FormDataUsers) => void,
    onCancel: () => void,
    isEdit: boolean,
    titleForm: string,
}
export default function UsersForm ({ user, onCancel, titleForm, onSubmit, isEdit}: UsersFormProps) {
    // const [newImage, setNewImage] = useState<string>("");
    const [formData, setFormData] = useState<FormDataUsers>({
        name: user?.name || "",
        email: user?.email || "",
        avatar: user?.avatar || "",
        role: user?.role || "0",
        ...( !isEdit ? { password: "" } : {} )
    })
    const roles = ['customer', 'admin']
    useEffect(() => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            avatar: user?.avatar || "",
            role: user?.role || "0",
            ...( !isEdit ? { password: "" } : {} )
        });
    }, [user]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // use split object
        setFormData(prev => ({...prev, [name]: value }));
    }; 
    return(
        <form onSubmit={(e) => {e.preventDefault(); onSubmit(formData);}} className="flex flex-col bg-[#32190c6e] p-[1rem] rounded-[1rem] gap-[0.5rem] 2xl:w-[100%]">
            <h1 className="text-center text-[1.2rem] md:text-[1.5rem] xl:text-[2rem] font-bold">{titleForm}</h1>
                {/* Main section Images */}
            <section className="flex flex-col items-center gap-[1rem] p-[1rem] justify-center border border-gray-300/20 rounded-[1rem]">
                {/* section add image */}
                <section className="flex flex-col items-center gap-[0.5rem]">
                    <img className="border w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] rounded-[50%]" src={formData.avatar}></img>
                    <label>Add New Image url:</label>
                    <input value={formData.avatar} onChange={handleChange} type="text" name="avatar" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem]"/>
                </section>
            </section>
            <label>Name:</label>
            <input value={formData.name} onChange={handleChange} type="text" name="name" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem]"/>
            <label>Email:</label>
            <input value={formData.email} onChange={handleChange} type="text" name="email" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem]"/>
            {!isEdit && (
            <div className="flex flex-col">
                <label>Password:</label>
                <input value={formData.password} onChange={handleChange} type="password" name="password" placeholder="Passsword" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem]"/>
            </div>
            )}
            <label>Role:</label>
            <select value={formData?.role} onChange={handleChange} name="role" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem]" >
                <option value="0">Select Role</option>
                {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                ))}
            </select>
            {/* button save and cancel */}
            <div className="flex flex-row justify-end gap-[0.5rem]">
                <button onClick={onCancel} type="button" className="bg-emerald-500  p-[0.5rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200">Cancel</button>
                <button disabled={formData.role === "0"} type="submit" className={`${(formData.role === "0" || formData.avatar.trim() === "" || formData.name.trim() === "" || formData.email.trim() === "") ? 'bg-gray-500 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-700 hover:text-white active:scale-95 duration-200'} p-[0.5rem] rounded-[0.4rem] `}>Save</button>
            </div>
            {/* <button onClick={onCancel} className="bg-emerald-500 p-[0.2rem] rounded-[0.4rem]">cancel</button> */}
        </form>
    );
}