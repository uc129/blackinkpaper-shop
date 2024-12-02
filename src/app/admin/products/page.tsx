'use client'

import { useAuthContext } from "@/app/auth/auth-context"
import { useStoreContext } from "@/app/lib/data-store/store"
import { useEffect, useState } from "react"

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
                    <h1>All Products List</h1>

                    {loading && <p>Loading...</p>}

                    <ul className="grid grid-cols-1 gap-4 bg-green-300">
                        {products && products.map((product) => {
                            return (
                                <li className="" key={product._id as unknown as string}>
                                    <h2>{product.title}</h2>
                                    <p>{product.description}</p>
                                    <p>${product.price}</p>
                                    <a href={`/admin/products/${product._id}`}>
                                        View Product
                                    </a>
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