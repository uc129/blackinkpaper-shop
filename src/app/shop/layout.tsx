import React from "react";
import { BackButton } from "../components/buttons/backButton";





export default function ShopLayout(props: { children: React.ReactNode }) {
    return (
        <section>
            <BackButton />
            {props.children}
        </section>
    )
}