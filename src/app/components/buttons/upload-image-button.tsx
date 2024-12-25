/* eslint-disable */
'use client'

import { useEffect, useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadButtonProps {
    retrieveImageUrls: (urls: string[], imageData: ImageData[]) => void;
}

export interface ImageData {
    publicId: string;
    url: string;
    secure_url: string;
    original_filename: string;
}

export const ImageUploadButton = (props: ImageUploadButtonProps) => {

    const [images, setImages] = useState<any[]>([]);

    const onUploadSuccess = (result: any) => {
        setImages([...images, result.info]);
    }

    useEffect(() => {
        if (images.length > 0) {
            const urls = images.map((image: ImageData) => image.secure_url);
            const imagedata: ImageData[] = images.map((image) => {
                return {
                    publicId: image.public_id,
                    url: image.url,
                    secure_url: image.secure_url,
                    original_filename: image.original_filename
                }
            })
            props.retrieveImageUrls(urls, imagedata);
        }
    }, [images])

    // return (
    //     <div>
    //         <input type="file" accept="image/*" multiple onChange={handleImageChange} />
    //         <button type="button" onClick={handleUploadImages}>Upload Images</button>
    //         {errors.length > 0 && errors.map((error, index) => {
    //             return <p key={index} >{error}</p>
    //         })}

    //         {
    //             uploading &&
    //             <div className='absolute w-full h-full top-0 left-0 z-50 pointer-events-none bg-slate-700 flex items-center justify-center ' >
    //                 <div className='w-1/2 h-1/2 bg-gray-300 rounded-lg' >
    //                     <p> Uploading media! Please wait!  </p>
    //                 </div>
    //             </div>
    //         }

    //     </div>
    // )

    return (
        <CldUploadWidget
            uploadPreset={process.env.CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result) => {
                if (typeof result.info === "object" && "secure_url" in result.info) {
                    onUploadSuccess(result);
                }

            }}
            options={{
                singleUploadAutoClose: true,
            }}
        >
            {({ open }) => {
                return (
                    <button
                        type="button"
                        onClick={() => open()}
                        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Upload Avatar
                    </button>
                );
            }}
        </CldUploadWidget>
    )

}