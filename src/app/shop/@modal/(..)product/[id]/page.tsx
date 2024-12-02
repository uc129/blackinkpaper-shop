'use client'
import { Modal } from "@/app/components/modal";
import { useParams } from "next/navigation";



export default function ProductsModal() {

    const { id } = useParams()



    return (
        <Modal>
            <h1>Products Modal</h1>
            <p>id: {id}</p>
        </Modal>
    )
}