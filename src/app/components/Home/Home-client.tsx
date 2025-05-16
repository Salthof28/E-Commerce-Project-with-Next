'use client'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { NextRouter, useRouter } from "next/router";
import CategoryHome from "./Category-home";
import Navbar from "../navbar";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Category } from "@/app/services/api";
interface HomeClient {
  category: Category[]
}
export default function HomeClient({ category }: HomeClient) {

  const router: AppRouterInstance = useRouter();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  // const [categoryProducts, setCategoryProducts] = useState<Category[]>([]);
  // const [error, setError] = useState<string>('');
  const categoryProducts: Category[] = category
  const [currentImage, setCurrentImage] = useState<number>(0)
  // const [imageHome, setImageHome] = useState<string[]>([]);
  const imageHome: string[] = categoryProducts.map(cat => cat.image);

  const handleRouter = (category: string): void => {
    // console.log(category);
    router.push(`/ListItem?category=${category}`)
  }
  
  const handleSlider = (direction: string): void => {
    console.log(direction);
    const containerSlider = sliderRef.current;
    if(!containerSlider) return;
    const distanceScroll = 300;
    containerSlider.scrollBy(direction === "left" ? {left: -distanceScroll, behavior: "smooth"} : {left: distanceScroll, behavior: "smooth"});
  }

  useEffect (() => {
    const intervalImageHome = setInterval (() => {
       setCurrentImage((prev) => (prev + 1) % imageHome.length);
    }, 3000)
    return () => {
      clearInterval(intervalImageHome);
     }  
  }, [imageHome])
  // console.log(imageHome);

  return (
    <div className="text-center min-h-screen">
      <Navbar/>
      <main className="flex items-center flex-col">
        {/* section Home  */}
        <section className="flex flex-col w-screen h-screen bg-cover bg-center justify-center items-start px-[2rem] md:px-[8rem] lg:px-[15rem] xl:px-[25rem] 2xl:px-[35rem]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 80%, rgb(184,74,0)), url(${imageHome[currentImage]})`,
        }} >
          <h1 className="text-amber-50 pb-2 2xl:pb-10 text-md md:text-2xl xl:text-4xl 2xl:text-6xl"><span className="text-[2rem] md:text-[4rem] xl:text-[6rem] 2xl:text-[10rem]">Hurry Up</span> The Best Price</h1>
          <h2 className="text-amber-50 pb-4 2xl:pb-10 text-sm md:text-xl xl:text-2xl 2xl:text-4xl">Waiting For You</h2>
          <button onClick={() => handleRouter('All')} className="bg-yellow-300 rounded-2xl shadow-lg hover:bg-yellow-500 hover:text-amber-50 active:scale-80 duration-200 text-md md:text-2xl xl:text-4xl p-3 flex flex-row items-center"><ArrowRight className="w-6 h-6 md:w-8 md:h-8 xl:w-12 xl:h-12" strokeWidth={4} /> Shop Now</button>
        </section>

        {/* Section card slider category */}
        <section className="flex flex-col w-[100vw] pt-[16rem] md:pt-[25rem] bg-amber-700">
          <h1 className="font-bold text-3xl md:text-6xl lg:text-8xl text-amber-50">Category</h1>
          <div className="flex items-center gap-2 justify-center m-4 md:m-14">
            <button onClick={() => handleSlider('left')} className="bg-yellow-300 h-6 rounded-[50%] shadow-lg hover:shadow-[0_0_4px_4px_rgba(240,183,140,0.6)] active:scale-80 duration-200"><ChevronLeft className="text-amber-700" /></button>
            <div ref={sliderRef} className="flex flex-row flex-nowrap gap-8 overflow-x-auto items-center overscroll-y-contain scrollbar-hide w-[90vw] md:w-[80vw]">
              {/* to component/Home/Category-home.tsx */}
              {categoryProducts.map((categoryProd) => 
                <CategoryHome key={categoryProd.id} gethandleRouter={handleRouter} categoryProd={categoryProd} />
              )}
            </div> 
            <button onClick={() => handleSlider('right')} className="bg-yellow-300 h-6 rounded-[50%] shadow-lg hover:shadow-[0_0_4px_4px_rgba(240,183,140,0.6)] active:scale-80 duration-200"><ChevronRight className="text-amber-700" /></button>
          </div>
        </section>
      </main>
    </div>
  );
}