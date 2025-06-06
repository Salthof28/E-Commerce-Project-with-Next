'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/Cart-context";
import { useSession } from "next-auth/react";
import { House, ShoppingBag } from "lucide-react";
export default function Navbar () {
    const { data: session, status } = useSession();
    const [show, setShow] = useState<boolean>(true);
    const lastPositionScroll = useRef<number>(0);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const { totalQuantity } = useCart();

    useEffect (() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setShow(currentScroll > lastPositionScroll.current && currentScroll > 50 ? false : true)
            lastPositionScroll.current = currentScroll
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="flex justify-center">
            <header data-testid='navbarTest' className= {`text-center flex flex-col lg:flex-row w-[95vw] justify-between mt-3 bg-black/60 p-5 rounded-3xl fixed z-10 transition-transform duration-600 ease text-amber-50 ${show ? "translate-y-0" : "-translate-y-full"}`}>    
                <div className="w-full flex justify-between items-center lg:w-auto">
                    <img src='/deShoper.png' className="w-[6rem]" alt="Logo" />
                    <button data-testid = "btnHamburger" className="lg:hidden text-amber-50 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>                
                <nav data-testid = 'hamburgerNav' className={`lg:flex flex-col lg:flex-row max-lg:mb-[1rem] gap-[1rem] lg:gap-[4rem] ${menuOpen ? "flex" : "hidden"} items-center`}>
                    <Link href="/" className="flex flex-col justify-center items-center gap-[0.1rem] text-[0.8rem] 2xl:text-[1rem]"><House className="w-[2rem] h-[2rem] 2xl:w-[2.5rem] 2xl:h-[2.5rem]" /> Home</Link>
                    <Link href="/login" className="flex flex-col justify-center items-center gap-[0.1rem] text-[0.8rem] 2xl:text-[1rem]"><img src={status === 'authenticated' ? session?.user?.avatar : '/no-img-profile.png'} className="rounded-[50%] w-[2rem] h-[2rem] 2xl:w-[2.5rem] 2xl:h-[2.5rem]" alt="Profile Picture"/> {session?.user?.name || 'Guest'}</Link>
                    <Link href="/ListItem?category=All" className="flex flex-col justify-center items-center gap-[0.1rem] text-[0.8rem] 2xl:text-[1rem]"><ShoppingBag className="w-[2rem] h-[2rem] 2xl:w-[2.5rem] 2xl:h-[2.5rem]" /> Shop</Link>
                </nav>
                <nav className={`lg:flex items-center justify-center ${menuOpen ? "flex" : "hidden"}`}>
                    <Link href="/CheckOut" className="relative">
                        <ShoppingCart className="w-[2rem] h-[2rem] 2xl:w-[2.5rem] 2xl:h-[2.5rem]" />
                        {totalQuantity() > 0 && (
                            <span className={`flex items-center justify-center absolute text-[0.8rem] -top-[0.5rem] left-[0.8rem] bg-red-700 rounded-[100%] w-[1.2rem] h-[1.2rem] animate-bounce p-[0.7rem]`}>{totalQuantity() > 9 ? '9+' : totalQuantity()}</span>
                        )}
                    </Link>
                </nav>
            </header>
        </div>
    );
}