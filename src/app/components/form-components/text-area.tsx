

interface CustomTextAreaProps {
    id?: string;
    label?: string;
    name: string;
    placeholder?: string;
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    // width?: widthTypes | null;
    disabled?: boolean;
}



export const CustomTextArea = (props: CustomTextAreaProps) => {



    return (
        <div id={props.id} className={`mb-4`}>
            {props.label && <label className="block text-sm font-medium text-label ">{props.label}</label>}
            <textarea
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                disabled={props.disabled}

                className={`mt-1 w-full px-3 py-2 border border-gray-300 text-input rounded-md shadow-sm 
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                    sm:text-sm 
                    ${props.error ? 'border-red-500' : ''}`}
            />
            {props.error && <p className="mt-1 text-sm text-red-500">{props.error}</p>}
        </div>

    )

}