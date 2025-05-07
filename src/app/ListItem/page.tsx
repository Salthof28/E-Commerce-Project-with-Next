'use client'
import { useState, useEffect, ChangeEvent } from "react";
import Navbar from "../components/navbar";
// import { getStaticProps } from "next/dist/build/templates/pages";

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
    const [search, setSearch] = useState<string>('');

    const [allproducts, setAllproducts] = useState<Product[]>([])

    const fetchDataProducts = async () => {
        try {
            setLoading(true);
            const response: Response = await fetch('https://api.escuelajs.co/api/v1/products')
            // const response: Response = await fetch('https://fakestoreapi.com/products')
            const data: Product[] = await response.json();
            setProducts(data); // for current data products
            setAllproducts(data); // for collect all product data
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
    const getInputSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const handleSearch = () => {
        const filterProducts: Product[] = allproducts.filter(item => item.title.includes(search));
        search == "" ? setProducts(allproducts) :  setProducts(filterProducts);
    }
    const handleCategory = (category: string) => {
        // console.log(category);
        const categoryProducts: Product[] = allproducts.filter(item => item.category.name.includes(category));
        category == "All" ? setProducts(allproducts) : setProducts(categoryProducts);
        // setProducts(categoryProducts);
    }

    if (loading) {
        return <div className="flex min-h-screen justify-center items-center"><h1 className="text-center text-4xl font-bold">Loading....</h1></div>;
    }
    return (
      <div className="bg-amber-700 text-center">
            <Navbar />
            <input className="mt-[8rem] text-center bg-white/60 rounded-md hover:bg-amber-200 p-1" placeholder="Search" onChange={getInputSearch}></input> <button className="ml-2 bg-yellow-300 p-1 rounded-md hover:bg-yellow-500 hover:text-amber-50 transition-opacity active:scale-90 duration-200" onClick={handleSearch}>Search</button>
            <main className="flex flex-row p-15 px-[12%]">
                {/* section category */}
                <section className="p-2 w-[12rem] bg-amber-50 rounded-2xl h-[10rem]">
                    <h1>Category Products</h1>
                    <div className="flex flex-col items-start">
                        <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("All")}>All</button>
                        <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("Electronics")}>Electronics</button>
                        <button className="p-1 text-gray-700 hover:bg-gray-100 focus:bg-emerald-500 focus:text-white" onClick={() => handleCategory("Clothes")}>Clothes</button>
                    </div>
                </section>
                {/* section card product */}
                <section className="min-h-screen flex flex-row justify-center items-center flex-wrap gap-[2rem] w-full">
                    {products.map ((product) => (
                        <div key={product?.id} className="w-[25rem] bg-amber-50 rounded-2xl relative">
                            <img src={product?.images?.[0] || "/no-img.jpg"} className="rounded-t-2xl w-full h-[20rem] object-cover"/>
                            <div className="p-3 flex flex-col justify-between min-h-[16rem] text-justify">
                                <div>
                                    <h1 className="text-lg font-bold">{product.title}</h1>
                                    <h3 className="mb-8 text-sm text-gray-400">Category: {product?.category?.name}</h3>
                                    <p className="text-justify">{product?.description?.slice(0,100)}...</p>
                                </div>
                                <div className="text-center">
                                    <p>${product?.price}</p>
                                    <button className="p-2 rounded-md bg-emerald-500 hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90">Product Detail</button>
                                </div>
                            </div>
                        </div>
                    ))}        
                </section>
            </main>
      </div>
    );
  }