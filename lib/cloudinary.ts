import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a File object (from FormData) to Cloudinary.
 * Next.js API routes receive files as Blobs/Files which we convert to ArrayBuffer * 
 * @param file The File object from FormData
 * @param folder The folder name in Cloudinary to store the image
 * @returns A promise that resolves to the secure URL of the uploaded image
 */
export async function uploadToCloudinary(file: File, folder: string = 'construction-website'): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error('Unknown Cloudinary upload error'));
        }
      }
    );

    // Write the buffer to the stream and end it
    uploadStream.end(buffer);
  });
}
