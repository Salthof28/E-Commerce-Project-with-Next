'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export default function Navbar () {

    const [show, setShow] = useState<boolean>(true);
    const lastPositionScroll = useRef<number>(0);

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
            <header className= {`flex flex-row w-[95vw] justify-between mt-3 bg-black/60 p-5 rounded-3xl fixed z-10 transition-transform duration-600 ease text-amber-50 ${show ? "translate-y-0" : "-translate-y-full"}`}>    
                <h1>deShoper</h1>
                <nav className="flex gap-5">
                    <Link href="/">Home</Link>
                    <Link href="/ListItem">Item List</Link>
                </nav>
                <nav>
                    <Link href="/CheckOut">Cart</Link>
                </nav>
            </header>
        </div>
    );
}