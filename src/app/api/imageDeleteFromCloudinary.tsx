'use server'

import cloudinary from "./cloudinary.config";


export async function deleteFromCloudinary(publicId: string[]) {
    const response = await cloudinary.api.delete_resources(publicId);
    if (!response.ok) {
        throw new Error('Failed to delete image from Cloudinary');
    }
    return response;
}