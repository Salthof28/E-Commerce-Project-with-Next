'use client'
import useAuthAdmin from "@/hooks/useAuthAdmin";
import NavigationAdmin from "@/components/Dashboard/navigation";
import AdminPanel from "@/components/Dashboard/adminPanel";
import { fetchDataCat, fetchDataProd } from "@/services/api";
import { Category, Product } from "@/types/interfaces";
import { useEffect, useState } from "react";


export default function Dashboard () {
    const { session } = useAuthAdmin();
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

     // variabel paganation page

    const [totalPoduct, setTotalProduct] = useState<number>(0);
    
    
    const fetchDataProducts = async () => {
        try{
            setLoading(true);
            const data: Product[] = await fetchDataProd();
            const dataCat: Category[] = await fetchDataCat();
            const dataNumber: number = data.length;
            setTotalProduct(dataNumber)
            setProducts(data);
            setCategory(dataCat);
            setLoading(false);
        }
        catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            console.log(`Error: ${error}`)
        }
    }
    useEffect (() => {
        fetchDataProducts();
    }, []);

    const persentaseProduct = (totalSingProd: number): number => {
        const persenProduct: number = (totalSingProd/totalPoduct)*100;
        return persenProduct;
    }
    const totalProductbyCat =() => {
        const result = category.map((cat) => {
            const total = products.filter((prod) => prod.category.id === cat.id).length;
            return {categoryName: cat.name, Total: total};
    });
    return result
    }
    console.log(totalProductbyCat());
    return (
        <div className="bg-[rgb(8,5,3)] min-h-screen overflow-x-hidden">
            <NavigationAdmin session={session} />
            <main className="flex flex-row text-[rgb(240,230,226)] min-h-screen">
                {/* for panel */}
                <section className="lg:w-[15%]">
                    <AdminPanel session={session} />
                </section>
                {/* for content */}
                <section className="flex flex-col w-[100%] lg:w-[85%] p-[2rem] text-[rgb(240,230,226)] items-center px-[0.5rem] md:px-[10rem] xl:px-[20rem] 2xl:px-[40rem] gap-[1rem]">
                    <h1 className="text-[1rem] md:text-[1.5rem] xl:text-[2rem] font-bold">Dashboard</h1>
                    {/* section persentase product */}
                    <section className="flex flex-row min-w-full gap-[1rem]">
                        {/* card 1 */}
                        <section className="flex flex-col gap-[1rem] p-[1rem] overflow-hidden rounded-[0.4rem] border border-gray-500/40 w-full">    
                            <h1 className="text-[1rem] md:text-[1.2rem] xl:text-[1.5rem] font-bold">Products</h1>
                            {totalProductbyCat().map((item,index) => (
                            <div key={index} className="flex flex-col gap-[0.5rem]">
                                <div className="flex flex-row justify-between">
                                    <p className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] font-bold">{item.categoryName}</p>
                                    <p className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] font-bold">{item.Total}</p>
                                </div>
                                <div className="bg-gray-200 w-full h-[0.5rem] rounded-[0.5rem]">
                                    <div className={`bg-emerald-600 h-[0.5rem] rounded-[0.5rem]`} style={{ width: `${persentaseProduct(item.Total)}%` }}></div>
                                </div>
                            </div>
                            ))}
                        </section>
                    </section>
                    {loading && (
                    <section className="flex justify-center items-center w-full h-full">
                        <h1 className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold text-amber-50">Loading....</h1>
                    </section>
                    )}
                </section>
            </main>
        </div>
    )
}