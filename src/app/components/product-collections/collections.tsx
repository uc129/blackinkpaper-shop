import { IProduct } from "@/app/api/products/products.model";
import { SmallProductCard } from "../ui/product-cards/card-small-book-type";
import { ListContainer } from "../containers/list-container";
import { useEffect } from "react";
import { ButtonWithLink } from "../buttons/buttonWithLink";


interface ProductCollectionsProps {
    products: IProduct[];
    collectionTitle: string;
    featuredCompaniesIcons?: React.ReactNode[]
    collectionLink?: string;
}


export const ProductCollections = (props: ProductCollectionsProps) => {

    useEffect(() => {
        if (props.products.length > 9) {
            props.products.slice(0, 9);
        }
    }, [props.products])



    return (
        <ListContainer >

            <h1 className="text-4xl  text-center uppercase mb-12">
                {props.collectionTitle}
            </h1>

            {props.featuredCompaniesIcons &&
                <div className="flex justify-center gap-24 my-12 ">
                    {
                        props.featuredCompaniesIcons?.map((icon, index) => {
                            return (
                                <div key={index}>
                                    {icon}
                                </div>
                            )
                        })
                    }
                </div>
            }

            <div className="flex  flex-wrap items-end gap-12 justify-around lg:justify-start ">
                {
                    props.products.map((product) => {
                        return (
                            <div key={product._id as unknown as string}>
                                <SmallProductCard
                                    product={product}
                                />
                            </div>
                        )
                    })
                }
            </div>

            {
                props.collectionLink && (
                    <div className="flex justify-center m-4">
                        {/* <Link href={props.collectionLink} className="text-blue-600 underline">View All</Link> */}
                        <ButtonWithLink buttonText="View All" link={props.collectionLink} />
                    </div>
                )
            }

        </ListContainer>
    )


}