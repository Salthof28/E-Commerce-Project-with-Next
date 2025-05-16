import { CartItem } from "@/app/context/Cart-context";
import { Product } from "@/app/services/api";
import { Trash2 } from "lucide-react";

interface ListCheckOut {
    cart: CartItem;
    handleAddcart: (product: Product) => void;
    decreaseCart: (product: Product) => void;
    removeCart: (product: Product) => void;
}
export default function ListCheckOut ( {cart, handleAddcart, decreaseCart, removeCart}: ListCheckOut ) {
    return (
        <div className="flex flex-row justify-between p-[2rem] items-center border-b-2">
            <div className="flex flex-row gap-[2rem] items-center">
                <img src={cart?.product?.images?.[0]} className="w-[15rem] rounded-2xl" alt={cart?.product?.title} />
                <div>
                    <h2 className="text-[2rem]">{cart?.product?.title}</h2>
                    <p className="text-[1.5rem]">${cart?.product?.price}</p>
                </div>
            </div>  
                <div className="flex flex-row items-center">
                    <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-xl mr-[2rem] min-w-[2rem]" onClick={() => removeCart(cart?.product)}> <Trash2 className="w-6 h-6" /> </button>
                    <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-xl mr-[2rem] min-w-[2rem]" onClick={() => decreaseCart(cart?.product)}> - </button>
                    <p className="min-w-[2.5rem] text-center">{cart?.quantity}</p>
                    <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-xl ml-[2rem] min-w-[2rem]" onClick={() => handleAddcart(cart?.product)}> + </button>
                </div>
        </div>
    );
}