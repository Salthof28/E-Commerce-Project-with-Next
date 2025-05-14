import Navbar from "@/app/components/navbar";
import SingleProductRender from "@/app/components/ListItem/single-product-render";
import { Product } from "@/app/services/api";
import { fetchDataSingProd } from "@/app/services/api";
export default async function SingleProduct ({ params }: { params: { id: string } }) {
    const { id }: {id: string} = await params;
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