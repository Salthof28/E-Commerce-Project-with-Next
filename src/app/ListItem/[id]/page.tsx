'use client'
import Navbar from "@/app/components/navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SingleProduct () {
    type Category = {
        id: number;
        name: string;
        image: string;
    }
    type Product = {
        id: number;
        title: string;
        price: number;
        description: string;
        images: string[];
        category: Category;
    }

    const router = useParams<{id: string}>();
    const id: string = router.id;
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);
    const [currentImages, setCurrentImages] = useState<number>(0);

    const fetchDataProducts = async (): Promise<void> => {
        try {
            const response: Response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            const data: Product = await response.json();
            setProduct(data);
            setImages(data.images);
        } catch (err: unknown) {
            err instanceof Error ? setError(err.message) : setError('An unknown error occurred');
            console.log(error);
        }
    }
    useEffect (() => {
        fetchDataProducts();
    }, [])

    const slideRight = () => {
        setCurrentImages(prev => (prev + 1) % images.length);
    }
    const slideLeft = () => {
        setCurrentImages(prev => (prev - 1 + images.length) % images.length);
    }
    console.log(currentImages);
    // console.log (product);
    return (
        <div className="bg-amber-700 min-h-screen">
            <Navbar />
            <main className="p-[6rem] pt-[8rem] flex flex-row gap-[2rem] justify-center">
                <section className="relative w-[30rem] bg-amber-100 flex items-center justify-between rounded-2xl p-4">
                    <button onClick={slideLeft} className="z-10 bg-yellow-300 h-6 rounded-[50%] shadow-lg hover:shadow-[0_0_4px_4px_rgba(240,183,140,0.6)] active:scale-80 duration-200"><ChevronLeft className="text-amber-700" /></button>
                    <img className="absolute rounded-2xl w-full h-full inset-0 object-cover" src={images?.[currentImages]}></img>
                    <button onClick={slideRight} className="z-10 bg-yellow-300 h-6 rounded-[50%] shadow-lg hover:shadow-[0_0_4px_4px_rgba(240,183,140,0.6)] active:scale-80 duration-200"><ChevronRight className="text-amber-700" /></button>
                </section>
                <section className="bg-amber-100 w-[60rem] rounded-2xl p-[4rem] text-center flex flex-col justify-between">
                    <div className="mb-[2rem]">
                        <h1 className="text-3xl">{product?.title}</h1>
                        <h3 className="mb-5 text-xl">Category: {product?.category?.name}</h3>
                        <p className="text-justify text-xl">{product?.description}</p>
                    </div>
                    <div>
                        <p className="text-xl">${product?.price}</p>
                        <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-xl">Add Cart</button>
                    </div>
                </section>
            </main>
        </div>
    );
}