import { IProduct } from "@/app/api/products/products.model";
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon";
import { Modal } from "@/app/components/ui/modal";
import usePhosphorIcons from "@/app/lib/phosphor";

interface ProductModalProps {
    product: IProduct;
    show: boolean;
    close: () => void;
}




export const ProductModal = (props: ProductModalProps) => {

    const { Cross } = usePhosphorIcons()

    return (
        <>
            {props.show ?
                <Modal rootId={`product-modal-${props.product._id}`}>
                    <div>
                        <h2>{props.product.title}</h2>
                        <p>{props.product.description}</p>
                        <p>{props.product.price}</p>
                    </div>
                    <div>
                        <ButtonWithIcon onClick={props.close} icon={<Cross />} label="close" />
                    </div>
                </Modal>
                :
                <></>
            }
        </>
    )

}