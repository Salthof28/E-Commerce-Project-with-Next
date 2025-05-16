'use client'
interface btnAddCart {
    totalCheckout: number
    handleAddcart: () => void;
    decreaseCart: () => void;
}
export default function BtnAddCart ({ totalCheckout, handleAddcart, decreaseCart }: btnAddCart) {
    if (totalCheckout > 0) {
        return (
            <div className="w-full flex flex-row items-center justify-center">
                <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-xl mr-[1rem] min-w-[2rem]" onClick={decreaseCart}> - </button>
                <p className="min-w-[1rem] text-center">{totalCheckout}</p>
                <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-xl ml-[1rem] min-w-[2rem]" onClick={handleAddcart}> + </button>
            </div>
        )
    }
    else {
        return (
            <div>
                <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-xl" onClick={handleAddcart}>Add Cart</button>
            </div>
        )
    }
}