'use client'

import { useStoreContext } from "@/app/lib/data-store/store"
import { EmptyCartUI } from "./cart-no-items"



export const CartUI = () => {

    const { cart, clearItemFromCart } = useStoreContext()

    if (cart.items.length <= 0) return <EmptyCartUI />

    return (
        <div>
            <div>
                {
                    cart.items.map((item) => {
                        return (
                            <div key={item.product._id as unknown as string}>
                                <div>{item.product.title}</div>
                                <div>{item.quantity}</div>
                                <div>{item.total}</div>

                                <button onClick={() => clearItemFromCart(item.product)}>Remove</button>
                            </div>
                        )
                    })
                }
                <div>{cart.items.length}</div>
                <div>{cart.grandTotal}</div>
            </div>
        </div>
    )

}