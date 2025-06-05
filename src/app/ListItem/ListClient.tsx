'use client'
import { useState, useEffect, ChangeEvent } from "react";
import Navbar from "@/components/navbar";
import CardProduct from "@/components/ListItem/card-products";
import CategoryList from "@/components/ListItem/Category-list";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { fetchFilterCatProd } from "../../services/api";
import { Category, Product } from "@/types/interfaces";
import { fetchDataProd, fetchDataCat } from "../../services/api";

export default function ListItem() {
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const categoryhome = searchParams.get('category') || 'All';
    const activeCat: string = categoryhome;
    const router: AppRouterInstance = useRouter();

    const fetchDataProducts = async (): Promise<void> => {
        try {
            setLoading(true);
            const dataProd: Product[] = categoryhome === 'All' ? await fetchDataProd() : await fetchFilterCatProd(categoryhome);
            const dataCat: Category[] = await fetchDataCat() ;
            setCategory(dataCat); 
            setProducts(dataProd);
            setLoading(false);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred')
            console.log(error);
        }
    }
    useEffect (() => {
        fetchDataProducts();
    }, [categoryhome])

    const getInputSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const handleSearch = () => {
        const filterProducts: Product[] = products.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
        setProducts(search == "" ? products :  filterProducts);
    }
    const handleCategory = (category: string) => {
        router.push(`/ListItem?category=${category}`);
    }
    const handleRouter = (id: number): void => {
        router.push(`/ListItem/${id}`)
    }
    return (
      <div className="bg-amber-700 text-center overflow-x-hidden">
            <Navbar />
            {/* Search section */}
            <input data-testid='inptSearch' className="mt-[8rem] text-center bg-white/60 rounded-md hover:bg-amber-200 p-1 text-[0.8rem] xl:text-[1rem]" placeholder="Search" onChange={getInputSearch}></input>
            <button data-testid="btnSearch" className="font-bold ml-2 bg-yellow-300 p-1 rounded-md hover:bg-yellow-500 hover:text-amber-50 transition-opacity active:scale-90 duration-200 text-[0.8rem] xl:text-[1rem]" onClick={handleSearch}>Search</button>
            {/* Main Page */}
            <main className="flex pt-15 justify-center items-center w-screen px-[1%] xl:px-[4%]">
                {/* Main Section */}
                <section className="flex flex-row text-start justify-center gap-[2%] w-full">
                    {/* section category */}
                    <section className="p-2 w-[25%] xl:w-[25%] 2xl:w-[15%] bg-amber-50 rounded-2xl h-full text-start hidden lg:block">
                    <h2 className="text-[0.8rem] xl:text-[1rem] text-black font-bold mb-[1rem]">Category Product</h2>
                    <div className="flex flex-col items-start">
                        <button data-testid="btnAllCat" className={`p-1 hover:bg-emerald-400 ${activeCat === "All" ? 'bg-emerald-500' : 'bg-amber-50'} ${activeCat === "All" ? 'text-white' : 'text-black'} text-[0.8rem] xl:text-[1rem]`} onClick={() => handleCategory("All")}>All</button>
                        {category.map ((cat) => (
                            <CategoryList key={cat.id} handleCategory = {handleCategory} category={cat} activeCat={activeCat} />
                        ))}
                    </div>
                    </section>
                    {/* section card product */}
                    <section className="relative min-h-screen flex flex-row flex-wrap gap-[2rem] w-[100%] lg:w-[70%] xl:w-[70%] max-lg:justify-center">
                        {loading && (
                            <div className="absolute flex w-full h-full justify-center items-center">
                                <h1 className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold text-amber-50">Loading....</h1>
                            </div>
                        )}
                        {products.map ((product) => (
                            <CardProduct key={product.id} product={product} handleRouter={handleRouter} />
                        ))}        
                    </section>
                </section>
            </main>
      </div>
    );
  }