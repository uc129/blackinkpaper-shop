'use client'
import { IProduct } from "@/app/api/products/products.model";
import { ButtonWithIcon } from "../buttons/buttonsWithIcon";
import { useEffect, useState } from "react";
import { ProductModal } from "@/app/shop/products/product-modal";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    product: IProduct;
    classNames?: string;
    hidden?: boolean;
    clicked?: () => void;
}


export const ProductCard = (props: ProductCardProps) => {

    const [showModal, setShowModal] = useState(false);

    function handleViewProductClick(e: React.MouseEvent) {
        e.preventDefault();
        console.log('View Product Clicked');
        setShowModal(true);
        window.localStorage.setItem("showProductModal", "true");
        window.localStorage.setItem("productModalId", props.product._id as unknown as string);
    }

    function handleCloseModal() {
        setShowModal(false);
        window.localStorage.removeItem("showProductModal");
    }

    useEffect(() => {
        let showProductModal = window.localStorage.getItem("showProductModal");
        let productModalId = window.localStorage.getItem("productModalId");
        if (showProductModal) {
            window.localStorage.removeItem("showProductModal");
            window.localStorage.removeItem("productModalId");
            router.push(`/shop/product/${productModalId}`);
        }
    }, [])

    const router = useRouter();


    return (
        <div className={`my-4 ${props.classNames}`}>
            <h2>{props.product.title}</h2>
            <p>{props.product.description}</p>
            <p>{props.product.price}</p>
            <ButtonWithIcon label="View Product" onClick={handleViewProductClick} icon={<></>} classNames="" />
            <div>
                <ProductModal product={props.product} show={showModal} close={handleCloseModal} />
            </div>
        </div>
    )

}