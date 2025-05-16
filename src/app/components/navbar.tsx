'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export default function Navbar () {

    const [show, setShow] = useState<boolean>(true);
    const lastPositionScroll = useRef<number>(0);

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
            <header className= {`flex flex-col lg:flex-row w-[95vw] justify-between mt-3 bg-black/60 p-5 rounded-3xl fixed z-10 transition-transform duration-600 ease text-amber-50 ${show ? "translate-y-0" : "-translate-y-full"}`}>    
                {/* <h1>deShoper</h1> */}
                <div className="w-full flex justify-between items-center lg:w-auto">
                    <h1>deShoper</h1>
                    <button className="lg:hidden text-amber-50 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>                
                <nav className={`lg:flex flex-col lg:flex-row max-lg:mb-[1rem] gap-[1rem] lg:gap-[2rem] ${menuOpen ? "flex" : "hidden"}`}>
                    <Link href="/">Home</Link>
                    <Link href="/ListItem">Item List</Link>
                </nav>
                <nav className={`lg:block ${menuOpen ? "block" : "hidden"}`}>
                    <Link href="/CheckOut">Cart</Link>
                </nav>
            </header>
        </div>
    );
}

// 'use client';
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// export default function Navbar() {
//   const [show, setShow] = useState<boolean>(true);
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);
//   const lastPositionScroll = useRef<number>(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScroll = window.scrollY;
//       setShow(currentScroll > lastPositionScroll.current && currentScroll > 50 ? false : true);
//       lastPositionScroll.current = currentScroll;
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="flex justify-center">
//       <header className={`flex flex-col md:flex-row w-[95vw] justify-between items-center mt-3 bg-black/60 p-5 rounded-3xl fixed z-10 transition-transform duration-600 ease text-amber-50 ${show ? "translate-y-0" : "-translate-y-full"}`}>
        
//         {/* Logo & Hamburger */}
        // <div className="w-full flex justify-between items-center md:w-auto">
        //   <h1 className="text-xl font-bold">deShoper</h1>
        //   <button
        //     className="md:hidden text-amber-50 focus:outline-none"
        //     onClick={() => setMenuOpen(!menuOpen)}
        //   >
        //     <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
        //       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //       <path strokeLinecap="round" strokeLinejoin="round"
        //         d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        //     </svg>
        //   </button>
        // </div>

//         {/* Navigation */}
//         <div className={`flex-col md:flex md:flex-row md:gap-5 w-full md:w-auto mt-4 md:mt-0 ${menuOpen ? "flex" : "hidden"} md:items-center`}>
//           <nav className="flex flex-col md:flex-row gap-4 md:gap-5 text-center">
//             <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
//             <Link href="/ListItem" onClick={() => setMenuOpen(false)}>Item List</Link>
//             <Link href="/CheckOut" onClick={() => setMenuOpen(false)}>Cart</Link>
//           </nav>
//         </div>

//       </header>
//     </div>
//   );
// }