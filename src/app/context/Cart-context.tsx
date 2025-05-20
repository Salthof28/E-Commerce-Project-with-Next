'use client'
import { Product } from "@/app/services/api";
import { createContext ,ReactNode, useState, useContext, useEffect } from "react";

export interface CartItem {
    product: Product;
    quantity: number;
}
export interface CartContextType{
    cart: CartItem[];
    addToCart: (product: Product) => void;
    decReaseItem: (product: Product) => void;
    removeItem: (product: Product) => void;
    totalPaid: () => number;
    totalQuantity: () => number
}

export const cartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined'){
            const stored: string | null = localStorage.getItem('cart');
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });
    // store cart to local
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)); 
    }, [cart])
    const addToCart = (product: Product): void => {
        const indexCart = cart.findIndex(item => item.product.id === product.id);
        if (indexCart !== -1) {
            setCart([...cart.slice(0,indexCart), {...cart[indexCart], quantity: cart[indexCart].quantity + 1}, ...cart.slice(indexCart + 1)]);
        }
        else {
            setCart([...cart, {product, quantity: 1}]);
        }
    }
    const decReaseItem = (product: Product): void => {
        const indexCart = cart.findIndex(item => item.product.id === product.id);
        if (cart[indexCart].quantity > 1){
            setCart([...cart.slice(0,indexCart), {...cart[indexCart], quantity: cart[indexCart].quantity - 1}, ...cart.slice(indexCart + 1)]);
        }
        else {
            removeItem(product);
        }

    }
    const removeItem = (product: Product) => {
        setCart(cart.filter(item => item.product.id !== product.id));
    }
    const totalPaid = (): number => {
        const total = cart.reduce((accumulator, currentValue): number => accumulator + (currentValue.product.price * currentValue.quantity), 0)
        return total;
    }
    // for total quantity
    const totalQuantity = (): number => {
        const total = cart.reduce((accumulator, currentValue): number => accumulator + currentValue.quantity, 0)
        return total;
    }
    
    // cartContext contain all variabel and function in function
    return (
        <cartContext.Provider value={{cart, addToCart, decReaseItem, removeItem, totalPaid, totalQuantity}}>
            {children}
        </cartContext.Provider>
    );
}

// for simple use in all page
export const useCart = (): CartContextType => {
    const context = useContext(cartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context
} 