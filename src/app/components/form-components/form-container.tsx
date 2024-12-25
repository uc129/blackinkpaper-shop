

import React from 'react';

interface FormContainerProps {
    children: React.ReactNode;
    title: string;
    description: string;
    tagline?: string;
    maxWidth?: string;
}


const FormContainer = ({ children, title, description, tagline, maxWidth = '740px' }: FormContainerProps) => {
    return (
        <div className="h-full py-6" style={{ maxWidth: maxWidth }}>
            <h4 className=" font-semibold">{title}</h4>
            <p className="text-sm">{description}</p>
            <p className='text-sm'>{tagline}</p>
            <div className='mt-6'>
                {children}
            </div>
        </div>
    );
}

export default FormContainer;