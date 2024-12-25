import React from "react";




interface ToolTipContainerProps {
    id: string;
    children: React.ReactNode;
    toolTipChildren?: React.ReactNode;
    mouseEnterTargetId?: string;
    classNames?: string;
    top?: string;
    left?: string;
}

export const ToolTipContainer = (props: ToolTipContainerProps) => {


    const [showToolTip, setShowToolTip] = React.useState(false);

    React.useEffect(() => {
        if (props.mouseEnterTargetId) {
            const target = document.getElementById(props.mouseEnterTargetId);
            if (target) {
                target.addEventListener('mouseenter', () => {
                    setShowToolTip(true);
                });
                target.addEventListener('mouseleave', () => {
                    setShowToolTip(false);
                });
            }
        }
    }, [props.mouseEnterTargetId]);



    const top = props.top ? props.top : 'top-[4rem]';

    return (
        <div className={`relative ${props.classNames}`}>

            {showToolTip &&
                <div className={`absolute z-10 ${top} min-w-fit -left-1  p-4 pb-1 bg-gray-200  rounded-lg shadow-lg`}>
                    {props.toolTipChildren}
                </div>
            }

            <div id={props.mouseEnterTargetId} className="w-full">
                {props.children}
            </div>

        </div>
    )

}