import React from "react";

interface ButtonWithIconProps {
    icon: React.ReactNode;
    label: string;
    onClick: (e: React.MouseEvent) => void;
    classNames?: string;
    disabled?: boolean;
    rtl?: boolean;
    id?: string;
    isLink?: boolean;
}

export const ButtonWithIcon = ({ icon, label, onClick, classNames, disabled, rtl, id, isLink }: ButtonWithIconProps) => {


    return (
        <button id={id} onClick={onClick} disabled={disabled}
            className={`flex items-center justify-center  rounded-md  mb-6
            ${classNames}
             ${rtl ? 'flex-row-reverse' : 'flex-row'}
             ${isLink ? 'pointer-events-none' : 'pointer-events-auto'} `
            }>
            <span className={isLink ? 'pointer-events-auto' : 'pointer-events-none'}> {icon}</span>
            <span className="ml-2 pointer-events-none">{label}</span>
        </button>
    )

}