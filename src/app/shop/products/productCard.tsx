import { IProduct } from "@/app/api/products/products.model";

interface ProductCardProps {
    product: IProduct;
    classNames?: string;
    hidden?: boolean;
    clicked?: () => void;

}


export const ProductCard = (props: ProductCardProps) => {

    return (
        <div className={`my-4 ${props.classNames}`}>
            <h2>{props.product.title}</h2>
            <p>{props.product.description}</p>
            <p>{props.product.price}</p>
        </div>
    )

}