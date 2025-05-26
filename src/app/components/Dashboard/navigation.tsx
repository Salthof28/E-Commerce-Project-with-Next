'use client'
import { Session } from 'next-auth'

interface NavigationAdminProps {
    session: Session | null,
}
export default function NavigationAdmin ({ session }: NavigationAdminProps) {
    return (
        <header className="flex flex-row text-[rgb(240,230,226)] bg-[#32190c6b] min-w-screen p-[1rem] px-[2rem] justify-between">
            <img src='/deShoper.png' className="w-[6rem]" />
            <div className="flex flex-row items-center gap-[1rem]">
                <img src={session?.user?.avatar} className="w-[2rem] rounded-[50%]" />
                <p>{session?.user?.name}</p>
            </div>
        </header>
    );
}