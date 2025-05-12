'use client'
import { useState, useEffect, ChangeEvent } from "react";
import Navbar from "../components/navbar";
import CardProduct from "../components/ListItem/card-products";
import CategoryList from "../components/ListItem/Category-list";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const router: AppRouterInstance = useRouter();
    const [allproducts, setAllproducts] = useState<Product[]>([]);

    const fetchDataProducts = async (): Promise<void> => {
        try {
            setLoading(true);
            const response: Response = await fetch('https://api.escuelajs.co/api/v1/products')
            // const response: Response = await fetch('https://fakestoreapi.com/products')
            const data: Product[] = await response.json();
            // setProducts(data); // for current data products
            setAllproducts(data); // for collect all product data
            setLoading(false);
            // for filter from home and cupdate current product
            const categoryhome = searchParams.get('category') || 'All';
            // handleCategory(categoryhome);
            const filterProductfromHome: Product[] = data.filter(item => item.category.name.includes(categoryhome));
            categoryhome == 'All' ? setProducts(data): setProducts(filterProductfromHome);
            router.replace('/ListItem');
            
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
        console.log(category);
        const categoryProducts: Product[] = allproducts.filter(item => item.category.name.includes(category));
        category == "All" ? setProducts(allproducts) : setProducts(categoryProducts);
        // setProducts(categoryProducts);
    }
    const handleRouter = (id: number): void => {
        router.push(`/ListItem/${id}`)
    }

    if (loading) {
        return <div className="flex min-h-screen justify-center items-center"><h1 className="text-center text-4xl font-bold">Loading....</h1></div>;
    }
    return (
      <div className="bg-amber-700 text-center">
            <Navbar />
            {/* Search section */}
            <input className="mt-[8rem] text-center bg-white/60 rounded-md hover:bg-amber-200 p-1" placeholder="Search" onChange={getInputSearch}></input>
            <button className="font-bold ml-2 bg-yellow-300 p-1 rounded-md hover:bg-yellow-500 hover:text-amber-50 transition-opacity active:scale-90 duration-200" onClick={handleSearch}>Search</button>
            {/* Main Page */}
            <main className="flex flex-row p-15 px-[10rem] 2xl:px-[18rem] gap-[2rem] text-start justify-center w-screen">
                {/* section category */}
                <CategoryList handleCategory = {handleCategory} />
                {/* section card product */}
                <section className="min-h-screen flex flex-row flex-wrap gap-[2rem] w-screen">
                    {products.map ((product) => (
                        <CardProduct key={product.id} product={product} handleRouter={handleRouter} />
                    ))}        
                </section>
            </main>
      </div>
    );
  }