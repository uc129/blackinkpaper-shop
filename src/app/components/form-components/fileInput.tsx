'use client'




interface CustomFileInputProps {
    name: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    error: string;
    accept: string;
    multiple: boolean;
    disabled: boolean;
    required: boolean;
    classNames?: string;
}


export const CustomFileInput = (props: CustomFileInputProps) => {

    return (
        <div className={`mb-4 ${props.classNames}`}>
            <label className="block text-lg font-medium text-gray-700 ">{props.label}</label>
            <input type="file" name="imageFile" id="image-file-input"
                multiple={props.multiple} accept={props.accept}
                onChange={props.onChange} className={`${props.classNames} `}
                disabled={props.disabled} required={props.required}
            />
        </div>
    )

}