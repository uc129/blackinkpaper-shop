

import React from 'react';

interface FormContainerProps {
    children: React.ReactNode;
    title: string;
    description: string;
    tagline?: string;
}


const FormContainer = ({ children, title, description, tagline }: FormContainerProps) => {
    return (
        <form className="flex flex-col items-center justify-center w-full h-full space-y-4">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-center">{description}</p>
            <p>{tagline}</p>
            {children}
        </form>
    );
}

export default FormContainer;