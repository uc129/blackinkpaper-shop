import React from "react";





export default function ShopLayout(props: { children: React.ReactNode, modal?: React.ReactNode }) {
    return (
        <section>
            {props.children}
            {props.modal}
        </section>
    )
}