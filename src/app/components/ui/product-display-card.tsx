'use client'
/* eslint-disable*/
import Link from "next/link";
import { IProduct } from "../../api/products/products.model";
import { LabelWithTextInline } from "./labelWithText";
import { useStoreContext } from "../../lib/data-store/store";
import { AddToCartButton } from "../../shop/cart/add-to-cart-button";




export const ProductDisplayCard = ({ product, classNames }: { product: IProduct, classNames?: string }) => {

    const { categories } = useStoreContext()
    let productCategories = categories

    let filteredCategories = productCategories.filter((category) => {
        return product.categories.includes(category._id!)
    })


    return (
        <div className={`my-4 ${classNames}`}>

            <LabelWithTextInline label="Name" text={product.title} />
            <LabelWithTextInline label="Price" text={product.price} />

            <div>
                <LabelWithTextInline label="Categories" />
                {
                    filteredCategories.map((cat) => {
                        return <LabelWithTextInline key={cat._id as unknown as string} label={cat.title} />
                    })
                }
            </div>


            <div>
                <AddToCartButton product={product} />
            </div>

            <div>
                <Link href={`/shop/product/${product._id}`} passHref> <span>View Product</span> </Link>
            </div>

        </div>
    )

}