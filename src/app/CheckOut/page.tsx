'use client'
import Navbar from "@/components/navbar";
import { Product } from "@/services/api";
import { CartItem, useCart } from "@/app/context/Cart-context";
import ListCheckOut from "@/components/CheckOut/list-checkout";
export default function CheckOut () {
    const {cart, addToCart, decReaseItem, removeItem, totalPaid, totalQuantity} = useCart();
    // useEffect (() => {
        
    //     console.log(cart);
    // }, [])
    const handleAddcart = (product: Product): void => {
        addToCart(product);
    }
    const decreaseCart = (product: Product): void => {
        decReaseItem(product);
    }
    const removeCart = (product: Product): void => {
        removeItem(product);
    }
    return (
        <div className="bg-amber-700 min-h-screen text-center overflow-x-hidden">
            <Navbar />
            <main className="pt-[8rem] px-[1rem] md:px-[4rem] 2xl:px-[6rem] pb-[2rem]">
                <h1 className="text-center text-amber-50 mb-[1rem] text-[1.5rem] mb:text-[2rem] lg:text-[3rem]">Checkout Boss</h1>
                <section className="rounded-2xl bg-amber-100">
                    {cart.map((item: CartItem) =>(
                        <ListCheckOut key={item.product.id} cart={item} handleAddcart={handleAddcart} decreaseCart={decreaseCart} removeCart={removeCart} />
                    ))}
                    {cart.length < 1 && (
                    <div className="p-[2rem] flex flex-col items-center">
                        <h2 className="text-[1.5rem] 2xl:text-[2rem] text-black">Your cart is empty. Let’s fill it up with something awesome!</h2>
                    </div>
                    )}
                    {cart.length > 0 && (
                    <div className="p-[2rem] flex flex-col items-center">
                        <h2 className="text-[1rem] md:text-[1.5rem] 2xl:text-[2rem] text-black">Total Quantity: {totalQuantity()}</h2>
                        <h2 className="text-[1rem] md:text-[1.5rem] 2xl:text-[2rem] mb-[2rem] text-black">Total Paid: ${totalPaid()}</h2>
                        <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 hover:text-amber-50 transition-opacity delay-200 active:scale-90 text-sm md:text-lg xl:text-3xl text-black">Check Out</button>
                    </div>
                    )}      
                </section>
            </main>
        </div>
    );
}