'use client'
import { IProduct } from "../api/products/products.model";
import { LabelWithTextInline } from "../components/ui/labelWithText";
import { useStoreContext } from "../lib/data-store/store";
import { AddToCartButton } from "./cart/add-to-cart-button";




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
            <LabelWithTextInline label="Categories" />
            {
                filteredCategories.map((cat) => {
                    return <LabelWithTextInline key={cat._id as unknown as string} label={cat.title} />
                })
            }
            <AddToCartButton product={product} />

        </div>
    )

}