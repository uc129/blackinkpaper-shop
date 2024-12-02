
export interface CustomSelectOptionsProps {
    label: string;
    value: string;
}

interface CustomSelectProps {
    label?: string;
    name: string;
    options: CustomSelectOptionsProps[];
    required: boolean;
    multiple: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

}

export const CustomSelect = ({ label, name, options, required, multiple, ...rest }: CustomSelectProps) => {

    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
            <select
                name={name}
                required={required}
                multiple={multiple}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                {...rest}
                onChange={rest.onChange}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )



}


export default CustomSelect