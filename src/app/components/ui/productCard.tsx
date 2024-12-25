'use client'
import { IProduct } from "@/app/api/products/products.model";
import { PopOverModal } from "@/app/shop/products/product-modal";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    product: IProduct;
    classNames?: string;
    hidden?: boolean;
    clicked?: () => void;
}


export const ProductCard = (props: ProductCardProps) => {



    const router = useRouter();


    return (
        <div className={`my-4 ${props.classNames}`}>
            <h2>{props.product.title}</h2>
            <p>{props.product.description}</p>
            <p>{props.product.price}</p>
            <button popoverTarget={`product-modal-${props.product._id}`}>View Product</button>
            <PopOverModal id={`product-modal-${props.product._id}`} classNames="">
                {props.product.title}
            </PopOverModal>
        </div>
    )

}