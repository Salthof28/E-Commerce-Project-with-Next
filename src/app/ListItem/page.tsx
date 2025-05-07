'use client'
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
// import Image from "next/image";

export default function ListItem() {
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
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchDataProducts = async () => {
        try {
            setLoading(true);
            const response: Response = await fetch('https://api.escuelajs.co/api/v1/products')
            // const response: Response = await fetch('https://fakestoreapi.com/products')
            const data: Product[] = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (err: unknown) {
            err instanceof Error ? setError(err.message) : setError('An unknown error occurred');
            console.log(error);
        }
    }
    useEffect (() => {
        fetchDataProducts();
    }, [])
    // console.log(products)
    if (loading) {
        return <h1 className="text-center text-4xl font-bold">Loading....</h1>;
    }
    return (
      <div className="bg-amber-700">
            <Navbar />
            <main className="flex flex-row p-15 px-[12%] pt-[8rem]">
                {/* section category */}
                <section className="p-2 w-[12rem] bg-amber-50 rounded-2xl h-[10rem]">
                    <h1>Category Products</h1>
                    <div className="flex flex-col items-start">
                        <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white">All</button>
                        <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white">Luxurious</button>
                        <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white">Shoes</button>
                    </div>
                </section>
                {/* section card product */}
                <section className="min-h-screen flex flex-row justify-center items-center flex-wrap gap-[2rem] w-full">
                    
                    {products.map ((product) => (
                        <div key={product?.id} className="w-[25rem] bg-amber-50 rounded-2xl relative">
                            <img src={product?.images?.[0] || "/no-img.jpg"} className="rounded-t-2xl w-full h-[20rem] object-cover"/>
                            {/* <Image
                                src={product?.images?.[0]}
                                alt="Product Image"
                                fill
                                className="rounded-t-2xl"
                            /> */}
                            <div className="p-3 flex flex-col justify-between min-h-[16rem]">
                                <div>
                                    <h1 className="text-lg font-bold">{product.title}</h1>
                                    <h3 className="mb-8 text-sm text-gray-400">Category: {product?.category?.name}</h3>
                                    <p className="text-justify">{product?.description?.slice(0,100)}...</p>
                                </div>
                                <div className="text-center">
                                    <p>${product?.price}</p>
                                    <button className="p-2 rounded-md bg-emerald-500 hover:bg-emerald-700 hover:text-white">Product Detail</button>
                                </div>
                            </div>
                        </div>
                    ))}        
                </section>
            </main>
      </div>
    );
  }