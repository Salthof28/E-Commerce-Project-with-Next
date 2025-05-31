'use client'
import useAuthAdmin from "@/hooks/useAuthAdmin";
import NavigationAdmin from "@/components/Dashboard/navigation";
import AdminPanel from "@/components/Dashboard/adminPanel";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { CountLengDataUsers, fetchUsers } from "@/services/api";
import { Users, FormDataUsers } from "@/types/interfaces";
import { useEffect, useState } from "react";
import HeaderTable from "@/components/Dashboard/HeaderTable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UsersForm from "@/components/Dashboard/UsersForm";


export default function UsersHandlePage () {
    const { session } = useAuthAdmin();
    const [users, setUsers] = useState<Users[]>([]);
    // const [category, setCategory] = useState<Category[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [statusSubmit, setStatusSubmit] = useState<string>("Loading....");
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("")
    const [currentUser, setCurrentUser] = useState<Users | undefined>(undefined);
    const [error, setError] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const headerTable: string[] = ['User', 'Email', 'Role', 'Action'];
    const [allUsers, setAllUsers] = useState<Users[]>([]);
     // variabel paganation page
    const [currentPage, setCurrentPage] = useState<number>(1);
    const usersPerPage: number = 10;
    const [totalPage, setTotalPage] = useState<number>(0);
    
    
    const fetchDataUsers = async () => {
        try{
            setLoading(true);
            const data: Users[] = await fetchUsers();
            const totalUsers: number = await CountLengDataUsers(search);
            setTotalPage(Math.ceil(totalUsers/usersPerPage));
            setAllUsers(data);
            setLoading(statusSubmit === "Loading...." ? false : true)

        }
        catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            console.log(`Error: ${error}`)
        }
    }
    useEffect (() => {
        fetchDataUsers();
    }, []);
    useEffect (() => {
        handlePageChange(currentPage);
    }, [currentPage, allUsers]);
    useEffect(() => {
        const timeProcess = setTimeout (() => {
            setLoading(false)
            setStatusSubmit("Loading....");
        }, 1200);
        return () => clearTimeout(timeProcess);
    }, [statusSubmit])
    // process search
    const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setCurrentPage(1);
        handlePageChange(currentPage);
        // fetchDataUsers();
    }
    // console.log(currentProduct);
    const calculateVisiblePages = () => {
        // number page you want to show
        const pageWantDisplay: number = 5;
        const halfpageWantDisplay = Math.floor(pageWantDisplay / 2);
        const start = Math.max(1, currentPage - halfpageWantDisplay);
        const end = Math.min(totalPage, start + pageWantDisplay - 1);
        const adjustedStart = Math.max(1, end - pageWantDisplay + 1);
        return Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i);
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const start = (currentPage - 1) * usersPerPage;
        const end = start + usersPerPage;
        if(search){
            const filterUsers: Users[] = allUsers.filter(users => users.name.toLowerCase().includes(search.toLowerCase()));
            setTotalPage(Math.ceil(filterUsers.length/usersPerPage));
            setUsers(filterUsers.slice(start, end))
        }
        else {
            setTotalPage(Math.ceil(allUsers.length/usersPerPage));
            setUsers(allUsers.slice(start, end));   
        } 
    };
    const handlePageNavigation = (isNext: boolean) => {
        if(!isNext){
            handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage);
        }
        else {
            handlePageChange(currentPage > 1 ? currentPage + 1 : currentPage);
        }
        
    }
    const showFormProduct = (user?: Users): void => {
        if (user) {
            setCurrentUser(user);
            setIsEdit (true);
        }
        else{
            setCurrentUser(undefined);
            setIsEdit (false);
        }
        setShowForm(true);
    }   
    const handleDelete = async (idUser: number): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.escuelajs.co/api/v1/users/${idUser}`, {
                method: 'DELETE'
            });
            if(!response.ok) throw new Error (`Delete failed with status: ${response.status}`);
            fetchDataUsers();
        }
        catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An Unknown Error Occured');
            console.log(`Error: ${error}`);
        }
    }
    const handleSubmit = async (data: FormDataUsers) => {
        setShowForm(false);
        setLoading(true);
        try {
        // for Update Product
        const dataAll: Users[] = await fetchUsers();
        const isEmailAvailabe = dataAll.some(user => user.email === data.email);
        if(isEmailAvailabe && currentUser?.email !== data.email){
            setStatusSubmit('Email Already Registered');
            return fetchDataUsers();
        }
        else {
            if(currentUser){  
                const response = await fetch(`https://api.escuelajs.co/api/v1/users/${currentUser.id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify(data),
                })
                if(!response.ok) throw new Error (`Update failed with status: ${response.status}`);
                setStatusSubmit('User Updated');
            }
            // for create product
            else{
                console.log(data);
                const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(data)
                });
                if(!response.ok) throw new Error (`Create failde with status: ${response.status}`);
                setStatusSubmit('User Created');
            }
            return fetchDataUsers();
        } 

        }
        catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An Unknown Error Occured');
            throw new Error(error);
        }     
    }

    return (
        <div className="bg-[rgb(8,5,3)] min-h-screen overflow-x-hidden">
            <NavigationAdmin session={session} />
            <main className="flex flex-row text-[rgb(240,230,226)] min-h-screen">
                {/* for panel */}
                <section className="lg:w-[15%]">
                    <AdminPanel session={session} />
                </section>
                {/* for content */}
                <section className="flex flex-col w-[100%] lg:w-[85%] p-[2rem] text-[rgb(240,230,226)] items-center px-[0.5rem] md:px-[2rem] xl:px-[4rem] 2xl:px-[20rem] gap-[1rem]">
                    {/* title and btn add product section */}
                    <section className="flex flex-row justify-between w-full">
                        <h1 className="text-[1rem] md:text-[1.5rem] xl:text-[2rem] font-bold">Page Handle Users</h1>
                        <button onClick={() => showFormProduct()} className="flex flex-row gap-[0.2rem] items-center text-[0.8rem] xl:text-[1rem] bg-emerald-500 p-[0.2rem] md:p-[0.4rem] rounded-[0.5rem]"><Plus className="w-[1rem] h-[1rem] xl:w-[1.2rem] xl:h-[1.2rem]" />Add User</button>
                    </section>
                    {/* form search */}
                    <form onSubmit={handleSearch} className="flex flex-row gap-[1rem] min-w-full items-center">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" name="search" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem] text-[0.9rem] w-[100%]"/>
                        <button type="submit" className="bg-emerald-500 p-[0.4rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200 max-md:w-[6rem] text-[0.6rem] md:text-[0.8rem]">Search</button>
                    </form>
                    {/* tabel section */}
                    {(!showForm && !loading) && (
                    <section className="overflow-hidden rounded-[0.4rem] border border-gray-500/40 w-full">    
                        <table className="min-w-full">
                            <HeaderTable headers={headerTable} />
                            <tbody className="bg-[#32190c6b] border-t border-gray-500/40">
                            {users.map((user, index) => (
                                <tr key={index} className="border-t border-gray-500/40">
                                    <td className="flex flex-row items-center gap-[1rem] px-[0.3rem] md:px-[0.8rem] xl:px-[2rem] py-[0.5rem] text-left">
                                        <img src={user?.avatar} className="max-md:hidden w-[2rem] h-[2rem] xl:w-[2.8rem] xl:h-[2.8rem] rounded-[50%] object-cover border border-gray-500/40" />
                                        <p className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] font-bold">{user?.name}</p>
                                    </td>
                                    <td className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] px-[0.3rem] md:px-[0.8rem] xl:px-[2rem] py-[0.5rem] text-left font-bold">{user?.email}</td>
                                    <td className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] px-[0.3rem] md:px-[0.8rem] xl:px-[2rem] py-[0.5rem] text-left font-bold">{user?.role}</td>
                                    <td className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] items-center px-[0.3rem] md:px-[0.8rem] xl:px-[2rem] py-[0.5rem] text-left">
                                        <div className="flex flex-row gap-[1rem]">
                                            <button onClick={() => showFormProduct(user)} className="flex flex-row items-center gap-[0.1rem] md:gap-[0.4rem] text-blue-500 font-bold"><SquarePen className="w-[0.6rem] h-[0.6rem] md:w-[1.2rem] md:h-[1.2rem]" />Edit</button>
                                            <button onClick={() => handleDelete(user.id)} className="flex flex-row gap-[0.1rem] md:gap-[0.4rem] text-red-600 font-bold"><Trash2 className="w-[0.6rem] h-[0.6rem] md:w-[1.2rem] md:h-[1.2rem]" />Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/* web page */}
                        <div className="flex flex-row p-[1rem] justify-end max-lg:h-[4rem]">
                                <button disabled={currentPage === 1} onClick={() => handlePageNavigation(false)} className="border flex items-center justify-center p-[0.4rem] w-[1.5rem] rounded-l-[0.5rem]"><ChevronLeft /></button>
                                {calculateVisiblePages().map((pageNum) => (
                                    <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`border flex items-center justify-center p-[0.4rem] text-[0.6rem] lg:text-[1rem] w-[1.4rem] lg:w-[2rem] ${currentPage === pageNum ? 'bg-blue-500 text-white font-bold' : ''}`}>{pageNum}</button>
                                ))}
                                <button disabled={currentPage === totalPage} onClick={() => handlePageNavigation(true)} className="border flex items-center justify-center p-[0.4rem] w-[1.5rem] rounded-r-[0.5rem]"><ChevronRight /></button>
                        </div>
                    </section>
                    )}
                    {/* loading section */}
                    {loading && (
                    <section className="flex justify-center items-center w-full h-full">
                        <h1 className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold text-amber-50">{statusSubmit}</h1>
                    </section>
                    )}
                    {/* show form products */}
                    {showForm && (
                    <UsersForm user={isEdit ? currentUser : undefined} onCancel={() => setShowForm(false)} titleForm={isEdit ? 'Edit User' : 'Create User'} onSubmit={handleSubmit} isEdit={isEdit} />
                    // <h1>lol</h1>
                    )}
                    
                    {/* <section className="bg-[#32190c6b] min-w-[15rem] min-h-[4rem] flex justify-center items-center rounded-[1rem]">
                        <h1>{statusSubmit}</h1>
                        <h1>asdas</h1>
                    </section> */}
                </section>
            </main>
        </div>
    )
}