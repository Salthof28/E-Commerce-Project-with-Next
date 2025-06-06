import UsersHandleCliens from "./UsersHandleClient";
import { fetchUsers, CountLengDataUsers } from "@/services/api";

export const revalidate = 60;
export default async function UsersHandle () {
    const currentPage: number = 1;
    const searchTerm: string = ""
    const usersPerPage: number = 10;

    try{
        const [dataUsers, totalUsers] = await Promise.all([
            fetchUsers(),
            CountLengDataUsers(searchTerm),
        ]);
        const totalPage = Math.ceil(totalUsers/usersPerPage);
        const initialData = {
            currentPage,
            searchTerm,
            usersPerPage,
            dataUsers,
            totalPage
        };
        return <UsersHandleCliens initialData={initialData} />
    }
    catch (error) {
        console.error(`Error fetching Products: ${error}`);
        return (
        <div className="bg-[rgb(8,5,3)] min-h-screen flex items-center justify-center">
            <div className="text-red-500 text-center">
                <h2 className="text-xl font-bold mb-2">Error Loading Products</h2>
                <p>Please try again later</p>
            </div>
        </div>
        );
    }
}