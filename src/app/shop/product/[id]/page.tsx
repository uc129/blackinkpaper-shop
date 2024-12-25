'use client'

import { useStoreContext } from "@/app/lib/data-store/store";
import { useParams } from "next/navigation"

export default function ShopProductPage() {
    const { id } = useParams()
    const { products } = useStoreContext()
    const product = products.find((product) => product._id.toString() === id)

    if (!product) {
        return (
            <div>
                <h1>Product not found</h1>
            </div>
        )
    }


    return (
        <div>
            <h1>Product</h1>
            {
                <div>
                    <p>
                        product title: {product.title}
                    </p>
                    <p>
                        product id: {product._id as unknown as string}
                    </p>

                </div>
            }
        </div>
    )
}