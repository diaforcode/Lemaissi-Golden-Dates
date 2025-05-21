"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/Lib/getCurrentLocale";
import { db } from "@/Lib/prisma";
import getTrans from "@/Lib/translation";

import {
  addCategorySchema,
  updateCategorySchema,
} from "@/validations/category";
import { revalidatePath } from "next/cache";

export const addCategory = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const result = addCategorySchema(translations).safeParse(
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
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  try {
    await db.category.create({
      data: {
        ...data,
        image: imageUrl ? imageUrl : "",
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 201,
      message: translations.messages.categoryAdded,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
export const updateCategory = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const result = updateCategorySchema(translations).safeParse(
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
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  const category = await db.category.findUnique({
    where: { id },
  });
  if (!category) {
    return {
      status: 400,
      message: translations.messages.unexpectedError,
    };
  }
  try {
    await db.category.update({
      where: {
        id,
      },
      data: {
        ...data,
        image: imageUrl ?? category.image,
      },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 200,
      message: translations.messages.updatecategorySucess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};

export const deleteCategory = async (id: string) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  try {
    await db.category.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);
    return {
      status: 200,
      message: translations.messages.deleteCategorySucess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};

const getImageUrl = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", "category_images");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/uplodeImage`,
      {
        method: "POST",
        body: formData,
      }
    );
    // console.log(response);
    const image = (await response.json()) as { url: string };
    return image.url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
  }
};
