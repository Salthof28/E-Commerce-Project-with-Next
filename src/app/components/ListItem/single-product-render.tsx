'use client'
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "@/app/services/api";
import { CartItem, useCart } from "@/app/context/Cart-context";
import BtnAddCart from "./btnAdd-cart";

interface SingleProductRenderProps {
    product: Product;
    images: string[];
}
export default function SingleProductRender ( { product, images }: SingleProductRenderProps ) {
    const [currentImages, setCurrentImages] = useState<number>(0);
    const {cart, addToCart, decReaseItem} = useCart();
    const [totalCheckout, setTotalCheckout] = useState<number>(0); 
    const slideRight = (): void => {
        setCurrentImages(prev => (prev + 1) % images.length);
    }
    const slideLeft = (): void => {
        setCurrentImages(prev => (prev - 1 + images.length) % images.length);
    }
    const handleAddcart = (): void => {
        addToCart(product);
    }
    const decreaseCart = (): void => {
        decReaseItem(product);
    }
    useEffect(() => {
        // console.log(cart);
        const filterProduct: CartItem[] = cart.filter(item => item.product.id === product.id);
        setTotalCheckout(filterProduct.length > 0 ? filterProduct[0].quantity : 0)
        console.log(cart);
        
    }, [cart]);

    return (
        <div className="bg-amber-700 min-h-screen">
            <main className="px-[2rem] md:px-[4rem] pt-[8rem] flex flex-col lg:flex-row gap-[2rem] justify-center max-lg:items-center">
                {/* image Section */}
                <section className="relative w-[16rem] md:w-[35rem] aspect-[4/3] lg:w-[30rem] bg-amber-100 flex items-center justify-between rounded-2xl p-4">
                    <button onClick={slideLeft} className="z-10 bg-yellow-300 h-6 rounded-[50%] shadow-lg hover:shadow-[0_0_4px_4px_rgba(240,183,140,0.6)] active:scale-80 duration-200"><ChevronLeft className="text-amber-700" /></button>
                    <img className="absolute rounded-2xl w-full h-full inset-0 object-cover" src={product?.images?.[currentImages]}></img>
                    <button onClick={slideRight} className="z-10 bg-yellow-300 h-6 rounded-[50%] shadow-lg hover:shadow-[0_0_4px_4px_rgba(240,183,140,0.6)] active:scale-80 duration-200"><ChevronRight className="text-amber-700" /></button>
                </section>
                {/* Detail Product Section */}
                <section className="bg-amber-100 w-[16rem] md:w-[35rem] lg:w-[60rem] rounded-2xl p-[0.8rem] md:p-[1.5rem] xl:p-[3rem] text-center flex flex-col justify-between">
                    <div className="mb-[1rem] lg:mb-[2rem]">
                        <h1 className="text-md md:text-2xl xl:text-3xl text-black">{product?.title}</h1>
                        <h3 className="mb-5 text-xs md:text-sm xl:text-xl text-black">Category: {product?.category?.name}</h3>
                        <p className="text-justify text-xs md:text-sm xl:text-xl text-black">{product?.description}</p>
                    </div>
                    <div>
                        <p className="text-xs md:text-sm xl:text-xl mb-[1rem] text-black">${product?.price}</p>
                        <BtnAddCart totalCheckout={totalCheckout} handleAddcart={handleAddcart} decreaseCart={decreaseCart} />
                    </div>
                </section>
            </main>
        </div>
    );
}