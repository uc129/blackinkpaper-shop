import React from "react";
import { BackButton } from "../components/buttons/backButton";





export default function ShopLayout(props: { children: React.ReactNode, modal?: React.ReactNode }) {
    return (
        <section>
            <BackButton />
            {props.children}
            {props.modal}
        </section>
    )
}