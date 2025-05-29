import Navbar from "@/components/navbar";
import SingleProductRender from "@/components/ListItem/single-product-render";
import { Product } from "@/types/interfaces";
import { fetchDataSingProd } from "@/services/api";
interface Params {
    params: Promise<{ id: string }>
}
export const dynamic = 'force-dynamic';
export default async function SingleProduct ({ params }: Params ) {
    // const { id } = params;
    const resolvedParams = await params;
    const id = resolvedParams.id;
    // const id = params.id;
    // const response: Product = await fetchDataSingProd(id);
    const product: Product = await fetchDataSingProd(id);
    const images: string[] = product.images;
    return (
        <div className="bg-amber-700 min-h-screen">``
            <Navbar />
            <SingleProductRender key={product.id} product={product} images={images} />
        </div>
    )
}