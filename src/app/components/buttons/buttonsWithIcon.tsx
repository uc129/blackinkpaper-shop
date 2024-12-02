import React from "react";

interface ButtonWithIconProps {
    icon: React.ReactNode;
    label: string;
    onClick: (e: React.MouseEvent) => void;
    classNames?: string;
    disabled?: boolean;
    rtl?: boolean;
}

export const ButtonWithIcon = ({ icon, label, onClick, classNames, disabled, rtl }: ButtonWithIconProps) => {


    return (
        <button onClick={onClick} disabled={disabled} className={`flex items-center ${rtl ? 'flex-row-reverse' : 'flex-row'} justify-center px-4 py-2 bg-white text-black rounded-md ${classNames}`}>
            <span className="pointer-events-none"> {icon}</span>
            <span className="ml-2 pointer-events-none">{label}</span>
        </button>
    )

}