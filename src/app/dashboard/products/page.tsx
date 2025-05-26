'use client'
import useAuthAdmin from "@/app/hooks/useAuthAdmin";
import NavigationAdmin from "@/app/components/Dashboard/navigation";
import AdminPanel from "@/app/components/Dashboard/adminPanel";

export default function usersPage () {
    const { session } = useAuthAdmin();

    return (
        <div className="bg-[rgb(8,5,3)] min-h-screen overflow-x-hidden">
            <NavigationAdmin session={session} />
            
            <main className="flex flex-row text-[rgb(240,230,226)]">
                {/* for panel */}
                <section className="w-[15%]">
                    <AdminPanel session={session} />
                </section>
                {/* for content */}
                <section className="w-[85%] p-[2rem]">
                    <h1>PAGE Products</h1>
                    <h1>{session?.user?.name}</h1>
                    <h1>{session?.user?.email}</h1>
                </section>
            </main>
        </div>
    )
}