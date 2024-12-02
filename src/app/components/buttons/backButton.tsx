'use client'
import { ButtonWithIcon } from "./buttonsWithIcon"





export const BackButton = () => {

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        window.history.back()
    }

    return (
        <ButtonWithIcon icon={<></>} label="Back" onClick={handleClick} />
    )
}