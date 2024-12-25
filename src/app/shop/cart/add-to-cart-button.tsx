'use client'
/* eslint-disable*/

import { IProduct } from "@/app/api/products/products.model";
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon";
import CustomInput from "@/app/components/form-components/input";
import { useStoreContext } from "@/app/lib/data-store/store";
import { useEffect, useState } from "react"



export interface AddToCartButtonProps {
    product: IProduct

}


export const AddToCartButton = ({ product }: AddToCartButtonProps) => {

    const [quantity, setQuantity] = useState(1);
    const { cart, addToCart, clearItemFromCart, clearCart } = useStoreContext();

    useEffect(() => {
        if (!cart) return;
        let cartItem = cart.items.find((item) => item.product._id === product._id);
        if (!cartItem) return;
        setQuantity(cartItem.quantity)
    }, [cart])



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    }

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Adding to cart', product.title, quantity)
        addToCart(product, quantity)
    }

    const handleClearItem = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Clearing cart')
        clearItemFromCart(product)
    }

    const handleClearCart = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Clearing cart')
        clearCart()
    }

    return (
        <div>
            <form className="grid grid-cols-8">
                <CustomInput type="number" name="quantity" label="Quantity" min={1} max={100} onChange={handleChange} value={quantity} />
                <ButtonWithIcon icon={<span>🛒</span>} label="Add to cart" classNames="min-w-44" onClick={handleAddToCart} disabled={quantity <= 0} />
                <ButtonWithIcon label="Clear Item" icon={<span>🗑️</span>} classNames="col-span-2 min-w-44" onClick={handleClearItem} />
                {/* <ButtonWithIcon label="Clear Cart" icon={<span>🗑️</span>} classNames="col-span-2 min-w-44" onClick={handleClearCart} /> */}
            </form>
        </div>
    )





}