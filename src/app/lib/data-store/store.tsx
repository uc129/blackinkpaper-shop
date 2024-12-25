'use client'
/* eslint-disable*/

import { IProductCategory } from "@/app/api/product-categories/categories.model";
import { IProduct } from "@/app/api/products/products.model";
import { useAuthContext, UserInfo } from "@/app/auth/auth-context";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts } from "../data-access/products";
import { getAllProductCategories } from "../data-access/product-categories";
import { useRouter } from "next/navigation";



export interface ICartItem {
    product: IProduct;
    quantity: number;
    total: number;
}

export interface ICart {
    items: ICartItem[];
    grandTotal: number;
}

interface StoreContextType {
    products: IProduct[];
    categories: IProductCategory[];
    cart: ICart;
    userInfo: UserInfo | null;
    addToCart: (product: IProduct, quantity: number) => void;
    removeFromCart: (product: IProduct, quantity: number) => void;
    clearCart: () => void;
    clearItemFromCart: (product: IProduct) => void;
}

const StoreContext = createContext<StoreContextType>({
    products: [],
    categories: [],
    cart: { items: [], grandTotal: 0 },
    userInfo: null,
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    clearItemFromCart: (product: IProduct) => { }
});

export const useStoreContext = () => useContext(StoreContext);


export const StoreProvider = ({ children }: { children: React.ReactNode }) => {

    const [products, setProducts] = useState<IProduct[]>([])
    const [categories, setCategories] = useState<IProductCategory[]>([])
    const [cart, setCart] = useState<ICart>({ items: [], grandTotal: 0 });
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const router = useRouter();


    useEffect(() => {
        if (!window) return;
        let cart = window.localStorage.getItem('cart');
        if (!cart) {
            console.log('No cart found');
            return
        }
        if (cart) {
            setCart(JSON.parse(cart));
            console.log('cart', JSON.parse(cart));
        }
    }, [])

    let { user } = useAuthContext();

    const fetchProducts = async () => {
        let response = await getAllProducts();
        if (response) {
            setProducts(response.data);
        }
    }

    useEffect(() => {
        if (!products || products.length <= 0) {
            fetchProducts();
        }
    }, [products])

    const fetchCategories = async () => {
        const response = await getAllProductCategories();
        if (response) {
            setCategories(response.data);
        }
    }

    useEffect(() => {
        if (categories.length <= 0) {
            fetchCategories();
        }
    }, [categories])

    const addToCart = (product: IProduct, quantity: number) => {
        console.log('Adding to cart - store', product.title, quantity);

        setCart((prev) => {
            const newCart = prev || { items: [], grandTotal: 0 };
            const storedCart = window.localStorage.getItem('cart');
            const parsedCart = storedCart ? JSON.parse(storedCart) : newCart;
            const item = parsedCart.items.find(i => i.product._id === product._id);
            if (item) {
                if (item.quantity >= 0) {
                    const adjustedQuantity = quantity - item.quantity;
                    item.quantity += adjustedQuantity;
                    item.total += product.price * adjustedQuantity;
                    parsedCart.grandTotal += product.price * adjustedQuantity;
                }

            } else {
                parsedCart.items.push({ product, quantity, total: product.price * quantity });
                parsedCart.grandTotal += product.price * quantity;
            }

            console.log('new cart', parsedCart);
            window.localStorage.setItem('cart', JSON.stringify(parsedCart));
            return parsedCart;
        });
        router.refresh();

    }


    const removeFromCart = (product: IProduct, quantity: number) => {
        setCart((prev) => {
            let newCart = prev || { items: [], grandTotal: 0 };
            let item = newCart.items.find(i => i.product._id === product._id);

            let oldCart = prev;
            let oldQuantity = 0;
            let adjustedQuantity = quantity;

            if (oldCart) {
                let oldItem = oldCart.items.find(i => i.product._id === product._id);
                if (oldItem) {
                    oldQuantity = oldItem.quantity;
                }
            }

            if (oldQuantity > 0 && quantity > 0) {
                adjustedQuantity = quantity - oldQuantity;
                console.log('old', oldQuantity);
                console.log('new', quantity);
                console.log('adjusted', adjustedQuantity);

            }

            if (item) {
                item.quantity -= adjustedQuantity;
                newCart.grandTotal -= product.price * adjustedQuantity;
                if (item.quantity <= 0) {
                    newCart.items = newCart.items.filter(i => i.product._id !== product._id);
                }
            }
            return newCart;
        });
        router.refresh();

    }

    const clearCart = () => {
        console.log('Clearing cart');
        setCart({ items: [], grandTotal: 0 });
        window && window.localStorage.removeItem('cart');
        router.push('/shop');

    }

    const clearItemFromCart = (product: IProduct) => {
        setCart((prev) => {
            let newCart = prev || JSON.parse(window.localStorage.getItem('cart') || '{"items": [], "grandTotal": 0}');
            let item = newCart.items.find(i => i.product._id === product._id);
            if (item) {
                newCart.items = newCart.items.filter(i => i.product._id !== product._id);
                newCart.grandTotal -= item.total;
            }
            window && window.localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        })
        router.refresh();
    }

    const getUser = () => {
        if (user) {
            setUserInfo(user);
        }

    }

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user])

    return (
        <StoreContext.Provider value={{ products, categories, cart, userInfo, addToCart, removeFromCart, clearItemFromCart, clearCart }}>
            {children}
        </StoreContext.Provider>
    )




}


