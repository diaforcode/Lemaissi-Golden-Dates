// import { getToken } from "next-auth/jwt";
import { db } from "@/Lib/prisma";
import cloudinary from "@/Lib/cloudinary";
// import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // const token = await getToken({ req });

  // if (!token || token.role !== UserRole.ADMIN) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  try {
    const result = await cloudinary.search
      .expression(
        "folder:profile_images OR folder:product_images OR folder:category_images OR folder:slider_images"
      )
      .sort_by("created_at", "desc")
      // .max_results(100)
      .execute();

    const imageUrls = result.resources.map((r: any) => r.secure_url);
    // const usedImages = await db.image.findMany({
    //   where: {
    //     image: {
    //       in: imageUrls,
    //     },
    //   },
    //   select: {
    //     image: true,
    //   },
    // });
    const [
      usedProductImages,
      usedUserImages,
      usedCategoryImages,
      usedSliderImages,
    ] = await Promise.all([
      db.image.findMany({
        where: {
          image: {
            in: imageUrls,
          },
        },
        select: {
          image: true,
        },
      }),
      db.user.findMany({
        where: {
          image: {
            in: imageUrls,
          },
        },
        select: {
          image: true,
        },
      }),
      db.category.findMany({
        where: {
          image: {
            in: imageUrls,
          },
        },
        select: {
          image: true,
        },
      }),
      db.slider.findMany({
        where: {
          image: {
            in: imageUrls,
          },
        },
        select: {
          image: true,
        },
      }),
    ]);

    const usedImageSet = new Set([
      ...usedProductImages.map((i) => i.image),
      ...usedUserImages.map((u) => u.image),
      ...usedCategoryImages.map((c) => c.image),
      ...usedSliderImages.map((s) => s.image),
    ]);

    // const usedImageSet = new Set(usedImages.map((i) => i.image));

    const enrichedImages = result.resources.map((img: any) => ({
      ...img,
      inUse: usedImageSet.has(img.secure_url),
    }));

    return NextResponse.json({ resources: enrichedImages });
  } catch (err) {
    console.error("Error fetching Cloudinary images:", err);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
