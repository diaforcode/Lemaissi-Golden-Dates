import cloudinary from "@/Lib/cloudinary"; // Make sure the path is correct

import { NextResponse } from "next/server";
// Define the type for the form data file
type FormDataFile = Blob & {
  name?: string; // Optional: Some browsers may add this
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("file") as FormDataFile[]; // Get all files from the form data
    const pathName = formData.get("pathName") as string;

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Upload multiple files to Cloudinary and return the URLs
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const fileBuffer = await file.arrayBuffer();
        const base64File = Buffer.from(fileBuffer).toString("base64");

        const uploadResponse = await cloudinary.uploader.upload(
          `data:${file.type};base64,${base64File}`,
          {
            folder: pathName,
            transformation: [
              { width: 800, height: 800, crop: "limit", quality: "auto:best" },
            ],
          }
        );

        return uploadResponse.secure_url; // Return the uploaded file URL
      })
    );

    return NextResponse.json({ urls: uploadedUrls }); // Return all uploaded URLs
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}
