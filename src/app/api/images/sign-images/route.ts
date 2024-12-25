import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
// const cloudinary = require('cloudinary').v2;




export async function POST(req: NextRequest) {

    const { paramsToSign } = await req.json();
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET!);
    if (!signature) {
        return NextResponse.json({ message: 'Signature not created', status: 400 });
    }
    return NextResponse.json({ signature, status: 200 });
}