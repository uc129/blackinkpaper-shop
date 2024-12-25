
type InputTypes = 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'time' | 'search' | 'url' | 'file' | 'hidden' | 'color' | 'datetime-local' | 'month' | 'week';
type widthTypes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
interface CustomInputProps {
    id?: string;
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
    disabled?: boolean;
}

const CustomInput = ({ label, name, type, placeholder, value, onChange, error, onBlur, min, max, id, disabled }: CustomInputProps) => {

    return (
        <div id={id} className={`mb-4`}>
            {label && <label className="block text-sm font-medium text-label  ">{label}</label>}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                min={min}
                max={max}
                disabled={disabled}

                className={`mt-1 w-full px-3 py-2 border border-gray-300 text-input rounded-md shadow-sm 
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                    sm:text-sm  placeholder:placeholder-black 
                    ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

    )

}

export default CustomInput