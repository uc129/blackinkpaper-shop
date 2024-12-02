'use client'

import { useStoreContext } from "@/app/lib/data-store/store"
import { ProductCard } from "@/app/components/ui/productCard"
import { useState } from "react"





export default function ShopProductsPage() {
    const { products } = useStoreContext()


    const [showModal, setShowModal] = useState(false)


    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id as unknown as string}>
                        <ProductCard product={product} />
                        <div id={`product-modal-${product._id}`}>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}