'use client'

import { IProduct } from "@/app/api/products/products.model"
import Image from "next/image";
import { useStoreContext } from "@/app/lib/data-store/store";


import { useEffect, useState } from "react";







export const SmallProductCard = (props: { product: IProduct }) => {

    const [imageProps, setImageProps] = useState({ src: '/placeholder.png', alt: '', index: 0 });

    const { categories } = useStoreContext();
    if (!props.product) return <h3>Loading Product...</h3>;
    let productCategories = categories.filter((category) => {
        return props.product.categories.includes(category._id!);
    });

    // let imageIndex = Math.floor(Math.random() * props.product.image_urls.length / 2);
    // let imageLink = props.product.image_urls[imageIndex] || '/placeholder.png';
    // let rotate = 0;

    useEffect(() => {
        let imageIndex = Math.floor(Math.random() * props.product.image_urls.length / 2);
        let imageLink = props.product.image_urls[imageIndex] || '/placeholder.png';
        // let rotate = 0;
        setImageProps({ src: imageLink, alt: props.product.title, index: imageIndex });

    }, [props.product]);






    return (
        <article className="w-full md:w-[400px] flex flex-col gap-6 bg-gray-200 p-4 rounded-lg">

            <div className="overflow-hidden relative min-h-[320px] bg-gray-100 p-4">
                <Image src={imageProps.src} alt={props.product.title}
                    width={200}
                    height={200}
                    className={`h-auto w-auto pointer-events-none select-none`}
                />
            </div>

            <div className="flex flex-col gap-2 mb-4 ">
                <h4>  {productCategories.map((category) => category.title).join(', ')}       </h4>
                <h5> {props.product.title} </h5>
                <p> ${props.product.price}</p>
            </div>

        </article>
    )

}