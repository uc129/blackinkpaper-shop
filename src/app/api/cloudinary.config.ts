


import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configuration
console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET, process.env.CLOUDINARY_UPLOAD_PRESET);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,// Click 'View API Keys' above to copy your API secret
});

export default cloudinary;