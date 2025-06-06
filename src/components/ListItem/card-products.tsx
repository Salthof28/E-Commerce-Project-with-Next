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
        <div className="bg-amber-50 rounded-2xl  w-[12rem] xl:w-[15rem] 2xl:w-[25rem] h-[21rem] xl:h-[25rem] 2xl:h-[42rem]">
            <img src={product?.images?.[0] || "/no-img.jpg"} className="rounded-t-2xl w-full h-[8rem] xl:h-[10rem] 2xl:h-[25rem] object-cover"/>
            <div className="p-3 flex flex-col justify-between min-h-[13rem] xl:min-h-[15rem] 2xl:min-h-[16rem] text-justify">
                <div>
                    <h1 className="text-[0.6rem] xl:text-[0.8rem] 2xl:text-[1rem] font-bold text-start text-black">{product.title.slice(0,30)}{product.title.length > 30 ? '...' : ''}</h1>
                    <p className="mb-[2rem] 2xl:mb-[2rem] text-[0.6rem] xl:text-[0.8rem] text-gray-400">Category: {product?.category?.name}</p>
                    <p className="text-justify text-[0.6rem] xl:text-[0.8rem] 2xl:text-[1rem] text-black">{product?.description?.slice(0,80)}{product.description.length > 80 ? '...' : ''}</p>
                </div>
                <div className="text-center">
                    <p className=" text-[0.6rem] xl:text-[0.8rem] text-black">${product?.price}</p>
                    <button className="text-[0.7rem] xl:text-[0.8rem] p-2 rounded-md bg-emerald-500 hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-black" onClick={() => handleRouter(product.id)}>Product Detail</button>
                </div>
            </div>
        </div>
    );
};

