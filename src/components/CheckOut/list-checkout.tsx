import { CartItem } from "@/app/context/Cart-context";
import { Product } from "@/types/interfaces";
import { Trash2 } from "lucide-react";

interface ListCheckOut {
    cart: CartItem;
    handleAddcart: (product: Product) => void;
    decreaseCart: (product: Product) => void;
    removeCart: (product: Product) => void;
}
export default function ListCheckOut ( {cart, handleAddcart, decreaseCart, removeCart}: ListCheckOut ) {
    return (
        <div className="flex flex-col lg:flex-row justify-between p-[2rem] items-center border-b-4 border-amber-700">
            <div className="flex flex-col lg:flex-row gap-[2rem] items-center">
                <img src={cart?.product?.images?.[0]} className="w-[8rem] 2xl:w-[15rem] rounded-2xl" alt={cart?.product?.title} />
                <div className="text-center lg:text-start ">
                    <h2 className="text-[1rem] 2xl:text-[2rem] text-black">{cart?.product?.title}</h2>
                    <p className="text-[0.8rem] max-lg:mb-[1rem] text-black">${cart?.product?.price}</p>
                </div>
            </div>  
                <div className="flex flex-row items-center">
                    <button className="bg-emerald-500 p-2 text-black rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-xl mr-[2rem] min-w-[2rem] hidden lg:block" onClick={() => removeCart(cart?.product)}> <Trash2 className="w-6 h-6" /> </button>
                    <button className="bg-emerald-500 p-2 text-black rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-xl mr-[2rem] min-w-[2rem]" onClick={() => decreaseCart(cart?.product)}> - </button>
                    <p className="min-w-[1rem] 2xl:min-w-[2.5rem] text-center text-[1rem] text-black">{cart?.quantity}</p>
                    <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-xl ml-[2rem] min-w-[2rem] text-black" onClick={() => handleAddcart(cart?.product)}> + </button>
                </div>
        </div>
    );
}