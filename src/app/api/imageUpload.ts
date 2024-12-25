'use server'

import { UploadApiResponse } from 'cloudinary';
import cloudinary from './cloudinary.config';

// Configuration
// console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET, process.env.CLOUDINARY_UPLOAD_PRESET);
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//     api_key: process.env.CLOUDINARY_API_KEY!,
//     api_secret: process.env.CLOUDINARY_API_SECRET!,// Click 'View API Keys' above to copy your API secret
// });




export async function ImageUpload(props: { file: File }) {

    const { file } = props;

    let buffer = await file.arrayBuffer()
    let base64 = Buffer.from(buffer).toString('base64');
    let format = file.type.split('/')[1];
    let publicId = file.name.replace(/\.[^/.]+$/, "");
    let imageunstripped = `data:image/${format};base64,${base64}`;
    console.log('imageunstripped', imageunstripped.slice(0, 100));

    let response = await cloudinary.uploader.upload(imageunstripped, {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET!,
        folder: 'blackinkpaper/shop',
        public_id: publicId,
    }).catch((error) => {
        console.log('error', error);
    });


    console.log('response', response);
    if (!response) {
        return null;
    }
    let { secure_url, public_id, url, original_filename, etag } = response as UploadApiResponse;

    return { secure_url, public_id, url, original_filename, etag };

}