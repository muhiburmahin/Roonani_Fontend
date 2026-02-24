import { env } from '@/src/env';

export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const cloudName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Cloudinary Error:", error);
        return null;
    }
};