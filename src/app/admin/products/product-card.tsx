import { IProduct } from "@/app/api/products/products.model";
import Image from "next/image";
import Link from "next/link";



export const ProductCard = (props: { product: IProduct }) => {

    const imagesLength = props.product.image_urls.length;
    let imageIndex = Math.floor((imagesLength - 1) / 2);

    return (
        <div className="flex gap-4" >
            {
                props.product.image_urls && props.product.image_urls[imageIndex] &&
                <div className="border-[1px] border-black">
                    <Image key={props.product.image_urls[imageIndex]} src={props.product.image_urls[imageIndex]} alt={props.product.title} height={120} width={120} />
                </div>
            }

            <div className=" flex flex-col justify-between">

                <div className="">
                    <h2>{props.product.title}</h2>
                    <p>{props.product.description}</p>
                    <p>${props.product.price}</p>
                </div>


                <Link className="py-4" href={`/admin/products/${props.product._id}`}>
                    View Product
                </Link>
            </div>


        </div>
    )

}