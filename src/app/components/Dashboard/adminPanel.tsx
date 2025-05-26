import { House, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from 'next-auth';

interface ListDashboard {
    name: string,
    href: string,
    icon: React.ReactNode
}
interface AdminPanelProps {
    session: Session | null,
}
export default function AdminPanel ({ session }: AdminPanelProps) {
    const listDash: ListDashboard[] = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: (<House />)
        },
        {
            name: 'Products',
            href: '/dashboard/products',
            icon: (<ShoppingBag />)
        },
        {
            name: 'Users',
            href: '/dashboard/users',
            icon: (<Users />)
        },
    ] 
    return (
        <header className="text-[rgb(240,230,226)] bg-[#32190c6b] p-[1rem] h-screen">
            <h1 className="text-[1.5rem] font-bold">Admin Panel</h1>
            <div className="flex flex-col p-[1rem] gap-[2rem] border-b-[0.1rem] border-gray-500/40 mb-[1rem]">
                {listDash.map((list) => (
                    <Link href={list.href} className="flex flex-row items-center gap-[0.5rem]">
                        {list.icon}
                        <p>{list.name}</p>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col items-center">
                <div>
                    <div><p>{session?.user?.name}</p></div>
                    <p>{}</p>
                </div>
                <button onClick={() => signOut({callbackUrl: "/login"})} className="bg-emerald-500 p-[0.5rem] rounded-[0.4rem]">Sign Out</button>
            </div>
        </header>
    );
}