
import React from 'react'

interface CustomCheckboxProps {
    label?: string;
    name: string;
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classNames?: string;
}



export const CustomCheckbox = ({ label, name, value, onChange, ...rest }: CustomCheckboxProps) => {

    return (
        <div className="mb-4">
            <label className="flex items-center">
                <input
                    name={name}
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className={`form-checkbox h-5 w-5 text-indigo-600 ${rest.classNames}`}
                    {...rest}
                />
                {label && <span className="ml-2 text-sm text-gray-700">{label}</span>}
            </label>
        </div>
    )


}
