'use client'

import { useStoreContext } from "@/app/lib/data-store/store";
import Link from "next/link";
import { useState, useEffect } from "react";




export const AllCategoriesList = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const { categories } = useStoreContext()

    useEffect(() => {
        console.log(categories)
        if (categories) {
            setLoading(false)
        }
        else setLoading(true)
    }, [categories])

    if (categories?.length === 0) {
        return (
            <div>
                <h1>No Product Categories Found</h1>
            </div>
        )
    }

    if (loading) return <h1>Loading...</h1>



    return (
        <section>
            <div>
                <h3>All Product Categories</h3>
                <ul className="grid grid-cols-4 gap-12">
                    {categories.map((category) => (
                        <li className="my-3" key={category._id as unknown as string}>
                            <h4><span></span> {category.title}</h4>
                            <p><span></span> {category.description}</p>
                            <p><span>Tagline:</span> {category.tagline}</p>
                            <Link href={`/admin/product-categories/${category._id}`}>View Category</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

