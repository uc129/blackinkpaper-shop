'use client'

import { useStoreContext } from "@/app/lib/data-store/store"





export default function ShopProductsPage() {
    const { products } = useStoreContext()



    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id as unknown as string}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}