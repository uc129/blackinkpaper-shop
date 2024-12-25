'use client'

import { useStoreContext } from "@/app/lib/data-store/store"
import { ProductCard } from "@/app/components/ui/productCard"
import { useEffect, useState } from "react"





export default function ShopProductsPage() {
    const { products } = useStoreContext()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loading) return
        if (products && products.length > 0) {
            setLoading(false);
        }
    }, [products, loading])

    if (loading) {
        return <div>Loading...</div>
    }




    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id as unknown as string}>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </div>
    )
}