'use client'
import NavigationAdmin from "../components/Dashboard/navigation";
import AdminPanel from "../components/Dashboard/adminPanel";
import useAuthAdmin from "../hooks/useAuthAdmin";

export default function dashboard () {
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
                    <h1>PAGE DASHBOARD</h1>
                    <h1>{session?.user?.name}</h1>
                    <h1>{session?.user?.email}</h1>
                </section>
            </main>
        </div>
    )
}