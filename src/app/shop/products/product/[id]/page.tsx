'use client'

import { useStoreContext } from "@/app/lib/data-store/store";
import { useParams } from "next/navigation"
import { ProductCard } from "../../productCard";

export default function ShopProductPage() {

    const { id } = useParams()

    console.log('id', id);

    const { products } = useStoreContext()

    const product = products.find((product) => product._id === id)

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
            <ProductCard product={product} />
        </div>
    )
}