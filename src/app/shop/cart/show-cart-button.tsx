'use client'

import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon"
import { useStoreContext } from "@/app/lib/data-store/store"
import React, { useEffect } from "react"
import { CartUI } from "./cart-ui"
import usePhosphorIcons from "@/app/lib/phosphor"
import Link from "next/link"

export const ShowCartButton = () => {

    const { cart } = useStoreContext()
    const [showCart, setShowCart] = React.useState(false)
    const { ShoppingBagOpen } = usePhosphorIcons()

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowCart(!showCart)
    }

    const checkClassName = (className: string, target: any) => {
        if (target?.classList.contains(className)) {
            return true
        }
        else {
            return false
        }

    }

    useEffect(() => {
        window.addEventListener('click', (e) => {
            let target = e.target as HTMLElement
            let parent = target?.parentElement as HTMLElement
            let grandParent = parent?.parentElement as HTMLElement
            let nextSibling = target?.nextElementSibling as HTMLElement
            let children = nextSibling?.children


            if (checkClassName('cart-button', target) || checkClassName('cart-button', parent) || checkClassName('cart-button', grandParent)) {
                return
            }
            else if (checkClassName('cart-button', nextSibling)) {
                return
            }
            if (children) {
                Array.from(children).forEach(child => {
                    if (checkClassName('cart-button', child)) {
                        return
                    }
                })
            }

            setShowCart(false)
        })

        return () => window.removeEventListener('click', () => { })

    }, [])


    let itemsLength = cart.items.length

    return (
        <div className="cart-button">
            <div className="relative cart-button " >
                <ButtonWithIcon icon={<ShoppingBagOpen />} label={`(${itemsLength.toString()})`} onClick={handleClick} />

                {showCart &&
                    <div className="absolute">
                        <CartUI />
                        {itemsLength > 0 && <Link href="/shop/cart"> <span>Go to cart</span> </Link>}
                    </div>
                }
            </div>
        </div>
    )

}