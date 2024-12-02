




export const LabelWithTextInline = ({ label, text }: { label?: string, text?: string | number | boolean }) => {

    return (
        <div className="grid grid-cols-2">
            <label>{label}</label>
            <p>{text}</p>
        </div>
    )
}

export const LabelWithTextMultiLine = ({ label, text }: { label?: string, text?: string }) => {

    return (
        <div className="grid grid-rows-2">
            <label>{label}</label>
            <p>{text}</p>
        </div>
    )



}