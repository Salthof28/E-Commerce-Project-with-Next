// app/admin/products/page.tsx
import { fetchDataCat, fetchDataProdPag, CountLengDataProd } from "@/services/api";
import ProductHandlePageClient from "./ListProductClient";

// ISR Configuration
export const revalidate = 300; // 5 minutes

// interface ProductsPageProps {
//   searchParams: {
//     page?: string;
//     search?: string;
//   }
// }

export default async function ProductHandlePage() {
    const currentPage = 1;
    const searchTerm = '';
    const productsPerPage = 10;
    const offset = (currentPage - 1) * productsPerPage;
    try{
        const [products, category, totalProduct] = await Promise.all([
            fetchDataProdPag(offset, productsPerPage, searchTerm),
            fetchDataCat(),
            CountLengDataProd(searchTerm)
        ]);
        const totalPage = Math.ceil(totalProduct/productsPerPage);

        const initialData = {
            currentPage,
            searchTerm,
            productsPerPage,
            offset,
            products,
            category,
            totalPage
        }
        return <ProductHandlePageClient initialData={initialData} />
    }
    catch(error) {
        console.error(`Error fetching Products: ${error}`);
        return (
        <div className="bg-[rgb(8,5,3)] min-h-screen flex items-center justify-center">
            <div className="text-red-500 text-center">
                <h2 className="text-xl font-bold mb-2">Error Loading Products</h2>
                <p>Please try again later</p>
            </div>
        </div>
        );
    }

}