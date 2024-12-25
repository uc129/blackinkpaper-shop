'use client'
/* eslint-disable */

import { useParams } from "next/navigation";
import { useStoreContext } from "../../lib/data-store/store";




const CategoryPage = () => {

    const { id } = useParams();
    const { categories, products } = useStoreContext();
    if (!id) return <h3>Loading...</h3>;

    const category = categories.find((category) => String(category._id) === id);
    if (!category) return <h3>Category not found</h3>;
    const categoryProducts = products.filter((product) => product.categories.includes(category?._id!));




    return (
        <div>
            {category?.title}

            <div>
                {categoryProducts.map((product) => (
                    <div key={product._id as unknown as string}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>



        </div>
    )



}


export default CategoryPage;