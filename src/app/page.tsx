import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar";


export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <main className="pt-[8rem]">
        <h1>halo</h1>
        <Link className="border p-2 m-2" href={'/ListItem'}>List Item</Link>
      </main>
    </div>
  );
}
