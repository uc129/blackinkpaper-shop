'use client'

import { useEffect, useState } from "react"
import { IProduct } from "../api/products/products.model"
import { useStoreContext } from "../lib/data-store/store"
import { ProductDisplayCard } from "./product-display-card"
import Link from "next/link"


export default function ShopPage() {


    const { products } = useStoreContext()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (products && products.length > 0) {
            setLoading(false)
        }
    }, [products])


    if (loading) {
        return (<>Loading...</>)
    }



    return (
        <div>
            <h1>Shop Page</h1>

            <div>
                {
                    products.map((product: IProduct) => {
                        return (
                            <div key={product._id as unknown as string}>
                                <ProductDisplayCard product={product} classNames="min-w-44 w-fit" />
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Link href="/shop/cart" passHref>
                    <span>Go to cart</span>
                </Link>
            </div>
        </div>
    )
}