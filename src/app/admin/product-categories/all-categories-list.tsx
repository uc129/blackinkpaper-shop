'use client'

import { useStoreContext } from "@/app/lib/data-store/store";
import { useState, useEffect } from "react";




export const AllCategoriesList = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const { categories } = useStoreContext()

    if (!categories) {
        return (
            <div>
                <h1>No Product Categories Found</h1>
            </div>
        )
    }

    useEffect(() => {
        if (categories) setLoading(false)
        else setLoading(true)
    })


    if (loading) return <h1>Loading...</h1>



    return (
        <section>
            <h1>Manage Product Categories</h1>
            <div>
                <h2>All Product Categories</h2>
                <ul className="grid grid-cols-4 gap-12">
                    {categories.map((category) => (
                        <li className="my-3" key={category._id as unknown as string}>
                            <h3><span>Title:</span> {category.title}</h3>
                            <p><span>Description:</span> {category.description}</p>
                            <p><span>Tagline:</span> {category.tagline}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

