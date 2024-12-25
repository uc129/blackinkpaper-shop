'use client'
/* eslint-disable*/

import { useStoreContext } from "@/app/lib/data-store/store"
import { CartUI } from "./cart-ui";
import { EmptyCartUI } from "./cart-no-items";

export default function CartPage() {

    const { cart, addToCart, clearItemFromCart, } = useStoreContext()
    console.log('cart', cart);

    if (cart.grandTotal <= 0) return <EmptyCartUI />

    return (
        <div>
            <h1>Cart Page</h1>
            <h3>Cart</h3>
            <CartUI />
        </div>
    )
}