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

interface CardProductProps {
    product: Product;
    handleRouter: (id: number) => void
}
export default function CardProduct ({ product, handleRouter }: CardProductProps) {
    return (
        <div className="bg-amber-50 rounded-2xl h-[32rem] w-[15rem] 2xl:h-[42rem] 2xl:w-[25rem]">
            <img src={product?.images?.[0] || "/no-img.jpg"} className="rounded-t-2xl w-full h-[15rem] 2xl:h-[25rem] object-cover"/>
            <div className="p-3 flex flex-col justify-between min-h-[16rem] text-justify">
            <div>
                <h1 className="text-md 2xl:text-lg font-bold text-start">{product.title}</h1>
                <h3 className="mb-8 text-sm text-gray-400">Category: {product?.category?.name}</h3>
                <p className="text-justify text-xs 2xl:text-base">{product?.description?.slice(0,100)}...</p>
            </div>
            <div className="text-center">
                <p className="text-sm 2xl:text-md">${product?.price}</p>
                <button className="p-2 rounded-md bg-emerald-500 hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90" onClick={() => handleRouter(product.id)}>Product Detail</button>
            </div>
        </div>
        </div>
    );
};

// export default CardProduct;

