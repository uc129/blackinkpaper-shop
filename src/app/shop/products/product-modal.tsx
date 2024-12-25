'use client'
import { useEffect } from "react"




export const PopOverModal = (props: { children: React.ReactNode, id: string, classNames?: string }) => {

    return (
        <div id={props.id} popover='auto' popoverTargetAction="toggle" className={`${props.classNames}`}>
            {props.children}
        </div>
    )
}