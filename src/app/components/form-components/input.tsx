
type InputTypes = 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'time' | 'search' | 'url' | 'file' | 'hidden' | 'color' | 'datetime-local' | 'month' | 'week';
type widthTypes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
interface CustomInputProps {
    label?: string;
    name: string;
    type: string;
    placeholder?: string;
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    width?: widthTypes | null;
    min?: number;
    max?: number;
}

const CustomInput = ({ label, name, type, placeholder, value, onChange, error, onBlur, min, max }: CustomInputProps) => {

    return (
        <div className={`mb-4`}>
            {label && <label className="block text-sm font-medium text-gray-700 ">{label}</label>}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                min={min}
                max={max}

                className={`mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                    sm:text-sm 
                    ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

    )

}

export default CustomInput