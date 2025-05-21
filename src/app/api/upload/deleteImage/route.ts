import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
import cloudinary from "@/Lib/cloudinary";
import { db } from "@/Lib/prisma";
// import { UserRole } from "@prisma/client";

const extractPublicId = (url: string): string | null => {
  try {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    const [publicId] = filename.split(".");
    return `${folder}/${publicId}`;
  } catch {
    return null;
  }
};

export async function DELETE(req: NextRequest) {
  // const token = await getToken({ req });

  // if (!token || token.role !== UserRole.ADMIN) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("imageUrl");
    if (!imageUrl) {
      return NextResponse.json(
        { message: "Missing imageUrl parameter" },
        { status: 400 }
      );
    }

    // Check if image is used in any product
    const usedImage = await db.image.findFirst({
      where: {
        image: imageUrl,
      },
    });

    if (usedImage) {
      return NextResponse.json(
        { message: "This image is used in a product and cannot be deleted." },
        { status: 403 }
      );
    }

    const publicId = extractPublicId(imageUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    return NextResponse.json({ message: "Image deleted" });
  } catch (err) {
    console.error("Error deleting image:", err);
    return NextResponse.json(
      { message: "Failed to delete image" },
      { status: 500 }
    );
  }
}
