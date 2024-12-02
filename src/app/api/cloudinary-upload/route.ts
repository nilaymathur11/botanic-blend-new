import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {
        // Read the request body
        const body = await req.json();

        const fileStr = body.data;
        const folder = body.folder;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: folder,
        });

        return NextResponse.json({ url: uploadResponse.secure_url });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}