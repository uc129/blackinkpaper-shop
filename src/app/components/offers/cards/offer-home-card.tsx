'use client'

import Image from 'next/image';
import React from 'react';
import { useWindowContext } from '@/app/lib/utils/windowContext';


interface IOffer {
    title: string;
    description: string;
    image_url: string;
}



export const OffersHomeCard = (props: IOffer) => {

    const { isMobile } = useWindowContext();

    const width = isMobile ? 400 : 600;

    return (
        <article className='max-w-[500px]'>
            <div>
                <div className='py-4 flex items-center justify-center'>
                    <Image src={props.image_url} alt={props.title} width={width} height={width} />
                </div>
                <div className='text-center flex py-4  flex-col gap-3'>
                    <h3>{props.title}</h3>
                    <p >{props.description}</p>
                </div>
            </div>
        </article>
    )





}