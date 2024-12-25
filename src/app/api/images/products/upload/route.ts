import { NextRequest, NextResponse } from "next/server";
import cloudinary from 'cloudinary';
import { ProductModel } from "../../../products/products.model";

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}

const client = cloudinary.v2;
client.config({
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret,
    secure: true
});



const uploadImage = async (image: File) => {
    let result = await client.uploader
        .upload(image.name, {
            asset_folder: 'blackinkpaper/shop',
            resource_type: 'image'
        })
        .then((result) => {
            if (!result) {
                return { error: 'Image upload failed' };
            }
            return ({ secure_url: result.secure_url, public_id: result.public_id });
        })
        .catch((error) => {
            return { error: error };
        });

    return result;

}


export async function POST(req: NextRequest) {

    const formData = await req.formData();
    const files = formData.getAll('images');
    console.log('files', files);
    let filesArray = files as File[];
    if (files.length === 0) {
        return NextResponse.json({ status: 400, message: 'No images to upload' });
    }

    try {
        let resultsArray = await Promise.all(filesArray.map(async (file) => {
            return await uploadImage(file);
        }));

        if (!resultsArray) {
            return NextResponse.json({ status: 500, message: 'Image upload failed' });
        }

        let urls = resultsArray.map((result) => {
            if ('error' in result) {
                console.error(result.error);
                return result.error
            }
            if ('secure_url' in result) {
                return result.secure_url;
            }
        });

        return NextResponse.json({ status: 200, message: 'Images uploaded successfully', imageUrls: urls });


    } catch (error) {
        return { status: 500, message: error };
    }














}