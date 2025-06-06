'use client'
import useAuthAdmin from "@/hooks/useAuthAdmin";
import NavigationAdmin from "@/components/Dashboard/navigation";
import AdminPanel from "@/components/Dashboard/adminPanel";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { fetchDataProdPag, CountLengDataProd } from "@/services/api";
import { Category, Product, FormDataProduct } from "@/types/interfaces";
import { useState } from "react";
import ProductForm from "@/components/Dashboard/ProductForm";
import HeaderTable from "@/components/Dashboard/HeaderTable";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InitialData {
    currentPage: number,
    searchTerm: string,
    productsPerPage: number,
    offset: number,
    products: Product[],
    category: Category[],
    totalPage: number,
}
interface ProductsClientProps {
  initialData: InitialData;
}
export default function ProductHandlePageClient ({ initialData }: ProductsClientProps) {
    const { session } = useAuthAdmin();
    const [products, setProducts] = useState<Product[]>(initialData.products);
    const [category] = useState<Category[]>(initialData.category);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>(initialData.searchTerm)
    const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
    const [error, setError] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const headerTable: string[] = ['Product', 'Price', 'Category', 'Action'];
     // variabel paganation page
    const [currentPage, setCurrentPage] = useState<number>(initialData.currentPage);
    const [totalPage, setTotalPage] = useState<number>(initialData.totalPage);
    
    
    const fetchDataProducts = async (page: number) => {
        try{
            const offset = (page - 1) * initialData.productsPerPage
            setLoading(true);
            const data: Product[] = await fetchDataProdPag(offset, initialData.productsPerPage, search);
            const totalProduct: number = await CountLengDataProd(search);
            setTotalPage(Math.ceil(totalProduct/initialData.productsPerPage));
            setProducts(data);
            setLoading(false);
        }
        catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            console.log(`Error: ${error}`)
        }
    }
    const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setCurrentPage(1);
        fetchDataProducts(currentPage);
    }
    // console.log(currentProduct);
    const calculateVisiblePages = () => {
        // number page you want to show
        const pageWantDisplay: number = 5;
        const halfpageWantDisplay = Math.floor(pageWantDisplay / 2);
        const start = Math.max(1, currentPage - halfpageWantDisplay);
        const end = Math.min(totalPage, start + pageWantDisplay - 1);
        const adjustedStart = Math.max(1, end - pageWantDisplay + 1);
        return Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i);
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchDataProducts(page);
        // updateURL(page, search);
    };

    const handlePageNavigation = (isNext: boolean) => {
        if(!isNext){
            handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage);
        }
        else {
            handlePageChange(currentPage > 1 ? currentPage + 1 : currentPage);
        }
        
    }
    const showFormProduct = (product?: Product): void => {
        if (product) {
            setCurrentProduct(product);
            setIsEdit (true);
        }
        else{
            setCurrentProduct(undefined);
            setIsEdit (false);
        }
        setShowForm(true);
    }   
    const handleDelete = async (idProduct: number): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${idProduct}`, {
                method: 'DELETE'
            });
            if(!response.ok) throw new Error (`Delete failed with status: ${response.status}`);
            fetchDataProducts(currentPage);
        }
        catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An Unknown Error Occured');
            console.log(`Error: ${error}`);
        }
    }
    const handleSubmit = async (data: FormDataProduct) => {
        setShowForm(false);
        try {
        // for Update Product
            if(currentProduct){  
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${currentProduct.id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify(data),
                })
                if(!response.ok) throw new Error (`Update failed with status: ${response.status}`);
            }
            // for create product
            else{
                const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify(data),
                })
                if(!response.ok) throw new Error (`Create failde with status: ${response.status}`);
            }
            return fetchDataProducts(currentPage);
        }
        catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An Unknown Error Occured');
            throw new Error(error);
        }     
    }
    return (
        <div className="bg-[rgb(8,5,3)] min-h-screen overflow-x-hidden">
            <NavigationAdmin session={session} />
            <main className="flex flex-row text-[rgb(240,230,226)] min-h-screen">
                {/* for panel */}
                <section className="lg:w-[15%]">
                    <AdminPanel session={session} />
                </section>
                {/* for content */}
                <section className="flex flex-col w-[100%] lg:w-[85%] p-[2rem] text-[rgb(240,230,226)] items-center px-[0.5rem] md:px-[2rem] xl:px-[4rem] 2xl:px-[20rem] gap-[1rem]">
                    {/* title and btn add product section */}
                    <section className="flex flex-row justify-between w-full">
                        <h1 className="text-[1rem] md:text-[1.5rem] xl:text-[2rem] font-bold">Page Products</h1>
                        <button onClick={() => showFormProduct()} className="flex flex-row gap-[0.2rem] items-center text-[0.8rem] xl:text-[1rem] bg-emerald-500 p-[0.2rem] md:p-[0.4rem] rounded-[0.5rem]"><Plus className="w-[1rem] h-[1rem] xl:w-[1.2rem] xl:h-[1.2rem]" />Add Product</button>
                    </section>
                    {/* form search */}
                    <form onSubmit={handleSearch} className="flex flex-row gap-[1rem] min-w-full items-center">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" name="search" className="bg-[rgb(8,5,3)] rounded-[0.5rem] border border-gray-300/20 p-[0.3rem] text-[0.9rem] w-[100%]"/>
                        <button type="submit" className="bg-emerald-500 p-[0.4rem] rounded-[0.4rem] hover:bg-emerald-700 hover:text-white active:scale-95 duration-200 max-md:w-[6rem] text-[0.6rem] md:text-[0.8rem]">Search</button>
                    </form>
                    {/* tabel section */}
                    {(!showForm && !loading) && (
                    <section className="overflow-hidden rounded-[0.4rem] border border-gray-500/40 w-full">    
                        <table className="min-w-full">
                            <HeaderTable headers={headerTable} />
                            <tbody className="bg-[#32190c6b] border-t border-gray-500/40">
                            {products.map((product, index) => (
                                <tr key={index} className="border-t border-gray-500/40">
                                    <td className="flex flex-row items-center gap-[1rem] px-[0.3rem] md:px-[0.8rem] xl:px-[2rem] py-[0.5rem] text-left">
                                        <img src={product?.images?.[0]} className="max-md:hidden w-[2rem] h-[2rem] xl:w-[2.8rem] xl:h-[2.8rem] rounded-[50%] object-contain border border-gray-500/40" />
                                        <div>
                                            <p className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] font-bold">{product?.title}</p>
                                            <span className="max-md:hidden md:text-[0.6rem]">{product?.description?.slice(0,60)}...</span>
                                        </div>
                                    </td>
                                    <td className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] px-[0.3rem] md:px-[0.8rem] xl:px-[2rem] py-[0.5rem] text-left font-bold">${product?.price}</td>
                                    <td className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] px-[0.3rem] md:px-[0.8rem] xl:px-[2rem] py-[0.5rem] text-left font-bold">{product?.category?.name}</td>
                                    <td className="text-[0.6rem] md:text-[0.8rem] xl:text-[1rem] items-center px-[0.3rem] md:px-[0.8rem] xl:px-[2rem] py-[0.5rem] text-left">
                                        <div className="flex flex-row gap-[1rem]">
                                            <button onClick={() => showFormProduct(product)} className="flex flex-row items-center gap-[0.1rem] md:gap-[0.4rem] text-blue-500 font-bold"><SquarePen className="w-[0.6rem] h-[0.6rem] md:w-[1.2rem] md:h-[1.2rem]" />Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="flex flex-row gap-[0.1rem] md:gap-[0.4rem] text-red-600 font-bold"><Trash2 className="w-[0.6rem] h-[0.6rem] md:w-[1.2rem] md:h-[1.2rem]" />Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/* web page */}
                        <div className="flex flex-row p-[1rem] justify-end max-lg:h-[4rem]">
                                <button disabled={currentPage === 1} onClick={() => handlePageNavigation(false)} className="border flex items-center justify-center p-[0.4rem] w-[1.5rem] rounded-l-[0.5rem]"><ChevronLeft /></button>
                                {calculateVisiblePages().map((pageNum) => (
                                    <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`border flex items-center justify-center p-[0.4rem] text-[0.6rem] lg:text-[1rem] w-[1.4rem] lg:w-[2rem] ${currentPage === pageNum ? 'bg-blue-500 text-white font-bold' : ''}`}>{pageNum}</button>
                                ))}
                                <button disabled={currentPage === totalPage} onClick={() => handlePageNavigation(true)} className="border flex items-center justify-center p-[0.4rem] w-[1.5rem] rounded-r-[0.5rem]"><ChevronRight /></button>
                        </div>
                    </section>
                    )}
                    {/* loading section */}
                    {loading && (
                    <section className="flex justify-center items-center w-full h-full">
                        <h1 className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold text-amber-50">Loading....</h1>
                    </section>
                    )}
                    {/* show form products */}
                    {showForm && (
                    <ProductForm product={isEdit ? currentProduct : undefined} onCancel={() => setShowForm(false)} titleForm={isEdit ? 'Edit Product' : 'Create Product'} category={category} onSubmit={handleSubmit} />
                    )}
                </section>
            </main>
        </div>
    )
}