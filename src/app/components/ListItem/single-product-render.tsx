'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Product } from "@/app/services/api";
interface SingleProductRenderProps {
    product: Product;
    images: string[];
}
export default function SingleProductRender ( { product, images }: SingleProductRenderProps ) {
    // const [images, setImages] = useState<string[]>([]);
    const [currentImages, setCurrentImages] = useState<number>(0);
    const slideRight = () => {
        setCurrentImages(prev => (prev + 1) % images.length);
    }
    const slideLeft = () => {
        setCurrentImages(prev => (prev - 1 + images.length) % images.length);
    }

    return (
        <div className="bg-amber-700 min-h-screen">
            <main className="px-[2rem] md:px-[4rem] pt-[8rem] flex flex-col lg:flex-row gap-[2rem] justify-center max-lg:items-center">
                <section className="relative w-[16rem] md:w-[35rem] aspect-[4/3] lg:w-[30rem] bg-amber-100 flex items-center justify-between rounded-2xl p-4">
                    <button onClick={slideLeft} className="z-10 bg-yellow-300 h-6 rounded-[50%] shadow-lg hover:shadow-[0_0_4px_4px_rgba(240,183,140,0.6)] active:scale-80 duration-200"><ChevronLeft className="text-amber-700" /></button>
                    <img className="absolute rounded-2xl w-full h-full inset-0 object-cover" src={product?.images?.[currentImages]}></img>
                    <button onClick={slideRight} className="z-10 bg-yellow-300 h-6 rounded-[50%] shadow-lg hover:shadow-[0_0_4px_4px_rgba(240,183,140,0.6)] active:scale-80 duration-200"><ChevronRight className="text-amber-700" /></button>
                </section>
                <section className="bg-amber-100 w-[16rem] md:w-[35rem] lg:w-[60rem] rounded-2xl p-[0.8rem] md:p-[1.5rem] xl:p-[3rem] text-center flex flex-col justify-between">
                    <div className="mb-[1rem] lg:mb-[2rem]">
                        <h1 className="text-md md:text-2xl xl:text-3xl">{product?.title}</h1>
                        <h3 className="mb-5 text-xs md:text-sm xl:text-xl">Category: {product?.category?.name}</h3>
                        <p className="text-justify text-xs md:text-sm xl:text-xl">{product?.description}</p>
                    </div>
                    <div>
                        <p className="text-xs md:text-sm xl:text-xl">${product?.price}</p>
                        <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-xl">Add Cart</button>
                    </div>
                </section>
            </main>
        </div>
    );
}