'use client'

import { useAuthContext } from "@/app/auth/auth-context"
import { useStoreContext } from "@/app/lib/data-store/store"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ProductCard } from "./product-card"

const AllProductsPage = () => {

    const { products } = useStoreContext()
    const [loading, setLoading] = useState(true)

    const { isAuthenticated } = useAuthContext()

    useEffect(() => {
        if (products) setLoading(false)
        else setLoading(true)
    }, [products])


    if (!isAuthenticated) {
        return (
            <div>
                <h1>Not Authorized</h1>
                <p>You must be logged in to view this page</p>
            </div>
        )
    }

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (!products) {
        return (
            <div>
                <h1>No Products Found</h1>
            </div>
        )
    }



    return (
        <>
            {isAuthenticated ?
                <div>
                    <h1 className="mb-16" >All Products List</h1>

                    <ul className="grid grid-cols-1 gap-4 ">
                        {products && products.map((product) => {
                            return (
                                <li key={product._id as unknown as string}>
                                    <ProductCard product={product} />
                                </li>
                            )
                        })}
                    </ul>

                </div> : <></>
            }
        </>
    )


}

export default AllProductsPage