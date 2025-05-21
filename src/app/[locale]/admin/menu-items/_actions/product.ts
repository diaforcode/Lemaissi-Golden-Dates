"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import { db } from "@/Lib/prisma";
import getTrans from "@/Lib/translation";
import { addProductSchema, updateProductSchema } from "@/validations/product";
import { revalidatePath } from "next/cache";
import cloudinary from "@/Lib/cloudinary"; // Cloudinary config

export const addProduct = async (
  args: {
    categoryId: string;
    images: string[]; // New images array
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const result = addProductSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }

  const data = result.data;
  const price = Number(data.price);
  // console.log("console.log(data)", data);
  try {
    // Create the product with multiple images
    const lastProduct = await db.product.findFirst({
      orderBy: { order: "desc" },
    });
    // console.log("lastProduct after try", lastProduct);
    const newProduct = await db.product.create({
      data: {
        ...data,
        price,
        categoryId: args.categoryId,
        order: lastProduct ? lastProduct.order + 1 : 1, // Auto-increment logic
        images: {
          create: args.images.map((url) => ({ image: url })),
        },
      },
    });

    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(`/${locale}`);

    return {
      status: 201,
      message: translations.messages.productAdded,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};

export const updateProduct = async (
  args: {
    productId: string;
    images: string[]; // New images array
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const result = updateProductSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }

  const data = result.data;
  const price = Number(data.price);

  const product = await db.product.findUnique({
    where: { id: args.productId },
  });

  if (!product) {
    return {
      status: 400,
      message: translations.messages.unexpectedError,
    };
  }

  try {
    const updatedProduct = await db.product.update({
      where: {
        id: args.productId,
      },
      data: {
        ...data,
        price,
      },
    });

    // Delete old images
    await db.image.deleteMany({
      where: { productId: args.productId },
    });

    // Create new image records
    await db.image.createMany({
      data: args.images.map((url) => ({
        productId: args.productId,
        image: url,
      })),
    });

    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${updatedProduct.id}/${Pages.EDIT}`
    );
    revalidatePath(`/${locale}`);

    return {
      status: 200,
      message: translations.messages.updateProductSucess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};

// 🔥 Utility to extract Cloudinary public ID from a full URL
const extractPublicId = (url: string): string | null => {
  try {
    const parts = url.split("/");
    const filename = parts[parts.length - 1]; // e.g. abc.jpg
    const folder = parts[parts.length - 2]; // e.g. product_images
    const [publicId] = filename.split("."); // Remove extension
    return `${folder}/${publicId}`; // e.g. product_images/abc
  } catch {
    return null;
  }
};

export const deleteProduct = async (id: string) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  try {
    // 🔍 Get the product with its images
    const productWithImages = await db.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!productWithImages) {
      return {
        status: 404,
        message: "Product not found",
      };
    }

    const publicIds = productWithImages.images
      .map((img) => extractPublicId(img.image))
      .filter((id): id is string => !!id);

    // 🧨 Delete images from Cloudinary
    if (publicIds.length > 0) {
      await Promise.all(
        publicIds.map((publicId) =>
          cloudinary.uploader.destroy(publicId).catch((err) => {
            console.error("Failed to delete from Cloudinary:", publicId, err);
          })
        )
      );
    }

    // 🧼 Delete image records first (if not using `onDelete: Cascade`)
    await db.image.deleteMany({ where: { productId: id } });

    // 🧹 Delete the product
    await db.product.delete({ where: { id } });

    // ♻️ Revalidate paths
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${id}/${Pages.EDIT}`
    );
    revalidatePath(`/${locale}`);

    return {
      status: 200,
      message: translations.messages.deleteProductSucess,
    };
  } catch (error) {
    console.error("Delete product error:", error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
